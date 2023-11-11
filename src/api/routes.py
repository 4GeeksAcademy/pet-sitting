"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import datetime
import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from google.oauth2 import service_account
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS


# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/calendar.events"]

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/schedule-walk', methods=['POST'])
@jwt_required()
def handle_schedule_walk_or_check_in():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    user_address = user["address"]

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


    walk_or_check_in = req["type"]

    msg = walk_or_check_in + "scheduled successfully."

    url = "https://calendar.google.com/calendar/ical/f73ae5b685428f5ee9f2e95b1b39fe17de1f5851e48ab7ddd2dd0ad3765c0f5d%40group.calendar.google.com/public/basic.ics"

    response_body = {
        "msg": msg,
        "status": "ok"
    }
    
    return jsonify(response_body), 200

@api.route('/schedule-pet-sitting', methods=['POST'])
@jwt_required()
def handle_schedule_pet_sitting():

    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    user_address = user["address"]

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

@api.route('/schedule-meet-and-greet', methods=['POST'])
@jwt_required()
def handle_schedule_pet_sitting():

    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    user_address = user["address"]

    req = request.get_json()

    SCOPES = ['https://www.googleapis.com/auth/calendar']
    SERVICE_ACCOUNT_FILE = 'credentials.json'

    creds = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)

    calendar_id = "3bf9db1f1eec427536bcea09c6095d5cadf05f182daee1b7dba63b47aed66344@group.calendar.google.com"

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