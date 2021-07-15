$(document).ready(function () {

    //


    showDefaultAvatar();


});

function showDefaultAvatar() {

    // This is using ids; have to refactor to use classes if showing multiple avatars on one page

    //ids cannot be repeated on a page, but classes can
    let missingimages = $('.profile-pic-wrapper')

    // double check how to access "src" attribute
    for (var i = 0; i < missingimages.length; i++) {
        let missingimg = $(missingimages[i])
        let profileimg = missingimg.find("img")
        if (!profileimg.attr('src')) {
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

}