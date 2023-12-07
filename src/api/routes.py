from flask import Flask, request, jsonify, Blueprint, url_for, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS  # Add this import
from werkzeug.security import generate_password_hash, check_password_hash
from api.models import db, User
from api.utils import APIException
from datetime import datetime, timedelta
from email.message import EmailMessage
import ssl
import smtplib
import logging
import random
import os
import jwt
import secrets

# Create the Blueprint
api = Blueprint('api', __name__, template_folder='templates')
api_blueprint = Blueprint('api', __name__, template_folder='templates')

JWT_SECRET_KEY = secrets.token_hex(32)
# secure_token = secrets.token_urlsafe(16)

@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    try:
        current_user = get_jwt_identity()
        return jsonify(message=f'Hello, {current_user}!')
    except Exception as e:
        return jsonify(message="Missing Authorization Header or Invalid Token"), 401


@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    print(body)
    if (
        "email" not in body.keys()
        or "password" not in body.keys()
        or "first_name" not in body.keys()
        or "last_name" not in body.keys()
     
    ):
        raise APIException("Please provide all required fields", status_code=400)
  

    email = body['email']
    password = body['password']
    first_name = body['first_name']
    last_name = body['last_name']
    
    


    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify(message="User already exists"), 400

    hashed_password = generate_password_hash(password)
    new_user = User(
        first_name =first_name,
        last_name =last_name,
        email=email,
        password=hashed_password,
    
    )
    db.session.add(new_user)


    db.session.commit()
    return jsonify(message="Successfully created user and pet"), 200

@api.route('/accountPage', methods=['GET'])
@jwt_required()
def get_account():
    try:
        current_user_email = get_jwt_identity()
        user = User.query.filter_by(email=current_user_email).first()

        if not user:
            raise APIException("User not found", status_code=404)

        account_data = {
            "email": user.email,
            "first_Name": user.first_name,
            "last_Name": user.last_name,
            "address": user.address,
            "phone_Number": user.phone_number,
            "pets": [],  
        }

        if user.pets:
            for pet in user.pets:
                account_data["pets"].append({
                    "pet_Name": pet.name,
                    "breed": pet.breed,
                    "age": pet.age,
                    "description": pet.description,
                    "detailed_Care_Info": pet.detailed_care_info,
                })

        return jsonify(account_data), 200

    except Exception as e:
        return jsonify(message=str(e)), 500





@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    if "email" not in body or "password" not in body:
        raise APIException("Please provide both email and password", status_code=400)

    email = body['email']
    password = body['password']
    

    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.email)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify(message="Login failed. Please check your credentials."), 401


@api.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()

    if user:
        return jsonify(user.serialize()), 200
    else:
        return jsonify(message="User not found"), 404


@api.route('/logout', methods=['DELETE'])
@jwt_required()
def logout():
    return jsonify(message="Logged out successfully"), 200

@api.route('/forgotten-password', methods=["POST"])
def send_code ():
    body = request.get_json();
    email = body["email"]
    expiration_time = datetime.utcnow() + timedelta(hours=1)
    payload = {
        'email': email,
        'exp': expiration_time
    }
    token = jwt.encode(payload, JWT_SECRET_KEY, algorithm='HS256')
    FRONTEND_URL = os.getenv('FRONTEND_URL')
    EMAIL_SENDER = os.getenv('EMAIL_SENDER')
    EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')
    URL_TOKEN = f"{FRONTEND_URL}/reset-password?token={token}"
    # URL_TOKEN = url_for('api.reset_password', token=token, _external=True)
    
    if email is None:
        return jsonify("No email was provided"),400
    user = User.query.filter_by(email=email).first()
    print(user)
    if user is None:
        return jsonify({"message":"User doesn't exist"}), 404
    else:
        email_receiver = email
        email_subject = "Reset your password"
        email_body = f"<!DOCTYPE html><html><body>"
        email_body += f"Hello, you requested a password reset. If you did not request this, please ignore this email.<br /><br /> We have sent you this link to reset your password.<br /><br /> Smile with us, Hot Doggity Dog Walkers! "
        email_body +=f"Click here to reset your password: <a href=\"{URL_TOKEN}\">LINK</a><br/><br/>"
        email_body += f"This token is valid for 1 hour. After expiration, you will need to request another password reset.<br /><br />"
        email_body += f"Sincerely,<br /><br />PetSiting"
        email_body += f"</body></html>"
        # email_body = render_template('email_template.html', URL_TOKEN=URL_TOKEN)

        em = EmailMessage()
        em['from'] = EMAIL_SENDER
        em['to'] = email_receiver
        em['subject'] = email_subject
        # em.set_type('text/html')
        # em.add_header('Content-Type','text/html')
        em.set_content(email_body, subtype='html')
        # em.set_payload(email_body)

        context = ssl.create_default_context()
        with smtplib.SMTP(os.getenv('EMAIL_SERVER'), 587) as smtp:
            smtp.set_debuglevel(1)
            smtp.starttls(context=context)
            smtp.login(EMAIL_SENDER, EMAIL_PASSWORD)
            smtp.sendmail(EMAIL_SENDER, email_receiver, em.as_string())
        return "Ok, Password reset link sent to email.",200



@api.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    token = data.get('token')
    new_password = data.get('new_password')
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=['HS256'])
        email = payload.get('email')
        user = User.query.filter_by(email=email).first()
        if user:
            user.password = generate_password_hash(new_password)
            db.session.commit()
            return jsonify({'message': 'Password reset successful.'}), 200
        else:
            return jsonify({'error': 'User not found.'}), 404

    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Expired token.'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token.'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500



# @api.route('/update-password', methods=['PUT'])
# @jwt_required()
# def update_password():
#     body = request.get_json()
#     old_password = body['old_password']
#     new_password = body['new_password']
#     user_email = get_jwt_identity()
#     user = User.query.filter_by(email=user_email).first()
#     if user and check_password_hash(user.password, old_password):
#         user.password = generate_password_hash(new_password)
#         return jsonify("Password updated successfully")
    

 
if __name__ == "__main__":
    api.run()
    
    