from django.test import TestCase
import unittest
from django.test import Client
from django.test import TestCase
import os
from pymongo import MongoClient

#print("mongodb+srv://VirajDhillon:681442376acE@cluster0.avnss.mongodb.net/<dbname>?retryWrites=true&w=majority")

cluster = MongoClient(os.environ.get("MONGODB_URL"))
db = cluster["Login"]
collection = db["Events"]

c = Client()




class BackendTesting(TestCase):
    def test_getCalendarInfo_user_exists(self):
        print("TEST 1: Testing api/getCalendarInfo with existing user")
        response = c.post("/api/getCalendarInfo", {"username": "Vish"})
        self.assertEqual("Vish", response.json()["username"], "Username returned is not Vish")
        self.assertEqual([{'Chess Club': [{'Id': 1, 'Subject': 'General Meeting', 'Location': 'UCR', 'StartTime': '2020-11-05T02:00:00.000Z', 'EndTime': '2019-11-05T03:30:00.000Z', 'CategoryColor': '#1aaa55'}, {'Id': 2, 'Subject': 'Tournament', 'Location': 'UCR', 'StartTime': '2020-12-05T05:30:00.000Z', 'EndTime': '2019-12-05T09:30:00.000Z', 'CategoryColor': '#357cd2'}]}],
        response.json()["organizations"], "Information is not correct")

    def test_getCalendarInfo_no_user_exists(self):
        print("TEST 2: Testing api/getCalendarInfo with empty user")
        response = c.post("/api/getCalendarInfo", {"username": "Temp Person"})
        self.assertEqual("Temp Person", response.json()["username"], "Usernames are not correct")
        self.assertEqual([], response.json()["organizations"], "Not returning empty JSON")
        collection.delete_one({"username": "Temp Person"})

    def test_addOrganization(self):
        print(".TEST 3: Testing api/addOrganization with example Chess Club")
        c.post("/api/getCalendarInfo", {"username": "Temp Person"})
        response = c.post("/api/addOrganization", {"username": "Temp Person", "organizations" : "Chess Club"})
        self.assertEqual("Temp Person", response.json()["username"], "Usernames are not correct")
        self.assertEqual([{'Chess Club': [{'Id': 5, 'Subject': 'General Meeting', 'Location': 'UCR', 'StartTime': '2020-11-05T02:00:00.000Z', 'EndTime': '2020-11-05T03:30:00.000Z', 'CategoryColor': '#1aaa55'}, {'Id': 6, 'Subject': 'Tournament', 'Location': 'UCR', 'StartTime': '2020-12-05T05:30:00.000Z', 'EndTime': '2020-12-05T09:30:00.000Z', 'CategoryColor': '#357cd2'}]}],
        response.json()["organizations"], "Not returning proper Chess Club JSON")
        collection.delete_one({"username": "Temp Person"})
