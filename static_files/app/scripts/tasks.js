const csrf = document.getElementsByName('csrfmiddlewaretoken')
const url = ""

$(document).ready(function () {
    $('[data-toggle="popover"]').popover();

    $("body").on('click', '.assignee-option', function(){
        $(this).addClass('assignee-selected');
        $(this).removeClass('assignee-option');
        var thisval = $(this).attr('value');
        var thistext = $(this).text();
        $("#id_assignees option[value="+ thisval + "]").prop("selected", true)
        $('#assignees-box').append('<div class="assignees-pill" value=' + thisval + '>' + thistext + '</div>');
    });
    $("body").on('click', '.assignee-selected', function(){
        $(this).addClass('assignee-option');
        $(this).removeClass('assignee-selected');
        var thisval = $(this).attr('value');
        $("#id_assignees option[value="+ thisval + "]").prop("selected", false)
        $('#assignees-box').children('div.assignees-pill[value='+ thisval + ']').remove()
    });
    $("body").on('click', '.assignees-pill', function(){
        var thisval = $(this).attr('value');
        $("#id_assignees option[value="+ thisval + "]").prop("selected", false)
        $('#assignees-box').children('div.assignees-pill[value='+ thisval + ']').remove()
        $('.assignee-selected[value='+ thisval +']').addClass('assignee-option')
        $('.assignee-selected[value='+ thisval +']').removeClass('assignee-selected');
    })
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
    
    $("body").on('click', '#high-prio-dd.menu4-dropbtn', function(){
        if ($(".high-prio-tasks-list").hasClass('inactive')){
            $(".high-prio-tasks-list").removeClass('inactive')
        }
        else{
            $(".high-prio-tasks-list").addClass('inactive')
        }
    })
    $("body").on('click', '#med-prio-dd.menu4-dropbtn', function(){
        if ($(".med-prio-tasks-list").hasClass('inactive')){
            $(".med-prio-tasks-list").removeClass('inactive')
        }
        else{
            $(".med-prio-tasks-list").addClass('inactive')
        }
    })
    $("body").on('click', '#low-prio-dd.menu4-dropbtn', function(){
        if ($(".low-prio-tasks-list").hasClass('inactive')){
            $(".low-prio-tasks-list").removeClass('inactive')
        }
        else{
            $(".low-prio-tasks-list").addClass('inactive')
        }
    })
    $("body").on('click', '[id^=assigner-dd]', function(){
        var thisid = $(this).attr('value')
        if ($(".assigner-tasks-list[value=" + thisid +"]").hasClass('inactive')){
            $(".assigner-tasks-list[value=" + thisid +"]").removeClass('inactive')
        }
        else{
            $(".assigner-tasks-list[value=" + thisid +"]").addClass('inactive')
        }
    })

    $("body").on('change', '[name=task_filter]', function(){
        if ($(this).val() == 'by_date'){
            $('.menu4-high-prio').addClass('menu4-hide')
            $('.menu4-med-prio').addClass('menu4-hide')
            $('.menu4-low-prio').addClass('menu4-hide')
            $('.menu4-assigner-tasks').addClass('menu4-hide')
            
            $('.menu4-upcoming-tasks').removeClass('menu4-hide')
            $('.menu4-due-this-week').removeClass('menu4-hide')
            $('.menu4-past-due').removeClass('menu4-hide')

            $('.upcoming-tasks-list').addClass('inactive')
            $('.weekly-tasks-list').addClass('inactive')
            $('.past-tasks-list').addClass('inactive')
            $('.high-prio-tasks-list').addClass('inactive')
            $('.med-prio-tasks-list').addClass('inactive')
            $('.low-prio-tasks-list').addClass('inactive')
            $('.assigner-tasks-list').addClass('inactive')
            
        }
        else if($(this).val() == 'by_prio'){
            $('.menu4-upcoming-tasks').addClass('menu4-hide')
            $('.menu4-due-this-week').addClass('menu4-hide')
            $('.menu4-past-due').addClass('menu4-hide')
            $('.menu4-assigner-tasks').addClass('menu4-hide')

            $('.menu4-high-prio').removeClass('menu4-hide')
            $('.menu4-med-prio').removeClass('menu4-hide')
            $('.menu4-low-prio').removeClass('menu4-hide')

            $('.upcoming-tasks-list').addClass('inactive')
            $('.weekly-tasks-list').addClass('inactive')
            $('.past-tasks-list').addClass('inactive')
            $('.high-prio-tasks-list').addClass('inactive')
            $('.med-prio-tasks-list').addClass('inactive')
            $('.low-prio-tasks-list').addClass('inactive')
            $('.assigner-tasks-list').addClass('inactive')
        }
        else if($(this).val() == "by_assigner"){
            $('.menu4-upcoming-tasks').addClass('menu4-hide')
            $('.menu4-due-this-week').addClass('menu4-hide')
            $('.menu4-past-due').addClass('menu4-hide')
            $('.menu4-assigner-tasks').addClass('menu4-hide')
            $('.menu4-high-prio').addClass('menu4-hide')
            $('.menu4-med-prio').addClass('menu4-hide')
            $('.menu4-low-prio').addClass('menu4-hide')

            $('.menu4-assigner-tasks').removeClass('menu4-hide')

            $('.upcoming-tasks-list').addClass('inactive')
            $('.weekly-tasks-list').addClass('inactive')
            $('.past-tasks-list').addClass('inactive')
            $('.high-prio-tasks-list').addClass('inactive')
            $('.med-prio-tasks-list').addClass('inactive')
            $('.low-prio-tasks-list').addClass('inactive')
            $('.assigner-tasks-list').addClass('inactive')
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
