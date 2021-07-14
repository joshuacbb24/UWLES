from django.conf import settings

from channels.generic.websocket import AsyncJsonWebsocketConsumer

from .exceptions import ClientError
from .utils import get_room_or_error, save_message, create_group, fetch_recent, fetch_members, fetch_users, add_group, fetch_rooms, fetch_title, delete_room, delete_user, editname, RoomExistsException


class ChatConsumer(AsyncJsonWebsocketConsumer):
    """
    This chat consumer handles websocket connections for chat clients.
    It uses AsyncJsonWebsocketConsumer, which means all the handling functions
    must be async functions, and any sync work (like ORM access) has to be
    behind database_sync_to_async or sync_to_async. For more, read
    http://channels.readthedocs.io/en/latest/topics/consumers.html
    """
    user_channels = {}
    timeformat = "%m-%d %H:%M %p"

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
        self.user_channels[self.scope['user'].username] = self.channel_name

    async def receive_json(self, content):
        """
        Called when we get a text frame. Channels will JSON-decode the payload
        for us and pass it as the first argument.
        """
        # Messages will have a "command" key we can switch on
        command = content.get("command", None)
        print('received command', command)
        try:
            if command == "join":
                # Make them join the room
                print("joined room")
                await self.join_room(content["room"])
                messages = await fetch_recent(content["room"])
                for message in messages:
                    await self.send_json({'message': {

                        'id': message.id,
                        'text': message.message,
                        'from_user': message.from_user.username,
                        'avatar': message.from_user.avatar.url if message.from_user.avatar else '',
                        'default': message.from_user.bgColor,
                        'notification': False,
                        'sent_at': message.sent_at.strftime(self.timeformat),
                        'is_link': message.is_link,
                        'is_file': message.is_file,
                    }, 'msg_type': 0, })
            elif command == "leave":
                # Leave the room
                await self.leave_room(content["room"])
            elif command == "add":
                # Leave the room
                try:
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

                                }, )
                    # await self.send_json({'room_id': room.id, 'name': room.group_name, 'msg_type': 'created'})
                except RoomExistsException as inst:
                    await self.send_json({'msg_type': 'room_exists', 'room_name': inst.room.group_name, 'room_id': inst.room.id})
            elif command == "members":
                # get the members of the room
                members, theroom = await fetch_members(content["room"])
                print('members', members)
                for member in members:
                    await self.send_json({'member': {
                        'id': member.id,
                        'username': member.username,
                        'email': member.email,
                        "solitary": theroom.solitary
                    }, 'msg_type': 'get_members', })
            elif command == "rooms":
                # get the members of the room
                avatararrs = []
                groups = await fetch_rooms(self.scope["user"])
                for group in groups:
                    avatararrs = group.members.all()
                    await self.send_json({'rooms': {
                        'id': group.id,
                        'name': group.group_name,
                    }, 'msg_type': 'get_rooms', })
                    # for avatararr in avatararrs:
                    #    print("avatararr", avatararr)
                    #    print("avatararr", avatararr.username)
                    #    print("self.scope[user]", self.scope["user"])
                    #    if avatararr.username == self.scope["user"]:
                    #        continue
                    #    else:
                    #        await self.send_json({'rooms': {
                    #            'id': group.id,
                    #            'name': group.group_name,
                    #            'member_of_chat': avatararr.username,
                    #            'avatar': avatararr.avatar.url if avatararr.avatar else '',
                    #            'default': avatararr.bgColor,
                    #            'length': avatararrs.len()
                    #        }, 'msg_type': 'get_room_symbol', })
            elif command == "users":
                # get users in database
                users = await fetch_users(self.scope["user"])
                for user in users:
                    await self.send_json({'user': {
                        'id': user.id,
                        'username': user.username,
                        'email': user.email
                    }, 'msg_type': 'get_users', })
            elif command == "title":
                # get users in database
                room_title = await fetch_title(content["room"])
                await self.send_json({'room': {
                    'name': room_title.group_name,
                }, 'msg_type': 'print_title', })
            elif command == "delete":
                room, users, myself = await delete_room(content["room"], self.scope["user"])
                for user in users:
                    # Send a message to this user's channel
                    channel_name = self.user_channels.get(user.username)
                    print("channel_name", channel_name)
                    if channel_name:
                        await self.channel_layer.send(
                            channel_name,
                            {
                                "type": "chat.delete",
                                "room_id": room.id,
                                'name': room.group_name,
                                "edited": room.edited,
                                "removed_user": myself.username,
                            }
                        )

                channel_name = self.user_channels.get(myself.username)
                print("channel_name for myself", channel_name)
                if channel_name:
                    print("channel_name inside if", channel_name)
                    await self.channel_layer.send(
                        channel_name,
                        {
                            "type": "chat.delete",
                            "room_id": content["room"],
                            "name": room.group_name,
                            "edited": room.edited,
                            "removed_user": myself.username,
                        }
                    )
            elif command == "edit":
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
                                "edited": room.edited

                            }
                        )
            elif command == "remove":
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
                                "solitary": room.solitary
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
                            "solitary": room.solitary
                        }
                    )
            elif command == "send":
                message = await save_message(content["room"], self.scope["user"], content["message"], content["link"], content["file"])
                await self.send_room(content["room"], message, notification=True)
            elif command == "create":
                # maybe a primary key for name
                # json parse new users for name of chat
                try:
                    room, users = await create_group(content["newUsers"], self.scope["user"])
                    message = await save_message(room.id, self.scope["user"], content["message"], content["link"], content["file"])
                    # Add users to room channel
                    print('user channels', self.user_channels)
                    for user in users:
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
                                    "notification": True,
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
        room = await get_room_or_error(room_id, self.scope["user"])
        # Send a leave message if it's turned on
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
        await self.channel_layer.group_discard(
            room.group_name,
            self.channel_name,
        )
        # Instruct their client to finish closing the room
        await self.send_json({
            "leave": str(room.id),
        })

    async def send_room(self, room_id, message, notification=False):
        """
        Called by receive_json when someone sends a message to a room.
        """
        # Check they are in this room
        if room_id not in self.rooms:
            raise ClientError("ROOM_ACCESS_DENIED")
        # Get the room and send to the group about it
        room = await get_room_or_error(room_id, self.scope["user"])
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
                "sent_at": message.sent_at.strftime(self.timeformat),
                "is_link": message.is_link,
                "is_file": message.is_file
            }
        )
    # Handlers for messages sent over the channel layer
    # These helper methods are named by the types we send - so chat.join becomes chat_join

    async def chat_add(self, event):
        """
        Called when someone has added people to a chat.
        """
        # Send a message down to the client
        await self.send_json(
            {
                "msg_type": "created",
                "room": event["room_id"],
                "name": event["name"],
                "username": event["username"],
                "message": event["message"],
                "notification": event["notification"]
            },
        )

    async def chat_edit(self, event):
        """
        Called when someone has added people to a chat.
        """
        # Send a message down to the client
        await self.send_json(
            {
                "msg_type": "edit",
                "room": event["room_id"],
                "name": event["name"],
                "edited": event['edited']
            },
        )

    async def chat_remove(self, event):
        """
        Called when someone has added people to a chat.
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
                "solitary": event["solitary"]
            },
        )

    async def chat_append(self, event):
        await self.send_json(
            {
                "msg_type": "get_additional",
                "room": event["room_id"],
                "name": event["name"],
                "username": event["username"],
                "edited": event['edited']


            },
        )

    async def chat_delete(self, event):
        await self.send_json(
            {
                "msg_type": "delete_room",
                "room": event["room_id"],
                "name": event["name"],
                "edited": event['edited'],
                "removed_user": event["removed_user"]
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
            },
        )
