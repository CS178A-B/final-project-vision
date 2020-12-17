 # Backend 
 As REACT handles user interactions and frontend logistics, the backend handles updating, inserting, deleting, and retrieving information from the database. 
 The backend is currently supported by the Django Web Framework and entirely written in the Python programming language. Our database is MongoDB which provides
 easy JSON formatting and fast querying. 
 
 ## Django Web Framework
 The Django Web Framework is perfect for a large application like ours. REACT API uses URL endpoints to send data through HTTP Responses, specifically through POST requests
 so far. Django is able to read those POST requests, filter out data, and search through the MongoDB Database and return information if necessary. The functions implemented
 so far are:
 1. getCalendarInfo()
     1. This function receives a username from a POST request. Django searches through the MongoDB Database and returns information regarding clubs/organizations and events
     specific to the user.
     2. If the user isn't in the database, the user is then added to the Database and given an empty array of clubs/organizations and events.
 1. addOrganization()
     1. This function allows users to add organizations and clubs to their calendar. Django receives username and an array of clubs/organizations, and adds those according
     clubs/organizations to the user's information. Thus, it's updated in real time when displaying the calendar.
Django framework also has a library specific for unit testing. Tests are written in the tests format and in the test_backend.py file. There, it will test the functions listed above.
     
## MongoDB Database
This database is JSON format focused. By doing so, it's easy to send data to REACT API for the Calendar. Django is able to connect to the MongoDB Database through the use
of the function MongoClient. This function is found in the library Pymongo, and helps create seemless cohesion between MongoDB querying and Python functions. All functions
that use the MongoDB Database are written in the Django framework, and access Database collections whenever needed. 
