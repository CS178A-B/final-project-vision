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
user_hash_collection = db["user_hash"]
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
def getCalendarInfo(request): #pass in {request.user.username: google-auth-api-123dasf, name: Viraj Dhllon}
    responseData = {
        "name" : "",
        "username" : "",
        "delegator_list" : [],
        "organizations": {}
    }
    if(request.method == 'GET'): #If get response has data / if user used api/getCalendarInfo without token
        username = request.user.username
        #username = request.GET.get("username")
        name = request.GET.get("name")

        if(user_info_collection.find({"username": username}).count() > 0): #if the document/user exists
            responseData  = user_info_collection.find_one({"username": username}) #Obtain Json Data of User
            del responseData["_id"]
            return JsonResponse(responseData)
        else:
            responseData["name"] = name
            responseData["username"] = username
            user_info_collection.insert_one(responseData) #Otherwise insert the template (empty) data into database
            return JsonResponse({"Successful" : "Created User"})
    else: #return empty Json if user logged onto url without authentication
        return JsonResponse({"NULL" : "NULL"})

@csrf_exempt
@api_view(['POST'])
def addOrganization(request): #pass in {organization_id: "60199071ecaace8314a7c1fd", password : "adfaew"} can only add one club at a time due to password
    if(request.POST):
        username = request.user.username
        #username = request.POST.get("username")
        organization_id = request.POST.get("organization_id")
        password = request.POST.get("password")
        returnData = user_info_collection.find_one({"username": username})
        user_organizations = returnData["organizations"]
        org_name = list(organization_info_collection.find_one({'_id': ObjectId(str(organization_id))})) [1]
        blocked_member_list = organization_info_collection.find_one({'_id': ObjectId(str(organization_id))})[org_name]["Blocked Members"]


        if(username in blocked_member_list):
            return JsonResponse({"Error" : "User is blocked from joining organization"})

        if(organization_id in user_organizations): #if user is already in organization, don't add it
            return JsonResponse({"Error" : "Organization is already added to user"})
        else: #otherwise add it
            if(organization_info_collection.find_one({'_id': ObjectId(str(organization_id))})[org_name]["Public"] or organization_info_collection.find_one({'_id': ObjectId(str(organization_id))})[org_name]["Password"] == password):

                user_organizations.update({organization_id : {"org_name" : org_name, "org_description" :  organization_info_collection.find_one({'_id': ObjectId(str(organization_id))}) [org_name]["Organization Description"],
                "org_events" : organization_info_collection.find_one({'_id': ObjectId(str(organization_id))}) [org_name]["org_events"]}})

                organization_info_collection.update({"_id":  ObjectId(str(organization_id))},
                {"$push": {org_name + ".Members": username}})
            else:
                return JsonResponse({"Error" : "Organization is not public or password is incorrect"})

        user_info_collection.update({"username": username},
        {"$set": {"organizations": user_organizations}})


        responseData  = user_info_collection.find_one({"username": username}) #Obtain Json Data of User
        del responseData["_id"]
        return JsonResponse(responseData)
    else:
        return JsonResponse({"NULL" : "NULL"})


@csrf_exempt
@api_view(['POST'])
def deleteEvent(request):#pass in {organization_id: 1288fadf213, id: 5}
    if(request.POST):
        username = request.user.username
        #username = request.POST.get("username")
        id = int(request.POST.get("id"))
        organization_id = request.POST.get("organization_id")

        org_name = list(organization_info_collection.find_one({'_id': ObjectId(str(organization_id))})) [1] #get name of Club, ACM etc
        delegator_list = organization_info_collection.find_one({'_id': ObjectId(str(organization_id))})[org_name]["Delegators"]
        member_list = organization_info_collection.find_one({'_id': ObjectId(str(organization_id))})[org_name]["Members"]
        org_event_list = organization_info_collection.find_one({'_id': ObjectId(str(organization_id))})[org_name]["org_events"]
        if(username in delegator_list): #check if user id is in delegators and can create events
            for index in range(len(org_event_list)):
                if(org_event_list[index] == org_name):
                    pass
                elif (org_event_list[index]["Id"] == id):
                    del org_event_list[index]
                    break
        else:
            return JsonResponse({"Error": "User is not allowed to delete events"})


        organization_info_collection.update({"_id":  ObjectId(str(organization_id))},
        {"$set": {org_name + ".org_events": org_event_list}})

        for delegator in delegator_list:
            user_info_collection.update({"username": delegator},
            {"$set": {"organizations." + str(organization_id) + ".org_events": org_event_list}})

        for member in member_list:
            user_info_collection.update({"username": member},
            {"$set": {"organizations." + str(organization_id) + ".org_events" : org_event_list}})

        return JsonResponse({"Successful" : "Event is deleted from all calendars in organization"})
    return JsonResponse({"NULL" : "NULL"})



@csrf_exempt
@api_view(['POST'])
def deleteOrganization(request): #pass in {organization_id: 1adf320jfo1ebc9}
    if(request.POST):
        username = request.user.username
        #username = request.POST.get("username")
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
        return JsonResponse({"Successful" : "Deleted organization for the user"})
    return JsonResponse({"NULL" : "NULL"})

