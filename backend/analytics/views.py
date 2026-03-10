from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from attendance.models import Attendance
from employees.models import Employee


class AttendanceSummaryView(APIView):
    def get(self, request):
        target_date = request.query_params.get("date")
        if not target_date:
            return Response(
                {"detail": "Date parameter is required (YYYY-MM-DD)."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            datetime.strptime(target_date, "%Y-%m-%d")
        except ValueError:
            return Response(
                {"detail": "Invalid date format. Use YYYY-MM-DD."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        attendance_records = Attendance.objects.filter(date=target_date)

        total_marked = attendance_records.count()
        present_count = attendance_records.filter(Attendance_status="Present").count()
        absent_count = total_marked - present_count

        detailed_list = []
        for record in attendance_records:
            try:
                emp = Employee.objects.get(employee_id=record.employee_id)
                emp_name = emp.name
            except Employee.DoesNotExist:
                emp_name = "Unknown"

            detailed_list.append({
                "employee_id": record.employee_id,
                "name": emp_name,
                "status": record.Attendance_status,
            })

        return Response({
            "date": target_date,
            "counts": {
                "total_marked": total_marked,
                "present": present_count,
                "absent": absent_count,
            },
            "attendance_list": detailed_list,
        }, status=status.HTTP_200_OK)
