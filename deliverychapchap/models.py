from django.contrib.auth.models import AbstractUser
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.conf import settings
from django.urls import reverse
from jsonfield import JSONField

class User(AbstractUser):
    is_customer = models.BooleanField(default=False)
    is_restaurant = models.BooleanField(default=False)
    is_delivery = models.BooleanField(default=False)

class Restaurant(models.Model):
    user=models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, primary_key=True)
    reg_num=models.CharField(max_length=200)
    res_name=models.CharField(max_length=200)
    owner=models.CharField(max_length=60)
    mobile = PhoneNumberField()
    latitude=models.DecimalField(max_digits=30, decimal_places=25)
    longitude=models.DecimalField(max_digits=30, decimal_places=25)
    Building=models.CharField(max_length=50, blank=True)
    Floor=models.IntegerField(null=True)
    City=models.CharField(max_length=100)
    State=models.CharField(max_length=100)
    Pin=models.IntegerField()

    def __str__(self):
        return self.res_name

class Customer(models.Model):
    user=models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, primary_key=True)
    cus_name=models.CharField(max_length=100)
    mobile = PhoneNumberField()

    def __str__(self):
        return self.cus_name

class DeliveryExec(models.Model):
    user=models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, primary_key=True)
    exec_name=models.CharField(max_length=100)
    mobile = PhoneNumberField()
    avg_rating=models.IntegerField(default=0, null=True)

    def __str__(self):
        return self.exec_name
# Create your models here.
class Menu(models.Model):
    restaurant_id=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    food_name=models.CharField(max_length=30)
    description=models.CharField(max_length=350)
    rating=models.IntegerField(null=True)
    food_image=models.ImageField(upload_to='images/')
    veg=models.BooleanField(default=True)
    price=models.IntegerField()

    def __str__(self):
        return self.food_name

    def get_absolute_url(self):
        return reverse('updatefood', kwargs={'pk': self.pk})

class Orders(models.Model):
    order_id=models.CharField(max_length=300,default="XXX")
    restaurant_id=models.ForeignKey(Restaurant,on_delete=models.CASCADE, related_name="user1")
    customer_id=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE, related_name="user2")
    exec_id=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE, related_name="user3", null=True)
    items=JSONField()
    total_price=models.DecimalField(default=0.00, max_digits=10, decimal_places=2)

class Cart(models.Model):
    customer_id=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE, related_name='user')
    item=models.ForeignKey(Menu, on_delete=models.CASCADE, related_name='menu')
    quantity=models.IntegerField(default=1)

class addresses(models.Model):
    latitude=models.DecimalField(max_digits=30, decimal_places=25)
    longitude=models.DecimalField(max_digits=30, decimal_places=25)
    customer_id=models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)