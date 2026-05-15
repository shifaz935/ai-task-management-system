
from django.urls import path
from .views import chatbot, chat_history, download_chat_pdf

urlpatterns = [

    path("ask/", chatbot),

    path(
        "history/<int:user_id>/",
        chat_history
    ),

    path(
        "download/<int:user_id>/",
        download_chat_pdf
    ),

]

