$("document").ready(function () {

    $("#caret-icon").on('click', function () {
        $(this).toggleClass('la-angle-up la-angle-down');
        $(".dropdown-content").toggle('show hide');
    })

    $("#sidebar-toggle").on('click', function () {
        $(".sidebar").toggle('show hide');
    })

});
