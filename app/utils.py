from channels.db import database_sync_to_async

from .exceptions import ClientError
from .models import ChatGroup, Messages, Account


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
def save_message(room_id, user, message, link, file):
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
    if link == True:
        message = Messages.objects.create(
            chat_group=room, from_user=user, message=message, is_link=True, is_file=False)
    elif file == True:
        message = Messages.objects.create(
            chat_group=room, from_user=user, message=message, is_link=False, is_file=True)
    else:
        message = Messages.objects.create(
            chat_group=room, from_user=user, message=message, is_link=False, is_file=False)

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
        users = [x['name'] for x in newUsers]
        users.append(user.username)

        name = "-".join(users)

        rooms = ChatGroup.objects.filter(group_name=name)
        if rooms.exists():

            raise RoomExistsException(rooms.first())

        room = ChatGroup.objects.create(created_by=user,
                                        group_name=name)
        for member in newUsers:
            room.members.add(member['value'])
            print("tag value", member['value'])
        room.members.add(user)

        avatararrs = room.members.all()
        avatararray = []
        for avatararr in avatararrs:

            if avatararr.username == user.username:
                continue
            else:
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
    Print out past messages
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

        return list(people.members.all()), room

    except ChatGroup.DoesNotExist:

        raise ClientError("NO_GROUPS")


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

        mem.group_name = name + "additional"
        mem.save()

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
        messages = []
        members = []
        groups = ChatGroup.objects.filter(members=user)
        #all_entries = list(groups)
        # for x in all_entries:
        #    last_message = Messages.objects.filter(
        #        chat_group=x.group_name).latest('sent_at')
        #    messages.append(last_message)
        for group in groups:
            avatararrs = group.members.all()
            avatararray = []
            for avatararr in avatararrs:

                if avatararr.username == user.username:
                    continue
                else:
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

        room.group_name = name + "deleted"
        room.save()

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
        suffix = "removed"
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
        print("something")
        user_account = Account.objects.get(pk=old_user)
        new_room = ChatGroup.objects.create(
            group_name=old_name, created_by=user_account)
        new_room.solitary = True
        print("new room", new_room)
        new_room.members.add(old_user)
        new_room.save()

        for old_message in old_messages:
            old_message.pk = None
            old_message.chat_group = new_room
            old_message.save()

        """ if you set the pk of a django key to null you remove the ref to the row in the database if you
        then save that obj you get a new row in the database
        """
    except ChatGroup.DoesNotExist:
        print("except")
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
