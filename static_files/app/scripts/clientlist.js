$(document).ready(function () {
    $("#clist-listIcon").click(function () {
        var list = $(".clist-listBox");
        var grid = $(".clist-gridBox");
        list.attr('id', (list.attr('id') === 'visible' ? 'hidden' : 'visible'));
        grid.attr('id', (grid.attr('id') === 'visible' ? 'hidden' : 'visible'));
        var licon = $(".clist-listPH");
        var gicon = $(".clist-clist-gridPH");
        licon.attr('id', (licon.attr('id') === 'clist-listIcon' ? 'clist-listIcon2' : 'clist-listIcon'));
        gicon.attr('id', (gicon.attr('id') === 'clist-gridIcon' ? 'clist-gridIcon2' : 'clist-gridIcon'));
    });
    $("#clist-gridIcon").click(function () {
        var list = $(".clist-listBox");
        var grid = $(".clist-gridBox");
        list.attr('id', (list.attr('id') === 'visible' ? 'hidden' : 'visible'));
        grid.attr('id', (grid.attr('id') === 'visible' ? 'hidden' : 'visible'));
        var licon = $(".clist-listPH");
        var gicon = $(".clist-gridPH");
        licon.attr('id', (licon.attr('id') === 'clist-listIcon' ? 'clist-listIcon2' : 'clist-listIcon'));
        gicon.attr('id', (gicon.attr('id') === 'clist-gridIcon' ? 'clist-gridIcon2' : 'clist-gridIcon'));
    });

    $("#clist-listIcon").click(function () {
        var list = $(".clist-listBox");
        if (list.attr("id") == "visible") {
            var grid = $(".clist-grid-layout");
            grid.attr("id", "hidden");
            var list2 = $(".clist-list-layout");
            list2.attr("id", "visible");

            var cname1 = $('.clist-cname-grid');
            cname1.attr("id", "hidden");

            var cname2 = $('.clist-cname-list');
            cname2.attr("id", "visible");
            var taskpen = $('.clist-taskpen-list');
            taskpen.attr("id", "visible")
            var lastup = $('.clist-lastup-list');
            lastup.attr("id", "visible")
        }
        if (list.attr("id") == "hidden") {
            var grid = $(".clist-grid-layout");
            grid.attr("id", "visible");
            var list2 = $(".clist-list-layout");
            list2.attr("id", "hidden");

            var cname1 = $('.clist-cname-grid');
            cname1.attr("id", "visible");

            var cname2 = $('.clist-cname-list');
            cname2.attr("id", "hidden");
            var taskpen = $('.clist-taskpen-list');
            taskpen.attr("id", "hidden")
            var lastup = $('.clist-lastup-list');
            lastup.attr("id", "hidden")
        }
    });
    $("#clist-gridIcon").click(function () {
        var grid = $(".clist-gridBox");
        if (grid.attr("id") == "visible") {
            var grid2 = $(".clist-grid-layout");
            grid2.attr("id", "visible");
            var list = $(".clist-list-layout");
            list.attr("id", "hidden");

            var cname1 = $('.clist-cname-grid');
            cname1.attr("id", "visible");

            var cname2 = $('.clist-cname-list');
            cname2.attr("id", "hidden");
            var taskpen = $('.clist-taskpen-list');
            taskpen.attr("id", "hidden")
            var lastup = $('.clist-lastup-list');
            lastup.attr("id", "hidden")
        }
        if (grid.attr("id") == "hidden") {
            var grid2 = $(".clist-grid-layout");
            grid2.attr("id", "hidden");
            var list = $(".clist-list-layout");
            list.attr("id", "visible");

            var cname1 = $('.clist-cname-grid');
            cname1.attr("id", "hidden");

            var cname2 = $('.clist-cname-list');
            cname2.attr("id", "visible");
            var taskpen = $('.clist-taskpen-list');
            taskpen.attr("id", "visible")
            var lastup = $('.clist-lastup-list');
            lastup.attr("id", "visible")
        }
    });

    $('body').on('click', 'div.clist-client-icon-grid', function(){
        var thisval = $(this).attr('value')
        $('.client-profile[value='+ thisval + ']').addClass('visible')
        $('.client-profile[value='+ thisval + ']').removeClass('hidden')
        $('.clist-grid-layout').removeClass('visible')
        $('.clist-grid-layout').addClass('hidden')
        $('.clist-grid-layout').attr('id', 'hidden')
        $('.clist-gridBox').removeClass('visible')
        $('.clist-gridBox').addClass('hidden')
        $('.clist-search-container').addClass('hidden')
        $('.client-box1').removeClass('hidden')
        $('.client-box2').removeClass('hidden')
        $('.client-box3').removeClass('hidden')
        $('.client-box4').removeClass('hidden')
        $('.client-box5').removeClass('hidden')
        $('.clist-listPH').addClass('hidden')
        $('.clist-gridPH').addClass('hidden')
        $('.clist-gridBox').attr('id', 'hidden')
        $('.clist-listBox').attr('id', 'hidden')
        $('.clist-path-union2').removeClass('hide-title')
        $('.clist-path-cinfo').removeClass('hide-title')
        $('.clist-path-clist').attr('value', '1')
    })

    $('body').on('click', 'div.clist-client-icon-list', function(){
        var thisval = $(this).attr('value')
        $('.client-profile[value='+ thisval + ']').addClass('visible')
        $('.client-profile[value='+ thisval + ']').removeClass('hidden')
        $('.clist-list-layout').removeClass('visible')
        $('.clist-list-layout').addClass('hidden')
        $('.clist-list-layout').attr('id', 'hidden')
        $('.clist-listBox').removeClass('visible')
        $('.clist-listBox').addClass('hidden')
        $('.clist-search-container').addClass('hidden')
        $('.client-box1').removeClass('hidden')
        $('.client-box2').removeClass('hidden')
        $('.client-box3').removeClass('hidden')
        $('.client-box4').removeClass('hidden')
        $('.client-box5').removeClass('hidden')
        $('.clist-listPH').addClass('hidden')
        $('.clist-gridPH').addClass('hidden')
        $('.clist-gridBox').attr('id', 'hidden')
        $('.clist-listBox').attr('id', 'hidden')
        $('.clist-path-union2').removeClass('hide-title')
        $('.clist-path-cinfo').removeClass('hide-title')
        $('.clist-path-clist').attr('value', '2')
    })

    $('body').on('click', 'div.clist-path-clist', function(){
        var thisval = $('.clist-path-clist').attr('value')
        if (thisval == 1){
            $('.client-profile').addClass('hidden')
            $('.clist-grid-layout').addClass('visible')
            $('.clist-grid-layout').removeClass('hidden')
            $('.clist-grid-layout').attr('id', 'visible')
            $('.clist-gridBox').removeClass('hidden')
            $('.clist-gridBox').addClass('visible')
            $('.clist-search-container').removeClass('hidden')
            $('.client-box1').addClass('hidden')
            $('.client-box2').addClass('hidden')
            $('.client-box3').addClass('hidden')
            $('.client-box4').addClass('hidden')
            $('.client-box5').addClass('hidden')
            $('.clist-listPH').removeClass('hidden')
            $('.clist-gridPH').removeClass('hidden')
            $('.clist-gridBox').attr('id', 'visible')
            $('.clist-listBox').attr('id', 'hidden')
            $('.clist-path-union2').addClass('hide-title')
            $('.clist-path-cinfo').addClass('hide-title')
        }
        else{
            $('.client-profile').addClass('hidden')
            $('.clist-list-layout').addClass('visible')
            $('.clist-list-layout').removeClass('hidden')
            $('.clist-list-layout').attr('id', 'visible')
            $('.clist-gridBox').removeClass('hidden')
            $('.clist-gridBox').addClass('visible')
            $('.clist-search-container').removeClass('hidden')
            $('.client-box1').addClass('hidden')
            $('.client-box2').addClass('hidden')
            $('.client-box3').addClass('hidden')
            $('.client-box4').addClass('hidden')
            $('.client-box5').addClass('hidden')
            $('.clist-listPH').removeClass('hidden')
            $('.clist-gridPH').removeClass('hidden')
            $('.clist-gridBox').attr('id', 'hidden')
            $('.clist-listBox').attr('id', 'visible')
            $('.clist-path-union2').addClass('hide-title')
            $('.clist-path-cinfo').addClass('hide-title')
        }
    })
});