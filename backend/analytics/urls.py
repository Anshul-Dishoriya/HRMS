from django.urls import path
from .views import AttendanceSummaryView

urlpatterns = [
    path("attendance-summary", AttendanceSummaryView.as_view()),
]
