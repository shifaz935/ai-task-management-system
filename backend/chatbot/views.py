from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings

from .models import ChatMessage
from .serializers import ChatMessageSerializer

from accounts.models import CustomUser

import requests
from django.http import FileResponse
from reportlab.pdfgen import canvas
from io import BytesIO
from .models import ChatMessage



@api_view(["POST"])
def chatbot(request):

    message = request.data.get("message")

    user_id = request.data.get("user_id")

    user = CustomUser.objects.get(id=user_id)

    # LAST 5 CHATS
    old_chats = ChatMessage.objects.filter(
        user=user
    ).order_by("-created_at")[:5]

    context = ""

    for chat in reversed(old_chats):

        context += f"""
        User: {chat.message}
        AI: {chat.response}
        """

    final_message = context + f"\nUser: {message}"

    try:

        response = requests.post(

            url="https://openrouter.ai/api/v1/chat/completions",

            headers={

                "Authorization":
                f"Bearer {settings.OPENROUTER_API_KEY}",

                "Content-Type": "application/json",
            },

            json={

                "model": "openai/gpt-3.5-turbo",

                "messages": [
                    {
                        "role": "user",
                        "content": final_message
                    }
                ]
            }
        )

        data = response.json()
        print(data)

        reply = data["choices"][0]["message"]["content"]

        # SAVE CHAT
        ChatMessage.objects.create(
            user=user,
            message=message,
            response=reply
        )

        return Response({
            "reply": reply
        })

    except Exception as e:

        print("ERROR:", str(e))

        return Response({
            "error": str(e)
        }, status=500)


@api_view(["GET"])
def chat_history(request, user_id):

    chats = ChatMessage.objects.filter(
        user_id=user_id
    )

    serializer = ChatMessageSerializer(
        chats,
        many=True
    )

    return Response(serializer.data)

@api_view(["GET"])
def download_chat_pdf(request, user_id):

    chats = ChatMessage.objects.filter(
        user_id=user_id
    )

    buffer = BytesIO()

    p = canvas.Canvas(buffer)

    y = 800

    p.setFont("Helvetica", 12)

    p.drawString(200, 820, "Chat History")

    for chat in chats:

        p.drawString(
            50,
            y,
            f"User: {chat.message}"
        )

        y -= 20

        p.drawString(
            50,
            y,
            f"AI: {chat.response}"
        )

        y -= 40

        if y < 100:

            p.showPage()

            y = 800

    p.save()

    buffer.seek(0)

    return FileResponse(
        buffer,
        as_attachment=True,
        filename="chat_history.pdf"
    )

