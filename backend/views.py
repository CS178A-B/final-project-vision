from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache
from django.http import HttpResponse,JsonResponse
import pymongo
from pymongo import MongoClient
from bson.json_util import dumps, loads
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import ensure_csrf_cookie
import json
# Serve Single Page Application
index = never_cache(TemplateView.as_view(template_name='index.html'))

cluster = MongoClient("mongodb+srv://VirajDhillon:681442376acE@cluster0.avnss.mongodb.net/<dbname>?retryWrites=true&w=majority")
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
        "organizations": []
    }

    if(request.POST): #If get response has data / if user used api/getCalendarInfo without token
        if(collection.find({"username": request.POST.get("username")}).count() > 0): #if the document/user exists
            responseData  = collection.find_one({"username": request.POST.get("username")}) #Obtain Json Data of User
        else:
            responseData["username"] = request.POST.get("username")
            collection.insert_one(responseData) #Otherwise insert the template (empty) data into database
        del responseData["_id"]
        return JsonResponse(responseData)
    else: #return empty Json if user logged onto url without authentication
        return JsonResponse({})

@csrf_exempt
def addOrganization(request):
    if(request.POST):
        for organization in (list(request.POST.get("organizations").split(", "))):
            collection.update({"username": request.POST.get("username")},
            {"$push": {"organizations": hard_coded_orgs[organization]}})
        responseData  = collection.find_one({"username": request.POST.get("username")}) #Obtain Json Data of User
        del responseData["_id"]
        return JsonResponse(responseData)
    else:
        return JsonResponse({})

#TODO POST, PUT, DELETE and connect to MongoDB
