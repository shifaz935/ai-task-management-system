from django.urls import path
from .views import dashboard_data , task_list , add_task , delete_task , update_task ,project_list , delete_project , update_project , getUsers, workload_distribution

urlpatterns = [
    path('dashboard/', dashboard_data),
    path('tasks/', task_list),
    path('add-task/', add_task),
    path('delete-task/<int:id>/', delete_task),
    path('update-task/<int:id>/', update_task),
    path('', project_list),
    path('delete-project/<int:id>/', delete_project),
    path('update-project/<int:id>/', update_project),
    path('users/', getUsers),
    path('workload/', workload_distribution),
]