from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User
from captcha.fields import CaptchaField
from .models import Customer, Restaurant, DeliveryExec
from phonenumber_field.formfields import PhoneNumberField

class NewCustomerForm(UserCreationForm):
	fullname = forms.CharField(max_length=100)
	mobile = PhoneNumberField()
	Captcha = CaptchaField()
	class Meta:
		model = User
		fields=("username", "email" ,"password1", "password2")

	def save(self):
		user = super().save(commit=True)
		user.is_customer = True
		user.save()
		customer = Customer.objects.create(user=user, cus_name=self.cleaned_data['fullname'], mobile=self.cleaned_data['mobile'])
		# customer['cus_name']=(self.cleaned_data.get('fullname'))
		# customer['mobile']=(self.cleaned_data.get('mobile'))
		customer.save()
		return user
class NewRestaurantForm(UserCreationForm):
	Registration_number=forms.CharField(max_length=200)
	Restaurant_name=forms.CharField(max_length=200)
	Owner=forms.CharField(max_length=60)
	Mobile = PhoneNumberField()
	Latitude=forms.DecimalField(max_digits=12, decimal_places=9)
	Longitude=forms.DecimalField(max_digits=12, decimal_places=9)
	Building=forms.CharField(max_length=50, required=False)
	Floor=forms.IntegerField(required=False)
	City=forms.CharField(max_length=100)
	State=forms.CharField(max_length=100)
	Pin=forms.IntegerField()
	class Meta:
		model = User
		fields=("username", "email" ,"password1", "password2")

	def save(self):
		user = super().save(commit=True)
		user.is_restaurant= True
		user.save()
		restaurant = Restaurant.objects.create(
			user=user,
			reg_num=self.cleaned_data['Registration_number'],
			res_name=self.cleaned_data['Restaurant_name'],
			owner=self.cleaned_data['Owner'],
			mobile=self.cleaned_data['Mobile'],
			latitude=self.cleaned_data['Latitude'],
			longitude=self.cleaned_data['Longitude'],
			Building=self.cleaned_data['Building'],
			Floor=self.cleaned_data['Floor'],
			City=self.cleaned_data['City'],
			State=self.cleaned_data['State'],
			Pin=self.cleaned_data['Pin'])
		# customer['cus_name']=(self.cleaned_data.get('fullname'))
		# customer['mobile']=(self.cleaned_data.get('mobile'))
		restaurant.save()
		return user
class NewDeliveryExecForm(UserCreationForm):
	Fullname = forms.CharField(max_length=100)
	Mobile = PhoneNumberField()
	Captcha = CaptchaField()
	class Meta:
		model = User
		fields=("username", "email" ,"password1", "password2")

	def save(self):
		user = super().save(commit=True)
		user.is_delivery = True
		user.save()
		delivery_exec = DeliveryExec.objects.create(user=user, exec_name=self.cleaned_data['Fullname'], mobile=self.cleaned_data['Mobile'])
		# customer['cus_name']=(self.cleaned_data.get('fullname'))
		# customer['mobile']=(self.cleaned_data.get('mobile'))
		delivery_exec.save()
		return user
class SearchForm(forms.Form):
	search=forms.CharField()