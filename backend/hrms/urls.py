from django.urls import path, include

urlpatterns = [
    path("employees", include("employees.urls")),
    path("employees/", include("employees.urls")),
    path("attendance", include("attendance.urls")),
    path("attendance/", include("attendance.urls")),
    path("analytics/", include("analytics.urls")),
]
