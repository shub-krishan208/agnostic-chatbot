from django.db import models

# received from frontend
class UserMessage(models.Model):
    text = models.TextField()
    # make a list of default langs: en, hi, ra, od : [english, hindi, rajasthani, odiya]
    language = models.CharField(max_length=10)   # 'en', 'hi', 'mr', etc
    session_id = models.CharField(max_length=100, null=True, blank=True) # Make it unique
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.language}: {self.text[:50]}"

# sent to frontend
class BotResponse(models.Model):
    user_message = models.ForeignKey(UserMessage, on_delete=models.CASCADE, related_name='responses')
    text = models.TextField()
     # make a list of default langs: en, hi, ra, od : [english, hindi, rajasthani, odiya]
    language = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.language}: {self.text[:50]}"
 