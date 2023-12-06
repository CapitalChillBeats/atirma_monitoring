from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('get-dataset_data', views.get_dataset_data, name='get_dataset_data'),
    ]
