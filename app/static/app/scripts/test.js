const dropZoneElement = document.getElementById("dropzone")
const csrf = document.getElementsByName('csrfmiddlewaretoken')
const url = ""
var inc_this = 0
var del_array = []

dropZoneElement.addEventListener("dragover", e => {
    e.preventDefault()
    dropZoneElement.classList.add("drop-zone--over")
});

["dragleave", "dragend"].forEach(type => {
    dropZoneElement.addEventListener(type, e => {
        dropZoneElement.classList.remove("drop-zone--over")
    });
});

$(document).ready(function () {
    var inputElement1 = $("[class^=drop-zone__input]")

    $("#dropzone").on("drop", function (e) {
        $("#dropzone").addClass('drop-zone-dropped')
        $("#dropzone").css({"width": "200px", "height": "265px", "left": "120px"})
        $('#file-list').css('display', 'block')
        var form_idx = $('#id_file-TOTAL_FORMS').val();
        $('#form_set_file').append($('#empty_form_file').html().replace(/__prefix__/g, form_idx))
        $('#id_file-TOTAL_FORMS').val(parseInt(form_idx) + 1)

        var inputElement = $("[class=drop-zone__input"+ inc_this + "]")

        e.preventDefault()
        console.log(inputElement.attr("id"))

        if (e.originalEvent.dataTransfer.files.length) {
            inputElement.files = e.originalEvent.dataTransfer.files;
            console.log(inputElement)
            console.log(inputElement.files[0])
            updateList(inputElement.files[0], inc_this)
        }

        inputElement1[inc_this] = inputElement

        console.log(inputElement1)

        $(this).removeClass("drop-zone--over")
        console.log(inputElement1[inc_this].files[0])
        console.log(inputElement1[inc_this].files[0].size)
        inc_this++
    });

    $("body").on("click", "#dropzone", function (){
        console.log("dropzone clicked");
        $("#my-file").click();
    });

    $("body").on("change", "#my-file", function(){
        $("#dropzone").addClass('drop-zone-dropped')
        $('#file-list').css('display', 'block')
        var form_idx = $('#id_file-TOTAL_FORMS').val();
        $('#form_set_file').append($('#empty_form_file').html().replace(/__prefix__/g, form_idx))
        $('#id_file-TOTAL_FORMS').val(parseInt(form_idx) + 1)

        var inputElement = $("[class=drop-zone__input"+ inc_this + "]")

        if ($("#my-file").val()){
            inputElement.files = $("#my-file").prop('files')
            updateList(inputElement.files[0], inc_this)
        }
 
        inputElement1[inc_this] = inputElement

        $("#dropzone").removeClass("drop-zone--over");
        inc_this++
    });

    $('form').on('click', '#fileSubmit', function (event) {
        event.preventDefault()
        

        var totalForms = $('#id_file-TOTAL_FORMS').attr('value')
        const fd = new FormData()
        fd.append('csrfmiddlewaretoken', csrf[0].value)
        
        fd.append('orgs-TOTAL_FORMS', '0')
        fd.append('orgs-INITIAL_FORMS', '0')
        fd.append('orgs-MIN_NUM_FORMS', '0')
        fd.append('orgs-MAX_NUM_FORMS', '1000')

        fd.append('tags-TOTAL_FORMS', '0')
        fd.append('tags-INITIAL_FORMS', '0')
        fd.append('tags-MIN_NUM_FORMS', '0')
        fd.append('tags-MAX_NUM_FORMS', '1000')

        fd.append('tags2-TOTAL_FORMS', '0')
        fd.append('tags2-INITIAL_FORMS', '0')
        fd.append('tags2-MIN_NUM_FORMS', '0')
        fd.append('tags2-MAX_NUM_FORMS', '1000')

        fd.append('file-TOTAL_FORMS', totalForms)
        fd.append('file-INITIAL_FORMS', '0')
        fd.append('file-MIN_NUM_FORMS', '0')
        fd.append('file-MAX_NUM_FORMS', '1000')

        for (var i = 0; i < totalForms; i++) {
            var thisinput = "input.drop-zone__input" + i + ""
            if ($('#form_set_file').find(thisinput).length == 0) {
                console.log("didnt catch this")
                fd.append('file-' + i + '-file', '')
                fd.append('file-' + i + '-document_name', '')
                fd.append('file-' + i + '-description', '')
                fd.append('file-' + i + '-id', '')
            }
            else {
                console.log("caught this")
                fd.append('file-' + i + '-file', inputElement1[i].files[0])
                if ($('#id_file-' + i + '-document_name').val() != 0) {
                    fd.append('file-' + i + '-document_name', $('#id_file-' + i + '-document_name').val())
                }
                else {
                    fd.append('file-' + i + '-document_name', '')
                }

                if ($('#id_file-' + i + '-description').val() != 0) {
                    fd.append('file-' + i + '-description', $('#id_file-' + i + '-description').val())
                }
                else {
                    fd.append('file-' + i + '-description', '')
                }

                fd.append('file-' + i + '-id', '')

                fd.append('file-' + i + '-this_id', i)

                if ($('#id_file-' + i + '-file_collaborators').val().length != 0) {
                    for (var g = 0; g < $('#id_file-' + i + '-file_collaborators').val().length; g++)
                    fd.append('file-' + i + '-file_collaborators', $('#id_file-' + i + '-file_collaborators').val()[g])
                }

                if ($('#id_file-' + i + '-tags').val().length != 0) {
                    for (var h = 0; h < $('#id_file-' + i + '-tags').val().length; h++)
                        fd.append('file-' + i + '-tags', $('#id_file-' + i + '-tags').val()[h])
                }

                fd.append('file-' + i + '-folder', $('#file-folderSelect' + i).val())
            }
        }
        $.ajax({
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener('progress', function (e) {

                    if (e.lengthComputable) {
                        var m = ""
                        for (var i = 0; i < inc_this; i++) {
                            for (var j = 0; j < del_array.length; j++) {
                                if (i == del_array[j]) {
                                    m = i
                                }
                            }
                            if (m == i) {
                                console.log("ignoring thing at " + i + "")
                            }
                            else {
                                console.log("not ignoring thing at " + i + "")
                                var this_size = inputElement1[i].files[0].size
                            }
                        }
                        console.log('Bytes loaded: ' + e.loaded)
                        console.log('Total size: ' + e.total)
                        console.log('Percentage uploaded: ' + (e.loaded / e.total))

                        var percent = Math.round((e.loaded / e.total) * 100);

                        /*$('.progress-bar').attr('aria-valuenow', percent).css('width', percent + '%').text(percent + '%');*/
                        $('.progress-bar').attr('aria-valuenow', percent).css({ 'width': percent + '%'})
                        if ($('.progress-bar').attr('aria-valuenow') == 100) {
                            $('.progress-bar').removeClass('progress-bar').addClass('progress-bar-success');
                            $('.file-listing').append('<div class="file-complete">Complete</div>')
                        }

                    }
                });

                return xhr;
            },
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
    });
    $('.documentlayout').on('click', '.downloadbtn', function (event) {
        var mydata = new FormData()
        mydata.append('fileid', $(this).attr('value'))
        mydata.append('downloadbtn', 'downloadbtn')
        var csrftoken = $("input[name=csrfmiddlewaretoken]").val()
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

function updateList(file, filevalue) {
    var cModal = $('#collabModal').clone()
    cModal.attr('id', 'collabModal' + filevalue + '')
    var ftModal = $('#filetagModal').clone()
    ftModal.attr('id', 'filetagModal' + filevalue + '')
    $('form').append(cModal)
    $('form').append(ftModal)


    var filename = file.name
    var fileext = filename.split('.').pop()
    var node = document.createElement("div")
    var divNode = document.createElement("div")
    var tNode = document.createElement("div")
    var rNode = document.createElement("div")
    var xNode = document.createElement("div")
    var pNode = document.createElement("div")
    var pbNode = document.createElement("div")
    var dNode = document.createElement("div")
    var eNode = document.createElement("div")
    var docNameNode = document.createElement("div")
    var folderNode = document.createElement("div")

    docNameNode.id = "file-document-name" + filevalue + ""
    folderNode.id = "file-move-to-folder" + filevalue + ""

    var docNameTextNode = document.createTextNode('Document Name')
    var folderTextNode = document.createTextNode('Move to Folder')

    docNameNode.appendChild(docNameTextNode)
    folderNode.appendChild(folderTextNode)

    var detailNode = document.createElement("div")
    detailNode.className = "file-more" + filevalue + ""

    var eTextNode = document.createTextNode('Edit Details')
    eNode.className = "file-edit-details"
    eNode.setAttribute('value', filevalue)
    eNode.appendChild(eTextNode)

    var selectNode = document.createElement("select")
    selectNode.id = "file-folderSelect" + filevalue + ""

    var collabNode = document.createElement("div")
    collabNode.id = "file-collaborators" + filevalue + ""
    collabNode.appendChild(document.createTextNode("Add Collaborators"))

    var addNode = document.createElement("div")
    addNode.id = "file-add" + filevalue + ""
    addNode.appendChild(document.createTextNode("+"))
    addNode.setAttribute('data-toggle', 'modal')
    addNode.setAttribute('data-target', '#collabModal' + filevalue + '')

    var tagsNode = document.createElement("div")
    tagsNode.id = "file-tags" + filevalue + ""
    tagsNode.appendChild(document.createTextNode("Add Tags"))

    var addNode2 = document.createElement("div")
    addNode2.id = "file-addx" + filevalue + ""
    addNode2.appendChild(document.createTextNode("+"))
    addNode2.setAttribute('data-toggle', 'modal')
    addNode2.setAttribute('data-target', '#filetagModal' + filevalue + '')


    dNode.className = "file-divide"

    pNode.className = "progress"
    pbNode.className = "progress-bar"
    pbNode.id = "progressBar"
    pbNode.setAttribute("role", 'progressbar')
    pbNode.style.width = "0%"
    pbNode.setAttribute("aria-valuenow", 0)
    pbNode.setAttribute("aria-valuemin", 0)
    pbNode.setAttribute("aria-valuemax", 100)
    pNode.appendChild(pbNode)

    xNode.className = "file-remove-x"
    rNode.className = "file-remove"
    rNode.setAttribute('value', filevalue)
    rNode.appendChild(xNode)
    tNode.className = "file-text"
    node.className = "file-listing"

    if (fileext == 'png' || fileext == 'jpg' || fileext == 'PNG' || fileext == 'JPG') {
        var textNode = document.createTextNode(filename)
        divNode.className = "ext_pic"

        var textNode = document.createTextNode(filename)
        divNode.className = "ext_pic"
        var titleNode = document.createElement('div')
        titleNode.className = "png-jpg-title"
        if (fileext == 'png' || fileext == 'PNG'){
            var titleTextNode = document.createTextNode('PNG')
        }
        else{
            var titleTextNode = document.createTextNode('JPG')
        }
        titleNode.appendChild(titleTextNode)
        divNode.appendChild(titleNode)
    }
    else if (fileext.startsWith('doc')) {
        var textNode = document.createTextNode(filename)
        divNode.className = "ext_doc"
        var titleNode = document.createElement('div')
        titleNode.className = "word-title"
        var titleTextNode = document.createTextNode('WORD')
        titleNode.appendChild(titleTextNode)
        divNode.appendChild(titleNode)
    }
    else if (fileext.startsWith("xl")) {
        var textNode = document.createTextNode(filename)
        divNode.className = "ext_xl"
        var titleNode = document.createElement('div')
        titleNode.className = "xl-title"
        var titleTextNode = document.createTextNode('EXL')
        titleNode.appendChild(titleTextNode)
        divNode.appendChild(titleNode)
    }
    else if (fileext == 'pdf') {
        var textNode = document.createTextNode(filename)
        divNode.className = "ext_pdf"
        var titleNode = document.createElement('div')
        titleNode.className = "pdf-title"
        var titleTextNode = document.createTextNode('PDF')
        titleNode.appendChild(titleTextNode)
        divNode.appendChild(titleNode)
    }
    else if (fileext.startsWith('ppt')) {
        var textNode = document.createTextNode(filename)
        divNode.className = "ext_ppt"
        var titleNode = document.createElement('div')
        titleNode.className = "ppt-title"
        var titleTextNode = document.createTextNode('PPT')
        titleNode.appendChild(titleTextNode)
        divNode.appendChild(titleNode)
    }
    else if (fileext == 'mp3' || fileext == 'MP3' || fileext == 'mp4' || fileext == 'MP4') {
        var textNode = document.createTextNode(filename)
        divNode.className = "ext_mp"
        var titleNode = document.createElement('div')
        titleNode.className = "mp-title"

        if (fileext == 'mp3' || fileext == 'MP3'){
            var titleTextNode = document.createTextNode('MP3')
        }
        else{
            var titleTextNode = document.createTextNode('MP4')
        }
        titleNode.appendChild(titleTextNode)
        divNode.appendChild(titleNode)
    }
    else {
        var textNode = document.createTextNode("NOT SUPPORTED")
        divNode.className = "ext_none"
    }
    node.append(rNode)
    node.appendChild(divNode)
    tNode.append(textNode)
    node.appendChild(pNode)
    node.appendChild(tNode)
    node.appendChild(eNode)
    node.appendChild(dNode)

    var fullNode = document.getElementById('modal-body')
    fullNode.appendChild(detailNode)
    fullNode.appendChild(selectNode)
    fullNode.appendChild(collabNode)
    fullNode.appendChild(addNode)
    fullNode.appendChild(tagsNode)
    fullNode.appendChild(addNode2)
    fullNode.appendChild(docNameNode)
    fullNode.appendChild(folderNode)

    document.getElementById("file-list").appendChild(node)
    $("#file-folderSelect" + filevalue + "").html($("#folderSelect").html())
}

$(document).ready(function () {
    $('#file-list').on('click', 'div.file-remove', function () {
        var thisval = $(this).attr('value')
        $('#id_file-' + thisval + '-file').remove()
        $('[for=id_file-'+ thisval + '-file]').remove()
        $('#id_file-' + thisval + '-document_name').remove()
        $('[for=id_file-' + thisval + '-document_name]').remove()
        $('#id_file-' + thisval + '-description').remove()
        $('[for=id_file-' + thisval + '-description]').remove()
        $('#id_file-' + thisval + '-id').remove()
        var gParent = $(this).parent()
        $(gParent).remove()
        del_array.push(thisval)
    });
    $('#file-list').on('click', 'div.file-edit-details', function () {
        var thisval = $(this).attr('value')
        $('.file-edit-details').css({ "background": "#FFFFFF", "color": "#015D67" })
        $(this).css({ "background": "#015D67", "color": "#FFFFFF" })
        $('[id^=id_file-][id$=-document_name]').css('display', 'none')
        $('#id_file-' + thisval + '-document_name').css('display', 'block')

        $('[id^=file-document-name]').css('display', 'none')
        $('#file-document-name'+ thisval + '').css('display', 'block')

        $('[id^=file-move-to-folder]').css('display', 'none')
        $('#file-move-to-folder' + thisval + '').css('display', 'block')

        $('[id^=file-folderSelect]').css('display', 'none')
        $('#file-folderSelect'+ thisval + '').css('display', 'block')

        $('[id^=file-collaborators]').css('display', 'none')
        $('#file-collaborators' + thisval + '').css('display', 'block')

        $('[id^=file-add]').css('display', 'none')
        $('#file-add' + thisval + '').css('display', 'block')

        $('[id^=file-tags]').css('display', 'none')
        $('#file-tags' + thisval + '').css('display', 'block')

        $('[id^=file-addx]').css('display', 'none')
        $('#file-addx' + thisval + '').css('display', 'block')

        $('[id^=id_file-][id$=-description]').css('display', 'none')
        $('#id_file-' + thisval + '-description').css('display', 'block')
        $('[class^=file-more]').css('display', 'none')
        $('.file-more' + thisval + '').css('display', 'block')
    });
    $('form').on('click', '.collabButton', function () {
        var thisval = $(this).parent().parent().parent().parent().attr('id')
        var thisval2 = thisval.replace(/collabModal/, '')
        var myboxes = $(this).parent().find('input[name="collabCheckboxes"]:checked')
        var thisarray = []
        for (var i = 0; i < myboxes.length; i++) {
            var boxid = $(myboxes[i]).val()
            thisarray.push(boxid)
        }
        $("#id_file-" + thisval2 + "-file_collaborators").val(thisarray)
    });

    $('form').on('click', '.filetagButton', function () {
        var thisval = $(this).parent().parent().parent().parent().attr('id')
        var thisval2 = thisval.replace(/filetagModal/, '')
        var myboxes = $(this).parent().find('input[name="filetagCheckboxes"]:checked')
        var thisarray = []
        for (var i = 0; i < myboxes.length; i++) {
            var boxid = $(myboxes[i]).val()
            thisarray.push(boxid)
        }
        $("#id_file-" + thisval2 + "-tags").val(thisarray)
        thisarray = []
    });
});
