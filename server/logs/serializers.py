# database/logs/serializers.py
from rest_framework import serializers
from .models import UserMessage, BotResponse

class UserMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMessage
        fields = '__all__'  # Or specify the fields you want to expose

class BotResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = BotResponse
        fields = '__all__'
