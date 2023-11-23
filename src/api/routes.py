from flask import Flask, request, jsonify, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from api.models import db, User
from api.utils import APIException


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
        or "name" not in body
        or "phone_number" not in body
        or "address" not in body
        or "comments" not in body
        or "pet_name" not in body
        or "pet_breed" not in body
        or "pet_age" not in body
    ):
        raise APIException("Please provide all required fields", status_code=400)

    email = body['email']
    password = body['password']
    name = body['name']
    phone_number = body['phone_number']
    address = body['address']
    

    pet_name = body['pet_name']
    pet_breed = body['pet_breed']
    pet_age = body['pet_age']
    comments = body['comments']

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify(message="User already exists"), 400

    hashed_password = generate_password_hash(password)
    new_user = User(
        email=email,
        password=hashed_password,
        name=name,
        phone_number=phone_number,
        address=address,
        comments=comments,
    )
    db.session.add(new_user)

    # this will save the pet information
    new_pet = Pet(name=pet_name, breed=pet_breed, age=pet_age, user=new_user)
    db.session.add(new_pet)

    db.session.commit()
    return jsonify(message="Successfully created user and pet"), 200



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

if __name__ == "__main__":
    api.run()
