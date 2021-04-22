from channels.db import database_sync_to_async

from .exceptions import ClientError
from .models import ChatGroup, Messages


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
def create_group(newUsers, user, name):
    """
    Create a new group
    """
    # Check if the user is logged in
    if not user.is_authenticated:
        raise ClientError("USER_HAS_TO_LOGIN")
    # Find the room they requested (by ID)

    # rename created room to list of newusers
    try:
        for u in newUsers:
        room.users.add(models.Account.objects.get(username=u.strip()))
    room.users.add(user)

    name = "-".join([x.username for x in room.users.all()])

    room = ChatGroup.objects.create(members=newUsers, created_by=user,
                                    group_name=)
    except ChatGroup.DoesNotExist:

        raise ClientError("ROOM_INVALID")

    return room


@database_sync_to_async
def fetch_recent(user, room_id):
    """
    Print out past messages
    """
    # Check if the user is logged in
    if not user.is_authenticated:
        raise ClientError("USER_HAS_TO_LOGIN")
    # Find the room they requested (by ID)
    try:
        return list(Messages.objects.filter(
            (Q(ChatGroup=room_id)).order_by('sent_at')))
    except ChatGroup.DoesNotExist:

        raise ClientError("NO_MESSAGES")
