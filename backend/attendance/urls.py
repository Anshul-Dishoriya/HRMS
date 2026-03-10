from django.urls import path
from .views import AttendanceView, AttendanceByEmployeeView

urlpatterns = [
    path("", AttendanceView.as_view()),
    path("<str:employee_id>", AttendanceByEmployeeView.as_view()),
]
