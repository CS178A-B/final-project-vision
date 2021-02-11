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
from bson.objectid import ObjectId

from functools import wraps
import jwt

# Serve Single Page Application
index = never_cache(TemplateView.as_view(template_name='index.html'))

cluster = MongoClient(os.environ.get("MONGODB_URL"))
db = cluster["Information"]
organization_info_collection = db["organization_info"]
user_info_collection = db["user_info"]
id = 0

# for demos
hard_coded_orgs = {
    "ACM" : {
            "Delegators" : [],
            "Members" : [],
            "org_events" : [
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
    "PersianClub" : {
        "Delegators" : [],
        "Members" : [],
        "org_events" : [
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
    "ChessClub" : {
        "Delegators" : [],
        "Members" : [],
        "org_events" : [
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
    "TeamRocket" : {
        "Delegators" : [],
        "Members" : [],
        "org_events" : [
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
    "BowlingClub" : {
        "Delegators" : [],
        "Members" : [],
        "org_events" : [
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


@csrf_exempt
@api_view(['GET'])
def getCalendarInfo(request): #no need to pass in anything, just need the oauth token
    responseData = {
        "username" : "",
        "organizations": {}
    }
    username = request.user.username
    #username = request.POST.get("username")
    if(request.method == 'GET'): #If get response has data / if user used api/getCalendarInfo without token
        if(user_info_collection.find({"username": username}).count() > 0): #if the document/user exists
            responseData  = user_info_collection.find_one({"username": username}) #Obtain Json Data of User
            return JsonResponse(responseData["organizations"])
        else:
            responseData["username"] = username
            user_info_collection.insert_one(responseData) #Otherwise insert the template (empty) data into database
            return JsonResponse({})
    else: #return empty Json if user logged onto url without authentication
        return JsonResponse({})

@csrf_exempt
@api_view(['POST'])
def addOrganization(request): #pass in {organizations_ids: ["60199071ecaace8314a7c1fd"]}
    if(request.POST):
        username = request.user.username
        #username = request.POST.get("username")
        returnData = user_info_collection.find_one({"username": username})
        user_organizations = returnData["organizations"]
        for organization_id in (list(request.POST.get("organizations_ids").split(", "))):  #add clubs without space "PersianClub"!!!!!!!
            if(organization_id in user_organizations): #if user is already in organization, don't add it
                pass
            else: #otherwise add it
                org_name = list(organization_info_collection.find_one({'_id': ObjectId(str(organization_id))})) [1]
                user_organizations.update({organization_id : organization_info_collection.find_one({'_id': ObjectId(str(organization_id))}) [org_name]["org_events"]})
                organization_info_collection.update({"_id":  ObjectId(str(organization_id))},
                {"$push": {org_name + ".Members": username}})

        user_info_collection.update({"username": username},
        {"$set": {"organizations": user_organizations}})


        responseData  = user_info_collection.find_one({"username": username}) #Obtain Json Data of User
        del responseData["_id"]
        return JsonResponse(responseData)
    else:
        return JsonResponse({})


@csrf_exempt
@api_view(['POST'])
def deleteEvent(request):#pass in {organization_id: 1288fadf213, id: 5}
    if(request.POST):
        username = request.user.username
        #username = request.POST.get("username")
        user_organizations = user_info_collection.find_one({"username": username })["organizations"]
        id = int(request.POST.get("id"))
        organization_id = request.POST.get("organization_id")
        user_organizations_events = user_organizations[organization_id]
        for index in range(len(user_organizations_events)): #iterate over events to find proper id to delete
            if((user_organizations_events[index])["Id"] == id):
                del user_organizations_events[index]
                break

        user_organizations[organization_id] = user_organizations_events #set that hash key value to newly modified/deleted events
        user_info_collection.update({"username": username}, #update organizations
        {"$set": {"organizations": user_organizations}})
        responseData  = user_info_collection.find_one({"username": username}) #Obtain Json Data of User
        del responseData["_id"]
        return JsonResponse(responseData)
    return JsonResponse({})



@csrf_exempt
@api_view(['POST'])
def deleteOrganization(request): #pass in {organization_id: 1adf320jfo1ebc9}
    if(request.POST):
        username = request.user.username
        #username = request.POST.get("username")
        username = request.POST.get("username")
        user_organizations = user_info_collection.find_one({"username": username})["organizations"]
        organization_id = request.POST.get("organization_id")

        del user_organizations[organization_id] #delete organization user passes in
        user_info_collection.update({"username": username}, #update organizations
        {"$set": {"organizations": user_organizations}})

        org_name = list(organization_info_collection.find_one({'_id': ObjectId(str(organization_id))})) [1]

        organization_info_collection.update({"_id":  ObjectId(str(organization_id))},
        {"$pull": {org_name + ".Members": username}})

        responseData  = user_info_collection.find_one({"username": username}) #Obtain Json Data of User
        del responseData["_id"]
        return JsonResponse(responseData)
    return JsonResponse({})

@csrf_exempt
@api_view(['POST'])
def createOrganization(request): #pass in {organization : Vish's CS Club}
    if(request.POST):
        username = request.user.username
        #username = request.POST.get("username")
        input_data = {
            "Delegators" : [username],
            "Members" : [],
            "org_events" : []
        }
        #username = request.user.username
        organization = request.POST.get("organization")
        id = organization_info_collection.insert({organization : input_data})

        user_organizations  = user_info_collection.find_one({"username": username})["organizations"]
        user_organizations.update({str(id) : []})
        user_info_collection.update({"username": username},
        {"$set": {"organizations": user_organizations}})

        responseData = user_info_collection.find_one({"username": username})
        del responseData["_id"]
        return JsonResponse(responseData)
    return JsonResponse({"NULL"})

@csrf_exempt
@api_view(['POST'])
def createEvent(request): #pass in {organization_id : 132423adf, id: 1, Subject : Meeting, Locaiton : UCR, StartTime: Morning, EndTime: Night, CategoryColor: "342"}
    if(request.POST):
        username = request.user.username
        #username = request.POST.get("username")
        organization_id = request.POST.get("organization_id")
        Id = int(request.POST.get("Id"))
        Subject = request.POST.get("Subject")
        Location = request.POST.get("Location")
        StartTime = request.POST.get("StartTime")
        EndTime = request.POST.get("EndTime")
        CategoryColor = request.POST.get("CategoryColor")

        input_data = {
        "Id": Id,
        "Subject": Subject,
        "Location": Location,
        "StartTime": StartTime,
        "EndTime": EndTime,
        "CategoryColor": CategoryColor}



        org_name = list(organization_info_collection.find_one({'_id': ObjectId(str(organization_id))})) [1] #get name of Club, ACM etc

        if(username in organization_info_collection.find_one({'_id': ObjectId(str(organization_id))})[org_name]["Delegators"]): #check if user id is in delegators and can create events
            organization_info_collection.update({"_id":  ObjectId(str(organization_id))},
            {"$push": {org_name + ".org_events": input_data}})


            for delegator in organization_info_collection.find_one({'_id': ObjectId(str(organization_id))})[org_name]["Delegators"]:

                user_info_collection.update({"username": delegator},
                {"$push": {"organizations." + str(organization_id) : input_data}})

            for member in organization_info_collection.find_one({'_id': ObjectId(str(organization_id))})[org_name]["Members"]:

                user_info_collection.update({"username": member},
                {"$push": {"organizations." + str(organization_id) : input_data}})


            responseData = user_info_collection.find_one({"username": username})
            del responseData["_id"]
            return JsonResponse(responseData)
        else:
            return JsonResponse({"RETURN" : "NULL"})
    return JsonResponse({"RETURN" : "NULL"})



@csrf_exempt
@api_view(['GET'])
def getListOfOrganizations(request): #don't need to pass anything
    return_dict = {}
    for org in organization_info_collection.find({}):
        org_name = list(org)[1]
        return_dict[str(org["_id"])] = org_name

    return JsonResponse(return_dict)
