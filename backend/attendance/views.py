from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from employees.models import Employee
from .models import Attendance
from .serializers import AttendanceRecordSerializer


class AttendanceView(APIView):
    def post(self, request):
        employee_id = request.data.get("employee_id")
        date = request.data.get("date")
        attendance_status = request.data.get("Attendance_status")

        if not Employee.objects.filter(employee_id=employee_id).exists():
            return Response(
                {"detail": "Employee not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        Attendance.objects.update_or_create(
            employee_id=employee_id,
            date=date,
            defaults={"Attendance_status": attendance_status},
        )

        return Response({"message": "Attendance recorded"}, status=status.HTTP_200_OK)


class AttendanceByEmployeeView(APIView):
    def get(self, request, employee_id):
        if not Employee.objects.filter(employee_id=employee_id).exists():
            return Response(
                {"detail": "Employee not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        records = Attendance.objects.filter(employee_id=employee_id).order_by("-date")

        total_count = records.count()
        present_count = records.filter(Attendance_status="Present").count()
        absent_count = total_count - present_count

        serializer = AttendanceRecordSerializer(records, many=True)

        return Response({
            "emp_ID": employee_id,
            "total_attendance_count": total_count,
            "present_count": present_count,
            "absent_count": absent_count,
            "attendance_list": serializer.data,
        }, status=status.HTTP_200_OK)
