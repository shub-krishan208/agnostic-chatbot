# database/logs/serializers.py
from rest_framework import serializers
from .models import UserMessage, BotResponse

class UserMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMessage
        fields = ['text', 'language', 'session_id']  # Or specify the fields you want to expose

class BotResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = BotResponse
        fields = ['text', 'language', 'user_message']
