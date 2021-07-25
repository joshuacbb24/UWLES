$(document).ready(function () {

    //


    showDefaultAvatar();


});

function showDefaultAvatar() {

    // This is using ids; have to refactor to use classes if showing multiple avatars on one page

    //ids cannot be repeated on a page, but classes can
    let profileImg = $('.profile-pic')
    let missingimg = $('.profile-pic-wrapper')
    console.log(missingimg)

    // double check how to access "src" attribute
    if (!profileImg.attr('src') && missingimg.length) {
        missingimg.addClass('profile-pic')
        var username = missingimg.data('username');

        missingimg.text(username.charAt(0));

        let bgAvatar = missingimg.data('bgcolor');
        console.log(bgAvatar)
        if (bgAvatar) {
            missingimg.css('background-color', bgAvatar)
        }

    }
}