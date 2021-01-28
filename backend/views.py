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
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from django.http import QueryDict
from rest_framework.authentication import TokenAuthentication

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
            "StartTime": "2021-01-28T04:00:00.000Z",
            "EndTime": "2021-01-30T05:30:00.000Z",
            "CategoryColor": "#1aaa55"},
            {"Id": 2,
            "Subject": "Professional Development",
            "Location": "UCR",
            "StartTime": "2021-01-25T06:30:00.000Z",
            "EndTime": "2021-01-25T08:30:00.000Z",
            "CategoryColor": "#357cd2"}
        ]
    },
    "PersianClub" : {"Persian Club":
        [
            {"Id": 3,
            "Subject": "Evening Meeting",
            "Location": "UCR",
            "StartTime": "2021-01-20T04:00:00.000Z",
            "EndTime": "2021-01-20T05:30:00.000Z",
            "Color": "#1aaa55"},

            {"Id": 4,
            "Subject": "Culture Night",
            "Location": "UCR",
            "StartTime": "2021-01-30T06:30:00.000Z",
            "EndTime": "2021-01-30T08:30:00.000Z",
            "Color": "#357cd2"}
        ]
    },
    "ChessClub" : {"Chess Club":
        [
            {"Id": 5,
            "Subject": "General Meeting",
            "Location": "UCR",
            "StartTime": "2021-01-08T02:00:00.000Z",
            "EndTime": "2021-01-08T03:30:00.000Z",
            "Color": "#1aaa55"},

            {"Id": 6,
            "Subject": "Tournament",
            "Location": "UCR",
            "StartTime": "2021-01-24T05:30:00.000Z",
            "EndTime": "2021-01-24T09:30:00.000Z",
            "Color": "#357cd2"}
        ]
    },
    "TeamRocket" : {"Team Rocket":
        [
            {"Id": 7,
            "Subject": "Blasting Off",
            "Location": "Pokemon",
            "StartTime": "2021-01-08T02:00:00.000Z",
            "EndTime": "2021-01-08T03:30:00.000Z",
            "CategoryColor": "#1aaa55"},

            {"Id": 8,
            "Subject": "Causing Mayhem",
            "Location": "Rocket Island",
            "StartTime": "2021-01-19T05:30:00.000Z",
            "EndTime": "2021-01-19T09:30:00.000Z",
            "CategoryColor": "#357cd2"}
        ]
    },
    "BowlingClub" : {"Bowling Club":
        [
            {"Id": 9,
            "Subject": "Strike Saturday's",
            "Location": "Bowling Alley",
            "StartTime": "2021-01-30T12:00:00.000Z",
            "EndTime": "2021-01-30T03:30:00.000Z",
            "CategoryColor": "#1aaa55"},

            {"Id": 10,
            "Subject": "Learning the Basics II",
            "Location": "UCR Campus",
            "StartTime": "2021-02-01T05:30:00.000Z",
            "EndTime": "2021-02-01T09:30:00.000Z",
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

@api_view(['GET'])
@csrf_exempt
def getCalendarInfo(request): #no need to pass in anything, just need the oauth token
    responseData = {
        "username" : "",
        "organizations": {}
    }
    username = request.user.username
    if(request.method == 'GET'): #If get response has data / if user used api/getCalendarInfo without token
        if(collection.find({"username": username}).count() > 0): #if the document/user exists
            responseData  = collection.find_one({"username": username}) #Obtain Json Data of User
            return JsonResponse(responseData["organizations"])
        else:
            responseData["username"] = username
            collection.insert_one(responseData) #Otherwise insert the template (empty) data into database
            return JsonResponse({})
    else: #return empty Json if user logged onto url without authentication
        return JsonResponse({})

@csrf_exempt
@api_view(['POST'])
def addOrganization(request): #pass in {organizations: persianclub} #NOTICE: ORGANIZATIONS not ORGANIZATION!!!!!
    if(request.POST):
        username = request.user.username
        returnData = collection.find_one({"username": username})
        user_organizations = returnData["organizations"]
        for organization in (list(request.POST.get("organizations").split(", "))):  #add clubs without space "PersianClub"!!!!!!!
            if(organization in user_organizations): #if user is already in organization, don't add it
                pass
            else: #otherwise add it
                user_organizations.update(hard_coded_orgs[organization])
        collection.update({"username": username},
        {"$set": {"organizations": user_organizations}})

        responseData  = collection.find_one({"username": username}) #Obtain Json Data of User
        del responseData["_id"]
        return JsonResponse(responseData)
    else:
        return JsonResponse({})


@csrf_exempt
@api_view(['POST'])
def deleteEvent(request):#pass in {organization: persian club, id: 5}
    if(request.POST):
        username = request.user.username
        user_organizations = collection.find_one({"username": username })["organizations"]
        id = int(request.POST.get("id"))
        organization = request.POST.get("organization")
        user_organizations_events = user_organizations[organization]

        for index in range(len(user_organizations_events)): #iterate over events to find proper id to delete
            if((user_organizations_events[index])["Id"] == id):
                del user_organizations_events[index]
                break

        user_organizations[organization] = user_organizations_events #set that hash key value to newly modified/deleted events
        collection.update({"username": username}, #update organizations
        {"$set": {"organizations": user_organizations}})
        responseData  = collection.find_one({"username": username}) #Obtain Json Data of User
        del responseData["_id"]
        return JsonResponse(responseData)
    return JsonResponse({})



@csrf_exempt
@api_view(['POST'])
def deleteOrganization(request): #pass in {organization: persian club}
    if(request.POST):
        username = request.user.username
        user_organizations = collection.find_one({"username": username})["organizations"]
        organization = request.POST.get("organization")
        del user_organizations[organization] #delete organization user passes in
        collection.update({"username": username}, #update organizations
        {"$set": {"organizations": user_organizations}})
        responseData  = collection.find_one({"username": username}) #Obtain Json Data of User
        del responseData["_id"]
        return JsonResponse(responseData)
    return JsonResponse({})



@csrf_exempt
@api_view(['GET'])
def getListOfOrganizations(request):
    return JsonResponse({'publicClubList': ["ACM", "Persian Club", "Chess Club", "Team Rocket", "Bowling Club"]})
