$("document").ready(function () {

    $(".person").on("click", function () {

        $(".inbox_people").hide();
        $("#chat-log").html("");
        $(".mesgs").show();
        $("#chat-message-submit").show();
        $("#chat-message-input").show();
        $("#username").val($(this).data('username'));
        $("#user_header").html($(this).data('username'));
        const parent = $(this).parent().parent()
        $(".chat_list").prepend(parent)
    })

    $("#go_back").on("click", function () {
        $(".inbox_people").show();
        $(".mesgs").hide();
    })

    $("#caret-icon").on('click', function () {
        $(this).toggleClass('la-angle-up la-angle-down');
        $(".dropdown-content").toggle('show hide');
    })

    $("#sidebar-toggle").on('click', function () {
        $(".sidebar").toggle('show hide');
    })

    $("#create-chat").on('click', function () {
        $(".some_class_name").show();
    })

    let roomId = false;
    let sent = false;
    $(function () {
        // Correctly decide between ws:// and wss://
        var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
        var ws_path = ws_scheme + "://" + window.location.host + "/chat/stream/";
        console.log("Connecting to " + ws_path);

        //var socket = new WebSocket(ws_path);
        var socket = new ReconnectingWebSocket(ws_path);

        // Handle incoming messages
        socket.onmessage = function (message) {
            var data = JSON.parse(message.data);

            // Handle errors
            if (data.error) {
                alert(data.error);
                return;
            }

            message = data.message


            // Handle joining
            if (data.join) {
                console.log("Joining room " + data.join);

                //   console.log("myself value: " + $("#myself").val() + "data.from_user value: " + message.from_user)

                // Hook up send button to send a message
                $(".sending-form").on("submit", function () {

                    event.preventDefault();
                    sent = true;
                    socket.send(
                        JSON.stringify({
                            "command": "send",
                            "room": data.join,
                            "message": document.querySelector('#typed_msg').value
                        })
                    );
                    $("#typed_msg").val("");
                    sent = false;
                });



                //hook up sending files
                /* 1. OPEN THE FILE EXPLORER WINDOW */
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
                            sent = true;
                            const message = 'file <a style=word-wrap:break-word; href="' + data2.result.url + '" target="_blank">' + data2.result.name + '</a>'
                            socket.send(
                                JSON.stringify({
                                    "command": "send",
                                    "room": data.join,
                                    "message": message
                                })
                            );
                            sent = false;
                        }

                    }
                });

                $(".user-header").html(data.title);

                // Handle leaving
            } else if (data.leave) {
                console.log("Leaving room " + data.leave);
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
                        //if statement for where user.username is not equal to data.message.from_user
                        let time = (data.message.sent_at) ? data.message.sent_at : data.sent_at;
                        const cssClass = $("#myself").val() == user ? 'outgoing' : 'incoming';

                        if (cssClass == 'outgoing') {
                            ok_msg =
                                `<div class='chat-wrapper'>` +
                                `<div class='${cssClass}'>` +
                                `<span class='body'>` +
                                text +
                                `</span>` +
                                `</div>` +
                                `</div>`;
                        } else {
                            if (sent) {

                                ok_msg =
                                    `<div class='chat-wrapper'>` +
                                    `<div class='${cssClass}'>` +
                                    `<span class='body'>` +
                                    text +
                                    `</span>` +
                                    `</div>` +
                                    `</div>`;

                                var x = document.getElementById("chatAudio");
                                x.play();

                            }
                            else {
                                ok_msg =
                                    `<div class='chat-wrapper'>` +
                                    `<div class='${cssClass}'>` +
                                    `<span class='body'>` +
                                    text +
                                    `</span>` +
                                    `</div>` +
                                    `</div>`;
                            }

                        }

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
                    case 4:
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
                        break;
                    case "created":
                        ok_msg =
                            "<div class='contextual-message text-muted'>room created</div>";
                        $(".chat_people").append(
                            `< li class="person" data - room - id="${data.room_id}" > ${data.name}</li >`
                        );
                        break;
                    case "room_exists":
                        $("li[data-room-id=" + data.room_id + "]").click();
                        ok_msg =
                            "<div class='contextual-message text-muted'>room already exists</div>";
                        break;

                    default:
                        console.log("Unsupported message type!");
                        return;
                }
                $(".chat-log").html();
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

        $(".person").click(function () {
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
                $("#typed_msg").show();
                $("#upload-photos-button").show();
                $(".msg_send_btn").show();
                $(".user-header").show();
                $("#create-chat").show();
                $("#tag-input").hide();
                $("#users-list").hide();
                $("#create-group").hide();
                $(".chat-log").empty();
            }
        });

        // Creating Room

        // if room created reset all back to the way it was and add room to list
        // if no valid input in tag create button is disabled/won't create
        /* if statement and maybe while statement that will cycle through room names or id's and compare to what
                         was entered in input and compare it to room names until it doesn't match room will not be created
                        or if create button is pressed and room already exists will swap to that room*/

        /* Because the name has to be unique a room with the same name
                        can't be created so if we can return an error message or some
                        signifer saying room was not created it should be possible to make
                        a command to do a remote click on that room with the name that
                        already exists
                    */

        $("#create-chat").click(function () {
            if (roomId) {
                if (inRoom(roomId)) {
                    // Leave room

                    $(this).removeClass("joined");
                    socket.send(
                        JSON.stringify({
                            command: "leave",
                            room: roomId,
                        })
                    );
                }
            }
            $("#upload-photos-button").hide();
            $(".user-header").hide();
            $("#create-chat").hide();
            $("#tag-input").show();
            $("#users-list").show();
            $("#create-group").show();
            $(".chat-log").empty();
            $("#typed_msg").hide();
            $(".msg_send_btn").hide();
        });

        $("#create-group").click(function () {
            socket.send(
                JSON.stringify({
                    command: "create",
                    newUsers: JSON.parse($("#tag-input").val()),
                })
            );
            $("#create-chat").show();
            $("#tag-input").hide();
            $("#users-list").hide();
            $("#create-group").hide();

            //join the room that was just created
            $("li[data-room-id=" + data.room_id + "]").click();
        });

        // Helpful debugging
        socket.onopen = function () {
            console.log("Connected to chat socket");
        };
        socket.onclose = function () {
            console.log("Disconnected from chat socket");
        };
    });
});