function addMessage(user, message) {
    //$("#chat-log").html("");
    let text = $("#chat-log").html()
    const cssClass = $("#myself").val() == user ? 'outgoing' : 'incoming';
    //if cssClass is incoming 
    //place profile pic to the left
    //date float right
    if (cssClass == 'outgoing') {
        text += `<div class="${cssClass}">${user}: ${message} </div>`;
    } else {
        text += `<div><img class="profile-pic" src="{{user.avatar.url}}"><span class="${cssClass}">${user}: ${message} </span></div>`;
    }

    $(".msg_history").animate({ scrollTop: $(document).height() }, "fast");


    $("#chat-log").html(text)
}
let CURRENT_ROOM = false;
let chatSocket = false;
function changeRoom(roomId, roomName) {

    CURRENT_ROOM = roomId;
    let url = 'ws://'
        + window.location.host
        + '/ws/app/';
    let data = { roomId: roomId }
    if (roomId != 'new_room') {
        url += roomId + '/';
        chatSocket = new WebSocket(url);
        chatSocket.addEventListener('open', function (event) {
            console.log(this)

            $("#room").text(roomName)

            chatSocket.send(JSON.stringify(data))
        });
        chatSocket.onmessage = function (e) {
            const data = JSON.parse(e.data);
            if (data.roomCreated) {
                $("#rooms-list").append(`<li class='room' data-name="${room.name}" data-id='${room.id}'>${data.room_name}</li>`);
                addEvents();
                chatSocket.close()
                return changeRoom(data.room_id, data.room_name)
            }
            addMessage(data.from, data.message)
            $(".msg_history").animate({ scrollTop: $(document).height() }, "fast");
            // document.querySelector('#chat-log').value += (data.from + " : " +data.message + '\n');
        };
    }


    chatSocket.onclose = function (e) {
        console.error('Chat socket closed unexpectedly');

    };
    $(`li[data-id=${roomId}]`).click();

};
$("document").ready(function () {
    $("#create_new_channel").click(function () {
        debugger
    })

    //$(".room").on("click", function () {
    //const roomId = $(this).data('id')
    //const roomName = $(this).data('name')
    //$("#users-list").hide();
    //$("#tag-input").hide();
    //$("#chat-log").empty()
    //changeRoom(roomId, roomName)
    var header = document.getElementById("rooms-list");
    var rooms = header.getElementsByClassName("room");
    function addEvents() {
        function listEvent(e) {
            const roomId = $(this).data('id')
            const roomName = $(this).data('name')
            $("#users-list").hide();
            $("#tag-input").hide();
            $("#chat-log").empty()
            changeRoom(roomId, roomName)
            var current = document.getElementsByClassName("active");
            if (current.length > 0) {
                for (var i = 0; i < current.length; i++) {
                    current[i].className = current[0].className.replace(" active", "");
                }
            }
            this.className += " active";
        }

        for (var i = 0; i < rooms.length; i++) {
            rooms[i].removeEventListener("click", listEvent);
            rooms[i].addEventListener("click", listEvent);
        }
    }
    addEvents();

    //});









    //document.querySelector('#chat-message-input').focus();
    document.querySelector('#chat-message-input').onkeyup = function (e) {
        if (e.keyCode === 13) {  // enter, return
            document.querySelector('#chat-message-submit').click();
        }
    };



    document.querySelector('#chat-message-submit').onclick = function (e) {
        alert('chat submit');
        const messageInputDom = document.querySelector('#chat-message-input');
        const message = messageInputDom.value;
        const user = $("#myself").val()
        //   addMessage(user, message)

        if (!chatSocket) {
            alert('creating socket');
            let url = 'ws://'
                + window.location.host
                + '/ws/app/';
            let data = { roomId: 'new_room', 'newUsers': JSON.parse($("#tag-input").val()), 'message': message }
            chatSocket = new WebSocket(url);
            chatSocket.addEventListener('open', function (event) {
                console.log(this)

                $("#room").text('new room')

                chatSocket.send(JSON.stringify(data))
            });
            chatSocket.onmessage = function (e) {
                alert('chat message');
                const data = JSON.parse(e.data);
                if (data.roomCreated) {
                    alert('room created');
                    $("#rooms-list").append(`<li class='room' data-name="${room.name}" data-id='${room.id}'>${data.room_name}</li>`);
                    addEvents();
                    chatSocket.close()
                    return changeRoom(data.room_id, data.room_name)
                    //  window.location.reload();
                }
                addMessage(data.from, data.message)
                $(".msg_history").animate({ scrollTop: $(document).height() }, "fast");
                // document.querySelector('#chat-log').value += (data.from + " : " +data.message + '\n');
            };
            return;

        }
        chatSocket.send(JSON.stringify({
            'to': CURRENT_ROOM,
            'message': message
        }));
        messageInputDom.value = '';
    };

    /*function myFunction() {
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
    }*/
});