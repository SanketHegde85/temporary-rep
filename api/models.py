from django.db import models
from django.core.validators import MinValueValidator

# Create your models here.

class LoginDetails(models.Model):
    phone = models.CharField(max_length = 10)
    name = models.CharField(max_length = 100)
    password = models.CharField(max_length = 100)

    def __str__(self):
        return self.name

class Category(models.Model):
    breed = models.CharField(max_length = 100)
    species = models.CharField(max_length = 100)

    def __str__(self):
        return self.breed
    
class PetDetails(models.Model):
    c_id = models.ForeignKey(Category, on_delete = models.CASCADE)
    name = models.CharField(max_length = 100)
    age = models.IntegerField(validators = [MinValueValidator(0)])
    price = models.IntegerField(validators = [MinValueValidator(0)])
    is_adopted = models.BooleanField(default=False)
    
    def __str__(self):
        return self.name
    
class Donations(models.Model):
    u_id = models.CharField(max_length = 400)
    p_id = models.ForeignKey(PetDetails, on_delete = models.CASCADE)
    
    def __str__(self):
        return self.u_id
    
class AdoptionDetails(models.Model):
    u_id = models.CharField(max_length = 400)
    p_id = models.ForeignKey(PetDetails, on_delete = models.CASCADE)
    date = models.DateField()
    payment = models.IntegerField(validators = [MinValueValidator(0)])

    def __str__(self):
        return self.u_id