@csrf_exempt
@api_view(['POST'])
def createOrganization(request): #pass in {organization : Vish's CS Club, org_description : "This club is about etc...", public_true_false : True/False, password: 23423acd/""}
    if(request.POST):
        username = request.user.username
        #username = request.POST.get("username")
        organization = request.POST.get("organization")
        org_description = request.POST.get("org_description")
        public_true_false = request.POST.get("public_true_false")
        password = request.POST.get("password")

        input_data = {
            "Organization Description" : org_description,
            "Public" : True,
            "Password" : password,
            "Delegators" : [username],
            "Members" : [],
            "Blocked Members" : [],
            "Organization Name" : organization,
            "org_events" : []
        }

        id = organization_info_collection.insert({organization : input_data})
        user_organizations  = user_info_collection.find_one({"username": username})["organizations"]
        user_organizations.update({str(id) : {"org_name" : organization, "org_description" : org_description, "org_events" : []}})
        user_info_collection.update({"username": username},
        {"$set": {"organizations": user_organizations}})

        user_info_collection.update({"username": username},
        {"$push": {"delegator_list": str(id)}})

        return JsonResponse({"newOrgHash" : str(id)})
    return JsonResponse({"NULL" : "NULL"})

@csrf_exempt
@api_view(['POST'])
def createEvent(request): #pass in {organization_id : 132423adf, id: 1, Subject : Meeting, Location : UCR, StartTime: Morning, EndTime: Night, CategoryColor: "342"}
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
                {"$push": {"organizations." + str(organization_id) + ".org_events" : input_data}})

            for member in organization_info_collection.find_one({'_id': ObjectId(str(organization_id))})[org_name]["Members"]:

                user_info_collection.update({"username": member},
                {"$push": {"organizations." + str(organization_id)  + ".org_events": input_data}})


            responseData = user_info_collection.find_one({"username": username})
            del responseData["_id"]
            return JsonResponse(responseData)
        else:
            return JsonResponse({"RETURN" : "NULL"})
    return JsonResponse({"RETURN" : "NULL"})


@csrf_exempt
@api_view(['POST'])
def blockUsers(request): #pass in {organization_id : 123adf, usernames: google-auth-api-1, google-auth-api-2, etc...}
    if(request.POST):
        username = request.user.username
        #username = request.POST.get("username")
        organization_id = request.POST.get("organization_id")
        org_name = list(organization_info_collection.find_one({'_id': ObjectId(str(organization_id))})) [1] #get name of Club, ACM etc
        delegator_list = organization_info_collection.find_one({'_id': ObjectId(str(organization_id))})[org_name]["Delegators"]
        member_list = organization_info_collection.find_one({'_id': ObjectId(str(organization_id))})[org_name]["Members"]
        if(username in delegator_list):
            for blocked_member in (list(request.POST.get("usernames").split(", "))):
                organization_info_collection.update({"_id":  ObjectId(str(organization_id))},
                {"$pull": {org_name + ".Members": blocked_member}})

                organization_info_collection.update({"_id":  ObjectId(str(organization_id))},
                {"$push": {org_name + ".Blocked Members": blocked_member}})

                user_organizations = user_info_collection.find_one({"username": blocked_member})["organizations"]
                if(organization_id in user_organizations):
                    del user_organizations[organization_id] #delete organization user passes in

                user_info_collection.update({"username": blocked_member}, #update organizations
                {"$set": {"organizations": user_organizations}})

            return JsonResponse({"Successful" : "Blocked Users"})
        else:
            return JsonResponse({"Error" : "User is not authorized to block other users"})

    return JsonResponse({"NULL" : "NULL"})


@csrf_exempt
@api_view(['GET'])
def getOrgInfo(request): #pass in organization_id
    organization_id = request.GET.get("organization_id")
    org_name = list(organization_info_collection.find_one({'_id': ObjectId(str(organization_id))})) [1] #get name of Club, ACM etc

    return JsonResponse(organization_info_collection.find_one({'_id': ObjectId(str(organization_id))})[org_name])

@csrf_exempt
@api_view(['POST'])
def addDelegator(request): #pass in {organization_id : 123adf, member_to_add: google-auth-api-1}
    if(request.POST):
        username = request.user.username
        #username = request.POST.get("username")
        member_to_add = request.POST.get("member_to_add")
        organization_id = request.POST.get("organization_id")
        org_name = list(organization_info_collection.find_one({'_id': ObjectId(str(organization_id))})) [1] #get name of Club, ACM etc
        delegator_list = organization_info_collection.find_one({'_id': ObjectId(str(organization_id))})[org_name]["Delegators"]
        member_list = organization_info_collection.find_one({'_id': ObjectId(str(organization_id))})[org_name]["Members"]

        if(username in delegator_list and member_to_add not in delegator_list):
            organization_info_collection.update({"_id":  ObjectId(str(organization_id))},
            {"$pull": {org_name + ".Members": member_to_add}})

            organization_info_collection.update({"_id":  ObjectId(str(organization_id))},
            {"$push": {org_name + ".Delegators": member_to_add}})

            user_info_collection.update({"username": member_to_add},
            {"$push": {"delegator_list": str(organization_id)}})

            return JsonResponse({"Successful" : "Able to add member as Delegator"})
        return JsonResponse({"Error" : "User is not allowed to add delegator or member_to_add is already a delegator"})
    return JsonResponse({"NULL" : "NULL"})


@csrf_exempt
@api_view(['GET'])
def getListOfOrganizations(request): #don't need to pass anything
    return_dict = {}
    for org in organization_info_collection.find({}):
        org_name = list(org)[1]
        return_dict[str(org["_id"])] = org_name

    return JsonResponse(return_dict)


@csrf_exempt
@api_view(['GET'])
def getDictionaryOfMembers(request): #pass in (organization_id : 13daflkj32)
    organization_id = request.GET.get("organization_id")
    org_name = list(organization_info_collection.find_one({'_id': ObjectId(str(organization_id))})) [1]
    member_list = organization_info_collection.find_one({'_id': ObjectId(str(organization_id))})[org_name]["Members"]
    return_dict = {}
    for username in member_list:
        return_dict[ user_info_collection.find_one({"username": username})["name"]] = username
    return JsonResponse(return_dict)