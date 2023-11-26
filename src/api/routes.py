from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS  # Add this import
from werkzeug.security import generate_password_hash, check_password_hash
from api.models import db, User, Pet
from api.utils import APIException
from email.message import EmailMessage
import ssl
import smtplib
import logging
import random
import os

import datetime
import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from google.oauth2 import service_account

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

# Create the Blueprint

# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/calendar.events"]

api = Blueprint('api', __name__)

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
        events = events = [{'start': event['start'], 'end': event['end'], 'summary': ' '.join(event['summary'].split(' ')[0:(len(event['summary'].split(' ')) - 2)]), 'owned': True if user_email in event['summary'] else False} for event in events]
        return jsonify({'events': events, 'status': 'ok'}), 200
    except:
        return jsonify({'msg': 'Could not access the calendar'}), 404

@api.route('/get-meeting', methods=['POST'])
@jwt_required()
def handle_meeting_sched():
    user_email = get_jwt_identity()
    req = request.get_json()
    print(req)
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
        print(events)
        events = events = [{'start': event['start'], 'end': event['end'], 'summary': ' '.join(event['summary'].split(' ')[0:(len(event['summary'].split(' ')) - 2)]), 'owned': True if user_email in event['summary'] else False} for event in events]
        return jsonify({'events': events, 'status': 'ok'}), 200
    except:
        return jsonify({'msg': 'Could not access the calendar'}), 404


@api.route('/get-pet-check-in', methods=['POST'])
@jwt_required()
def handle_get_pet_check_in_sched():
    user_email = get_jwt_identity()
    req = request.get_json()
    print(req)
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
        events = events = [{'start': event['start'], 'end': event['end'], 'summary': ' '.join(event['summary'].split(' ')[0:(len(event['summary'].split(' ')) - 2)]), 'owned': True if user_email in event['summary'] else False} for event in events]
        return jsonify({'events': events, 'status': 'ok'}), 200
    except:
        return jsonify({'msg': 'Could not access the calendar'}), 404


@api.route('/get-pet-sitting', methods=['POST'])
@jwt_required()
def handle_get_pet_sitting_sched():
    user_email = get_jwt_identity()
    req = request.get_json()
    print(req)
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
        events = events = [{'start': event['start'], 'end': event['end'], 'summary': ' '.join(event['summary'].split(' ')[0:(len(event['summary'].split(' ')) - 2)]), 'owned': True if user_email in event['summary'] else False} for event in events]
        return jsonify({'events': events, 'status': 'ok'}), 200
    except:
        return jsonify({'msg': 'Could not access the calendar'}), 404

@api.route('/schedule-walk-or-check-in-or-meet-and-greet', methods=['POST'])
# @jwt_required()
def handle_schedule_walk_or_check_in_or_meet_and_greet():
    # current_user_id = get_jwt_identity()
    # user = User.query.get(current_user_id)
    # user_address = user["address"]

    req = request.get_json()

    SCOPES = ['https://www.googleapis.com/auth/calendar']
    SERVICE_ACCOUNT_FILE = 'credentials.json'

    creds = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)

    calendar_id = "f73ae5b685428f5ee9f2e95b1b39fe17de1f5851e48ab7ddd2dd0ad3765c0f5d@group.calendar.google.com"

    try:
        service = build("calendar", "v3", credentials=creds)

        # Call the Calendar API
        now = datetime.datetime.utcnow().isoformat() + "Z"  # 'Z' indicates UTC time
        print("Getting the upcoming 10 events")
        events_result = (
            service.events()
            .list(
                calendarId=calendar_id,
                timeMin=now,
                maxResults=10,
                singleEvents=True,
                orderBy="startTime",
            )
            .execute()
        )
        events = events_result.get("items", [])

        if not events:
            print("No upcoming events found.")
            pass

        # Prints the start and name of the next 10 events
        for event in events:
            start = event["start"].get("dateTime", event["start"].get("date"))
            print(start, event["summary"])

    except HttpError as error:
        print(f"An error occurred: {error}")


    wlk_or_check_or_mt_and_grt = req["type"]

    msg = wlk_or_check_or_mt_and_grt + "scheduled successfully."

    url = "https://calendar.google.com/calendar/ical/f73ae5b685428f5ee9f2e95b1b39fe17de1f5851e48ab7ddd2dd0ad3765c0f5d%40group.calendar.google.com/public/basic.ics"

    response_body = {
        "msg": msg,
        "status": "ok"
    }
    
    return jsonify(response_body), 200

@api.route('/schedule-pet-sitting', methods=['POST'])
# @jwt_required()
def handle_schedule_pet_sitting():

    # current_user_id = get_jwt_identity()
    # user = User.query.get(current_user_id)
    # user_address = user["address"]

    req = request.get_json()

    SCOPES = ['https://www.googleapis.com/auth/calendar']
    SERVICE_ACCOUNT_FILE = 'credentials.json'

    creds = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)

    calendar_id = "564074f66734a91ee109c5d45a58ad814986316b76f2059642ac08bb37b7acb5@group.calendar.google.com"

    try:
        service = build("calendar", "v3", credentials=creds)

        # Call the Calendar API
        now = datetime.datetime.utcnow().isoformat() + "Z"  # 'Z' indicates UTC time
        print("Getting the upcoming 10 events")
        events_result = (
            service.events()
            .list(
                calendarId=calendar_id,
                timeMin=now,
                maxResults=10,
                singleEvents=True,
                orderBy="startTime",
            )
            .execute()
        )
        events = events_result.get("items", [])

        if not events:
            print("No upcoming events found.")
            pass

        # Prints the start and name of the next 10 events
        for event in events:
            start = event["start"].get("dateTime", event["start"].get("date"))
            print(start, event["summary"])

    except HttpError as error:
        print(f"An error occurred: {error}")



    url = "https://calendar.google.com/calendar/ical/564074f66734a91ee109c5d45a58ad814986316b76f2059642ac08bb37b7acb5%40group.calendar.google.com/public/basic.ics"


    response_body = {
        "msg": "Pet sitting scheduled successfully.",
        "status": "ok"
    }

    return jsonify(response_body), 200

SCOPES = ['https://www.googleapis.com/auth/calendar']
SERVICE_ACCOUNT_FILE = 'credentials.json'

creds = service_account.Credentials.from_service_account_file(
SERVICE_ACCOUNT_FILE, scopes=SCOPES)

calendar_id = "564074f66734a91ee109c5d45a58ad814986316b76f2059642ac08bb37b7acb5@group.calendar.google.com"

try:
    service = build("calendar", "v3", credentials=creds)

    # Call the Calendar API
    now = datetime.datetime.utcnow().isoformat() + "Z"  # 'Z' indicates UTC time
    print("Getting the upcoming 10 events")
    events_result = (
        service.events()
        .list(
            calendarId=calendar_id,
            timeMin=now,
            maxResults=10,
            singleEvents=True,
            orderBy="startTime",
        )
        .execute()
    )
    events = events_result.get("items", [])

    if not events:
        print("No upcoming events found.")
        pass

    # Prints the start and name of the next 10 events
    for event in events:
        start = event["start"].get("dateTime", event["start"].get("date"))
        print(start, event["summary"])

except HttpError as error:
    print(f"An error occurred: {error}")



url = "https://calendar.google.com/calendar/ical/564074f66734a91ee109c5d45a58ad814986316b76f2059642ac08bb37b7acb5%40group.calendar.google.com/public/basic.ics"
