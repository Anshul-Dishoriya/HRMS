from django.db import models


STATUS_CHOICES = [
    ("Present", "Present"),
    ("Absent", "Absent"),
]


class Attendance(models.Model):
    employee_id = models.CharField(max_length=50)
    date = models.DateField()
    Attendance_status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
    )

    class Meta:
        db_table = "attendance"
        unique_together = ("employee_id", "date")

    def __str__(self):
        return f"{self.employee_id} | {self.date} | {self.Attendance_status}"
