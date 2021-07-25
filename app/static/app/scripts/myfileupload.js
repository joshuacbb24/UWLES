$(document).ready(function () {

    $('form').on('submit', function (event) {
        event.preventDefault();

        var formData = new FormData($('form')[0]);

        $.ajax({
            xhr: function () {
                var xhr = new window.XMLHttpRequest();

                xhr.upload.addEventListener('progress', function (e) {
                    if (e.lengthComputable) {

                        console.log('Bytes loaded: ' + e.loaded)
                        console.log('Total size: ' + e.total)
                        console.log('Percentage uploaded: ' + (e.loaded / e.total))

                        var percent = Math.round((e.loaded / e.total) * 100);

                        $('#progressBar').attr('aria-valuenow', percent).css('width', percent + '%').text(percent + '%');

                    }
                });

                return xhr;
            },
            type: 'POST',
            url: "/test/",
            data: formData,
            processData: false,
            contentType: false,
            success: function () {
                console.log("success!");
                console.log("yay!");
            }
        });
    });

});