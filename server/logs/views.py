# database/logs/views.py
from rest_framework import viewsets
from .models import UserMessage, BotResponse
from .serializers import UserMessageSerializer, BotResponseSerializer

class UserMessageViewSet(viewsets.ModelViewSet):
    queryset = UserMessage.objects.all()
    serializer_class = UserMessageSerializer

class BotResponseViewSet(viewsets.ModelViewSet):
    queryset = BotResponse.objects.all()
    serializer_class = BotResponseSerializer