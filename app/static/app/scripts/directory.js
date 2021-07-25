$(document).ready(function () {
    $("#listIcon").click(function () {
        var list = $(".listBox");
        var grid = $(".gridBox");
        list.attr('id', (list.attr('id') === 'visible' ? 'hidden' : 'visible'));
        grid.attr('id', (grid.attr('id') === 'visible' ? 'hidden' : 'visible'));
        var licon = $(".listPH");
        var gicon = $(".gridPH");
        licon.attr('id', (licon.attr('id') === 'listIcon' ? 'listIcon2' : 'listIcon'));
        gicon.attr('id', (gicon.attr('id') === 'gridIcon' ? 'gridIcon2' : 'gridIcon'));
    });
    $("#gridIcon").click(function () {
        var list = $(".listBox");
        var grid = $(".gridBox");
        list.attr('id', (list.attr('id') === 'visible' ? 'hidden' : 'visible'));
        grid.attr('id', (grid.attr('id') === 'visible' ? 'hidden' : 'visible'));
        var licon = $(".listPH");
        var gicon = $(".gridPH");
        licon.attr('id', (licon.attr('id') === 'listIcon' ? 'listIcon2' : 'listIcon'));
        gicon.attr('id', (gicon.attr('id') === 'gridIcon' ? 'gridIcon2' : 'gridIcon'));
    });
});

