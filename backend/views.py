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
# Serve Single Page Application
index = never_cache(TemplateView.as_view(template_name='index.html'))

cluster = MongoClient(os.environ.get("MONGODB_URL"))
db = cluster["Login"]
collection = db["Events"]
id = 0

hard_coded_orgs = {
    "ACM" : {"ACM":
        [
            {"Id": 1,
            "Subject": "Hackathon",
            "Location": "UCR",
            "StartTime": "2020-11-21T04:00:00.000Z",
            "EndTime": "2020-11-21T05:30:00.000Z",
            "CategoryColor": "#1aaa55"},
            {"Id": 2,
            "Subject": "Professional Development",
            "Location": "UCR",
            "StartTime": "2020-11-23T06:30:00.000Z",
            "EndTime": "2020-11-23T08:30:00.000Z",
            "CategoryColor": "#357cd2"}
        ]
    },
    "Persian Club" : {"Persian Club":
        [
            {"Id": 3,
            "Subject": "Evening Meeting",
            "Location": "UCR",
            "StartTime": "2020-11-16T04:00:00.000Z",
            "EndTime": "2020-11-16T05:30:00.000Z",
            "CategoryColor": "#1aaa55"},

            {"Id": 4,
            "Subject": "Culture Night",
            "Location": "UCR",
            "StartTime": "2020-11-23T06:30:00.000Z",
            "EndTime": "2020-11-23T08:30:00.000Z",
            "CategoryColor": "#357cd2"}
        ]
    },
    "Chess Club" : {"Chess Club":
        [
            {"Id": 5,
            "Subject": "General Meeting",
            "Location": "UCR",
            "StartTime": "2020-11-05T02:00:00.000Z",
            "EndTime": "2020-11-05T03:30:00.000Z",
            "CategoryColor": "#1aaa55"},

            {"Id": 6,
            "Subject": "Tournament",
            "Location": "UCR",
            "StartTime": "2020-12-05T05:30:00.000Z",
            "EndTime": "2020-12-05T09:30:00.000Z",
            "CategoryColor": "#357cd2"}
        ]
    }
}

# Need GET calendar info, add calendar info (POST), update calendar info (PUT), delete calendarItem (DELETE)
# Here is one example of a get request. Similarly try to get the other methods and update urls.py
#"organizations" : [{"ACM" : "hello"}]

@csrf_exempt
def getCalendarInfo(request):
    responseData = {
        "username" : "",
        "organizations": {}
    }

    if(request.POST): #If get response has data / if user used api/getCalendarInfo without token
        if(collection.find({"username": request.POST.get("username")}).count() > 0): #if the document/user exists
            responseData  = collection.find_one({"username": request.POST.get("username")}) #Obtain Json Data of User
            return JsonResponse(responseData["organizations"])
        else:
            responseData["username"] = request.POST.get("username")
            collection.insert_one(responseData) #Otherwise insert the template (empty) data into database
            return JsonResponse({})
    else: #return empty Json if user logged onto url without authentication
        return JsonResponse({})

@csrf_exempt
def addOrganization(request):
    if(request.POST):
        returnData = collection.find_one({"username": request.POST.get("username")})
        user_organizations = returnData["organizations"]
        for organization in (list(request.POST.get("organizations").split(", "))):
            if(organization in user_organizations): #if user is already in organization, don't add it
                pass
            else: #otherwise add it
                user_organizations.update(hard_coded_orgs[organization])
        collection.update({"username": request.POST.get("username")},
        {"$set": {"organizations": user_organizations}})
        responseData  = collection.find_one({"username": request.POST.get("username")}) #Obtain Json Data of User
        del responseData["_id"]
        return JsonResponse(responseData)
    else:
        return JsonResponse({})


@csrf_exempt
def deleteEvent(request):
    if(request.POST):
        user_organizations = collection.find_one({"username": request.POST.get("username")})["organizations"]
        id = int(request.POST.get("id"))
        organization = request.POST.get("organization")
        user_organizations_events = user_organizations[organization]

        for index in range(len(user_organizations_events)): #iterate over events to find proper id to delete
            if((user_organizations_events[index])["Id"] == id):
                del user_organizations_events[index]
                break

        user_organizations[organization] = user_organizations_events #set that hash key value to newly modified/deleted events
        collection.update({"username": request.POST.get("username")}, #update organizations
        {"$set": {"organizations": user_organizations}})
        responseData  = collection.find_one({"username": request.POST.get("username")}) #Obtain Json Data of User
        del responseData["_id"]
        return JsonResponse(responseData)
    return JsonResponse({})


@csrf_exempt
def deleteOrganization(request):
    if(request.POST):
        user_organizations = collection.find_one({"username": request.POST.get("username")})["organizations"]
        organization = request.POST.get("organization")
        del user_organizations[organization] #delete organization user passes in
        collection.update({"username": request.POST.get("username")}, #update organizations
        {"$set": {"organizations": user_organizations}})
        responseData  = collection.find_one({"username": request.POST.get("username")}) #Obtain Json Data of User
        del responseData["_id"]
        return JsonResponse(responseData)
    return JsonResponse({})
