$(document).ready(function () {

    //


    showDefaultAvatar();
    showTagAvatars();


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
            if (bgAvatar) {
                missingimg.css('background-color', bgAvatar)
            }

        }
    }

}
function showTagAvatars() {

    // This is using ids; have to refactor to use classes if showing multiple avatars on one page

    //ids cannot be repeated on a page, but classes can
    let missingimages = $('.tagify__tag__avatar-wrap')

    // double check how to access "src" attribute
    for (var i = 0; i < missingimages.length; i++) {
        let missingimg = $(missingimages[i])
        let profileimg = missingimg.find("img")
        if (!profileimg.attr('src')) {
            var username = missingimg.data('username');
            if (username) {
                missingimg.text(username.charAt(0));
            }
            let bgAvatar = missingimg.data('bgcolor');
            if (bgAvatar) {
                missingimg.css('background-color', bgAvatar)
            }

        }
    }

}
function showDropdownAvatars() {

    // This is using ids; have to refactor to use classes if showing multiple avatars on one page

    //ids cannot be repeated on a page, but classes can
    let missingimages = $('.tagify__dropdown__item__avatar-wrap')

    // double check how to access "src" attribute
    for (var i = 0; i < missingimages.length; i++) {
        let missingimg = $(missingimages[i])
        let profileimg = missingimg.find("img")
        if (!profileimg.attr('src')) {
            let username = missingimg.data('username');
            if (username) {
                if (missingimg.text().length <= 0) {
                    missingimg.append(username.charAt(0));
                }
                else {

                }
            }
            let bgAvatar = missingimg.data('bgcolor');
            if (bgAvatar) {
                missingimg.css('background-color', bgAvatar)
            }

        }
    }

}
