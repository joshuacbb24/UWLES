from channels.db import database_sync_to_async

from .exceptions import ClientError
from .models import ChatGroup, Messages, Account, OfflineMessage

import datetime


class RoomExistsException(Exception):
    def __init__(self, room):
        self.room = room

# This decorator turns this function from a synchronous function into an async one
# we can call from our async consumers, that handles Django DBs correctly.
# For more, see http://channels.readthedocs.io/en/latest/topics/databases.html


@database_sync_to_async
def get_room_or_error(room_id, user):
    """
    Tries to fetch a room for the user, checking permissions along the way.
    """
    # Check if the user is logged in
    if not user.is_authenticated:
        raise ClientError("USER_HAS_TO_LOGIN")
    # Find the room they requested (by ID)
    try:
        room = ChatGroup.objects.get(pk=room_id)
    except ChatGroup.DoesNotExist:
        raise ClientError("ROOM_INVALID")
    # Check permissions
    # if room.staff_only and not user.is_staff:
    #    raise ClientError("ROOM_ACCESS_DENIED")
    return room


@database_sync_to_async
def save_message(room_id, user, message, file, notice):
    """
    Save message data to database
    """
    # Check if the user is logged in
    if not user.is_authenticated:
        raise ClientError("USER_HAS_TO_LOGIN")
    # Find the room they requested (by ID)
    try:
        room = ChatGroup.objects.get(pk=room_id)
    except ChatGroup.DoesNotExist:
        raise ClientError("ROOM_INVALID")
    if file == True:
        message = Messages.objects.create(
            chat_group=room, from_user=user, message=message, is_file=True, is_notice=False)
    elif notice == True:
        message = Messages.objects.create(
            chat_group=room, from_user=user, message=message, is_file=False, is_notice=True)
    else:
        message = Messages.objects.create(
            chat_group=room, from_user=user, message=message, is_file=False, is_notice=False)

    current_datetime = datetime.datetime.now()
    room.rank = current_datetime
    #print("current_datetime", current_datetime)
    room.save()

    return message


@database_sync_to_async
def create_group(newUsers, user):
    """
    Create a new group
    """
    # Check if the user is logged in
    if not user.is_authenticated:
        raise ClientError("USER_HAS_TO_LOGIN")
    # Find the room they requested (by ID)

    # rename created room to list of newusers
    try:
       # for u in newUsers:
       # room.users.add(models.Account.objects.get(username=u.strip()))
        # room.users.add(user)
        users = []
        users.append(user.username)
        for x in newUsers:
            users.append(x['name'])

        name = "-".join(users)

        rooms = ChatGroup.objects.filter(group_name=name)
        if rooms.exists():

            raise RoomExistsException(rooms.first())

        room = ChatGroup.objects.create(created_by=user,
                                        group_name=name)
        for member in newUsers:
            room.members.add(member['value'])
            #print("tag value", member['value'])
        room.members.add(user)

        avatararrs = room.members.all()
        avatararray = []
        for avatararr in avatararrs:

            avatararray.append(
                {'username': avatararr.username,
                    'avatar': avatararr.avatar.url if avatararr.avatar else '',
                    'default': avatararr.bgColor})
        # temporarily add avatars to group so that it is received only on the front end
        room.avatars = avatararray

    except ChatGroup.DoesNotExist:

        raise ClientError("ROOM_INVALID")

    return room, list(room.members.all())


@database_sync_to_async
def fetch_recent(room_id):
    """
    ##print out past messages
    """
    # Find the room they requested (by ID)
    try:
        return list(Messages.objects.filter(chat_group=room_id).order_by('sent_at').select_related('from_user'))

    except Messages.DoesNotExist:

        raise ClientError("NO_MESSAGES")


@database_sync_to_async
def fetch_members(room_id):
    """
    get list of members in room
    """
    # find the room they requested (by ID)
    try:
        people = ChatGroup.objects.get(pk=room_id)
        room = ChatGroup.objects.get(pk=room_id)

    except Account.DoesNotExist:

        raise ClientError("NO_ACCOUNTS")

    return list(people.members.all()), room


@database_sync_to_async
def fetch_users(user):
    """
    get list of members in room
    """
    # find the room they requested (by ID)
    try:
        all_entries = Account.objects.exclude(username=user)
        return list(all_entries)

    except Account.DoesNotExist:

        raise ClientError("NO_ACCOUNTS")


