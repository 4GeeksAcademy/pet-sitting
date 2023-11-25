from flask import Flask, request, jsonify, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from api.models import db, User, Pet
from api.utils import APIException

import datetime
import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from google.oauth2 import service_account

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

# Create the Blueprint

# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/calendar.events"]

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
        
    return jsonify(message="Login failed. Please check your credentials."), 401

@api.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()

    if user:
        return jsonify(user.serialize()), 200
    
    return jsonify(message="User not found"), 404

@api.route('/logout', methods=['DELETE'])
@jwt_required()
def logout():
    return jsonify(message="Logged out successfully"), 200

if __name__ == "__main__":
    api.run()

@api.route('/get-dog-walk', methods=['POST'])
@jwt_required()
def handle_get_dog_walk_sched():
    user_email = get_jwt_identity()
    req = request.get_json()
    minTime = req['minTime']
    maxTime = req['maxTime']
    try: 
        SCOPES = ['https://www.googleapis.com/auth/calendar']
        SERVICE_ACCOUNT_FILE = 'credentials.json'

        creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)
        calendar_id = "f73ae5b685428f5ee9f2e95b1b39fe17de1f5851e48ab7ddd2dd0ad3765c0f5d@group.calendar.google.com"

        service = build("calendar", "v3", credentials=creds)
        events_result = (
                service.events()
                .list(
                    calendarId=calendar_id,
                    timeMin=minTime,
                    timeMax=maxTime,
                    maxResults=10,
                    singleEvents=True,
                    orderBy="startTime",
                )
                .execute()
            )
        events = events_result.get("items", [])
        events = [{'start': event['start'],'end': event['end'],'summary': event['summary'].split(' ')[0:(len(event['summary'].split()) - 2)].join(' '), 'owned': True if user_email in event['summary'] else False} for event in events]
        return jsonify({'events': events, 'status': 'ok'}), 200
    except:
        return jsonify({'msg': 'Could not access the calendar'}), 404

@api.route('/get-meeting', methods=['POST'])
@jwt_required()
def handle_meeting_sched():
    user_email = get_jwt_identity()
    req = request.get_json()
    minTime = req['minTime']
    maxTime = req['maxTime']
    try: 
        SCOPES = ['https://www.googleapis.com/auth/calendar']
        SERVICE_ACCOUNT_FILE = 'credentials.json'

        creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)
        calendar_id = "f73ae5b685428f5ee9f2e95b1b39fe17de1f5851e48ab7ddd2dd0ad3765c0f5d@group.calendar.google.com"

        service = build("calendar", "v3", credentials=creds)
        events_result = (
                service.events()
                .list(
                    calendarId=calendar_id,
                    timeMin=minTime,
                    timeMax=maxTime,
                    maxResults=10,
                    singleEvents=True,
                    orderBy="startTime",
                )
                .execute()
            )
        events = events_result.get("items", [])
        events = [{'start': event['start'],'end': event['end'],'summary': event['summary'].split(' ')[0:(len(event['summary'].split()) - 2)].join(' '), 'owned': True if user_email in event['summary'] else False} for event in events]
        return jsonify({'events': events, 'status': 'ok'}), 200
    except:
        return jsonify({'msg': 'Could not access the calendar'}), 404

@api.route('/get-pet-check-in', methods=['POST'])
@jwt_required()
def handle_get_pet_check_in_sched():
    user_email = get_jwt_identity()
    req = request.get_json()
    minTime = req['minTime']
    maxTime = req['maxTime']
    try: 
        SCOPES = ['https://www.googleapis.com/auth/calendar']
        SERVICE_ACCOUNT_FILE = 'credentials.json'

        creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)
        calendar_id = "f73ae5b685428f5ee9f2e95b1b39fe17de1f5851e48ab7ddd2dd0ad3765c0f5d@group.calendar.google.com"

        service = build("calendar", "v3", credentials=creds)
        events_result = (
                service.events()
                .list(
                    calendarId=calendar_id,
                    timeMin=minTime,
                    timeMax=maxTime,
                    maxResults=10,
                    singleEvents=True,
                    orderBy="startTime",
                )
                .execute()
            )
        events = events_result.get("items", [])
        events = [{'start': event['start'],'end': event['end'],'summary': event['summary'].split(' ')[0:(len(event['summary'].split()) - 2)].join(' '), 'owned': True if user_email in event['summary'] else False} for event in events]
        return jsonify({'events': events, 'status': 'ok'}), 200
    except:
        return jsonify({'msg': 'Could not access the calendar'}), 404

