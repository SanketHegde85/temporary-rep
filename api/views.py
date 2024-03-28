from .models import *
from .serializers import *
from rest_framework import status
import datetime
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.contrib.auth.models import User

@csrf_exempt    
def LoginDetailsView(request):
    if request.method == 'GET':
        loginDetails = LoginDetails.objects.all()
        loginDetailsSerializer = LoginDetailsSerializer(loginDetails, many=True)
        return JsonResponse(loginDetailsSerializer.data, safe=False)
    
    elif request.method == 'POST':
        loginDetailsData = JSONParser().parse(request)
        loginDetails = LoginDetails.objects.all()
        try:
            LoginDetails.objects.get(phone=loginDetailsData['phoneNumber'])
            return JsonResponse('Failed to Register', status=400, safe=False)
        except:
            pass
        try:
            LoginDetails.objects.get(name=loginDetailsData['userName'])
            # print('**********************************************************',temp)
            return JsonResponse('Failed to Register', status=400, safe=False)
        except:
            obj = LoginDetails(name = loginDetailsData['userName'], password = loginDetailsData['password'], phone = loginDetailsData['phoneNumber'])
            obj.save()
            return JsonResponse('Registration Successfull', status=200, safe=False)
        return JsonResponse('Failed to Register', status=status.HTTP_400_BAD_REQUEST, safe=False)
    
    elif request.method == 'PUT':
        loginDetailsData = JSONParser().parse(request)
        # name = loginDetailsData['userName']
        phone = loginDetailsData['phoneNumber']
        pswd = loginDetailsData['newPassword']
        try:
            nmd = LoginDetails.objects.get(phone=phone)
            nmd.password = pswd
            nmd.save()
            return JsonResponse({'mesg':' Update Successfull' , 'status':200, 'userName': nmd.name}, safe=False)
        except:
            return JsonResponse({'mesg':'Failed to Update', 'status':404}, safe=False)
    
    return JsonResponse(status=status.HTTP_400_BAD_REQUEST, safe=False)



@csrf_exempt
def CategoryView(request):
    if request.method == 'GET':
        category = Category.objects.all()
        categorySerializer = CategorySerializer(category, many=True)
        return JsonResponse(categorySerializer.data, safe=False)
    
    elif request.method == 'POST':
        categoryData = JSONParser().parse(request)
        obj = Category(breed = categoryData['breed'], species = categoryData['species'])
        obj.save()
        return JsonResponse('Failed to Add', safe=False)

    return JsonResponse(status=status.HTTP_400_BAD_REQUEST, safe=False)



@csrf_exempt
def PetDetailsView(request):
    if request.method == 'GET':
        if request.method == 'GET':
            catData = Category.objects.all()
            petData = PetDetails.objects.all()
            donData = Donations.objects.all()
            newPetDetails = []
            for pet in petData:
                catMatch = catData.filter(id = pet.c_id.id).first()
                donMatch = donData.filter(p_id = pet.id).first()
                newPet = {
                    'id': pet.id,
                    'name': pet.name,
                    'age': pet.age,
                    'price': pet.price,
                    'breed': catMatch.breed if catMatch else None,
                    'species': catMatch.species if catMatch else None,
                    'donator': donMatch.u_id if donMatch else None,
                    'is_adopted': pet.is_adopted,
                    # 'petObj': pet
                }
                newPetDetails.append(newPet)
            # print('******************************************',newPetDetails)
            return JsonResponse(newPetDetails, safe=False)
    
    elif request.method == 'POST':
        petDetailsData = JSONParser().parse(request)
        print("fassssssasfsffsf", petDetailsData)
        try:
            obj1 = Category.objects.get(breed=petDetailsData['breed'], species=petDetailsData['species'])
            obj = PetDetails(c_id = obj1, name = petDetailsData['petName'], age = petDetailsData['age'])
            obj.save()
        except Exception as e:
            cat1 = Category(breed=petDetailsData['breed'], species=petDetailsData['species'])
            cat1.save()
            obj = PetDetails(c_id = cat1, name = petDetailsData['petName'], age = petDetailsData['age'], price = petDetailsData['price'])
            obj.save()

        donate = Donations(u_id=petDetailsData['userName'], p_id=obj)
        donate.save()
        return JsonResponse('Failed to Add', safe=False)
    
    elif request.method == 'DELETE':
        petDetailsData = JSONParser().parse(request)
        id = petDetailsData['id']
        # print("Name ************************************************************", petDetailsData)
        petDetails = PetDetails.objects.filter(id=id)
        petDetails.delete()
        return JsonResponse('Deleted Successfully', safe=False)
    
    return JsonResponse(status=status.HTTP_400_BAD_REQUEST, safe=False)


@csrf_exempt
def DonationsView(request):
    if request.method == 'GET':
        donations = Donations.objects.all()
        donationsSerializer = DonationsSerializer(donations, many=True)
        return JsonResponse(donationsSerializer.data, safe=False)
    
    elif request.method == 'POST':
        donationsData = JSONParser().parse(request)
        donationsSerializer = DonationsSerializer(data=donationsData)
        if donationsSerializer.is_valid():
            donationsSerializer.save()
            return JsonResponse('Added Successfully', safe=False)
        return JsonResponse('Failed to Add', safe=False)
    
    return JsonResponse(status=status.HTTP_400_BAD_REQUEST, safe=False)


@csrf_exempt
def AdoptionDetailsView(request):
    if request.method == 'GET':
        petData = PetDetails.objects.all()
        adpData = AdoptionDetails.objects.all()
        newAdpDetails = []
        for adp in adpData:
            petMatch = petData.filter(id = adp.p_id.id).first()
            # print('******************************************', petMatch)
            newAdp = {
                'id': adp.id,
                'petName': petMatch.name,
                'petAge': petMatch.age,
                'price': petMatch.price,
                'breed': petMatch.c_id.breed if petMatch else None,
                'species': petMatch.c_id.species if petMatch else None,
                'adopter': adp.u_id,
                'date': adp.date
            }
            newAdpDetails.append(newAdp)
        # print('******************************************',newAdpDetails)
        return JsonResponse(newAdpDetails, safe=False)
    
    elif request.method == 'POST':
        adoptionDetailsData = JSONParser().parse(request)
        userName = adoptionDetailsData['userName']
        pet = adoptionDetailsData['pet']
        petObj = PetDetails.objects.get(id=pet['id'])
        petObj.is_adopted = True
        # print('************************************************', petObj)
        obj = AdoptionDetails(p_id=petObj, u_id=userName, payment=pet['price'], date=datetime.datetime.now())
        # print('************************************************', obj)
        petObj.save()
        obj.save()
        return JsonResponse('Added Successfully', safe=False)
    
    return JsonResponse(status=status.HTTP_400_BAD_REQUEST, safe=False)

