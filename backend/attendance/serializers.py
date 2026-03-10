from rest_framework import serializers
from .models import Attendance


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ["employee_id", "date", "Attendance_status"]


class AttendanceRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ["date", "Attendance_status"]
