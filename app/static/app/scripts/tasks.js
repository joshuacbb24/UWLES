const csrf = document.getElementsByName('csrfmiddlewaretoken')
const url = ""

$(document).ready(function () {
    $('[data-toggle="popover"]').popover();

    $("body").on('click', '.btn-my-tasks', function(){
        $(".btn-activity").removeClass('btn-active');
        $(".btn-my-tasks").addClass('btn-active');
        $(".menu4-filter-tasks").css("display", "")
        $(".menu4-upcoming-tasks").css("display", "")
        $(".menu4-due-this-week").css("display", "")
        $(".menu4-past-due").css("display", "")
        $(".menu4-high-prio").css("display", "")
        $(".menu4-med-prio").css("display", "")
        $(".menu4-low-prio").css("display", "")
        $(".menu4-assigner-tasks").css("display", "")

        $(".menu4-filter-sent-tasks").css("display", "none")
        $(".menu4-upcoming-sent-tasks").css("display", "none")
        $(".menu4-sent-due-this-week").css("display", "none")
        $(".menu4-sent-past-due").css("display", "none")
        $(".menu4-sent-high-prio").css("display", "none")
        $(".menu4-sent-med-prio").css("display", "none")
        $(".menu4-sent-low-prio").css("display", "none")
        $(".menu4-assignee-tasks").css("display", "none")
    })

    $("body").on('click', '.btn-activity', function(){
        $(".btn-my-tasks").removeClass('btn-active');
        $(".btn-activity").addClass('btn-active');
        $(".menu4-filter-tasks").css("display", "none")
        $(".menu4-upcoming-tasks").css("display", "none")
        $(".menu4-due-this-week").css("display", "none")
        $(".menu4-past-due").css("display", "none")
        $(".menu4-high-prio").css("display", "none")
        $(".menu4-med-prio").css("display", "none")
        $(".menu4-low-prio").css("display", "none")
        $(".menu4-assigner-tasks").css("display", "none")

        $(".menu4-filter-sent-tasks").css("display", "block")
        $(".menu4-upcoming-sent-tasks").css("display", "block")
        $(".menu4-sent-due-this-week").css("display", "block")
        $(".menu4-sent-past-due").css("display", "block")
        $(".menu4-sent-high-prio").css("display", "block")
        $(".menu4-sent-med-prio").css("display", "block")
        $(".menu4-sent-low-prio").css("display", "block")
        $(".menu4-assignee-tasks").css("display", "block")
    })

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

    $("body").on('click', '#sent-upcoming-dd.menu4-dropbtn', function(){
        if ($(".sent-upcoming-tasks-list").hasClass('inactive')){
            $(".sent-upcoming-tasks-list").removeClass('inactive')
        }
        else{
            $(".sent-upcoming-tasks-list").addClass('inactive')
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

    $("body").on('click', '#sent-weekly-dd.menu4-dropbtn', function(){
        if ($(".sent-weekly-tasks-list").hasClass('inactive')){
            $(".sent-weekly-tasks-list").removeClass('inactive')
        }
        else{
            $(".sent-weekly-tasks-list").addClass('inactive')
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

    $("body").on('click', '#sent-past-dd.menu4-dropbtn', function(){
        if ($(".sent-past-tasks-list").hasClass('inactive')){
            $(".sent-past-tasks-list").removeClass('inactive')
        }
        else{
            $(".sent-past-tasks-list").addClass('inactive')
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

    $("body").on('click', '#sent-high-prio-dd.menu4-dropbtn', function(){
        if ($(".sent-high-prio-tasks-list").hasClass('inactive')){
            $(".sent-high-prio-tasks-list").removeClass('inactive')
        }
        else{
            $(".sent-high-prio-tasks-list").addClass('inactive')
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

    $("body").on('click', '#sent-med-prio-dd.menu4-dropbtn', function(){
        if ($(".sent-med-prio-tasks-list").hasClass('inactive')){
            $(".sent-med-prio-tasks-list").removeClass('inactive')
        }
        else{
            $(".sent-med-prio-tasks-list").addClass('inactive')
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

    $("body").on('click', '#sent-low-prio-dd.menu4-dropbtn', function(){
        if ($(".sent-low-prio-tasks-list").hasClass('inactive')){
            $(".sent-low-prio-tasks-list").removeClass('inactive')
        }
        else{
            $(".sent-low-prio-tasks-list").addClass('inactive')
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

    $("body").on('click', '[id^=assignee-dd]', function(){
        var thisid = $(this).attr('value')
        if ($(".assignee-tasks-list[value=" + thisid +"]").hasClass('inactive')){
            $(".assignee-tasks-list[value=" + thisid +"]").removeClass('inactive')
        }
        else{
            $(".assignee-tasks-list[value=" + thisid +"]").addClass('inactive')
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

    $("body").on('change', '[name=sent_task_filter]', function(){
        if ($(this).val() == 'by_date'){
            $('.menu4-sent-high-prio').addClass('menu4-hide')
            $('.menu4-sent-med-prio').addClass('menu4-hide')
            $('.menu4-sent-low-prio').addClass('menu4-hide')
            $('.menu4-assignee-tasks').addClass('menu4-hide')
            
            $('.menu4-upcoming-sent-tasks').removeClass('menu4-hide')
            $('.menu4-sent-due-this-week').removeClass('menu4-hide')
            $('.menu4-sent-past-due').removeClass('menu4-hide')

            $('.sent-upcoming-tasks-list').addClass('inactive')
            $('.sent-weekly-tasks-list').addClass('inactive')
            $('.sent-past-tasks-list').addClass('inactive')
            $('.sent-high-prio-tasks-list').addClass('inactive')
            $('.sent-med-prio-tasks-list').addClass('inactive')
            $('.sent-low-prio-tasks-list').addClass('inactive')
            $('.assignee-tasks-list').addClass('inactive')
            
        }
        else if($(this).val() == 'by_prio'){
            $('.menu4-upcoming-sent-tasks').addClass('menu4-hide')
            $('.menu4-sent-due-this-week').addClass('menu4-hide')
            $('.menu4-sent-past-due').addClass('menu4-hide')
            $('.menu4-assignee-tasks').addClass('menu4-hide')

            $('.menu4-sent-high-prio').removeClass('menu4-hide')
            $('.menu4-sent-med-prio').removeClass('menu4-hide')
            $('.menu4-sent-low-prio').removeClass('menu4-hide')

            $('.sent-upcoming-tasks-list').addClass('inactive')
            $('.sent-weekly-tasks-list').addClass('inactive')
            $('.sent-past-tasks-list').addClass('inactive')
            $('.sent-high-prio-tasks-list').addClass('inactive')
            $('.sent-med-prio-tasks-list').addClass('inactive')
            $('.sent-low-prio-tasks-list').addClass('inactive')
            $('.assignee-tasks-list').addClass('inactive')
        }
        else if($(this).val() == "by_assignee"){
            $('.menu4-upcoming-sent-tasks').addClass('menu4-hide')
            $('.menu4-sent-due-this-week').addClass('menu4-hide')
            $('.menu4-sent-past-due').addClass('menu4-hide')
            $('.menu4-assignee-tasks').addClass('menu4-hide')
            $('.menu4-sent-high-prio').addClass('menu4-hide')
            $('.menu4-sent-med-prio').addClass('menu4-hide')
            $('.menu4-sent-low-prio').addClass('menu4-hide')

            $('.menu4-assignee-tasks').removeClass('menu4-hide')

            $('.sent-upcoming-tasks-list').addClass('inactive')
            $('.sent-weekly-tasks-list').addClass('inactive')
            $('.sent-past-tasks-list').addClass('inactive')
            $('.sent-high-prio-tasks-list').addClass('inactive')
            $('.sent-med-prio-tasks-list').addClass('inactive')
            $('.sent-low-prio-tasks-list').addClass('inactive')
            $('.assignee-tasks-list').addClass('inactive')
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