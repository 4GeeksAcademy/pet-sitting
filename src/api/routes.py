from flask import Flask, request, jsonify, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from api.models import db, User
from api.utils import APIException
from email.message import EmailMessage
import ssl
import smtplib
import logging
import random


app = Flask(__name__)

# Create the Blueprint
api = Blueprint('api', __name__)

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
    if "email" not in body or "password" not in body:
        raise APIException("Please provide both email and password", status_code=400)

    email = body['email']
    password = body['password']

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify(message="User already exists"), 400

    hashed_password = generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(message="Successfully created user"), 200

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    if "email" not in body or "password" not in body:
        raise APIException("Please provide both email and password", status_code=400)

    email = body['email']
    password = body['password']

    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity=email)
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

@api.route('/forgotten-password', methods=['POST'])
def send_code ():
    body = request.get_json();
    email = body["email"]

    if email is None:
        return "No email was provided",400
    user = User.query.filter_by(email=email).first()
    if user is None:
        return "User doesn't exist", 404
    else :
        new_password = generatePassword()
        new_hashed_password = generate_password_hash(new_password)
        user.password = new_hashed_password 
        db.session.commit()
        email_sender = 'petsitting417@gmail.com'
        email_password = "ilhjwhdyxlxpmdfw"
        email_receiver = 'wivodo2070@eachart.com'
        email_subject = "Reset your password"
        email_body = "We have sent you this temporary password so that you can recover your account. Smile with us Hot Doggity Dog Walkers! New Password: "+new_password

        em = EmailMessage()
        em['from'] = email_sender
        em['to'] = email_receiver
        em['subject'] = email_subject
        em.set_content(email_body)

        context = ssl.create_default_context
        with smtplib.SMTP_SSL('smtp.gmail.com',465) as smtp:
            smtp.login(email_sender, email_password)
            smtp.sendmail(email_sender, email_receiver, em.as_string())
        return "Ok",200


def generatePassword():
    pass_len = 12
    characters = "abcdefghilklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789!@#$%^&*+=?"
    password = ""
    for index in range (pass_len):
        password = password+random.choice(characters)
    return password

@api.route('/update-password', methods=['PUT'])
@jwt_required()
def update_password():
    body = request.get_json()
    old_password = body['old_password']
    new_password = body['new_password']
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()
    if user and check_password_hash(user.password, old_password):
        user.password = generate_password_hash(new_password)
        return jsonify("Password updated successfully")

if __name__ == "__main__":
    api.run()
    