@database_sync_to_async
def add_group(room_id, newUsers, user):
    """
    Create a new group
    """
    # Check if the user is logged in
    if not user.is_authenticated:
        raise ClientError("USER_HAS_TO_LOGIN")
    # Find the room they requested (by ID)

    # rename created room to list of newusers
    try:
       # for u in newUsers:
       # room.users.add(models.Account.objects.get(username=u.strip()))
        # room.users.add(user)
        mem = ChatGroup.objects.get(pk=room_id)
        users = []
        for member in newUsers:
            mem.members.add(member['value'])
            mem.save()

        if mem.edited == True:

            name = mem.group_name

        else:
            chat_members = mem.members.all()

            for chat_member in chat_members:

                users.append(chat_member.username)

            name = "-".join(users)

        mem.group_name = name + "-additional"
        mem.save()

        avatararrs = mem.members.all()
        avatararray = []
        message = []
        last_message = Messages.objects.filter(
            chat_group=room_id).latest('sent_at')
        message.append(last_message.message)
        #print("message", message)
        mem.preview = message
        for avatararr in avatararrs:

            avatararray.append(
                {'username': avatararr.username,
                    'avatar': avatararr.avatar.url if avatararr.avatar else '',
                    'default': avatararr.bgColor})
        # temporarily add avatars to group so that it is received only on the front end
        mem.avatars = avatararray

    except ChatGroup.DoesNotExist:

        raise ClientError("ROOM_INVALID")

    return mem, list(mem.members.all())


@database_sync_to_async
def fetch_rooms(user):
    """
    get list of members in room
    """
    # find the room they requested (by ID)
    try:
        members = []
        alert = "User made change to chat."
        groups = ChatGroup.objects.filter(members=user).order_by('-rank')
        for group in groups:
            unreadroom = OfflineMessage.objects.filter(
                offline_user=user, chat_group=group)
            group.acknowledged = False
            group.unread = False
            if unreadroom.exists():
                group.unread = True
                for unreadroomexists in unreadroom:
                    if unreadroomexists.acknowledged == True:
                        group.acknowledged = True

            avatararrs = group.members.all()
            avatararray = []
            message = []
            #print("last_message", group, group.id)
            last_message = Messages.objects.filter(
                chat_group=group).latest('sent_at')
            if last_message.is_notice == False:
                message.append(last_message.message)
                #print("message", message)
                group.preview = message
            else:
                message.append(alert)
                #print("message", alert)
                group.preview = message
            for avatararr in avatararrs:

                # if avatararr.username == user.username:
                #    continue
                # else:
                avatararray.append(
                    {'username': avatararr.username,
                        'avatar': avatararr.avatar.url if avatararr.avatar else '',
                        'default': avatararr.bgColor})
            # temporarily add avatars to group so that it is received only on the front end
            group.avatars = avatararray

        return list(groups)

    except ChatGroup.DoesNotExist:

        raise ClientError("NO_Groups")


@database_sync_to_async
def delete_room(room_id, myself):
    """
    get list of members in room
    """
    # find the room they requested (by ID)
    try:
        users = []
        room = ChatGroup.objects.get(pk=room_id)
        room.members.remove(myself)
        room.save()
        if room.edited == True:
            name = room.group_name

        else:
            chat_members = room.members.all()

            for chat_member in chat_members:

                users.append(chat_member.username)

            name = "-".join(users)

        user_account = Account.objects.get(username=myself)

        room.group_name = name + "-deleted"
        room.save()

        avatararrs = room.members.all()
        avatararray = []
        for avatararr in avatararrs:

            avatararray.append(
                {'username': avatararr.username,
                    'avatar': avatararr.avatar.url if avatararr.avatar else '',
                    'default': avatararr.bgColor})
        # temporarily add avatars to group so that it is received only on the front end
        room.avatars = avatararray

    except ChatGroup.DoesNotExist:

        raise ClientError("Members do not exist")

    return room, list(room.members.all()), user_account


@ database_sync_to_async
def fetch_title(room_id):
    """
    get list of members in room
    """
    # find the room they requested (by ID)
    try:
        title = ChatGroup.objects.get(id=room_id)
        return title

    except ChatGroup.DoesNotExist:

        raise ClientError("ROOM DOES NOT EXIST")


