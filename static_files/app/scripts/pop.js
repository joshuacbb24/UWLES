
let roomId = false;

$(function () {
    // Correctly decide between ws:// and wss://
    var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
    var ws_path = ws_scheme + "://" + window.location.host + "/chat/stream/";
    console.log("Connecting to " + ws_path);

    //var socket = new WebSocket(ws_path);
    var socket = new ReconnectingWebSocket(ws_path);
    var roomName = null;
    $(".sending-form").on("submit", function () {

        event.preventDefault();
        if (roomName) {
            socket.send(
                JSON.stringify({
                    "command": "send",
                    "room": roomName,
                    "message": document.querySelector('#typed_msg').value
                })
            );
            $("#typed_msg").empty();
            return false;
        }
    });

    $("#upload-photos-button").click(function () {
        $("#fileupload").click();
    });

    /* 2. INITIALIZE THE FILE UPLOAD COMPONENT */
    $("#fileupload").fileupload({
        dataType: 'json',
        done: function (e, data2) {  /* 3. PROCESS THE RESPONSE FROM THE SERVER */
            if (data2.result.is_valid) {
                /*send file to recipient and add a progress bar*/
                console.log("file uploaded")
                const message = 'file <a style=word-wrap:break-word; href="' + data2.result.url + '" target="_blank">' + data2.result.name + '</a>'
                if (roomName) {
                    socket.send(
                        JSON.stringify({
                            "command": "send",
                            "room": roomName,
                            "message": message
                        })
                    );
                }
            }

        }
    });

    // Handle incoming messages
    socket.onmessage = function (message) {
        console.log("message", message)
        console.log("Got websocket message " + message.data)
        var data = JSON.parse(message.data);
        console.log("data", data)
        // Handle errors
        if (data.error) {
            alert(data.error);
            return;
        }

        message = data.message


        // Handle joining
        if (data.join) {
            console.log("Joining room " + data.join);
            roomName = data.join;


            //   console.log("myself value: " + $("#myself").val() + "data.from_user value: " + message.from_user)

            // Hook up send button to send a message




            //hook up sending files
            /* 1. OPEN THE FILE EXPLORER WINDOW */


            $(".user-header h4").html(data.title);

            // Handle leaving
        } else if (data.leave) {
            console.log("Leaving room " + data.leave);
            roomName = null;
            $("#room-" + data.leave).remove();
            $(".user-header").empty();
            $(".chat-log").empty();

            // Handle getting a message
        } else if (data.message || data.msg_type != 0) {
            var msgdiv = $(".chat-log");
            var ok_msg = "";



            // msg types are defined in chat/settings.py
            // Only for demo purposes is hardcoded, in production scenarios, consider call a service.
            const LEFT_ROOM = 5;
            switch (data.msg_type) {
                case 0:
                    // Message

                    let text = (data.message.text) ? data.message.text : data.message;
                    let user = (data.message.from_user) ? data.message.from_user : data.username;
                    const cssClass = $("#myself").val() == user ? 'outgoing' : 'incoming';

                    ok_msg =
                        `<div class='${cssClass}''>` +
                        `<span class='username'>` +
                        user +
                        `: </span>` +
                        `<span class='text' > ` +
                        text +
                        `</span> ` +
                        `</div> `;


                    break;

                case 1:
                    // Warning / Advice messages
                    ok_msg =
                        "<div class='contextual-message text-warning'>" +
                        data.message +
                        "</div>";
                    break;
                case 2:
                    // Alert / Danger messages
                    ok_msg =
                        "<div class='contextual-message text-danger'>" +
                        data.message +
                        "</div>";
                    break;
                case 3:
                    // "Muted" messages
                    ok_msg =
                        "<div class='contextual-message text-muted'>" +
                        data.message +
                        "</div>";
                    break;
                /* case 4:
                     // User joined room
                     ok_msg =
                         "<div class='contextual-message text-muted'>" +
                         data.username +
                         " joined the room!" +
                         "</div>";
                     break;
                 case LEFT_ROOM:
                     // User left room
                     ok_msg =
                         "<div class='contextual-message text-muted'>" +
                         data.username +
                         " left the room!" +
                         "</div>";
                     break;*/
                case "created":
                    ok_msg =
                        $(".rooms").append(
                            `<li class="room-link" data-room-id="${data.room}"> ${data.name}</li>`
                        );

                    break;
                case "room_exists":
                    $("li[data-room-id=" + data.room_id + "]").click();
                    ok_msg =
                        "<div class='contextual-message text-muted'>room already exists</div>";
                    break;

                case "get_members":
                    var people = data.member


                    // $(".avatar-list").append(
                    //`<li><img src="" alt="user" class="profile-photo-lg"></li>`
                    // );

                    $(".list-of-members").append(
                        `       <li>
            		        <h4><a href="#" class="profile-link">${people.username}</a></h4>
        	            </li>`

                    );

                    /*$(".remove-buttons").append(
                        `<li style="padding-bottom: 18px;"><button data-id="${people.id}" class="remove-user">Remove User</button>
                            </li>`      //attach user id to remove button
                    );*/

                    break;

                default:
                    console.log("Unsupported message type!");
                    return;
            }

            $(".chat-log").html();
            if (data.msg_type != "created")
                msgdiv.append(ok_msg);

            msgdiv.scrollTop(msgdiv.prop("scrollHeight"));
        } else {
            console.log("Cannot handle message!");
        }
    };


    // Says if we joined a room or not by if there's a div for it
    inRoom = function (roomId) {
        return $("#room-" + roomId).length > 0;
    };

    // Room join/leave

    /* -Show all saved messages when joining a room
                -Make it if already in that room either do nothing or reload that room
                -if not in that room leave current room, if in one, then join the
                room that was clicked on
                -If not in room when a message comes in give it an unread class*/


    function roomClick() {
        roomId = $(this).attr("data-room-id");
        if (inRoom(roomId)) {
            // Leave room

            $(this).removeClass("joined");
            socket.send(
                JSON.stringify({
                    command: "leave",
                    room: roomId,
                })
            );
            $(".chat-log").empty();
            //empty chat log
        } else {
            // Join room

            $(this).addClass("joined");
            socket.send(
                JSON.stringify({
                    command: "join",
                    room: roomId,
                })
            );


            $(".list-of-members").empty();

            socket.send(
                JSON.stringify({
                    command: "members",
                    room: roomId,
                })
            );


            $("#typed_msg").show();
            $("#upload-photos-button").show();
            $(".msg_send_btn").show();
            $(".user-header").show();
            $("#create-chat").show();
            $("#tag-input").hide();
            $("#users-list").hide();
            $("#create-group").hide();
            $(".chat-log").empty();
            $(".rightAccordion").show();

        }
    }
    $(document).on('click', '.room-link', roomClick)


    // Helpful debugging
    socket.onopen = function () {
        console.log("Connected to chat socket");
    };
    socket.onclose = function () {
        console.log("Disconnected from chat socket");
    };
});