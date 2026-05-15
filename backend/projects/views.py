from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .models import Project, Task
from .serializers import TaskSerializer
from .serializers import ProjectSerializer
from django.db.models import Count


@api_view(['GET'])
def dashboard_data(request):

    total_projects = Project.objects.count()

    completed_tasks = Task.objects.filter(status='Completed').count()

    pending_tasks = Task.objects.filter(status='Pending').count()

    return Response({
        "total_projects": total_projects,
        "completed_tasks": completed_tasks,
        "pending_tasks": pending_tasks
    })


@api_view(['GET' , "POST"])
def task_list(request):

    if request.method == "GET":
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = TaskSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors)


@api_view(['POST'])
def add_task(request):

    serializer = TaskSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors)
@api_view(['DELETE'])
def delete_task(request, id):

    task = Task.objects.get(id=id)

    task.delete()

    return Response({
        "message": "Task Deleted"
    })
@api_view(['PUT'])
def update_task(request, id):

    task = Task.objects.get(id=id)

    if task.status == "Pending":
        task.status = "Completed"

    else:
        task.status = "Pending"

    task.save()

    return Response({
        "message": "Task Updated"
    })
@api_view(['GET', 'POST'])
def project_list(request):

    if request.method == 'GET':
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ProjectSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors)
@api_view(['DELETE'])
def delete_project(request, id):

    project = Project.objects.get(id=id)

    project.delete()

    return Response({
        "message": "Project Deleted"
    })

User = get_user_model()

@api_view(["GET"])
def getUsers(request):
    users = User.objects.all().values("id", "username")
    return Response(users)   
@api_view(['PUT'])
def update_project(request, id):

    project = Project.objects.get(id=id)

    serializer = ProjectSerializer(
        project,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(serializer.errors)
@api_view(['GET'])
def workload_distribution(request):

    workload = (
        Task.objects
        .exclude(assigned_user=None)
        .values('assigned_user__username')
        .annotate(task_count=Count('id'))
    )

    return Response(workload)