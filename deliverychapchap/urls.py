from django.urls import path
from . import views
from django.conf.urls import url

app_name = "main"


urlpatterns = [
	path('register/', views.CustomerRegisterView.as_view(), name="register"),
	path('', views.loginview, name="login"),
	path('registerres/', views.RestaurantRegisterView.as_view(), name="resregister"),
	path('registerdel/', views.DeliveryExecRegisterView.as_view(), name="delregister"),
	path('resthome', views.Menulist.as_view(), name='menu_list'),
	path('past_orders', views.PastOrderlist.as_view(), name='past_order_list'),
	path('add', views.AddFood.as_view(), name='addfood'),
	path('update/<int:pk>', views.UpdateFood.as_view(), name='updatefood'),
	path('delete/<int:pk>', views.DeleteFood.as_view(), name='deletefood'),
	path('detail/<int:pk>/', views.DetailFood.as_view(), name="detail"),
	path('addcart/<int:pk>/<int:q>', views.additemview, name="addtocart"),
	path('home', views.Home.as_view(), name='home'),
	path('mycart', views.MyCart.as_view(), name='mycart'),
	path('<int:pk>/mycart', views.CartDelete.as_view(), name='deletecart'),
	path('ordersummary', views.ordersummaryview, name='ordersummary'),
	path('delhome', views.DelHome.as_view(), name='delhome'),
	path('permittrack', views.permittrackview, name='permittrack'),
	path('takeorder/<str:q>', views.takeorderview, name='takeorder'),
	path('orderstatus/<str:q>', views.orderview, name='orderstatus'),
	path('orderlist', views.orderlist, name='orderlist'),
	path('restordercheck/<str:q>', views.restcheckorderview, name='checkorder'),
	path('trackorders', views.trackordersview, name='trackorders'),
	path('successorder', views.successorderview, name='successorder'),
	path("logout/", views.logout_request, name= "logout"),
	path('finishorder/<str:q>', views.finishorderview, name='finishorder'),




	# path('logout/', views.logoutview, name="logout"),
	# path('welcome/', views.Dashboardview.as_view(), name="welcome"),
	# path('article/', views.CreateArticleview.as_view(), name="article"),
	# path('search/', views.SearchResview.as_view(), name="searchresults"),
]
