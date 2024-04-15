from django.test import TestCase,RequestFactory

# Create your tests here.
from .models import Restaurant,Customer,DeliveryExec,Menu
from .views import Home

class RestaurantTest(TestCase):

    def test_string_representation(self):
        res = Restaurant(res_name="Motel")
        self.assertEqual(str(res), res.res_name)

class CustomerTest(TestCase):

    def test_string_representation(self):
        cus = Customer(cus_name="jon")
        self.assertEqual(str(cus), cus.cus_name)

class DeliveryExecTest(TestCase):

    def test_string_representation(self):
        deli = DeliveryExec(exec_name="roy")
        self.assertEqual(str(deli), deli.exec_name)

class MenuTest(TestCase):

    def test_string_representation(self):
        m = Menu(food_name="chola")
        self.assertEqual(str(m), m.food_name)

# class HomePageTest(TestCase):
#     def test_environment_set_in_context(self):
#         request = RequestFactory().get('/')
#         view = Home()
#         view.setup(request)

#         context = view.get_context_data()
#         view.object_list = view.get_queryset()
#         self.assertIn(context)

class viewTests(TestCase):

    def test_homepage(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)




