# mysite/asgi.py
import os
import django

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from app import routing


from channels.routing import get_default_application

"""
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "tryDjango.settings")
django.setup()
application = get_default_application()
"""
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "tryDjango.settings")

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            routing.websocket_urlpatterns
        )
    ),
})