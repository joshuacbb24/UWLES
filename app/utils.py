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
def save_message(room_id, user, message):
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

    message = Messages.objects.create(
        chat_group=room, from_user=user, message=message)

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
        room.members.add(user)

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

        return list(people.members.all())

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

        people = ChatGroup.objects.get(pk=room_id)

        chat_members = list(people.members.all())

        for chat_member in chat_members:
            users.append(chat_member.username)

        name = "-".join(users)

        rooms = ChatGroup.objects.filter(group_name=name)
        if rooms.exists():

            raise RoomExistsException(rooms.first())

        people.group_name = name
        people.save()

    except ChatGroup.DoesNotExist:

        raise ClientError("ROOM_INVALID")

    return people, list(people.members.all())


@database_sync_to_async
def fetch_rooms(user):
    """
    get list of members in room
    """
    # find the room they requested (by ID)
    try:
        all_entries = ChatGroup.objects.filter(members=user)
        for x in all_entries:
            last_message = Messages.objects.get(
                chat_group=x.group_name).order_by('date-sent')[0]
        return list(all_entries)

    except ChatGroup.DoesNotExist:

        raise ClientError("NO_Groups")


@database_sync_to_async
def delete_user(room_id, old_user):
    """
    get list of members in room
    """
    # find the room they requested (by ID)
    try:
        users = []
        room = ChatGroup.objects.get(pk=room_id)
        room.members.remove(old_user['value'])
        room.save()

        chat_members = list(room.members.all())

        for chat_member in chat_members:
            users.append(chat_member.username)

        name = "-".join(users)

        rooms = ChatGroup.objects.filter(group_name=name)

        if rooms.exists():

            raise RoomExistsException(rooms.first())

        room.group_name = name
        room.save()

    except ChatGroup.DoesNotExist:

        raise ClientError("Members do not exist")

    return room, list(room.members.all())


@database_sync_to_async
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
