from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from deliverychapchap.models import Menu,DeliveryExec,Customer,Restaurant,User, Orders, addresses
from deliverychapchap.models import Menu, Cart

class UserAdmin(admin.ModelAdmin):
	model = User
	filter_horizontal = ('user_permissions', 'groups',)
admin.site.register(User, UserAdmin)
admin.site.register(Restaurant)
admin.site.register(Customer)
admin.site.register(DeliveryExec)
admin.site.register(Menu)
admin.site.register(Orders)
admin.site.register(Cart)
admin.site.register(addresses)