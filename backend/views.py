from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache
from django.http import HttpResponse,JsonResponse
import pymongo
from pymongo import MongoClient
from bson.json_util import dumps, loads
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import ensure_csrf_cookie
import json
import os

from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from functools import wraps
import jwt

# Serve Single Page Application
index = never_cache(TemplateView.as_view(template_name='index.html'))

cluster = MongoClient(os.environ.get("MONGODB_URL"))
db = cluster["Login"]
collection = db["Events"]
id = 0

# for demos
hard_coded_orgs = {
    "ACM" : {"ACM":
        [
            {"Id": 1,
            "Subject": "Hackathon",
            "Location": "UCR",
            "StartTime": "2020-12-14T04:00:00.000Z",
            "EndTime": "2020-12-14T05:30:00.000Z",
            "CategoryColor": "#1aaa55"},
            {"Id": 2,
            "Subject": "Professional Development",
            "Location": "UCR",
            "StartTime": "2020-12-23T06:30:00.000Z",
            "EndTime": "2020-12-23T08:30:00.000Z",
            "CategoryColor": "#357cd2"}
        ]
    },
    "PersianClub" : {"Persian Club":
        [
            {"Id": 3,
            "Subject": "Evening Meeting",
            "Location": "UCR",
            "StartTime": "2020-12-16T04:00:00.000Z",
            "EndTime": "2020-12-16T05:30:00.000Z",
            "CategoryColor": "#1aaa55"},

            {"Id": 4,
            "Subject": "Culture Night",
            "Location": "UCR",
            "StartTime": "2020-12-23T06:30:00.000Z",
            "EndTime": "2020-12-23T08:30:00.000Z",
            "CategoryColor": "#357cd2"}
        ]
    },
    "ChessClub" : {"Chess Club":
        [
            {"Id": 5,
            "Subject": "General Meeting",
            "Location": "UCR",
            "StartTime": "2020-12-07T02:00:00.000Z",
            "EndTime": "2020-12-07T03:30:00.000Z",
            "CategoryColor": "#1aaa55"},

            {"Id": 6,
            "Subject": "Tournament",
            "Location": "UCR",
            "StartTime": "2020-12-18T05:30:00.000Z",
            "EndTime": "2020-12-18T09:30:00.000Z",
            "CategoryColor": "#357cd2"}
        ]
    }
}


def get_token_auth_header(request):
    """Obtains the access token from the Authorization Header
    """
    auth = request.META.get("HTTP_AUTHORIZATION", None)
    parts = auth.split()
    token = parts[1]

    return token


def requires_scope(required_scope):
    """Determines if the required scope is present in the access token
    Args:
        required_scope (str): The scope required to access the resource
    """
    def require_scope(f):
        print('in required scope')
        @wraps(f)
        def decorated(*args, **kwargs):
            token = get_token_auth_header(args[0])
            decoded = jwt.decode(token, verify=False)
            if decoded.get("scope"):
                token_scopes = decoded["scope"].split()
                for token_scope in token_scopes:
                    if token_scope == required_scope:
                        return f(*args, **kwargs)
            response = JsonResponse({'message': 'You don\'t have access to this resource'})
            response.status_code = 403
            return response
        return decorated
    return require_scope
    
@permission_classes([AllowAny])
def public(request):
    print('in public')
    return JsonResponse({'message': 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'})

@api_view(['GET'])
def private(request):
    print('in private')
    return JsonResponse({'message': 'Hello from a private endpoint! You need to be authenticated to see this.'})

# Need GET calendar info, add calendar info (POST), update calendar info (PUT), delete calendarItem (DELETE)
# Here is one example of a get request. Similarly try to get the other methods and update urls.py
#"organizations" : [{"ACM" : "hello"}]

@csrf_exempt
@api_view(['POST'])
def getCalendarInfo(request):
    userName = request.user.username 
    responseData = {
        "username" : userName,
        "organizations": []
    }
    if(collection.find({"username": userName}).count() > 0): #if the document/user exists
        print('user exists')
        responseData  = collection.find_one({"username": userName}) #Obtain Json Data of User
    else:
        responseData["username"] = userName
        print("not found")
        collection.insert_one(responseData) #Otherwise insert the template (empty) data into database
    del responseData["_id"]
    return JsonResponse(responseData)

@api_view(['POST'])
@csrf_exempt
def addOrganization(request):
    userName = request.user.username 
    for organization in (list(request.POST.get("organizations").split(", "))):
        collection.update({"username": userName},
        {"$push": {"organizations": hard_coded_orgs[organization]}})
    responseData  = collection.find_one({"username": userName}) #Obtain Json Data of User
    del responseData["_id"]
    return JsonResponse(responseData)
