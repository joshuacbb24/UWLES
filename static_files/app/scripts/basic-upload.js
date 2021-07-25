$(function () {
    /* 1. OPEN THE FILE EXPLORER WINDOW */
    $("#upload-photos-button").click(function () {
        $("#fileupload").click();
    });

    /* 2. INITIALIZE THE FILE UPLOAD COMPONENT */
    $("#fileupload").fileupload({
        dataType: 'json',
        done: function (e, data) {  /* 3. PROCESS THE RESPONSE FROM THE SERVER */
            if (data.result.is_valid) {
                /*send file to recipient and add a progress bar*/
                console.log("file uploaded")
                const message = 'file <a style=word-wrap:break-word; href="' + data.result.url + '" target="_blank">' + data.result.name + '</a>'
                socket.send(
                    JSON.stringify({
                        command: "send",
                        room: data.join,
                        'message': message,
                    })
                );
            }
        }
    });

});