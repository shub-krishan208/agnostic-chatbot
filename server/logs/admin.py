from django.contrib import admin
from .models import UserMessage, BotResponse

@admin.register(UserMessage)
class UserMessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'language', 'session_id', 'created_at')
    search_fields = ('text', 'session_id')

@admin.register(BotResponse)
class BotResponseAdmin(admin.ModelAdmin):
    list_display = ('id', 'language', 'created_at', 'user_message')
    search_fields = ('text',)