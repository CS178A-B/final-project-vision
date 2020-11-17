from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache
from django.http import HttpResponse,JsonResponse

# Serve Single Page Application
index = never_cache(TemplateView.as_view(template_name='index.html'))


# Need GET calendar info, add calendar info (POST), update calendar info (PUT), delete calendarItem (DELETE)
# Here is one example of a get request. Similarly try to get the other methods and update urls.py 
def getCalendarInfo(request):
    # contact DB and get info
    responseData = {
        'id': 4,
        'name': 'Test Response',
        'roles' : ['Admin','User']
    }
    return JsonResponse(responseData)

#TODO POST, PUT, DELETE and connect to MongoDB