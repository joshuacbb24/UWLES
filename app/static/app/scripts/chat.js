$("document").ready(function () {

    $(".person").on("click", whenUserIsClicked);

    function whenUserIsClicked() {
        console.log(this)
        const user = $(this).data('username')
        chatSocket.send(JSON.stringify({ new_chat: user }))
        $(".inbox_people").hide();
        $("#chat-log").html("");
        $(".mesgs").show();
        $("#chat-message-submit").show();
        $("#chat-message-input").show();
        $("#username").val($(this).data('username'));
        $("#user_header").html($(this).data('username'));
        const parent = $(this).parent().parent()
        $(".chat_list").prepend(parent)
    };
    $("#go_back").on("click", goback);

    function goback() {
        $(".inbox_people").show();
        $(".mesgs").hide();
    };

    $("#caret-icon").on('click', function () {
        $(this).toggleClass('la-angle-up la-angle-down');
        $(".dropdown-content").toggle('show hide');
    })

    $("#sidebar-toggle").on('click', function () {
        $(".sidebar").toggle('show hide');
    })


    const chatSocket = new WebSocket(
        'ws://'
        + window.location.host
        + '/ws/app/'
    );

    chatSocket.onmessage = function (e) {
        const data = JSON.parse(e.data);
        addMessage(data.from, data.message)
        // document.querySelector('#chat-log').value += (data.from + " : " +data.message + '\n');
    };

    chatSocket.onclose = function (e) {
        console.error('Chat socket closed unexpectedly');
    };

    //document.querySelector('#chat-message-input').focus();
    document.querySelector('#chat-message-input').onkeyup = function (e) {
        if (e.keyCode === 13) {  // enter, return
            document.querySelector('#chat-message-submit').click();
        }
    };

    function addMessage(user, message) {
        //$("#chat-log").html("");
        let text = $("#chat-log").html()
        const cssClass = $("#myself").val() == user ? 'outgoing' : 'incoming';
        text += `<div class="${cssClass}"> ${message} </div>`;


        $("#chat-log").html(text)
    }

    document.querySelector('#chat-message-submit').onclick = function (e) {
        const messageInputDom = document.querySelector('#chat-message-input');
        const message = messageInputDom.value;
        const user = $("#myself").val()
        addMessage(user, message)

        chatSocket.send(JSON.stringify({
            'to': document.getElementById('username').value,
            'message': message
        }));
        messageInputDom.value = '';
    };

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