from django.urls import path
from .views import *

urlpatterns = [
    path('category/', CategoryView),
    path('login_details/', LoginDetailsView),
    path('pet_details/', PetDetailsView),
    path('donations/', DonationsView),
    path('adoption_details/', AdoptionDetailsView),
]