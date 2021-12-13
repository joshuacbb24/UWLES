from django.conf import settings

import pytz

from channels.generic.websocket import AsyncJsonWebsocketConsumer
from .exceptions import ClientError
from .utils import fetch_unread_message_id, get_room_or_error, save_message, create_group, fetch_recent, fetch_members, fetch_users, add_group, fetch_rooms, fetch_title, delete_room, delete_user, editname, unread, fetch_unread, acknowledged_message, get_self, delete_unread, offline, online, fetch_unread_message_id, RoomExistsException

"""
class CalConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
    # Are they logged in?
    if self.scope["user"].is_anonymous:
        # Reject the connection
        await self.close()
    else:
        # Accept the connection
        await self.accept()
    self.user_channels[self.scope['user'].username] = self.channel_name

    async def disconnect(self, code):
        self.user_channels[self.scope['user'].username] = None
        try:
            await self.leave_room(room_id)
        except ClientError:
            pass
    # Command helper methods called by receive_json

    async def receive_json(self, content):
        # Messages will have a "command" key we can switch on
        command = content.get("command", None)
        print('received command', command)
        channel_name = self.user_channels.get(self.scope['user'].username)
        try:
            if command == "add":
               await self.send_json({'rooms': {
                        'id': group.id,
                        'name': group.group_name,
                        'avatars': group.avatars,
                        'preview': group.preview,
                        'unread': group.unread,
                        'acknowledged': group.acknowledged,
                    }, 'msg_type': 'get_rooms', })
            elif command == "edit":
               await self.send_json({'rooms': {
                        'id': group.id,
                        'name': group.group_name,
                        'avatars': group.avatars,
                        'preview': group.preview,
                        'unread': group.unread,
                        'acknowledged': group.acknowledged,
                    }, 'msg_type': 'get_rooms', })
            elif command == "delete":
               await self.send_json({'rooms': {
                        'id': group.id,
                        'name': group.group_name,
                        'avatars': group.avatars,
                        'preview': group.preview,
                        'unread': group.unread,
                        'acknowledged': group.acknowledged,
                    }, 'msg_type': 'get_rooms', })        
        except:

"""


