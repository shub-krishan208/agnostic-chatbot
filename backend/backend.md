1.	Keep the Django project and Flask project in the same repository or ensure Python path allows import. Easiest: keep Flask code in a sibling folder in the same repo or a subfolder.

3.	In your Flask app, before importing Django models, import this setup:

# flask_app/app.py (example)
from chatdb_project.django_setup import *
from logs.models import UserMessage, BotResponse

def log_conversation(session_id, user_text, user_lang, bot_text, bot_lang):
    um = UserMessage.objects.create(text=user_text, language=user_lang, session_id=session_id)
    BotResponse.objects.create(user_message=um, text=bot_text, language=bot_lang)

Next:
  uses django_setup.py then imports logs.models and calls a log_conversation(...) helper function.

SessionMessage Table (combines session and user message)

Field Name  -  Type -  Description 
id - AutoField (PK)  -  DB unique ID
session_id -  CharField(128)  -   Unique identifier for the chat session (sess_1234)
channel  -  CharField(50)  -  Source (web, telegram, etc.)
user_text -  TextField -  Text sent by the user
detected_language -  CharField(10)  -   Language code of the user message (en, hi)
timestamp  -   DateTimeField  -   When message was sent
meta  -    JSONField (optional)  -   Optional info: user id, device, message id, etc.

BotResponse Table
Field Name  -  Type  -  Description
id  -  AutoField (PK)  -  DB unique ID
session_message   -   ForeignKey → SessionMessage   -  Which user message this is responding to
response_local  -  TextField   -  Message sent to user (translated if needed)
language -  CharField(10)   -  Language of response
rasa_response_en  -  TextField (nullable)  -  Bot’s English response (for debugging)
intent  -  CharField(100)  -  Detected intent
intent_confidence  -  FloatField  -  Confidence of detected intent
timestamp  -  DateTimeField  -  When bot responded
meta  -  JSONField (optional)   -  Extra info: entities, slots, fallback reason, etc.

    