$(document).ready(function () {
    $("#listIcon").click(function () {
        var list = $(".listBox");
        if (list.attr("id") == "visible") {
            var grid = $(".gridLayout");
            grid.attr("id", "hidden");
            var list2 = $(".listLayout");
            list2.attr("id", "visible");
            var listC = $(".listCategory");
            listC.attr("id", "visibile");
            var listD = $(".listDsc");
            listD.attr("id", "visible");
            var listO = $(".listOrder");
            listO.attr("id", "visible");

            var grid2 = $(".documentLayout");
            grid2.attr("id", "hidden");
            var list3 = $(".doclistLayout");
            list3.attr("id", "visible");

            var listC2 = $(".doclistCategory");
            listC2.attr("id", "visibile");
            var listD2 = $(".doclistDsc");
            listD2.attr("id", "visible");
            var listO2 = $(".doclistOrder");
            listO2.attr("id", "visible");
            var listT = $(".doclistTitle");
            listT.attr("id", "visible");
            var listTag = $(".doclistTags");
            listTag.attr("id", "visible");

            var org_grid = $(".org-grid--layout");
            org_grid.attr("id", "hidden");
            var org_list2 = $(".org-list--layout");
            org_list2.attr("id", "visible");
            var org_listC = $(".org-listCategory");
            org_listC.attr("id", "visibile");
            var org_listD = $(".org-listDsc");
            org_listD.attr("id", "visible");
            var org_listO = $(".org-listOrder");
            org_listO.attr("id", "visible");

        }
        if (list.attr("id") == "hidden") {
            var grid = $(".gridLayout");
            grid.attr("id", "visible");
            var list2 = $(".listLayout");
            list2.attr("id", "hidden");
            var listC = $(".listCategory");
            listC.attr("id", "hidden");
            var listD = $(".listDsc");
            listD.attr("id", "hidden");
            var listO = $(".listOrder");
            listO.attr("id", "hidden");

            var grid2 = $(".documentLayout");
            grid2.attr("id", "visible");
            var list3 = $(".doclistLayout");
            list3.attr("id", "hidden");

            var listC2 = $(".doclistCategory");
            listC2.attr("id", "hidden");
            var listD2 = $(".doclistDsc");
            listD2.attr("id", "hidden");
            var listO2 = $(".doclistOrder");
            listO2.attr("id", "hidden");
            var listT = $(".doclistTitle");
            listT.attr("id", "hidden");
            var listTag = $(".doclistTags");
            listTag.attr("id", "hidden");

            var org_grid = $(".org-grid--layout");
            org_grid.attr("id", "visible");
            var org_list2 = $(".org-list--layout");
            org_list2.attr("id", "hidden");
            var org_listC = $(".org-listCategory");
            org_listC.attr("id", "hidden");
            var org_listD = $(".org-listDsc");
            org_listD.attr("id", "hidden");
            var org_listO = $(".org-listOrder");
            org_listO.attr("id", "hidden");
        }
    });
    $("#gridIcon").click(function () {
        var grid = $(".gridBox");
        if (grid.attr("id") == "visible") {
            var grid2 = $(".gridLayout");
            grid2.attr("id", "visible");
            var list = $(".listLayout");
            list.attr("id", "hidden");
            var listC = $(".listCategory");
            listC.attr("id", "hidden");
            var listD = $(".listDsc");
            listD.attr("id", "hidden");
            var listO = $(".listOrder");
            listO.attr("id", "hidden");

            var grid2 = $(".documentLayout");
            grid2.attr("id", "visible");
            var list3 = $(".doclistLayout");
            list3.attr("id", "hidden");

            var listC2 = $(".doclistCategory");
            listC2.attr("id", "hidden");
            var listD2 = $(".doclistDsc");
            listD2.attr("id", "hidden");
            var listO2 = $(".doclistOrder");
            listO2.attr("id", "hidden");
            var listT = $(".doclistTitle");
            listT.attr("id", "hidden");
            var listTag = $(".doclistTags");
            listTag.attr("id", "hidden");

            var org_grid = $(".org-grid--layout");
            org_grid.attr("id", "visible");
            var org_list2 = $(".org-list--layout");
            org_list2.attr("id", "hidden");
            var org_listC = $(".org-listCategory");
            org_listC.attr("id", "hidden");
            var org_listD = $(".org-listDsc");
            org_listD.attr("id", "hidden");
            var org_listO = $(".org-listOrder");
            org_listO.attr("id", "hidden");
        }
        if (grid.attr("id") == "hidden") {
            var grid2 = $(".gridLayout");
            grid2.attr("id", "hidden");
            var list = $(".listLayout");
            list.attr("id", "visible");
            var listC = $(".listCategory");
            listC.attr("id", "visibile");
            var listD = $(".listDsc");
            listD.attr("id", "visible");
            var listO = $(".listOrder");
            listO.attr("id", "visible");

            var grid2 = $(".documentLayout");
            grid2.attr("id", "hidden");
            var list3 = $(".doclistLayout");
            list3.attr("id", "visible");

            var listC2 = $(".doclistCategory");
            listC2.attr("id", "visibile");
            var listD2 = $(".doclistDsc");
            listD2.attr("id", "visible");
            var listO2 = $(".doclistOrder");
            listO2.attr("id", "visible");
            var listT = $(".doclistTitle");
            listT.attr("id", "visible");
            var listTag = $(".doclistTags");
            listTag.attr("id", "visible");

            var org_grid = $(".org-grid--layout");
            org_grid.attr("id", "hidden");
            var org_list2 = $(".org-list--layout");
            org_list2.attr("id", "visible");
            var org_listC = $(".org-listCategory");
            org_listC.attr("id", "visibile");
            var org_listD = $(".org-listDsc");
            org_listD.attr("id", "visible");
            var org_listO = $(".org-listOrder");
            org_listO.attr("id", "visible");
        }
    });

    $('.add-to-box1').click(function () {
        var box = $(this);
        box.attr('id', (box.attr('id') === 'deselected' ? 'selected' : 'deselected'));
    });
    $('.add-to-box2').click(function () {
        var box = $(this);
        box.attr('id', (box.attr('id') === 'deselected' ? 'selected' : 'deselected'));
    });
    $('.add-to-box3').click(function () {
        var box = $(this);
        box.attr('id', (box.attr('id') === 'deselected' ? 'selected' : 'deselected'));
    });
    $('.add-to-box4').click(function () {
        var box = $(this);
        box.attr('id', (box.attr('id') === 'deselected' ? 'selected' : 'deselected'));
    });
    $('.add-to-box5').click(function () {
        var box = $(this);
        box.attr('id', (box.attr('id') === 'deselected' ? 'selected' : 'deselected'));
    });

    $('.altMail').click(function () {
        var content = $('.modal.box1 .modal-content');
        content.css("height", "700px");

        var street = $('#id_mail_street');
        var street2 = $('.mailstreetName');
        street.css("visibility", "visible");
        street2.css("visibility", "visible");

        var apt = $('#id_mail_apt_number');
        var apt2 = $('.mailaptName');
        apt.css("visibility", "visible");
        apt2.css("visibility", "visible");

        var city = $('#id_mail_city');
        var city2 = $('.mailcityName')
        city.css("visibility", "visible");
        city2.css("visibility", "visible");

        var state = $('#id_mail_state');
        var state2 = $('.mailstateName');
        state.css("visibility", "visible");
        state2.css("visibility", "visible");

        var zipcode = $('#id_mail_zipcode');
        var zipcode2 = $('.mailzipName');
        zipcode.css("visibility", "visible");
        zipcode2.css("visibility", "visible");

        var details = $('.modalMailDet');
        details.css("visibility", "visible");
    });

    $('.continueBtn').click(function () {
        var content = $('.modal.box1 .modal-content');
        content.css("height", "100%");
    });

    /*$('.customCBox').on('change', function () {
        if ($('.customCBox').is(':checked'))
            alert("checked");
        else {
            alert("unchecked");
        }
    });*/
});