class ChatConsumer(AsyncJsonWebsocketConsumer):
    """
    This chat consumer handles websocket connections for chat clients.
    It uses AsyncJsonWebsocketConsumer, which means all the handling functions
    must be async functions, and any sync work (like ORM access) has to be
    behind database_sync_to_async or sync_to_async. For more, read
    http://channels.readthedocs.io/en/latest/topics/consumers.html
    """
    user_channels = {}
    user_connections = {}
    timeformat = "%b %d, %I:%M %p"

    def formatdatetime(self, mydate):
        easterntz = pytz.timezone("America/New_York")
        mylocaldate = easterntz.normalize(mydate.astimezone(easterntz))
        sometime = mylocaldate.strftime(self.timeformat)
        return sometime

        # WebSocket event handlers

    async def connect(self):
        """
        Called when the websocket is handshaking as part of initial connection.
        """
        # Are they logged in?
        if self.scope["user"].is_anonymous:
            # Reject the connection
            await self.close()
        else:
            # Accept the connection
            await self.accept()
            
        # Store which rooms the user has joined on this connection
        self.rooms = set()
        #when user connects check to see if user already has a channel name connected to it
        #if so set self.user_channels[self.scope['user'].username] to the already given channel name
        #if not get a new one with self.user_channels[self.scope['user'].username] = self.channel_name
        #
        # self.user_channels.get(self.scope['user'].username)
        #print("user channels", self.user_channels)
        #print('channel_name self', self.channel_name)
        #print('channel_name scope', self.scope["user"].username)
        #print('channel_name', self.user_channels.get(self.scope['user'].username))
        ch_name = self.user_channels.get(self.scope['user'].username)
        if not ch_name:
            self.user_channels[self.scope['user'].username] = self.channel_name
            #self.user_connections[self.scope['user'].username] = 1
            await online(self.scope["user"])
        else:
            #ch_connect = self.user_connections.get(self.scope['user'].username)
            #print("ch_connect", ch_connect)
            #new_value = ch_connect + 1
            #print("new_value", new_value)
            #self.user_connections[self.scope['user'].username] = new_value
            self.channel_name = self.user_channels.get(self.scope['user'].username)
        #print('channel_name changed', self.user_channels.get(self.scope['user'].username), self.channel_name)
        #print("user connections", self.user_connections.get(self.scope['user'].username))

        print("all user channel names", self.user_channels)
        print("all user connections", self.user_connections)

    async def receive_json(self, content):
        """
        Called when we get a text frame. Channels will JSON-decode the payload
        for us and pass it as the first argument.
        """
        # Messages will have a "command" key we can switch on
        command = content.get("command", None)
        #print('received command', command)
        try:
            if command == "join":
                myself = self.scope["user"]
                wasclicked = content["wasclicked"]
                if wasclicked == True:
                    # Make them join the room
                    #print("joined room")
                    await self.join_room(content["room"])
                    messages = await fetch_recent(content["room"])
                    for message in messages:
                        unreadmessageid = await fetch_unread_message_id(content["room"], myself, message)
                        print("unreadmessageid", unreadmessageid)
                        await self.send_json({'message': {
                            'id': message.id,
                            'room': content["room"],
                            'text': message.message,
                            'from_user': message.from_user.username,
                            'avatar': message.from_user.avatar.url if message.from_user.avatar else '',
                            'default': message.from_user.bgColor,
                            'notification': False,
                            'sent_at': self.formatdatetime(message.sent_at),
                            'is_file': message.is_file,
                            'notice': message.is_notice,
                            'unread': True if unreadmessageid and message.id == unreadmessageid else False,
                            'received': False,
                        }, 'msg_type': 0, })
                        if unreadmessageid and message.id == unreadmessageid:
                            await delete_unread(content["room"], myself, message)
                else:
                    await self.join_room(content["room"])
            elif command == "leave":
                # Leave the room
                await self.leave_room(content["room"])
            elif command == "was_connected":
                await online(self.scope["user"])
                person = await get_self(self.scope["user"])
                users = await fetch_users(self.scope["user"])
                #print("users", users)
                for user in users:
                    channel_name = self.user_channels.get(user.username)
                    if channel_name:
                        await self.channel_layer.send(
                            channel_name,
                            {
                                "type": "chat.status",
                                "user_id": person.id,
                            }, )
                channel_name = self.user_channels.get(person.username)
                if channel_name:
                    await self.channel_layer.send(
                        channel_name,
                        {
                            "type": "chat.status",
                            "user_id": person.id,
                        }, )
            elif command == "was_disconnected":
                await offline(self.scope["user"])
                person = await get_self(self.scope["user"])
                users = await fetch_users(self.scope["user"])
                #print("users", users)
                for user in users:
                    channel_name = self.user_channels.get(user.username)
                    if channel_name:
                        await self.channel_layer.send(
                            channel_name,
                            {
                                "type": "chat.statusoff",
                                "user_id": person.id,
                            }, )
                channel_name = self.user_channels.get(person.username)
                if channel_name:
                    await self.channel_layer.send(
                        channel_name,
                        {
                            "type": "chat.statusoff",
                            "user_id": person.id,
                        }, )
            elif command == "acknowledged":
                await acknowledged_message(content["room"], self.scope["user"])
            elif command == "add":
                # Leave the room
                room, users = await add_group(content["room"], content["newUsers"], self.scope["user"])
                for user in users:
                    # Send a message to this user's channel
                    channel_name = self.user_channels.get(user.username)
                    if channel_name:
                        await self.channel_layer.send(
                            channel_name,
                            {
                                "type": "chat.append",
                                "room_id": room.id,
                                'name': room.group_name,
                                "username": user.username,
                                "edited": room.edited,
                                'avatars': room.avatars,
                                "preview": room.preview,
                                "msgAlert": content["message"]
                            }, )
                # await self.send_json({'room_id': room.id, 'name': room.group_name, 'msg_type': 'created'})
                message = await save_message(content["room"], self.scope["user"], content["message"], content["file"], content["notice"])
            elif command == "members":
                # get the members of the room
                members, theroom = await fetch_members(content["room"])
                #print('members', members)

                for member in members:
                    channel_name = self.user_channels.get(member.username)
                    #print("channel_name", channel_name)
                    await self.send_json({'member': {
                        'id': member.id,
                        'username': member.username,
                        'email': member.email,
                        "solitary": theroom.solitary,
                        'avatar': member.avatar.url if member.avatar else '',
                        'default': member.bgColor,
                        'online': member.is_online
                    }, 'msg_type': 'get_members', })
            elif command == "rooms":
                # get the chats associated with user

                groups = await fetch_rooms(self.scope["user"])

                for group in groups:

                    await self.send_json({'rooms': {
                        'id': group.id,
                        'name': group.group_name,
                        'avatars': group.avatars,
                        'preview': group.preview,
                        'unread': group.unread,
                        'acknowledged': group.acknowledged,
                    }, 'msg_type': 'get_rooms', })

            elif command == "users":
                # get users in database
                users = await fetch_users(self.scope["user"])
                for user in users:
                    channel_name = self.user_channels.get(user.username)
                    await self.send_json({'user': {
                        'id': user.id,
                        'username': user.username,
                        'email': user.email,
                        'avatar': user.avatar.url if user.avatar else "",
                        'default': user.bgColor,
                        'online': user.is_online
                    }, 'msg_type': 'get_users', })
            elif command == "title":
                # get title of chat
                room_title = await fetch_title(content["room"])
                await self.send_json({'room': {
                    'name': room_title.group_name,
                }, 'msg_type': 'print_title', })
            elif command == "create_unread":
                # make a chat unread
                await unread(content["room"], self.scope["user"], int(content["messageId"]))
                #print("content", content)
                await self.send_json({'unread': {
                    'room': content["room"],
                    'is_notice': content["notice"],
                    'message': content["messagestring"],
                }, 'msg_type': 'get_unread', })
            elif command == "delete":
                room, users, myself = await delete_room(content["room"], self.scope["user"])
                for user in users:
                    # Send a message to this user's channel
                    channel_name = self.user_channels.get(user.username)
                    #print("channel_name", channel_name)
                    if channel_name:
                        await self.channel_layer.send(
                            channel_name,
                            {
                                "type": "chat.delete",
                                "room_id": room.id,
                                'name': room.group_name,
                                "edited": room.edited,
                                "removed_user": myself.username,
                                'avatars': room.avatars,
                                "msgAlert": content["message"]
                            }
                        )

                channel_name = self.user_channels.get(myself.username)
                #print("channel_name for myself", channel_name)
                if channel_name:
                    #print("channel_name inside if", channel_name)
                    await self.channel_layer.send(
                        channel_name,
                        {
                            "type": "chat.delete",
                            "room_id": content["room"],
                            "name": room.group_name,
                            "edited": room.edited,
                            "removed_user": myself.username,
                            'avatars': room.avatars,
                            "msgAlert": content["message"]
                        }
                    )
                message = await save_message(content["room"], self.scope["user"], content["message"], content["file"], content["notice"])
            elif command == "edit":
                #change name of chat
                room, new_name = await editname(content["room"], content["newName"])
                users, newroom = await fetch_members(content["room"])
                for user in users:
                    # Send a message to this user's channel
                    channel_name = self.user_channels.get(user.username)
                    if channel_name:
                        await self.channel_layer.send(
                            channel_name,
                            {
                                "type": "chat.edit",
                                "room_id": content["room"],
                                "name": new_name,
                                "edited": room.edited,
                                "msgAlert": content["message"]
                            }
                        )
                message = await save_message(content["room"], self.scope["user"], content["message"], content["file"], content["notice"])
            elif command == "remove":
                #remove user from chat
                room, users, olduser, newRoom = await delete_user(content["room"], content["old_user"])
                for user in users:
                    # Send a message to this user's channel
                    channel_name = self.user_channels.get(user.username)
                    if channel_name:
                        await self.channel_layer.send(
                            channel_name,
                            {
                                "type": "chat.remove",
                                "room_id": content["room"],
                                "name": room.group_name,
                                "edited": room.edited,
                                "removed_user": olduser.username,
                                "new_room": newRoom.id,
                                "solitary": room.solitary,
                                'avatars': room.avatars,
                                "msgAlert": content["message"]
                            }
                        )
                channel_name = self.user_channels.get(olduser.username)
                if channel_name:
                    await self.channel_layer.send(
                        channel_name,
                        {
                            "type": "chat.remove",
                            "room_id": content["room"],
                            "name": room.group_name,
                            "edited": room.edited,
                            "removed_user": olduser.username,
                            "new_room": newRoom.id,
                            "solitary": room.solitary,
                            'avatars': newRoom.avatars,
                            "msgAlert": content["message"]

                        }
                    )
                message = await save_message(content["room"], self.scope["user"], content["message"], content["file"], content["notice"])
            elif command == "send":
                #send message to chat
                message = await save_message(content["room"], self.scope["user"], content["message"], content["file"], content["notice"])
                print("message", content["message"])

                roomusers, newroom = await fetch_members(content["room"])
                await self.send_room(content["room"], message, notification=True)
                """
                user = self.scope["user"]
                roomtrial = await get_room_or_error(content["room"], user)
                ch_group_list = self.channel_layer.group_channels(roomtrial.group_name)
                for ch_group in ch_group_list:
                    print("channel list", ch_group)
                """
                for roomuser in roomusers:
                    channel_name = self.user_channels.get(roomuser.username)
                    print("username inside send", channel_name)
                    print("roomuser.username", roomuser.username)
                    if channel_name:
                        #print("username inside send if", channel_name)
                        await self.channel_layer.send(
                            channel_name,
                            {
                                "type": "chat.send",
                                "room_id": content["room"],
                                "notification": True,
                                "message": message.id,
                                "messagestring": message.message,
                                "is_notice": message.is_notice,
                                "sender": self.scope["user"].username
                            }
                        )
                    elif not channel_name:
                        await unread(content["room"], roomuser, message)
                    # create offline object with offline username and the room they have unread messages in as well as the first message id
                    # username and roomid should uniquely identify a specific tuple with a message object
                    # so if another message is sent to the same room when user is offline it will only keep the first entry
                    # then filter through those rooms when get_rooms and joined is called and give them unread class
                    # when a room is clicked an unread message bar will appear above the message with the id
                    # when a message is sent from unread chat or room is clicked again the unread message bar will go away

            elif command == "create":
                #create a new chat
                # maybe a primary key for name
                # json parse new users for name of chat
                try:

                    room, users = await create_group(content["newUsers"], self.scope["user"])
                    message = await save_message(room.id, self.scope["user"], content["message"], content["file"], content["notice"])
                    # await self.send_room(room, message, notification=True)
                    #print('user channels', self.user_channels)
                    for user in users:
                        if user.username != self.scope["user"].username:
                            await unread(room.id, user, message)
                        # Send a message to this user's channel
                        channel_name = self.user_channels.get(user.username)
                        if channel_name:
                            await self.channel_layer.send(
                                channel_name,
                                {
                                    "type": "chat.add",
                                    "room_id": room.id,
                                    'name': room.group_name,
                                    "username": user.username,
                                    "message": content["message"],
                                    'avatars': room.avatars,
                                    "notification": True,
                                    "created_by": content["created_by"]
                                }
                            )

                # await self.send_json({'room_id': room.id, 'name': room.group_name, 'msg_type': 'created'})
                except RoomExistsException as inst:
                    await self.send_json({'msg_type': 'room_exists', 'room_name': inst.room.group_name, 'room_id': inst.room.id})
        except ClientError as e:
            # Catch any errors and send it back
            await self.send_json({"error": e.code})

    async def disconnect(self, code):
        """
        Called when the WebSocket closes for any reason.
        """
        # Leave all the rooms we are still in
        print("was disconnected")
        #ch_connect = self.user_connections.get(self.scope['user'].username)
        #if ch_connect == 1:
        await offline(self.scope["user"])
        self.user_channels[self.scope['user'].username] = None
        #    self.user_connections[self.scope['user'].username] = None           
        #else:
        #   new_value = ch_connect - 1
        #   self.user_connections[self.scope['user'].username] = new_value

        for room_id in list(self.rooms):
            try:
                await self.leave_room(room_id)
            except ClientError:
                pass

    # Command helper methods called by receive_json

    async def join_room(self, room_id):
        """
        Called by receive_json when someone sent a join command.
        """
        # The logged-in user is in our scope thanks to the authentication ASGI middleware
        user = self.scope["user"]
        print('joining room', room_id, user)
        room = await get_room_or_error(room_id, user)
        print('channel', self.channel_layer, self.channel_name)
        # Send a join message if it's turned on
        if settings.NOTIFY_USERS_ON_ENTER_OR_LEAVE_ROOMS:
            await self.channel_layer.group_send(
                room.group_name,
                {
                    "type": "chat.join",
                    "room_id": room_id,
                    "username": user.username,
                }
            )
        # Store that we're in the room
        self.rooms.add(room_id)
        # Add them to the group so they get room messages otherwise they're not going to be added to the group
        await self.channel_layer.group_add(
            room.group_name,
            self.channel_name,
        )
        # Instruct their client to finish opening the room
        await self.send_json({
            "join": str(room.id),
            "title": room.group_name,
        })

    async def leave_room(self, room_id):
        """
        Called by receive_json when someone sent a leave command.
        """
        # The logged-in user is in our scope thanks to the authentication ASGI middleware
        print('leaving room', room_id)
        room = await get_room_or_error(room_id, self.scope["user"])
        # Send a leave message if it's turned on
        #ch_connect = self.user_connections.get(self.scope['user'].username)
        #if not ch_connect:
        if settings.NOTIFY_USERS_ON_ENTER_OR_LEAVE_ROOMS:
            await self.channel_layer.group_send(
                room.group_name,
                {
                    "type": "chat.leave",
                    "room_id": room_id,
                    "username": self.scope["user"].username,
                }
            )
        # Remove that we're in the room
        self.rooms.discard(room_id)
        # Remove them from the group so they no longer get room messages

        #To-Do: For functions where user is removed from chat have to do manually

        #self.rooms.discard(room_id)
        await self.channel_layer.group_discard(
            room.group_name,
            self.channel_name,
        )
        
        # Instruct their client to finish closing the room
        await self.send_json({
            "leave": str(room.id),
        })
        #else:
        #    new_value = ch_connect - 1
        #    self.user_connections[self.scope['user'].username] = new_value

    async def send_room(self, room_id, message, notification):
        """
        Called by receive_json when someone sends a message to a room.
        """
        # Check they are in this room
        if room_id not in self.rooms:
            raise ClientError("ROOM_ACCESS_DENIED")
        # Get the room and send to the group about it
        room = await get_room_or_error(room_id, self.scope["user"])
        #print("edit message received", message.message)
        await self.channel_layer.group_send(
            room.group_name,
            {
                "type": "chat.message",
                "room_id": room_id,
                "username": message.from_user.username,
                "default":  message.from_user.bgColor,
                "avatar":  message.from_user.avatar.url if message.from_user.avatar else '',
                "notification": notification,
                "message": message.message,
                "sent_at": self.formatdatetime(message.sent_at),
                "is_file": message.is_file,
                "unread": False,
                "notice": message.is_notice,
                "received": True,
            }
        )
    # Handlers for messages sent over the channel layer
    # These helper methods are named by the types we send - so chat.join becomes chat_join

    async def chat_add(self, event):
        """
        Called when someone has created a chat.
        """
        # Send a message down to the client
        await self.send_json(
            {
                "msg_type": "created",
                "room": event["room_id"],
                "name": event["name"],
                "username": event["username"],
                "message": event["message"],
                "notification": event["notification"],
                'avatars': event['avatars'],
                "created_by": event["created_by"]
            },
        )

    async def chat_status(self, event):
        """
        Called when someone has connected.
        """        
        await self.send_json(
            {
                "msg_type": "change_status",
                "id": event["user_id"],
            },
        )

    async def chat_statusoff(self, event):
        """
        Called when someone has disconnected.
        """         
        await self.send_json(
            {
                "msg_type": "change_status_off",
                "id": event["user_id"],
            },
        )

    async def chat_edit(self, event):
        """
        Called when someone has changed name of a chat.
        """
        # Send a message down to the client
        await self.send_json(
            {
                "msg_type": "edit",
                "room": event["room_id"],
                "name": event["name"],
                "edited": event['edited'],
                "msgAlert": event["msgAlert"]
            },
        )

    async def chat_remove(self, event):
        """
        Called when someone has removed user from a chat.
        """
        # Send a message down to the client
        await self.send_json(
            {
                "msg_type": "remove_user",
                "room": event["room_id"],
                "name": event["name"],
                "edited": event['edited'],
                "removed_user": event["removed_user"],
                "new_room": event["new_room"],
                "solitary": event["solitary"],
                'avatars': event['avatars'],
                "msgAlert": event["msgAlert"]
            },
        )

    async def chat_append(self, event):
        """
        Called when someone has added people to a chat.
        """        
        await self.send_json(
            {
                "msg_type": "get_additional",
                "room": event["room_id"],
                "name": event["name"],
                "username": event["username"],
                "edited": event['edited'],
                'avatars': event['avatars'],
                "preview": event["preview"],
                "msgAlert": event["msgAlert"]

            },
        )

    async def chat_send(self, event):
        """
        Called when users who are online but not in the same room as sender.
        """
        #print("reached inside send")
        await self.send_json(
            {
                "msg_type": "sent_to_others",
                "room": event["room_id"],
                "notification": event["notification"],
                "message": event["message"],
                "messagestring": event["messagestring"],
                "is_notice": event["is_notice"],
                "sender": event["sender"]
            },
        )

    async def chat_delete(self, event):
        """
        Called when someone has deleted a chat.
        """
        await self.send_json(
            {
                "msg_type": "delete_room",
                "room": event["room_id"],
                "name": event["name"],
                "edited": event['edited'],
                "removed_user": event["removed_user"],
                'avatars': event['avatars'],
                "msgAlert": event["msgAlert"]
            },
        )

    async def chat_join(self, event):
        """
        Called when someone has joined our chat.
        """
        # Send a message down to the client
        await self.send_json(
            {
                "msg_type": settings.MSG_TYPE_ENTER,
                "room": event["room_id"],
                "username": event["username"],
            },
        )

    async def chat_leave(self, event):
        """
        Called when someone has left our chat.
        """
        # Send a message down to the client
        await self.send_json(
            {
                "msg_type": settings.MSG_TYPE_LEAVE,
                "room": event["room_id"],
                "username": event["username"],
            },
        )

    async def chat_message(self, event):
        """
        Called when someone has messaged our chat.
        """
        print("sent message")
        # Send a message down to the client
        await self.send_json(
            {
                "msg_type": settings.MSG_TYPE_MESSAGE,
                "room": event["room_id"],
                "username": event["username"],
                "message": event["message"],
                "avatar": event['avatar'],
                "default": event['default'],
                "sent_at": event['sent_at'],
                "notification": event['notification'],
                "is_file": event["is_file"],
                "notice": event["notice"],
                "received": event["received"],
            },
        )
