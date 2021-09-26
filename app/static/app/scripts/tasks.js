const csrf = document.getElementsByName('csrfmiddlewaretoken')
const url = ""

$(document).ready(function () {
    $("body").on('click', '.assignee-option', function(){
        $(this).addClass('assignee-selected');
        $(this).removeClass('assignee-option');
        var thisval = $(this).attr('value');
        $("#id_assignees option[value="+ thisval + "]").prop("selected", true)
    });
    $("body").on('click', '.assignee-selected', function(){
        $(this).addClass('assignee-option');
        $(this).removeClass('assignee-selected');
        var thisval = $(this).attr('value');
        $("#id_assignees option[value="+ thisval + "]").prop("selected", false)
    });
    $("body").on('click', '.assignee-caseworker', function(){
        $(this).addClass('active-btn');
        $('.assignee-client').removeClass('active-btn');
        $('.client-box').removeClass('active-box');
        $('.caseworker-box').addClass('active-box');
    });
    $("body").on('click', '.assignee-client', function(){
        $(this).addClass('active-btn');
        $('.assignee-caseworker').removeClass('active-btn');
        $('.caseworker-box').removeClass('active-box');
        $('.client-box').addClass('active-box');
    });
    $("body").on('click', '#upcoming-dd.menu4-dropbtn', function(){
        if ($(".upcoming-tasks-list").hasClass('inactive')){
            $(".upcoming-tasks-list").removeClass('inactive')
        }
        else{
            $(".upcoming-tasks-list").addClass('inactive')
        }
    })
    $("body").on('click', '#weekly-dd.menu4-dropbtn', function(){
        if ($(".weekly-tasks-list").hasClass('inactive')){
            $(".weekly-tasks-list").removeClass('inactive')
        }
        else{
            $(".weekly-tasks-list").addClass('inactive')
        }
    })
    $("body").on('click', '#past-dd.menu4-dropbtn', function(){
        if ($(".past-tasks-list").hasClass('inactive')){
            $(".past-tasks-list").removeClass('inactive')
        }
        else{
            $(".past-tasks-list").addClass('inactive')
        }
    })


    $('body').on('click', '.task-mark-tick', function(){
        var myid = $(this).val();
        var checkedval
        if ($(this).is(':checked')){
            checkedval = true;
        }
        else{
            checkedval = false;
        }
        const fd = new FormData()
        fd.append('csrfmiddlewaretoken', csrf[0].value)
        fd.append('myid', myid)
        fd.append('checkedval', checkedval)
        $.ajax({
            type: 'POST',
            url: url,
            enctype: 'multipart/form-data',
            data: fd,
            success: function (response) {
                console.log("Success")
            },
            error: function (error) {
                console.log(error)
            },
            cache: false,
            contentType: false,
            processData: false,
        })
    })
});