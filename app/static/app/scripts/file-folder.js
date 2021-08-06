$(document).ready(function(){
    $('[data-toggle="popover"]').popover();

    $('body').on('click', '.bi.bi-x-lg', function (){
        $(this).parent().parent().popover('hide');
    });

    $('body').on('show.bs.modal', function () {
        $('[data-toggle="popover"]').popover('hide');
    });

    $('body').on('click', 'p.share-file', function (){
        var test1 = $('#shareFileModal').attr('value');
        test1 = $(this).attr('value');
        $('#shareFileModal').attr('value', test1);
        $('input[name=share-file-id]').attr('value', test1)
    });

    $('body').on('click', 'p.move-file', function (){
        var test1 = $('#moveFileModal').attr('value');
        test1 = $(this).attr('value');
        $('#moveFileModal').attr('value', test1);
        $('input[name=move-file-id]').attr('value', test1)
    });

    $('body').on('click', 'p.copy-file', function (){
        var test1 = $('#copyFileModal').attr('value');
        test1 = $(this).attr('value');
        $('#copyFileModal').attr('value', test1);
        $('input[name=copy-file-id]').attr('value', test1)
    });

    $('body').on('click', 'p.rename-file', function (){
        var test1 = $('#renameFileModal').attr('value');
        test1 = $(this).attr('value');
        $('#renameFileModal').attr('value', test1);
        $('input[name=rename-file-id]').attr('value', test1)
    });

    $('body').on('click', 'p.testp2', function (){
        var test1 = $('#deleteFileModal').attr('value');
        test1 = $(this).attr('value');
        $('#deleteFileModal').attr('value', test1);
        $('input[name=delete-file-id]').attr('value', test1)
    });

    $('body').on('click', 'div.delete-this-true', function(){
        console.log("this has been selected")
        $("input[name=delete-file-true]").prop('checked', true);
        console.log($("input[name=delete-file-true]"));
    });
    
    $('body').on('click', 'p.rename-folder', function (){
        var test1 = $('#renameFolderModal').attr('value');
        test1 = $(this).attr('value');
        $('#renameFolderModal').attr('value', test1);
        $('input[name=rename-folder-id]').attr('value', test1)
    });

    $('body').on('click', 'p.delete-folder', function (){
        var test1 = $('#deleteFolderModal').attr('value');
        test1 = $(this).attr('value');
        $('#deleteFolderModal').attr('value', test1);
        $('input[name=delete-folder-id]').attr('value', test1)
    });

    $('body').on('click', 'div.delete-this-folder-true', function(){
        $("input[name=delete-folder-true]").prop('checked', true);
    });



    $("form").on('click', 'li.share-collab__A', function () {
        console.log("in collab choice A");
        var thisval = $(this).attr('value');
        var thismodal = $(this).parent().parent().parent().parent().parent()
        $(this).removeClass("share-collab__A");
        $(this).addClass("share-collab__B");
        $(thismodal).find('input[name="sharecollabCheckboxes"][value=' + thisval + ']').prop('checked', true)
        console.log($(thismodal).find('input[name="sharecollabCheckboxes"][value=' + thisval + ']'))
    });

    $("form").on('click', 'li.share-collab__B', function () {
        console.log("in collab choice B")
        var thisval = $(this).attr('value');
        var thismodal = $(this).parent().parent().parent().parent().parent()
        $(this).removeClass("share-collab__B");
        $(this).addClass("share-collab__A");
        $(thismodal).find('input[name="sharecollabCheckboxes"][value=' + thisval + ']').prop('checked', false)
        console.log($(thismodal).find('input[name="sharecollabCheckboxes"][value=' + thisval + ']'))
    });
});