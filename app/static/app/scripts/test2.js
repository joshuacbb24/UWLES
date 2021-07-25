$(document).ready(function () {
    $('body').on('click', '.download-file', function (event) {
        console.log("got this downloadbtn")
        var mydata = new FormData()
        mydata.append('fileid', $(this).attr('value'))
        mydata.append('downloadbtn', 'downloadbtn')
        var csrftoken = $("input[name=csrfmiddlewaretoken]").val()
        console.log(csrftoken)
        console.log(mydata)
        $.ajax({
            type: 'POST',
            url: url,
            headers: {
                "X-CSRFToken": csrftoken
            },
            data: mydata,
            success: function (response) {
                console.log(response)
            },
            error: function (error) {
                console.log(error)
            },
            cache: false,
            contentType: false,
            processData: false,
        })
    });
});