@api.route('/get-pet-sitting', methods=['POST'])
@jwt_required()
def handle_get_pet_sitting_sched():
    user_email = get_jwt_identity()
    req = request.get_json()
    minTime = req['minTime']
    maxTime = req['maxTime']
    try: 
        SCOPES = ['https://www.googleapis.com/auth/calendar']
        SERVICE_ACCOUNT_FILE = 'credentials.json'

        creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)
        calendar_id = "564074f66734a91ee109c5d45a58ad814986316b76f2059642ac08bb37b7acb5@group.calendar.google.com"

        service = build("calendar", "v3", credentials=creds)
        events_result = (
                service.events()
                .list(
                    calendarId=calendar_id,
                    timeMin=minTime,
                    timeMax=maxTime,
                    maxResults=10,
                    singleEvents=True,
                    orderBy="startTime",
                )
                .execute()
            )
        events = events_result.get("items", [])
        events = [{'start': event['start'],'end': event['end'],'summary': event['summary'].split(' ')[0:(len(event['summary'].split()) - 2)].join(' '), 'owned': True if user_email in event['summary'] else False} for event in events]
        return jsonify({'events': events, 'status': 'ok'}), 200
    except:
        return jsonify({'msg': 'Could not access the calendar'}), 404

@api.route('/schedule-walk-or-check-in-or-meet-and-greet', methods=['POST'])
@jwt_required()
def handle_schedule_walk_or_check_in_or_meet_and_greet():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    user_address = user["address"]

    req = request.get_json()

    SCOPES = ['https://www.googleapis.com/auth/calendar']
    SERVICE_ACCOUNT_FILE = 'credentials.json'

    creds = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)

    calendar_id = "f73ae5b685428f5ee9f2e95b1b39fe17de1f5851e48ab7ddd2dd0ad3765c0f5d@group.calendar.google.com"


    try:
        service = build("calendar", "v3", credentials=creds)
        type_of_booking = req["type"]
        details = req["details"]
        pets = req["pets"]
        start_time = req["startTime"]
        end_time = req["endTime"]
        recurring = req["recurring"]
        recurring_count = req["recurring-count"]

        event = {
                'summary': type_of_booking + 'with' + pets + 'for' + email,
                'location': user_address,
                'description': details,
                'start': {
                    'dateTime': start_time,
                    'timeZone': 'America/Denver',
                },
                'end': {
                    'dateTime': end_time,
                    'timeZone': 'America/Denver',
                },
                'recurrence': [
                    'RRULE:FREQ=' + recurring + ';COUNT=' + recurring_count
                ],
            }

        event = service.events().insert(calendarId=calendar_id, body=event).execute()
        return(jsonify({"msg": "Booking created successfully.", "status": "ok"})), 200
    
    except HttpError as error:
        return(jsonify({"msg": "An error occurred: " + {error}})), 404


@api.route('/schedule-pet-sitting', methods=['POST'])
# @jwt_required()
def handle_schedule_pet_sitting():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    user_address = user["address"]

    req = request.get_json()

    SCOPES = ['https://www.googleapis.com/auth/calendar']
    SERVICE_ACCOUNT_FILE = 'credentials.json'

    creds = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)


    calendar_id = "564074f66734a91ee109c5d45a58ad814986316b76f2059642ac08bb37b7acb5@group.calendar.google.com"

    try:
        service = build("calendar", "v3", credentials=creds)
        type_of_booking = req["type"]
        details = req["details"]
        pets = req["pets"]
        start_time = req["startTime"]
        end_time = req["endTime"]
        recurring = req["recurring"]
        recurring_count = req["recurring-count"]

        event = {
                'summary': type_of_booking + 'with' + pets + 'for' + email,
                'location': user_address,
                'description': details,
                'start': {
                    'dateTime': start_time,
                    'timeZone': 'America/Denver',
                },
                'end': {
                    'dateTime': end_time,
                    'timeZone': 'America/Denver',
                },
                'recurrence': [
                    'RRULE:FREQ=' + recurring + ';COUNT=' + recurring_count
                ],
            }

        event = service.events().insert(calendarId=calendar_id, body=event).execute()
        return(jsonify({"msg": "Booking created successfully.", "status": "ok"})), 200
    
    except HttpError as error:
        return(jsonify({"msg": "An error occurred: " + {error}})), 404