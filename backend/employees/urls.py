from django.urls import path
from .views import EmployeeListCreateView, EmployeeDetailView

urlpatterns = [
    path("", EmployeeListCreateView.as_view()),
    path("<str:employee_id>", EmployeeDetailView.as_view()),
]
