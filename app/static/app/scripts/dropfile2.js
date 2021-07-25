const dropZoneElement = document.getElementById("dropzone");
var inc_this = 0;
dropZoneElement.addEventListener("dragover", e => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
});

["dragleave", "dragend"].forEach(type => {
    dropZoneElement.addEventListener(type, e => {
        dropZoneElement.classList.remove("drop-zone--over");
    });
});

$(document).ready(function () {
    $("#dropzone").on('drop', function (e) {
        e.preventDefault();
        var inputElement = $(".drop-zone__input")
        console.log(inputElement[inc_this].id);
        if (e.originalEvent.dataTransfer.files.length) {
            inputElement[inc_this].files = e.originalEvent.dataTransfer.files;
            console.log(inputElement[inc_this].files);
        }

        $(this).removeClass("drop-zone--over");
        var form_idx = $('#id_files-TOTAL_FORMS').val();
        $('#form_set_file').append($('#empty_form_file').html().replace(/__prefix__/g, form_idx));
        $('#id_files-TOTAL_FORMS').val(parseInt(form_idx) + 1);
        inc_this++;
    });
    $('form').on('submit', function (event) {
        event.preventDefault();

        var data = $('form').serialize();
        console.log(data);

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
            type: "POST",
            url: "/test/",
            data: data,
            processData: false,
            contentType: false,
            success: function () {
                console.log("success!");
                console.log("yay!");
            }
        });
    });
});



/*dropZoneElement.addEventListener("drop", e => {
    e.preventDefault();
    var inputElement = document.getElementsByClassName("drop-zone__input");
    console.log(inputElement[inc_this].id);
    if (e.dataTransfer.files.length) {
        inputElement[inc_this].files = e.dataTransfer.files;
        console.log(inputElement[inc_this].files);
    }

    dropZoneElement.classList.remove("drop-zone--over");
    var form_idx = document.getElementById("id_files-TOTAL_FORMS").value;
    var this_form_space = document.getElementById('form_set_file');
    var this_empty_form = document.getElementById('empty_form_file');
    var empty_form_inner = this_empty_form.innerHTML;
    var new_inner = empty_form_inner.replace(/__prefix__/g, form_idx);
    var new_form_idx = parseInt(form_idx) + 1;
    document.getElementById('id_files-TOTAL_FORMS').value = new_form_idx;
    this_form_space.innerHTML += new_inner;
    inc_this++;
});*/


/*document.querySelectorAll(".drop-zone__input").forEach(inputElement => {
    const dropZoneElement = inputElement.closest('.drop-zone');
    dropZoneElement.addEventListener("dragover", e => {
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone--over");
    });

    ["dragleave", "dragend"].forEach(type => {
        dropZoneElement.addEventListener(type, e => {
            dropZoneElement.classList.remove("drop-zone--over");
        });
    });

    dropZoneElement.addEventListener("drop", e => {
        e.preventDefault();

        if (e.dataTransfer.files.length) {
            inputElement.files = e.dataTransfer.files;
            console.log(e.dataTransfer.files)
            updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
        }

        dropZoneElement.classList.remove("drop-zone--over");
    });

});

function updateThumbnail(dropZoneElement, file) {
    console.log(dropZoneElement);
    console.log(file);
    console.log(file.name);
}*/

/*const alertBox = document.getElementById('alert-box')
const imgBox = document.getElementById('img-box')
const form = document.getElementById('p-form')

const file = document.getElementById('id_file-0-file')
const name = document.getElementById('id_file-0-document_name')

const csrf = document.getElementsByName('csrfmiddlewaretoken')
console.log(csrf)
console.log(file)
console.log(name)
const url = ""

file.addEventListener('change', () => {
    const file_data = file.files[0]
    console.log(file_data)
    const url = URL.createObjectURL(file_data)
    console.log(url)
});

form.addEventListener('submit', e => {
    e.preventDefault()
    var totalForms = $('#id_file-TOTAL_FORMS').attr('value')
    console.log(totalForms)
    const fd = new FormData()
    fd.append('csrfmiddlewaretoken', csrf[0].value)
    fd.append('file-TOTAL_FORMS', totalForms)
    fd.append('file-INITIAL_FORMS', '0')
    fd.append('file-MIN_NUM_FORMS', '0')
    fd.append('file-MAX_NUM_FORMS', '1000')
    for (var i = 0; i < totalForms; i++) {
        fd.append('file-' + i + '-file', file.files[0])
        fd.append('file-' + i + '-document_name', name.value)
        fd.append('file-' + i + '-id', '')
    }
    $.ajax({
        type: 'POST',
        url: url,
        enctype: 'multipart/form-data',
        data: fd,
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
})


console.log(form)*/