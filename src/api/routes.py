from flask import Flask, request, jsonify, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS  # Add this import
from werkzeug.security import generate_password_hash, check_password_hash
from api.models import db, User,Pet
from api.utils import APIException

from email.message import EmailMessage
import ssl
import smtplib
import logging
import random
import os

# Create the Blueprint
api = Blueprint('api', __name__)
CORS(api)  

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
@api.route('/account', methods=['PUT'])
@jwt_required()
def update_account():
    try:
        current_user_email = get_jwt_identity()
        print("Current User Email:", current_user_email)
        user = User.query.filter_by(email=current_user_email).first()

        if not user:
            raise APIException("User not found", status_code=404)

        body = request.get_json()
        
        user.email = body["userFormData"].get("email")
        user.first_name = body["userFormData"].get("first_name")
        user.last_name = body["userFormData"].get("last_name")
        user.address = body["userFormData"].get("address")
        user.city = body["userFormData"].get("city")
        user.state = body["userFormData"].get("state")
        user.zip = body["userFormData"].get("zip")
        user.phone_number = body["userFormData"].get("phone_number")
        db.session.commit()
    

        if "petFormData" in body and body["petFormData"] is not None:


            for pet_data in body["petFormData"]:
                pet = Pet(
                    name=pet_data.get("pet_Name"),
                    breed=pet_data.get("breed"),
                    age=pet_data.get("age"),
                    description=pet_data.get("description"),
                    detailed_care_info=pet_data.get("detailed_Care_Info"),
                    user=user
                )
                db.session.add(pet)
                db.session.commit()

        return jsonify(user.serialize()), 200

    except Exception as e:
        print("Exception:", e)
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

@api.route('/forgotten-password', methods=["PUT"])
def send_code ():
    body = request.get_json();
    email = body["email"]
    if email is None:
        return jsonify("No email was provided"),400
    user = User.query.filter_by(email=email).first()
    print(user)
    if user is None:
        return jsonify({"message":"User doesn't exist"}), 404
    else :
        new_password = generatePassword()
        new_hashed_password = generate_password_hash(new_password)
        user.password = new_hashed_password 
        db.session.commit()
        email_sender = 'petsitting417@gmail.com'
        email_password = "ilhjwhdyxlxpmdfw"
        email_receiver = email
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
    



# @api.route('/signup', methods=['POST'])
# def signup():
#     body = request.get_json()
#     print(body)
#     if (
#         "email" not in body.keys()
#         or "password" not in body.keys()
#         or "first_name" not in body.keys()
#         or "last_name" not in body.keys()
     
#     ):
#         raise APIException("Please provide all required fields", status_code=400)
  

#     email = body['email']
#     password = body['password']
#     first_name = body['first_name']
#     last_name = body['last_name']
    
    


#     existing_user = User.query.filter_by(email=email).first()
#     if existing_user:
#         return jsonify(message="User already exists"), 400

#     hashed_password = generate_password_hash(password)
#     new_user = User(
#         first_name =first_name,
#         last_name =last_name,
#         email=email,
#         password=hashed_password,
    
#     )
#     db.session.add(new_user)


#     db.session.commit()
#     return jsonify(message="Successfully created user and pet"), 200

# @api.route('/account', methods=['PUT'])
# @jwt_required()
# def update_account():
#     try:
#         current_user_email = get_jwt_identity()
#         user = User.query.filter_by(email=current_user_email).first()

#         if not user:
#             raise APIException("User not found", status_code=404)

#         body = request.get_json()

#         user.email = body.get("email", user.email)
#         user.first_name = body.get("first_name", user.first_name)
#         user.last_name = body.get("last_name", user.last_name)
#         user.address = body.get("address", user.address)
#         user.city = body.get("city", user.city)
#         user.state = body.get("state", user.state)
#         user.zip = body.get("zip", user.zip)
#         user.phone_number = body.get("phone_number", user.phone_number)

#         if "pets" in body and isinstance(body["pets"], list):
#             user.pets = [] 
#             for pet_data in body["pets"]:
#                 pet = pet(
#                     name=pet_data.get("pet_Name"),
#                     breed=pet_data.get("breed"),
#                     age=pet_data.get("age"),
#                     description=pet_data.get("description"),
#                     detailed_care_info=pet_data.get("detailed_Care_Info"),
#                     user=user
#                 )
               
#                 user.pets.append(pet)

#         db.session.commit()

#         return jsonify(user.serialize()), 200

#     except Exception as e:
#         return jsonify(message=str(e)), 500






# @api.route('/login', methods=['POST'])
# def login():
#     body = request.get_json()
#     if "email" not in body or "password" not in body:
#         raise APIException("Please provide both email and password", status_code=400)

#     email = body['email']
#     password = body['password']
    

#     user = User.query.filter_by(email=email).first()

#     if user and check_password_hash(user.password, password):
#         access_token = create_access_token(identity=user.email)
#         return jsonify(access_token=access_token), 200
#     else:
#         return jsonify(message="Login failed. Please check your credentials."), 401


# @api.route('/user', methods=['GET'])
# @jwt_required()
# def get_user():
#     current_user = get_jwt_identity()
#     user = User.query.filter_by(email=current_user).first()

#     if user:
#         return jsonify(user.serialize()), 200
#     else:
#         return jsonify(message="User not found"), 404


# @api.route('/logout', methods=['DELETE'])
# @jwt_required()
# def logout():
#     return jsonify(message="Logged out successfully"), 200

# @api.route('/forgotten-password', methods=['POST'])
# def send_code ():
#     body = request.get_json();
#     email = body["email"]

#     if email is None:
#         return "No email was provided",400
#     user = User.query.filter_by(email=email).first()
#     if user is None:
#         return "User doesn't exist", 404
#     else :
#         new_password = generatePassword()
#         new_hashed_password = generate_password_hash(new_password)
#         user.password = new_hashed_password 
#         db.session.commit()
#         email_sender = 'petsitting417@gmail.com'
#         email_password = "ilhjwhdyxlxpmdfw"
#         email_receiver = email
#         email_subject = "Reset your password"
#         email_body = "We have sent you this temporary password so that you can recover your account. Smile with us Hot Doggity Dog Walkers! New Password: "+new_password

#         em = EmailMessage()
#         em['from'] = email_sender
#         em['to'] = email_receiver
#         em['subject'] = email_subject
#         em.set_content(email_body)

#         context = ssl.create_default_context
#         with smtplib.SMTP_SSL('smtp.gmail.com',465) as smtp:
#             smtp.login(email_sender, email_password)
#             smtp.sendmail(email_sender, email_receiver, em.as_string())
#         return "Ok",200


# def generatePassword():
#     pass_len = 12
#     characters = "abcdefghilklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789!@#$%^&*+=?"
#     password = ""
#     for index in range (pass_len):
#         password = password+random.choice(characters)
#     return password

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
    

 
# if __name__ == "__main__":
#     api.run()
    