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



from flask import Flask, request, jsonify, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from api.models import db, User, Pet
from api.utils import APIException
import os

# Create the Blueprint
api = Blueprint('api', __name__)

@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    if (
        "email" not in body
        or "password" not in body
        # or "name" not in body
        # or "phone_number" not in body
        # or "address" not in body
        # or "comments" not in body
        # or "pet_name" not in body
        # or "pet_breed" not in body
        # or "pet_age" not in body
    ):
        raise APIException("Please provide all required fields", status_code=400)

    email = body['email']
    password = body['password']
    # name = body['name']
    # phone_number = body['phone_number']
    # address = body['address']
    

    # pet_name = body['pet_name']
    # pet_breed = body['pet_breed']
    # pet_age = body['pet_age']
    # comments = body['comments']

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify(message="User already exists"), 400

    hashed_password = generate_password_hash(password)
    new_user = User(
        email=email,
        password=hashed_password,
        # name=name,
        # phone_number=phone_number,
        # address=address,
        # comments=comments,
    )
    db.session.add(new_user)

    # this will save the pet information
    # new_pet = Pet(name=pet_name, breed=pet_breed, age=pet_age, user=new_user)
    # db.session.add(new_pet)

    db.session.commit()
    return jsonify(message="Successfully created user and pet"), 200

@api.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        current_user_email = get_jwt_identity()
        user = User.query.filter_by(email=current_user_email).first()

        if not user:
            raise APIException("User not found", status_code=404)

        profile_data = {
            "email": user.email,
            "firstName": user.first_name,
            "lastName": user.last_name,
            "address": user.address,
            "phoneNumber": user.phone_number,
            "pets": [],  
        }

        if user.pets:
            for pet in user.pets:
                profile_data["pets"].append({
                    "petName": pet.name,
                    "breed": pet.breed,
                    "age": pet.age,
                    "description": pet.description,
                    "detailedCareInfo": pet.detailed_care_info,
                })

        return jsonify(profile_data), 200

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
    