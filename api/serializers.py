from rest_framework import serializers
from .models import *

class LoginDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginDetails
        fields = ('phone', 'name', 'password')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('breed', 'species')

class PetDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetDetails
        fields = ('c_id', 'name', 'age', 'price')

class DonationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donations
        fields = ('u_id', 'p_id')

class AdoptionDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdoptionDetails
        fields = ('u_id', 'p_id', 'date', 'payment')