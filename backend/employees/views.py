from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Employee
from .serializers import EmployeeSerializer
from attendance.models import Attendance


class EmployeeListCreateView(APIView):
    def get(self, request):
        employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        employee_id = request.data.get("employee_id")

        if Employee.objects.filter(employee_id=employee_id).exists():
            return Response(
                {"detail": "Employee already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Employee created"}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmployeeDetailView(APIView):
    def delete(self, request, employee_id):
        try:
            employee = Employee.objects.get(employee_id=employee_id)
        except Employee.DoesNotExist:
            return Response(
                {"detail": "Employee not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        Attendance.objects.filter(employee_id=employee_id).delete()
        employee.delete()
        return Response({"message": "Employee deleted"}, status=status.HTTP_200_OK)
