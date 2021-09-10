# mysite/asgi.py





import os
import django
from channels.routing import get_default_application
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "tryDjango.settings")
django.setup()
from app import routing

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "tryDjango.settings")
from channels.auth import AuthMiddlewareStack


application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            routing.websocket_urlpatterns
        )
    ),
})
