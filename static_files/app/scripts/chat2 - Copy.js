$("document").ready(function () {

    let messagesByRoom = {};
    let activeRoom = null;
    let creatingNewChat = false;
    console.log('Connecting...');
    const chatSocket = new WebSocket(
        'ws://'
        + window.location.host
        + '/ws/app/'
    );

    chatSocket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        console.log('received message', data);
        addMessage(data)
        // document.querySelector('#chat-log').value += (data.from + " : " +data.message + '\n');
    };

    chatSocket.onopen = function (e) {
        console.log('Chat socket connected');
    };

    chatSocket.onclose = function (e) {
        console.error('Chat socket closed unexpectedly');
    };

    $(".room").on("click", function () {
        console.log('clicked room', $(this))
        //data-name="{{room.name}}" data-id='{{room.id}}
        const roomId = $(this).data('id')
        const roomName = $(this).data('name')
        changeRoom(roomId, roomName);
    });

    function changeRoom(roomId, roomName) {
        console.log('changing room');
        activeRoom = roomId;
        let data = { roomId: roomId, room_name: roomName }
        chatSocket.send(JSON.stringify(data))
        clearAllMessages();
    };

    //document.querySelector('#chat-message-input').focus();
    document.querySelector('#chat-message-input').onkeyup = function (e) {
        if (e.keyCode === 13) {  // enter, return
            document.querySelector('#chat-message-submit').click();
        }
    };

    function addMessage(message) {
        //$("#chat-log").html("");
        console.log(message);

        if (!messagesByRoom.hasOwnProperty(message.room_id)) {
            messagesByRoom[message.room_id] = [];
        }
        let found = false;
        // messagesByRoom has a property for each room id,
        // therefore messagesByRoom[message.room_id] is the current list of messages for the same room as this message
        for (let i = 0; i < messagesByRoom[message.room_id].length; i++) {
            if (messagesByRoom[message.room_id][i].id == message.id) {
                found = true;
                break;
            }
        }
        if (!found) {
            messagesByRoom[message.room_id].push(message);
        }
        console.log('messagesByRoom', messagesByRoom);
        //{message: "adadf", type: "incoming", from: "kutter"}
        /*
        let text = $("#chat-log").html()
        const cssClass = $("#myself").val() == user ? 'outgoing' : 'incoming';
        text  += `<div class="${cssClass}"> ${message} </div>`; 
    
        
        $("#chat-log").html(text)
        */
        //showAllMessages();
        // 
        if (activeRoom && activeRoom == message.room_id) {
            showMessage(message);
        } else {
            // TODO maybe show notification on room
        }
    }

    function clearAllMessages() {

        $("#chat-log").html('');
    }

    function showMessage(messageData) {
        let user = messageData.from;
        let message = messageData.message;
        let text = $("#chat-log").html()
        const cssClass = $("#myself").val() == user ? 'outgoing' : 'incoming';
        //if cssClass is incoming 
        //place profile pic to the left
        //date float right
        if (cssClass == 'outgoing') {
            text += `<div class="${cssClass}">${user}: ${message} </div>`;
        } else {
            text += `<img class="profile-pic" src="{{user.avatar.url}}"><div class="${cssClass}">${user}: ${message} </div>`;
        }

        //else
        //no profile pic
        //date float left
        $(".msg_history").animate({ scrollTop: $(document).height() }, "fast");


        $("#chat-log").html(text)
    }

    function showAllMessages(room_id) {
        for (let i = 0; i < messagesByRoom[room_id].length; i++) {
            showMessage(messagesByRoom[room_id][i])
        }
    }

    document.querySelector('#chat-message-submit').onclick = function (e) {
        if (creatingNewChat) {
            creatingNewChat = false;

            let data = { roomId: 'new_room', 'newUsers': JSON.parse($("#tag-input").val()) }
            console.log('adding users to room', data);
            chatSocket.send(JSON.stringify(data))
            clearAllMessages();
        }

        const messageInputDom = document.querySelector('#chat-message-input');
        const message = messageInputDom.value;
        const user = $("#myself").val()
        //showMessage({from: user, message: message})

        // How can we send this before we know the roomid?
        chatSocket.send(JSON.stringify({
            'to': activeRoom,
            'message': message
        }));
        messageInputDom.value = '';
    };

    function createChatFunction() {
        //deselect current/active chat
        //add deselect function that empties hides/empties chat log when create new chat button is clicked
        //$("#chat-log").empty();
        console.log('createChatFunction');

        var header = document.getElementById("rooms-list");
        var rooms = header.getElementsByClassName("room");
        for (var i = 0; i < rooms.length; i++) {
            var current = document.getElementsByClassName("active");
            if (current.length > 0) {
                current[0].className = current[0].className.replace(" active", "");
            }
        }
        $("#users-list").show();
        $("#tag-input").show();
        $("#chat-log").empty()
        CURRENT_ROOM = false;
        $("#room").empty()

        //if (chatSocket) {
        //    chatSocket.close()
        //}
        creatingNewChat = true;
    }

    $('#create-chat').on('click', createChatFunction)


    function myFunction() {
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById("search-bar");
        filter = input.value.toUpperCase();
        ul = document.getElementById("chat_people");
        li = ul.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }
});