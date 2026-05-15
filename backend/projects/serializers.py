from rest_framework import serializers
from .models import Project, Task

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class TaskSerializer(serializers.ModelSerializer):

    project_name = serializers.CharField(
        source="project.title",
        read_only=True
    )

    assigned_username = serializers.CharField(
        source="assigned_user.username",
        read_only=True
    )

    class Meta:
        model = Task
        fields = "__all__"