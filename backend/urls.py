"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path

from . import views

urlpatterns = [
    path('',views.index,name='index'),
    path('admin/', admin.site.urls),
    path('features',views.index),
    path('contact',views.index),
    path('organizations',views.index),
    path('calendar',views.index),
    path('about', views.index),
    path('join/', views.index),
    path('api/getCalendarInfo', views.getCalendarInfo),
    path('api/addOrganization', views.addOrganization),
    path('api/deleteEvent', views.deleteEvent),
    path('api/deleteOrganization', views.deleteOrganization),
    path('api/createOrganization', views.createOrganization),
    path('api/createEvent', views.createEvent),
    path('api/blockUsers', views.blockUsers),
    path('api/getListOfOrganizations',views.getListOfOrganizations),
    path('api/getDictionaryOfMembers', views.getDictionaryOfMembers),
    path('api/getOrgInfo', views.getOrgInfo),
    path('api/addDelegator', views.addDelegator),
    path('api/public',views.public),
    path('api/private',views.private),
]
