from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):

    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('manager', 'Manager'),
        ('intern', 'Intern'),
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='intern'
    )

    def __str__(self):
        return self.username