function filtertagFunction() {
    var input, filter, div, a, i;
    input = document.getElementById("orgtagInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("tagsDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

function filtertagFunction2() {
    var input, filter, div, a, i;
    input = document.getElementById("orgtagInput2");
    filter = input.value.toUpperCase();
    div = document.getElementById("tagsDropdown2");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

function showInput() {
    document.getElementById('display_org_name').innerHTML =
        document.getElementById("id_org_name").value;

    document.getElementById('confirmation-org-title').innerHTML =
        document.getElementById("id_org_name").value + "?";

    document.getElementById('display_website').innerHTML =
        document.getElementById("id_website").value;

    document.getElementById('display_org_phone').innerHTML =
        document.getElementById("id_org_phone").value;

    document.getElementById('display_org_email').innerHTML =
        document.getElementById("id_org_email").value;

    document.getElementById('display_description').innerHTML =
        document.getElementById("id_description").value;

    var checkboxes = document.getElementsByName('eligibility');
    var vals = "";
    for (var i = 0, n = checkboxes.length; i < n; i++) {
        if (checkboxes[i].checked) {
            vals += "," + checkboxes[i].value;
        }
    }
    if (vals) vals = vals.substring(1);

    var fullstring = "";
    for (var j = 0, m = vals.length; j < m; j++) {
        if (vals[j] == 1) {
            fullstring += ", " + "All Ages";
        }
        else if (vals[j] == 2) {
            fullstring += ", " + "Youth (under 12)";
        }
        else if (vals[j] == 3) {
            fullstring += ", " + "Teens (13-17)";
        }
        else if (vals[j] == 4) {
            fullstring += ", " + "Adults (18+)";
        }
        else if (vals[j] == 5) {
            fullstring += ", " + "Seniors (60+)";
        }
    }
    if (fullstring) fullstring = fullstring.substring(1);

    document.getElementById('display_eligibility').innerHTML = fullstring;

    var checkboxes = document.getElementsByName('languages');
    var vals = [];
    for (var i = 0, n = checkboxes.length; i < n; i++) {
        if (checkboxes[i].checked) {
            vals.push(checkboxes[i].value)
        }
    }
    
    var fullstring = "";
    for (var j = 0, m = vals.length; j < m; j++) {
        if (vals[j] == "English") {
            fullstring += ", " + "English";
        }
        else if (vals[j] == "Spanish") {
            fullstring += ", " + "Spanish";
        }
    }
    if (fullstring) fullstring = fullstring.substring(1);

    document.getElementById('display_languages').innerHTML = fullstring;

    var checkboxes = document.getElementsByName('areas_served');
    var vals = [];
    for (var i = 0, n = checkboxes.length; i < n; i++) {
        if (checkboxes[i].checked) {
            vals.push(checkboxes[i].value)
        }
    }
    
    var fullstring = "";
    for (var j = 0, m = vals.length; j < m; j++) {
        if (vals[j] == "Worcester") {
            fullstring += ", " + "Worcester";
        }
        else if (vals[j] == "Wicomico") {
            fullstring += ", " + "Wicomico";
        }
        else if (vals[j] == "Dorchester") {
            fullstring += ", " + "Dorchester";
        }
        else if (vals[j] == "Somerset") {
            fullstring += ", " + "Somerset";
        }
    }
    if (fullstring) fullstring = fullstring.substring(1);

    document.getElementById('display_areas_served').innerHTML = fullstring;

    document.getElementById('display_street').innerHTML =
        document.getElementById("id_street").value;

    
    if (document.getElementById("id_city").value.length > 0 && document.getElementById("id_state").value.length > 0 && document.getElementById("id_zipcode").value.length > 0){
        var fullcity = document.getElementById("id_city").value + ", " + document.getElementById("id_state").value + " " + document.getElementById("id_zipcode").value;
    }
    else{
        var fullcity = ""
    }

    document.getElementById('display_city').innerHTML = fullcity;

    var fullcounty = document.getElementById("id_county").value;

    document.getElementById('display_county').innerHTML = fullcounty + " County"

    var fullcontactname = document.getElementById("id_contact_name").value + ", " + document.getElementById("id_contact_title").value;

    document.getElementById('display_contact_name').innerHTML = fullcontactname;

    document.getElementById('display_contact_email').innerHTML =
        document.getElementById("id_contact_email").value;

    document.getElementById('display_contact_phone').innerHTML =
        document.getElementById("id_contact_phone").value;


    document.getElementById('display_mailstreet').innerHTML =
        document.getElementById("id_mail_street").value;

    if (document.getElementById("id_mail_city").value.length > 0 && document.getElementById("id_mail_state").value.length > 0 && document.getElementById("id_mail_zipcode").value.length > 0){
        var fullcity2 = document.getElementById("id_mail_city").value + ", " + document.getElementById("id_mail_state").value + " " + document.getElementById("id_mail_zipcode").value;
    }
    else{
        var fullcity2 = ""
    }
    
    document.getElementById('display_mailcity').innerHTML = fullcity2;


}

function showInput2(num) {
    document.getElementById('display_org_name2' + num + '').innerHTML =
        document.getElementById("id_orgs-" + num + "-org_name").value;

    document.getElementById('display_website2' + num + '').innerHTML =
        document.getElementById("id_orgs-" + num + "-website").value;

    document.getElementById('display_org_phone2' + num + '').innerHTML =
        document.getElementById("id_orgs-" + num + "-org_phone").value;

    document.getElementById('display_org_email2' + num + '').innerHTML =
        document.getElementById("id_orgs-" + num + "-org_email").value;

    document.getElementById('display_description2' + num + '').innerHTML =
        document.getElementById("id_orgs-" + num + "-description").value;

    var checkboxes = document.getElementsByName('orgs-' + num + '-eligibility');
    var vals = "";
    for (var i = 0, n = checkboxes.length; i < n; i++) {
        if (checkboxes[i].checked) {
            vals += "," + checkboxes[i].value;
        }
    }
    if (vals) vals = vals.substring(1);

    var fullstring = "";
    for (var j = 0, m = vals.length; j < m; j++) {
        if (vals[j] == 1) {
            fullstring += "," + "All Ages";
        }
        else if (vals[j] == 2) {
            fullstring += "," + "Youth (under 12)";
        }
        else if (vals[j] == 3) {
            fullstring += "," + "Teens (13-17)";
        }
        else if (vals[j] == 4) {
            fullstring += "," + "Adults (18+)";
        }
        else if (vals[j] == 5) {
            fullstring += "," + "Seniors (60+)";
        }
    }
    if (fullstring) fullstring = fullstring.substring(1);

    document.getElementById('display_eligibility2' + num + '').innerHTML = fullstring;

    var checkboxes = document.getElementsByName('orgs-' + num + '-languages');
    var vals = [];
    for (var i = 0, n = checkboxes.length; i < n; i++) {
        if (checkboxes[i].checked) {
            vals.push(checkboxes[i].value)
        }
    }
    
    var fullstring = "";
    for (var j = 0, m = vals.length; j < m; j++) {
        if (vals[j] == "English") {
            fullstring += ", " + "English";
        }
        else if (vals[j] == "Spanish") {
            fullstring += ", " + "Spanish";
        }
    }
    if (fullstring) fullstring = fullstring.substring(1);

    document.getElementById('display_languages2' + num + '').innerHTML = fullstring;

    var checkboxes = document.getElementsByName('orgs-' + num + '-areas-served');
    var vals = [];
    for (var i = 0, n = checkboxes.length; i < n; i++) {
        if (checkboxes[i].checked) {
            vals.push(checkboxes[i].value)
        }
    }
    
    var fullstring = "";
    for (var j = 0, m = vals.length; j < m; j++) {
        if (vals[j] == "Worcester") {
            fullstring += ", " + "Worcester";
        }
        else if (vals[j] == "Wicomico") {
            fullstring += ", " + "Wicomico";
        }
        else if (vals[j] == "Dorchester") {
            fullstring += ", " + "Dorchester";
        }
        else if (vals[j] == "Somerset") {
            fullstring += ", " + "Somerset";
        }
    }
    if (fullstring) fullstring = fullstring.substring(1);

    document.getElementById('display_areas_served2' + num + '').innerHTML = fullstring;

    document.getElementById('display_street2' + num + '').innerHTML =
        document.getElementById("id_orgs-" + num + "-street").value;

    var fullcity = document.getElementById("id_orgs-" + num + "-city").value + ", " + document.getElementById("id_orgs-" + num + "-state").value + " " + document.getElementById("id_orgs-" + num + "-zipcode").value;

    document.getElementById('display_city2' + num + '').innerHTML = fullcity;

    var fullcounty = document.getElementById("id_orgs-" + num + "-county").value;

    document.getElementById('display_county2' + num + '').innerHTML = fullcounty + " County"

    var fullcontactname = document.getElementById("id_orgs-" + num + "-contact_name").value + ", " + document.getElementById("id_orgs-" + num + "-contact_title").value;

    document.getElementById('display_contact_name2' + num + '').innerHTML = fullcontactname;

    document.getElementById('display_contact_email2' + num + '').innerHTML =
        document.getElementById("id_orgs-" + num + "-contact_email").value;

    document.getElementById('display_contact_phone2' + num + '').innerHTML =
        document.getElementById("id_orgs-" + num + "-contact_phone").value;


    document.getElementById('display_mailstreet2' + num + '').innerHTML =
        document.getElementById("id_orgs-" + num + "-mail_street").value;

    var fullcity2 = document.getElementById("id_orgs-" + num + "-mail_city").value + ", " + document.getElementById("id_orgs-" + num + "-mail_state").value + " " + document.getElementById("id_orgs-" + num + "-mail_zipcode").value;

    document.getElementById('display_mailcity2' + num + '').innerHTML = fullcity2;

}


var totalentries = 0;
var curentries = 0;
//Add tag from dropdown menu to selected tags. Give each of them a value based on their database ID
$(document).ready(function () {

    //Add tag from dropdown menu to selected tags. Give each of them a value based on their database ID
    $('#myDropdown').on('click', 'a.tagA', function () {
        var tagtext = $(this).text();
        var tagvalue = $(this).attr("value");
        var taglength = tagtext.length;
        if (taglength < 10) {
            $('.tagBox').append('<div class="tag1" value=' + tagvalue + '>' + tagtext + '</div>');
        }
        if (taglength > 10) {
            $('.tagBox').append('<div class="tag2" value=' + tagvalue + '>' + tagtext + '</div>');
        }
        $('.tagA').each(function () {
            if ($(this).text() == tagtext) {
                $(this).remove();
            }
        });
    })

    $('#tagsDropdown').off('click').on('click', 'a.tagA', function () {
        var tagtext = $(this).text();
        var tagvalue = $(this).attr("value");
        var taglength = tagtext.length;
        if (taglength < 10) {
            $('.tagBox').append('<div class="tag1" value=' + tagvalue + '>' + tagtext + '</div>');
        }
        if (taglength >= 10) {
            $('.tagBox').append('<div class="tag2" value=' + tagvalue + '>' + tagtext + '</div>');
        }
        $('.tagA').each(function () {
            if ($(this).text() == tagtext) {
                $(this).remove();
            }
        });
    });

    $('[class^=orgTagDropdown-content2]').off('click').on('click', 'a.tagA', function () {
        var tagclass = $(this).parent().attr('class');
        var newclass = tagclass.replace(/orgTagDropdown-content2/, "");
        var tagtext = $(this).text();
        var tagvalue = $(this).attr("value");
        var taglength = tagtext.length;
        if (taglength < 10) {
            $('.tagBox2' + newclass + '').append('<div class="tag1" value=' + tagvalue + '>' + tagtext + '</div>');
        }
        if (taglength >= 10) {
            $('.tagBox2' + newclass + '').append('<div class="tag2" value=' + tagvalue + '>' + tagtext + '</div>');
        }
        $('.tagA').each(function () {
            if ($(this).text() == tagtext) {
                $(this).remove();
            }
        });
    });

    //Remove tag1 (small) from selected tags, return it to dropdown menu
    $('div.tagBox').off('click').on('click', 'div.tag1', function () {
        var tagtext = $(this).text();
        var tagvalue = $(this).attr("value");
        var tagid = $(this).attr("id");
        var testid = new RegExp('id2_form-')
        if (!testid.test(tagid)) {
            $('#tagsDropdown').append('<a class="tagA" value=' + tagvalue + '>' + tagtext + '</a>');
        }
        if (testid.test(tagid)) {
            var thisid = tagid.replace(/id2_form-/, '');
            var newid = $('#id_tags-' + thisid + '-tag');
            newid.parent().parent().parent().parent().remove();
        }
        $(this).closest('div.tag1').remove();
    });

    //Remove tag2 (large) from selected tags, return it to dropdown menu
    $('div.tagBox').on('click', 'div.tag2', function () {
        var tagtext = $(this).text();
        var tagvalue = $(this).attr("value");
        var tagid = $(this).attr("id");
        var testid = new RegExp('id2_form-')
        if (!testid.test(tagid)) {
            $('#tagsDropdown').append('<a class="tagA" value=' + tagvalue + '>' + tagtext + '</a>');
        }
        if (testid.test(tagid)) {
            var thisid = tagid.replace(/id2_form-/, '');
            var newid = $('#id_tags-' + thisid + '-tag');
            newid.parent().parent().parent().parent().remove();
        }
        $(this).closest('div.tag2').remove();
    });

    //Remove tag1 (small) from selected tags, return it to dropdown menu
    $('div[class^=tagBox2]').off('click').on('click', 'div.tag1', function () {
        var tagclass = $(this).parent().attr('class');
        var newclass = tagclass.replace(/tagBox2/, "");
        var tagtext = $(this).text();
        var tagvalue = $(this).attr("value");
        var tagid = $(this).attr("id");
        var testid = new RegExp('id2_form-')
        if (!testid.test(tagid)) {
            $('.orgTagDropdown-content2' + newclass + "").append('<a class="tagA" value=' + tagvalue + '>' + tagtext + '</a>');
        }
        if (testid.test(tagid)) {
            var thisid = tagid.replace(/id2_form-/, '');
            var newid = $('#id_tags2-' + thisid + '-tag');
            newid.parent().parent().parent().parent().remove();
        }
        $(this).closest('div.tag1').remove();
    });

    //Remove tag2 (large) from selected tags, return it to dropdown menu
    $('div[class^=tagBox2]').on('click', 'div.tag2', function () {
        var tagclass = $(this).parent().attr('class');
        var newclass = tagclass.replace(/tagBox2/, "");
        var tagtext = $(this).text();
        var tagvalue = $(this).attr("value");
        var tagid = $(this).attr("id");
        var testid = new RegExp('id2_form-')
        if (!testid.test(tagid)) {
            $('.orgTagDropdown-content2' + newclass + "").append('<a class="tagA" value=' + tagvalue + '>' + tagtext + '</a>');
        }
        if (testid.test(tagid)) {
            var thisid = tagid.replace(/id2_form-/, '');
            var newid = $('#id_tags2-' + thisid + '-tag');
            newid.parent().parent().parent().parent().remove();
        }
        $(this).closest('div.tag2').remove();
    });

    //Add tags from modelformset to selected tags
    $('.testbtn').off('click').click(function () {
        var entries = totalentries;
        for (var i = entries; i < curentries + 1; i++) {
            var tagtext = $("#id_tags-" + i + "-tag").val();
            if (tagtext) {
                var taglength = tagtext.length;
                if (taglength != 0 && taglength < 10) {
                    $('.tagBox').append('<div class="tag1" id="id2_form-' + i + '">' + tagtext + '</div>');
                }
                if (taglength >= 10) {
                    $('.tagBox').append('<div class="tag2" id="id2_form-' + i + '">' + tagtext + '</div>');
                }
                totalentries++;
            }
        }
    });

    //Remove new tags and remove from selected tags
    $('.testbtn2').off('click').click(function () {
        var findthis = document.getElementsByClassName('no_error');
        var findthis2 = findthis[findthis.length - 2];

        var findme = $('.no_error').find('tbody').find('tr').find('td').find('input[type=text]');
        var findme2 = findme[findme.length - 2];
        var findme3 = findme2.getAttribute('id');
        var delid = findme3.replace(/id_tags-/, '');
        var delid2 = delid.replace(/-tag/, '');
        if ($('#id2_form-' + delid2 + '').length != 0) {
            $('#id2_form-' + delid2 + '').remove();
        }
        findthis2.remove();

    });

    //Add tags from modelformset to selected tags
    $('.testbtn3').off('click').click(function () {
        var thisval = $('.modal.box1.fade.show').attr('value');
        alert(thisval);
        var entries = totalentries;
        for (var i = entries; i < curentries + 1; i++) {
            var tagtext = $("#id_tags2-" + i + "-tag").val();
            if (tagtext) {
                var taglength = tagtext.length;
                if (taglength != 0 && taglength < 10) {
                    $('.tagBox2' + thisval + '').append('<div class="tag1" id="id2_form-' + i + '">' + tagtext + '</div>');
                }
                if (taglength >= 10) {
                    $('.tagBox2' + thisval + '').append('<div class="tag2" id="id2_form-' + i + '">' + tagtext + '</div>');
                }
                totalentries++;
            }
        }
    });

    //Remove new tags and remove from selected tags
    $('.testbtn4').off('click').click(function () {
        var findthis = document.getElementsByClassName('no_error');
        var findthis2 = findthis[findthis.length - 2];

        var findme = $('.no_error').find('tbody').find('tr').find('td').find('input[type=text]');
        var findme2 = findme[findme.length - 2];
        var findme3 = findme2.getAttribute('id');
        var delid = findme3.replace(/id_tags2-/, '');
        var delid2 = delid.replace(/-tag/, '');
        if ($('#id2_form-' + delid2 + '').length != 0) {
            $('#id2_form-' + delid2 + '').remove();
        }
        findthis2.remove();

    });

    //Add new form for tags
    $('#add_more').off('click').click(function () {
        var form_idx = $('#id_tags-TOTAL_FORMS').val();
        $('#form_set').append($('#empty_form').html().replace(/__prefix__/g, form_idx));
        $('#id_tags-TOTAL_FORMS').val(parseInt(form_idx) + 1);
        curentries++;
    });

    //Add new form for tags
    $('#add_more2').off('click').click(function () {
        var form_idx = $('#id_tags2-TOTAL_FORMS').val();
        $('#form_set2').append($('#empty_form2').html().replace(/__prefix__/g, form_idx));
        $('#id_tags2-TOTAL_FORMS').val(parseInt(form_idx) + 1);
        curentries++;
    });

    //Check to see if tags exist, if they do add them (FOR ADD)
    $('#checkthis').off('click').click(function () {
        var test = $('div[class=tagBox]').children('div.tag1');
        var testboxes = $(".hideboxes");
        for (var i = 0; i < test.length; i++) {
            var checkthis = $(test[i]).attr("value");
            for (var j = 0; j < testboxes.length; j++) {
                var thistext = $("#id_org_tags_" + j + "").val();
                if (checkthis == thistext) {
                    $("#id_org_tags_" + j + "").prop('checked', true);
                }
            }
        }
        var test2 = $('div[class=tagBox]').children('div.tag2');
        var testboxes2 = $(".hideboxes");
        for (var i = 0; i < test2.length; i++) {
            var checkthis2 = $(test2[i]).attr("value");
            for (var j = 0; j < testboxes2.length; j++) {
                var thistext2 = $("#id_org_tags_" + j + "").val();
                if (checkthis2 == thistext2) {
                    $("#id_org_tags_" + j + "").prop('checked', true);
                }
            }
        }
    });

    //Check to see if tags exist, if they do add them (FOR EDIT)
    $('[id^=checkthis3]').off('click').click(function () {
        var counter = $(this).val();
        var test = $(".tag1");
        var testmodal = $('[value=' + counter + ']#editorgForm2' + counter);
        var testbox = testmodal.children().children().children('div.modal-body').children().children('div[class^=tagBox2]').children('div.tag1');
        var testboxes = $(".hideboxes2");
        for (var i = 0; i < testbox.length; i++) {
            var checkthis = $(testbox[i]).attr("value");
            for (var j = 0; j < testboxes.length; j++) {
                var thistext = $("#id_orgs-" + counter + "-org_tags_" + j + "").val();
                if (checkthis == thistext) {
                    $("#id_orgs-" + counter + "-org_tags_" + j + "").prop('checked', true);
                }
            }
        }
        var testbox2 = testmodal.children().children().children('div.modal-body').children().children('div[class^=tagBox2]').children('div.tag2');
        var test2 = $(".tag2");
        var testboxes2 = $(".hideboxes2");
        for (var i = 0; i < testbox2.length; i++) {
            var checkthis2 = $(testbox2[i]).attr("value");
            for (var j = 0; j < testboxes2.length; j++) {
                var thistext2 = $("#id_orgs-" + counter + "-org_tags_" + j + "").val();
                if (checkthis2 == thistext2) {
                    $("#id_orgs-" + counter + "-org_tags_" + j + "").prop('checked', true);
                }
            }
        }
    });

    $(".dropdown").focusout(function () {
        var input, filter, ul, li, a, i, div;

        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        div = document.getElementById("myDropdown");
        a = div.getElementsByTagName("a");
        div.style.display = "none";

    });

    $(".dropdown").focusin(function () {
        var input, filter, ul, li, a, i, div;

        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        div = document.getElementById("myDropdown");
        a = div.getElementsByTagName("a");
        div.style.display = "block";
    });

    $(".orgTagDropdown").focusout(function () {
        var input, filter, ul, li, a, i, div;

        input = document.getElementById("orgtagInput");
        filter = input.value.toUpperCase();
        div = document.getElementById("tagsDropdown");
        a = div.getElementsByTagName("a");
        div.style.display = "none";

    });

    $(".orgTagDropdown").focusin(function () {
        var input, filter, ul, li, a, i, div;

        input = document.getElementById("orgtagInput");
        filter = input.value.toUpperCase();
        div = document.getElementById("tagsDropdown");
        a = div.getElementsByTagName("a");
        div.style.display = "block";
    });

    $("button[data-dismiss-modal=modal2]").click(function () {
        $('#exampleModal').modal('hide');
    });
    $("button[data-dismiss-modal=modal2edit]").click(function () {
        $('#editexampleModal').modal('hide');
    });
    $("#selecteditorg").click(function () {
        var thisoption = $('#editorgsdd').val();
        var thisoption2 = thisoption.replace(/org/, "");
        $('#editform' + thisoption2 + "").modal('show');
    });
    /*$('.continuebtn1').click(function () {
        var thisval = $(this).attr('value');
        $('[value=' + thisval + ']#editFormPT2' + thisval + "").modal('show');
    });*/
    /*$('.continuebtn2').click(function () {
        var thisval = $(this).attr('value');
        $('[value=' + thisval + ']#editorgForm2' + thisval + "").modal('show');
    });*/
    $('.continuebtn3').click(function () {
        var thisval = $(this).attr('value');
        showInput2(thisval);
        $('[value=' + thisval + ']#editorgForm3' + thisval + "").modal('show');
    });
    $('.continuebtn4').click(function () {
        var thisval = $(this).attr('value');
        $('[value=' + thisval + ']#editorgForm4' + thisval + "").modal('show');
    });
    $('.continuebtn5').click(function () {
        var thisval = $(this).attr('value');
        $('[value=' + thisval + ']#editorgForm5' + thisval + "").modal('show');
    });
});

$(document).ready(function () {
    $("#id_org_image").change(function () {
        var fileName = "";
        fileName = $(this).val();
        var newFile2 = fileName.replace(/C:\\fakepath\\/, '');
        $('#file-selected').html(newFile2);
    });

    $(".addCollabBox").on('click', 'a.org-collab__A', function () {
        var thisval = $(this).attr('value');
        $(this).removeClass("org-collab__A");
        $(this).addClass("org-collab__B");
        var thisinput = $(this).parent();
        $(thisinput).find('input[type="checkbox"][value=' + thisval + ']').prop('checked', true);
    });

    $(".addCollabBox").on('click', 'a.org-collab__B', function () {
        var thisval = $(this).attr('value');
        $(this).removeClass("org-collab__B");
        $(this).addClass("org-collab__A");
        var thisinput = $(this).parent();
        $(thisinput).find('input[type="checkbox"][value=' + thisval + ']').prop('checked', false);
    });

    $("form").on('click', 'li.file-collab__A', function () {
        var thisval = $(this).attr('value');
        var thismodal = $(this).parent().parent().parent().parent().parent()
        $(this).removeClass("file-collab__A");
        $(this).addClass("file-collab__B");
        $(thismodal).find('input[name="collabCheckboxes"][value=' + thisval + ']').prop('checked', true)
    });

    $("form").on('click', 'li.file-collab__B', function () {
        var thisval = $(this).attr('value');
        var thismodal = $(this).parent().parent().parent().parent().parent()
        $(this).removeClass("file-collab__B");
        $(this).addClass("file-collab__A");
        $(thismodal).find('input[name="collabCheckboxes"][value=' + thisval + ']').prop('checked', false)
    });

    $("form").on('click', 'li.file-tag__A', function () {
        var thisval = $(this).attr('value');
        var thismodal = $(this).parent().parent().parent().parent().parent()
        $(this).removeClass("file-tag__A");
        $(this).addClass("file-tag__B");
        $(thismodal).find('input[name="filetagCheckboxes"][value=' + thisval + ']').prop('checked', true)
    });

    $("form").on('click', 'li.file-tag__B', function () {
        var thisval = $(this).attr('value');
        var thismodal = $(this).parent().parent().parent().parent().parent()
        $(this).removeClass("file-tag__B");
        $(this).addClass("file-tag__A");
        $(thismodal).find('input[name="filetagCheckboxes"][value=' + thisval + ']').prop('checked', false)
    });
});

$(document).ready(function () {
    $('body').on('click', '[class^=edit-org-option]', function(){
        var current_option = $('.edit-org-option-selected')
        var this_org = $(this).attr('value')
        if ($(current_option).length > 0){
            $('#editorgsdd').val(this_org).change()
            $('.edit-org-option-selected').removeClass('edit-org-option-selected')
            $('.edit-org-title-selected').removeClass('edit-org-title-selected')
            $(this).addClass('edit-org-option-selected')
            $(this).children('div.edit-orgs-org-title').addClass('edit-org-title-selected')
        }
        else{
            $(this).addClass('edit-org-option-selected')
            $('#editorgsdd').val(this_org).change()
            $(this).children('div.edit-orgs-org-title').addClass('edit-org-title-selected')
        }
    });

    $('body').on('click', '[class^=edit-org-option-selected]', function(){
        $(this).removeClass('edit-org-option-selected')
        $(this).children('div.edit-orgs-org-title').removeClass('edit-org-title-selected')
    });

    $('#orgForm1').on('show.bs.modal', function () {
        $('[name=org_name]').prop('required', true);
        $('[name=website]').prop('required', true);
        $('[name=org_phone]').prop('required', true);
        $('[name=org_email]').prop('required', true);
        $('[name=org_fax]').prop('required', true);
        $('[name=description]').prop('required', true);
        $('[name=street]').prop('required', true);
        $('[name=city]').prop('required', true);
        $('[name=contact_name]').prop('required', true);
        $('[name=contact_phone]').prop('required', true);
        $('[name=contact_title]').prop('required', true);
        $('[name=contact_email]').prop('required', true);
        $('[name=zipcode]').prop('required', true);
    });
    $('#orgForm1').on('hide.bs.modal', function () {
        $('[name=org_name]').removeAttr('required');
        $('[name=website]').removeAttr('required');
        $('[name=zipcode]').removeAttr('required');
        $('[name=org_phone]').removeAttr('required');
        $('[name=org_email]').removeAttr('required');
        $('[name=org_fax]').removeAttr('required');
        $('[name=description]').removeAttr('required');
        $('[name=street]').removeAttr('required');
        $('[name=city]').removeAttr('required');
        $('[name=contact_name]').removeAttr('required');
        $('[name=contact_phone]').removeAttr('required');
        $('[name=contact_title]').removeAttr('required');
        $('[name=contact_email]').removeAttr('required');
    });
    $('[id^=editorgForm2]').on('show.bs.modal', function () {
        var thisid = $(this).attr('id');
        var newid = thisid.replace(/editorgForm2/, "");
        //var checkbtnval = $("#checkthis2" + newid + "");
        $('[name$=' + newid + '-org_tags]').removeAttr('checked');
        //var curtags = $('.tagBox2');
        //var thiscurtag = curtags[checkbtnval];
        /*console.log(thiscurtag);
        var thistag1 = curtags.children("div.tag1");
        var thistag2 = curtags.children("div.tag2");
        for (var i = 0; i < thistag1.length; i++) {
            console.log(thistag1[i]);
        }*/
    });
    $('[id^=editorgForm4]').on('show.bs.modal', function () {
        var thisid = $(this).attr('id');
        var theseclasses = $(this).children().children().children('div.modal-body').children('p.hiddendirs');
        var thesedirs = $(this).children().children().children('div.modal-body').children('div.add-to-dir__layout').children('label[class^=add-to-dir__box]');
        var fixthese = $(this).children().children().children('div.modal-body').children('div.add-to-dir__layout');
        for (var i = 0; i < theseclasses.length; i++) {
            var thistext = $(theseclasses[i]).text();
            for (var j = 0; j < thesedirs.length; j++) {
                var mytext = $(thesedirs[j]).children('div#deselected[class^=add-to-box]').text();
                if (mytext == thistext) {
                    $(thesedirs[j]).children('div#deselected[class^=add-to-box]').removeAttr('id');
                    $(thesedirs[j]).children('div[class^=add-to-box]').attr('id', 'selected');

                    $(fixthese).find('input[type="checkbox"][id=id_sub_dirs_' + j + ']');
                    $(fixthese).find('input[type="checkbox"][id=id_sub_dirs_' + j + ']').prop('checked', true);
                }
            }
        }
        var collabs = $(this).children().children().children('div.modal-body').children('div.addCollabBox').children('ul').children('li').children().children();
        for (var y = 0; y < collabs.length; y++) {
            var collabval = $(collabs[y]).attr('value')
            var changeme = $(this).children().children().children('div.modal-body').children('div.addCollabBox').children('a.org-collab__A')
            if (collabval == $(changeme).attr('value')) {
                $(changeme).removeClass('org-collab__A')
                $(changeme).addClass('org-collab__B')
            }
        }
    });
});