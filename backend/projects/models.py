from django.db import models
from django.conf import settings


class Project(models.Model):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    title = models.CharField(max_length=200)

    description = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Task(models.Model):

    title = models.CharField(max_length=100)

    description = models.TextField(
        blank=True,
        null=True
    )

    status = models.CharField(max_length=20)

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE
    )

    assigned_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    deadline = models.DateField(
        null=True,
        blank=True
    )

    def __str__(self):
        return self.title