@ database_sync_to_async
def delete_user(room_id, old_user):
    """
    get list of members in room
    """
    # find the room they requested (by ID)
    try:
        users = []
        messages = []
        suffix = "-removed"
        room = ChatGroup.objects.get(pk=room_id)
        old_name = room.group_name + suffix
        room.members.remove(old_user)
        room.save()

        old_messages = Messages.objects.filter(chat_group=room_id)

        if room.edited == True:

            name = room.group_name

        else:
            chat_members = room.members.all()

            for chat_member in chat_members:

                users.append(chat_member.username)

            name = "-".join(users)

        room.group_name = name + suffix
        room.save()
        #print("something")
        user_account = Account.objects.get(pk=old_user)
        new_room = ChatGroup.objects.create(
            group_name=old_name, created_by=user_account)
        new_room.solitary = True
        #print("new room", new_room)
        new_room.members.add(old_user)
        new_room.save()

        for old_message in old_messages:
            old_message.pk = None
            old_message.chat_group = new_room
            old_message.save()

        """ if you set the pk of a django key to null you remove the ref to the row in the database if you
        then save that obj you get a new row in the database
        """
        avatararrs = room.members.all()
        avatararray = []
        for avatararr in avatararrs:

            avatararray.append(
                {'username': avatararr.username,
                    'avatar': avatararr.avatar.url if avatararr.avatar else '',
                    'default': avatararr.bgColor})
        # temporarily add avatars to group so that it is received only on the front end
        room.avatars = avatararray

        avatarremove = new_room.members.all()
        avatararrayremove = []
        for avatar in avatarremove:

            avatararrayremove.append(
                {'username': avatar.username,
                    'avatar': avatar.avatar.url if avatar.avatar else '',
                    'default': avatar.bgColor})
        # temporarily add avatars to group so that it is received only on the front end
        new_room.avatars = avatararrayremove

    except ChatGroup.DoesNotExist:
        #print("except")
        raise ClientError("Members do not exist")

    return room, list(room.members.all()), user_account, new_room


@ database_sync_to_async
def editname(room_id, new_name):
    try:
        nameOfRoom = new_name
        room = ChatGroup.objects.get(pk=room_id)
        room.group_name = nameOfRoom
        room.edited = True
        room.save()

    except ChatGroup.DoesNotExist:

        raise ClientError("Members do not exist")

    return room, nameOfRoom


@ database_sync_to_async
def unread(room_id, new_name, message):
    try:
        room = ChatGroup.objects.get(pk=room_id)
        offlineuser = OfflineMessage.objects.filter(
            chat_group=room, offline_user=new_name)
        if isinstance(message, int):
            message = Messages.objects.get(pk=message)
        if offlineuser.exists():
            return
        OfflineMessage.objects.create(
            chat_group=room, offline_user=new_name, message=message)

    except Account.DoesNotExist:

        raise ClientError("NO_ACCOUNT")


@ database_sync_to_async
def fetch_unread(room_id, new_name, message):
    try:
        room = ChatGroup.objects.get(pk=room_id)
        offlineusers = OfflineMessage.objects.filter(
            chat_group=room, offline_user=new_name, message=message)
        if offlineusers.exists():
            offlineuser = offlineusers[0]
            #print("utiles fetch unread", offlineuser)
            return offlineuser
        else:
            return False

    except OfflineMessage.DoesNotExist:

        raise ClientError("NO_MESSAGES_UNREAD")


@ database_sync_to_async
def acknowledged_message(room_id, myself):
    try:
        room = ChatGroup.objects.get(pk=room_id)
        offlineusers = OfflineMessage.objects.filter(
            chat_group=room, offline_user=myself)
        if offlineusers.exists():
            for offlineuser in offlineusers:
                offlineuser.acknowledged = True
                offlineuser.save()

    except OfflineMessage.DoesNotExist:

        raise ClientError("NO_MESSAGES_ACKNOWLED")


@ database_sync_to_async
def get_self(myself):
    try:
        me = Account.objects.get(username=myself)
        return me
    except Account.DoesNotExist:

        raise ClientError("NOT A USER")


@ database_sync_to_async
def delete_unread(room_id, new_name, message):
    try:
        room = ChatGroup.objects.get(pk=room_id)
        offlineusers = OfflineMessage.objects.get(
            chat_group=room, offline_user=new_name, message=message)
        if offlineusers:
            #print("utiles delete unread", offlineusers)
            offlineusers.delete()

    except OfflineMessage.DoesNotExist:

        raise ClientError("NO Message To Delete")


@ database_sync_to_async
def online(myself):
    try:
        me = Account.objects.get(username=myself)
        me.is_online = True
        me.save()
    except Account.DoesNotExist:

        raise ClientError("NOT CONNECTED")


@ database_sync_to_async
def offline(myself):
    try:
        me = Account.objects.get(username=myself)
        me.is_online = False
        me.save()
    except Account.DoesNotExist:

        raise ClientError("NOT CONNECTED")
