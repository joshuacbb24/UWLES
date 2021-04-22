$("document").ready(function () {

$(".person").on("click", function(){

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

$("#go_back").on("click", function(){
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

});