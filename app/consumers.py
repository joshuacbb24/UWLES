# chat/consumers.py
import json
from django.db.models import Q
from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from app import models


# need a method to fetch offline messages
def fetch_offline_message(to_user, from_user):
    """Returns messages that were sent by from_user to user while
    to_user was offline"""

    return reversed(list(models.OfflineMessage.objects.filter( 
            (Q(to_user=to_user) & Q(from_user__username=from_user)) |
            (Q(to_user__username=from_user) & Q(from_user=to_user))
     ).select_related('from_user')))
  
def fetch_recent(to_user, from_user):
    return reversed(list(models.Messages.objects.filter( 
            (Q(to_user=to_user) & Q(from_user__username=from_user)) |
            (Q(to_user__username=from_user) & Q(from_user=to_user))
     ).select_related('from_user').select_related('from_user').order_by('-sent_at')))

def mark_sent(message):
    message.delete()

def update_db(channel_name, user):
    try:
        ch = models.Channels.objects.get(user=user)
        ch.channel_name = channel_name
        ch.save()
    except models.Channels.DoesNotExist:
        models.Channels.objects.create(user=user, channel_name=channel_name)

def delete_channel(user):
    models.Channels.objects.filter(user=user).delete()


def find_channel(username):
    try:
      
        ch = models.Channels.objects.get(user__username=username)
        print("Return channel", ch.user)
        return ch
    except models.Channels.DoesNotExist:
        return None

def save_message(to_user, from_user, message):
    models.Messages.objects.create(from_user=from_user, to_user=to_user, message=message)

def save_offline(username, from_user, message):
    user = models.Account.objects.get(username=username)
    models.OfflineMessage.objects.create(from_user=from_user, to_user=user, message=message)


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope["user"]      
        await sync_to_async(update_db)(self.channel_name, self.user)
        await self.accept()
        
    async def disconnect(self, close_code):
        await sync_to_async(delete_channel)(self.user)


    async def incoming(self, text_data):
        """Some user wants to send me a message"""
        #data = json.loads(text_data)
        await self.send(json.dumps({'from': text_data['from'],
            'message': text_data['message']}))

    # Receive message from WebSocket
    async def receive(self, text_data):
        """The recieve method here is when the browser sends something
        over the websocket to the server.
        it is not another user sending this user a message
        That happens in incoming
        """
        text_data_json = json.loads(text_data)
        if 'to' in text_data_json:
            message = text_data_json['message']
        
            ch = await sync_to_async(find_channel)(text_data_json['to'])
            if ch:
                print('Forwarding message to ', ch.channel_name, ch.user)
                await self.channel_layer.send(ch.channel_name, {'message': message,
                    'type' : 'incoming', 'from': self.user.username})
                await sync_to_async(save_message)(ch.user, self.user, message)

            else:
                print('save to offline')
                await sync_to_async(save_offline)(text_data_json['to'], self.user, message)

        if 'new_chat' in text_data_json:
           # call the offline messages fetch method
            with_user = text_data_json['new_chat'] 

            messages = await sync_to_async(fetch_recent)(self.user, with_user)
            for message in messages:     
                # and do a self.send (like in the incoming method)
                await self.send(json.dumps({'message': message.message,
                    'type' : 'incoming', 'from': message.from_user.username}))

            messages = await sync_to_async(fetch_offline_message)(self.user, with_user)        
            for message in messages:     
            # and do a self.send (like in the incoming method)
                await self.send(json.dumps({'message': message.message,
                    'type' : 'incoming', 'from': message.from_user.username})) 
                await sync_to_async(save_message)(self.user, message.from_user, message.message)    
                await sync_to_async(mark_sent)(message)
                