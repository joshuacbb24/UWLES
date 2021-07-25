const formatPhone = (event) =>{
    var input = event.target.value.replace(/\D/g, '').substring(0,10);
    var areaCode = input.substring(0, 3);
    var midNums = input.substring(3, 6);
    var lastNums = input.substring(6, 10);

    if (input.length > 6){
        event.target.value = `(${areaCode})${midNums}-${lastNums}`;
    }
    else if(input.length > 3){
        event.target.value = `(${areaCode})${midNums}`;
    }
    else if(input.length > 0){
        event.target.value = `${areaCode}`;
    }
}

function changeFormat(option){
    var input1 = document.getElementById('id_orgs-'+ option + '-org_phone');
    var inputval = input1.value
    var areaCode = inputval.substring(0, 3)
    var midNums = inputval.substring(3, 6);
    var lastNums = inputval.substring(6, 10);
    if (inputval > 6){
        input1.value = `(${areaCode})${midNums}-${lastNums}`;
    }
    else if(inputval > 3){
        input1.value = `(${areaCode})${midNums}`;
    }
    else if(inputval > 0){
        input1.value = `(${areaCode}`;
    }

    var input2 = document.getElementById('id_orgs-'+ option + '-contact_phone');
    var inputval2 = input2.value
    var areaCode2 = inputval2.substring(0, 3)
    var midNums2 = inputval2.substring(3, 6);
    var lastNums2 = inputval2.substring(6, 10);
    if (inputval2 > 6){
        input2.value = `(${areaCode2})${midNums2}-${lastNums2}`;
    }
    else if(inputval2 > 3){
        input2.value = `(${areaCode2})${midNums2}`;
    }
    else if(inputval2 > 0){
        input2.value = `(${areaCode2}`;
    }
}

function revertFormat(option){
    var input1 = document.getElementById('id_orgs-'+ option + '-org_phone');
    var inputval = input1.value;
    var inputval_new = inputval.replace(/\(|\)|\-/g, '');
    document.getElementById('id_orgs-'+ option + '-org_phone').value = inputval_new;

    var input2 = document.getElementById('id_orgs-'+ option + '-contact_phone');
    var inputval2 = input2.value;
    var inputval2_new = inputval2.replace(/\(|\)|\-/g, '');
    document.getElementById('id_orgs-'+ option + '-contact_phone').value = inputval2_new;
}

function revertFormat1(){
    var input1 = document.getElementById('id_org_phone');
    var inputval = input1.value;
    var inputval_new = inputval.replace(/\(|\)|\-/g, '');
    document.getElementById('id_org_phone').value = inputval_new;

    var input2 = document.getElementById('id_contact_phone');
    var inputval2 = input2.value;
    var inputval2_new = inputval2.replace(/\(|\)|\-/g, '');
    document.getElementById('id_contact_phone').value = inputval2_new;
}


const inputElement = document.getElementById('id_org_phone');
inputElement.addEventListener('keyup', formatPhone);

const inputElement2 = document.getElementById('id_contact_phone');
inputElement2.addEventListener('keyup', formatPhone);

$(document).ready(function(){
    $("#selecteditorg").click(function () {
        var thisoption = $('#editorgsdd').val();
        var thisoption2 = thisoption.replace(/org/, "") - 1;
        changeFormat(thisoption2);
        var inputElement3 = document.getElementById('id_orgs-'+ thisoption2 + '-org_phone');
        inputElement3.addEventListener('keyup', formatPhone);
        var inputElement4 = document.getElementById('id_orgs-'+ thisoption2 + '-contact_phone');
        inputElement4.addEventListener('keyup', formatPhone);
    });

    $('button[name=submit_formx]').click(function(){
        var thisval = $(this).val();
        revertFormat(thisval);
    });

    $('button[name=submit_form1]').click(function(){
        revertFormat1();
    });

    $('body').on('click', '#continue-1.continueBtn', function(){
        if ($('#id_org_name').val() && $('#id_website').val() && $('#id_org_phone').val() && $('#id_org_email').val() && $('#id_description').val() && $('#id_street').val() && $('#id_city').val() && 
        $('#id_zipcode').val() && ($('#id_eligibility_0').is(':checked') || $('#id_eligibility_1').is(':checked') || $('#id_eligibility_2').is(':checked') || $('#id_eligibility_3').is(':checked') || $('#id_eligibility_4').is(':checked') ) &&
        $('#form-error-org-website-error').length == 0 && $('#form-error-org-phone-error').length == 0 && $('#form-error-org-name-error').length == 0 && $('#form-error-org-email-error').length == 0 && $('#form-error-org-zipcode-error').length == 0){
            if ($('.form-error-box--before').children('#form-error-org-blank-error').length != 0){
                $('.form-error-box--before').children('#form-error-org-blank-error').remove()
            }
            $('#orgForm1').modal('hide');
            $('#orgFormPT2').modal('show');
        }
        else{
            if ($('#form-error-org-blank-error').length == 0){
                $('.form-error-box--before').append("<div class='form-error-box-card' id='form-error-org-blank-error'><div class='form-error-box-ex' id='form-error-org-blank-ex'><i class='bi bi-exclamation-lg'></i></div>One or more fields missing</div>")
                $('.form-error-box--before').css({'display': 'table-cell', 'visibility': 'visible'})
                $('#form-error-org-blank-error').css({'display': 'flex', 'visibility': 'visible'})
                $('#form-error-org-blank-ex').css({'display': 'flex', 'visibility': 'visible'})
            }
        }
    });

    $('body').on('click', '#continue-2.continueBtn', function(){
        if ($('#id_contact_name').val() && $('#id_contact_phone').val() && $('#id_contact_title').val() && $('#id_contact_email').val() && ($('#id_languages_0').is(':checked') || $('#id_languages_1').is(':checked')) && 
        ($('#id_areas_served_0').is(':checked') || $('#id_areas_served_1').is(':checked') || $('#id_areas_served_2').is(':checked') || $('#id_areas_served_3').is(':checked')) &&
        $('#form-error-org-mail-zipcode-error').length == 0 && $('#form-error-org-contact-mail-error').length == 0 && $('#form-error-org-contact-phone-error').length == 0){
            if ($('.form-error-box--before2').children('#form-error-contact-blank-error').length != 0){
                $('.form-error-box--before2').children('#form-error-contact-blank-error').remove()
            }
            $('#orgFormPT2').modal('hide');
            $('#orgForm2').modal('show');
            showInput();
        }
        else{
            if ($('#form-error-contact-blank-error').length == 0){
                $('.form-error-box--before2').append("<div class='form-error-box-card' id='form-error-contact-blank-error'><div class='form-error-box-ex' id='form-error-contact-blank-ex'><i class='bi bi-exclamation-lg'></i></div>One or more fields missing</div>")
                $('.form-error-box--before2').css({'display': 'table-cell', 'visibility': 'visible'})
                $('#form-error-contact-blank-error').css({'display': 'flex', 'visibility': 'visible'})
                $('#form-error-contact-blank-ex').css({'display': 'flex', 'visibility': 'visible'})
            }
        }
    });

    $('body').on('click', '#orgForm1-circle-2.page-circle-2-title', function(){
        if ($('#id_org_name').val() && $('#id_website').val() && $('#id_org_phone').val() && $('#id_org_email').val() && $('#id_description').val() && $('#id_street').val() && $('#id_city').val() && 
        $('#id_zipcode').val() && ($('#id_eligibility_0').is(':checked') || $('#id_eligibility_1').is(':checked') || $('#id_eligibility_2').is(':checked') || $('#id_eligibility_3').is(':checked') || $('#id_eligibility_4').is(':checked') ) &&
        $('#form-error-org-website-error').length == 0 && $('#form-error-org-phone-error').length == 0 && $('#form-error-org-name-error').length == 0 && $('#form-error-org-email-error').length == 0 && $('#form-error-org-zipcode-error').length == 0){
            if ($('.form-error-box--before').children('#form-error-org-blank-error').length != 0){
                $('.form-error-box--before').children('#form-error-org-blank-error').remove()
            }
            $('#orgForm1').modal('hide');
            $('#orgFormPT2').modal('show');
        }
        else{
            if ($('#form-error-org-blank-error').length == 0){
                $('.form-error-box--before').append("<div class='form-error-box-card' id='form-error-org-blank-error'><div class='form-error-box-ex' id='form-error-org-blank-ex'><i class='bi bi-exclamation-lg'></i></div>One or more fields missing</div>")
                $('.form-error-box--before').css({'display': 'table-cell', 'visibility': 'visible'})
                $('#form-error-org-blank-error').css({'display': 'flex', 'visibility': 'visible'})
                $('#form-error-org-blank-ex').css({'display': 'flex', 'visibility': 'visible'})
            }
        }
    });

    $('body').on('click', '#orgForm1-circle-3.page-circle-3-title', function(){
        if ($('#id_org_name').val() && $('#id_website').val() && $('#id_org_phone').val() && $('#id_org_email').val() && $('#id_description').val() && $('#id_street').val() && $('#id_city').val() && 
        $('#id_zipcode').val() && ($('#id_eligibility_0').is(':checked') || $('#id_eligibility_1').is(':checked') || $('#id_eligibility_2').is(':checked') || $('#id_eligibility_3').is(':checked') || $('#id_eligibility_4').is(':checked') ) &&
        $('#form-error-org-website-error').length == 0 && $('#form-error-org-phone-error').length == 0 && $('#form-error-org-name-error').length == 0 && $('#form-error-org-email-error').length == 0 && $('#form-error-org-zipcode-error').length == 0){
            if ($('.form-error-box--before').children('#form-error-org-blank-error').length != 0){
                $('.form-error-box--before').children('#form-error-org-blank-error').remove()
            }
            $('#orgForm1').modal('hide');
            $('#orgForm2').modal('show');
        }
        else{
            if ($('#form-error-org-blank-error').length == 0){
                $('.form-error-box--before').append("<div class='form-error-box-card' id='form-error-org-blank-error'><div class='form-error-box-ex' id='form-error-org-blank-ex'><i class='bi bi-exclamation-lg'></i></div>One or more fields missing</div>")
                $('.form-error-box--before').css({'display': 'table-cell', 'visibility': 'visible'})
                $('#form-error-org-blank-error').css({'display': 'flex', 'visibility': 'visible'})
                $('#form-error-org-blank-ex').css({'display': 'flex', 'visibility': 'visible'})
            }
        }
    });

    $('body').on('click', '#orgForm1-circle-4.page-circle-4-title', function(){
        if ($('#id_org_name').val() && $('#id_website').val() && $('#id_org_phone').val() && $('#id_org_email').val() && $('#id_description').val() && $('#id_street').val() && $('#id_city').val() && 
        $('#id_zipcode').val() && ($('#id_eligibility_0').is(':checked') || $('#id_eligibility_1').is(':checked') || $('#id_eligibility_2').is(':checked') || $('#id_eligibility_3').is(':checked') || $('#id_eligibility_4').is(':checked') ) &&
        $('#form-error-org-website-error').length == 0 && $('#form-error-org-phone-error').length == 0 && $('#form-error-org-name-error').length == 0 && $('#form-error-org-email-error').length == 0 && $('#form-error-org-zipcode-error').length == 0){
            if ($('.form-error-box--before').children('#form-error-org-blank-error').length != 0){
                $('.form-error-box--before').children('#form-error-org-blank-error').remove()
            }
            $('#orgForm1').modal('hide');
            $('#orgForm2PT2').modal('show');
        }
        else{
            if ($('#form-error-org-blank-error').length == 0){
                $('.form-error-box--before').append("<div class='form-error-box-card' id='form-error-org-blank-error'><div class='form-error-box-ex' id='form-error-org-blank-ex'><i class='bi bi-exclamation-lg'></i></div>One or more fields missing</div>")
                $('.form-error-box--before').css({'display': 'table-cell', 'visibility': 'visible'})
                $('#form-error-org-blank-error').css({'display': 'flex', 'visibility': 'visible'})
                $('#form-error-org-blank-ex').css({'display': 'flex', 'visibility': 'visible'})
            }
        }
    });

    $('body').on('click', '#orgForm1-circle-5.page-circle-5-title', function(){
        if ($('#id_org_name').val() && $('#id_website').val() && $('#id_org_phone').val() && $('#id_org_email').val() && $('#id_description').val() && $('#id_street').val() && $('#id_city').val() && 
        $('#id_zipcode').val() && ($('#id_eligibility_0').is(':checked') || $('#id_eligibility_1').is(':checked') || $('#id_eligibility_2').is(':checked') || $('#id_eligibility_3').is(':checked') || $('#id_eligibility_4').is(':checked') ) &&
        $('#form-error-org-website-error').length == 0 && $('#form-error-org-phone-error').length == 0 && $('#form-error-org-name-error').length == 0 && $('#form-error-org-email-error').length == 0 && $('#form-error-org-zipcode-error').length == 0){
            if ($('.form-error-box--before').children('#form-error-org-blank-error').length != 0){
                $('.form-error-box--before').children('#form-error-org-blank-error').remove()
            }
            $('#orgForm1').modal('hide');
            $('#orgForm3').modal('show');
        }
        else{
            if ($('#form-error-org-blank-error').length == 0){
                $('.form-error-box--before').append("<div class='form-error-box-card' id='form-error-org-blank-error'><div class='form-error-box-ex' id='form-error-org-blank-ex'><i class='bi bi-exclamation-lg'></i></div>One or more fields missing</div>")
                $('.form-error-box--before').css({'display': 'table-cell', 'visibility': 'visible'})
                $('#form-error-org-blank-error').css({'display': 'flex', 'visibility': 'visible'})
                $('#form-error-org-blank-ex').css({'display': 'flex', 'visibility': 'visible'})
            }
        }
    });

    $('body').on('click', '#orgForm1-circle-6.page-circle-6-title', function(){
        if ($('#id_org_name').val() && $('#id_website').val() && $('#id_org_phone').val() && $('#id_org_email').val() && $('#id_description').val() && $('#id_street').val() && $('#id_city').val() && 
        $('#id_zipcode').val() && ($('#id_eligibility_0').is(':checked') || $('#id_eligibility_1').is(':checked') || $('#id_eligibility_2').is(':checked') || $('#id_eligibility_3').is(':checked') || $('#id_eligibility_4').is(':checked') ) &&
        $('#form-error-org-website-error').length == 0 && $('#form-error-org-phone-error').length == 0 && $('#form-error-org-name-error').length == 0 && $('#form-error-org-email-error').length == 0 && $('#form-error-org-zipcode-error').length == 0){
            if ($('.form-error-box--before').children('#form-error-org-blank-error').length != 0){
                $('.form-error-box--before').children('#form-error-org-blank-error').remove()
            }
            $('#orgForm1').modal('hide');
            $('#orgForm3PT2').modal('show');
        }
        else{
            if ($('#form-error-org-blank-error').length == 0){
                $('.form-error-box--before').append("<div class='form-error-box-card' id='form-error-org-blank-error'><div class='form-error-box-ex' id='form-error-org-blank-ex'><i class='bi bi-exclamation-lg'></i></div>One or more fields missing</div>")
                $('.form-error-box--before').css({'display': 'table-cell', 'visibility': 'visible'})
                $('#form-error-org-blank-error').css({'display': 'flex', 'visibility': 'visible'})
                $('#form-error-org-blank-ex').css({'display': 'flex', 'visibility': 'visible'})
            }
        }
    });

    $('body').on('click', '#orgForm2-circle-1.page-circle-1-title', function(){
        if ($('#id_contact_name').val() && $('#id_contact_phone').val() && $('#id_contact_title').val() && $('#id_contact_email').val() && ($('#id_languages_0').is(':checked') || $('#id_languages_1').is(':checked')) && 
        ($('#id_areas_served_0').is(':checked') || $('#id_areas_served_1').is(':checked') || $('#id_areas_served_2').is(':checked') || $('#id_areas_served_3').is(':checked')) &&
        $('#form-error-org-mail-zipcode-error').length == 0 && $('#form-error-org-contact-mail-error').length == 0 && $('#form-error-org-contact-phone-error').length == 0){
            if ($('.form-error-box--before2').children('#form-error-contact-blank-error').length != 0){
                $('.form-error-box--before2').children('#form-error-contact-blank-error').remove()
            }
            $('#orgFormPT2').modal('hide');
            $('#orgForm1').modal('show');
            showInput();
        }
        else{
            if ($('#form-error-contact-blank-error').length == 0){
                $('.form-error-box--before2').append("<div class='form-error-box-card' id='form-error-contact-blank-error'><div class='form-error-box-ex' id='form-error-contact-blank-ex'><i class='bi bi-exclamation-lg'></i></div>One or more fields missing</div>")
                $('.form-error-box--before2').css({'display': 'table-cell', 'visibility': 'visible'})
                $('#form-error-contact-blank-error').css({'display': 'flex', 'visibility': 'visible'})
                $('#form-error-contact-blank-ex').css({'display': 'flex', 'visibility': 'visible'})
            }
        }
    });

    $('body').on('click', '#orgForm2-circle-3.page-circle-3-title', function(){
        if ($('#id_contact_name').val() && $('#id_contact_phone').val() && $('#id_contact_title').val() && $('#id_contact_email').val() && ($('#id_languages_0').is(':checked') || $('#id_languages_1').is(':checked')) && 
        ($('#id_areas_served_0').is(':checked') || $('#id_areas_served_1').is(':checked') || $('#id_areas_served_2').is(':checked') || $('#id_areas_served_3').is(':checked')) &&
        $('#form-error-org-mail-zipcode-error').length == 0 && $('#form-error-org-contact-mail-error').length == 0 && $('#form-error-org-contact-phone-error').length == 0){
            if ($('.form-error-box--before2').children('#form-error-contact-blank-error').length != 0){
                $('.form-error-box--before2').children('#form-error-contact-blank-error').remove()
            }
            $('#orgFormPT2').modal('hide');
            $('#orgForm2').modal('show');
            showInput();
        }
        else{
            if ($('#form-error-contact-blank-error').length == 0){
                $('.form-error-box--before2').append("<div class='form-error-box-card' id='form-error-contact-blank-error'><div class='form-error-box-ex' id='form-error-contact-blank-ex'><i class='bi bi-exclamation-lg'></i></div>One or more fields missing</div>")
                $('.form-error-box--before2').css({'display': 'table-cell', 'visibility': 'visible'})
                $('#form-error-contact-blank-error').css({'display': 'flex', 'visibility': 'visible'})
                $('#form-error-contact-blank-ex').css({'display': 'flex', 'visibility': 'visible'})
            }
        }
    });

    $('body').on('click', '#orgForm2-circle-4.page-circle-4-title', function(){
        if ($('#id_contact_name').val() && $('#id_contact_phone').val() && $('#id_contact_title').val() && $('#id_contact_email').val() && ($('#id_languages_0').is(':checked') || $('#id_languages_1').is(':checked')) && 
        ($('#id_areas_served_0').is(':checked') || $('#id_areas_served_1').is(':checked') || $('#id_areas_served_2').is(':checked') || $('#id_areas_served_3').is(':checked')) &&
        $('#form-error-org-mail-zipcode-error').length == 0 && $('#form-error-org-contact-mail-error').length == 0 && $('#form-error-org-contact-phone-error').length == 0){
            if ($('.form-error-box--before2').children('#form-error-contact-blank-error').length != 0){
                $('.form-error-box--before2').children('#form-error-contact-blank-error').remove()
            }
            $('#orgFormPT2').modal('hide');
            $('#orgForm2PT2').modal('show');
            showInput();
        }
        else{
            if ($('#form-error-contact-blank-error').length == 0){
                $('.form-error-box--before2').append("<div class='form-error-box-card' id='form-error-contact-blank-error'><div class='form-error-box-ex' id='form-error-contact-blank-ex'><i class='bi bi-exclamation-lg'></i></div>One or more fields missing</div>")
                $('.form-error-box--before2').css({'display': 'table-cell', 'visibility': 'visible'})
                $('#form-error-contact-blank-error').css({'display': 'flex', 'visibility': 'visible'})
                $('#form-error-contact-blank-ex').css({'display': 'flex', 'visibility': 'visible'})
            }
        }
    });

    $('body').on('click', '#orgForm2-circle-5.page-circle-5-title', function(){
        if ($('#id_contact_name').val() && $('#id_contact_phone').val() && $('#id_contact_title').val() && $('#id_contact_email').val() && ($('#id_languages_0').is(':checked') || $('#id_languages_1').is(':checked')) && 
        ($('#id_areas_served_0').is(':checked') || $('#id_areas_served_1').is(':checked') || $('#id_areas_served_2').is(':checked') || $('#id_areas_served_3').is(':checked')) &&
        $('#form-error-org-mail-zipcode-error').length == 0 && $('#form-error-org-contact-mail-error').length == 0 && $('#form-error-org-contact-phone-error').length == 0){
            if ($('.form-error-box--before2').children('#form-error-contact-blank-error').length != 0){
                $('.form-error-box--before2').children('#form-error-contact-blank-error').remove()
            }
            $('#orgFormPT2').modal('hide');
            $('#orgForm3').modal('show');
            showInput();
        }
        else{
            if ($('#form-error-contact-blank-error').length == 0){
                $('.form-error-box--before2').append("<div class='form-error-box-card' id='form-error-contact-blank-error'><div class='form-error-box-ex' id='form-error-contact-blank-ex'><i class='bi bi-exclamation-lg'></i></div>One or more fields missing</div>")
                $('.form-error-box--before2').css({'display': 'table-cell', 'visibility': 'visible'})
                $('#form-error-contact-blank-error').css({'display': 'flex', 'visibility': 'visible'})
                $('#form-error-contact-blank-ex').css({'display': 'flex', 'visibility': 'visible'})
            }
        }
    });

    $('body').on('click', '#orgForm2-circle-6.page-circle-6-title', function(){
        if ($('#id_contact_name').val() && $('#id_contact_phone').val() && $('#id_contact_title').val() && $('#id_contact_email').val() && ($('#id_languages_0').is(':checked') || $('#id_languages_1').is(':checked')) && 
        ($('#id_areas_served_0').is(':checked') || $('#id_areas_served_1').is(':checked') || $('#id_areas_served_2').is(':checked') || $('#id_areas_served_3').is(':checked')) &&
        $('#form-error-org-mail-zipcode-error').length == 0 && $('#form-error-org-contact-mail-error').length == 0 && $('#form-error-org-contact-phone-error').length == 0){
            if ($('.form-error-box--before2').children('#form-error-contact-blank-error').length != 0){
                $('.form-error-box--before2').children('#form-error-contact-blank-error').remove()
            }
            $('#orgFormPT2').modal('hide');
            $('#orgForm3PT2').modal('show');
            showInput();
        }
        else{
            if ($('#form-error-contact-blank-error').length == 0){
                $('.form-error-box--before2').append("<div class='form-error-box-card' id='form-error-contact-blank-error'><div class='form-error-box-ex' id='form-error-contact-blank-ex'><i class='bi bi-exclamation-lg'></i></div>One or more fields missing</div>")
                $('.form-error-box--before2').css({'display': 'table-cell', 'visibility': 'visible'})
                $('#form-error-contact-blank-error').css({'display': 'flex', 'visibility': 'visible'})
                $('#form-error-contact-blank-ex').css({'display': 'flex', 'visibility': 'visible'})
            }
        }
    });
});

$(document).ready(function(){
    $('body').on('click', '#orgbtn2.continueBtn1', function(){
        var thisvalue = $(this).attr('value');
        var thisvalue2 = parseInt(thisvalue);
        thisvalue2++;
        if ($('#id_orgs-'+ thisvalue +'-org_name').val() && $('#id_orgs-'+ thisvalue +'-website').val() && $('#id_orgs-'+ thisvalue +'-org_phone').val() && $('#id_orgs-'+ thisvalue +'-org_email').val() && $('#id_orgs-'+ thisvalue +'-description').val() && $('#id_orgs-'+ thisvalue +'-street').val() && $('#id_orgs-'+ thisvalue +'-city').val() && $('#id_orgs-'+ thisvalue +'-zipcode').val() &&
        ($('#id_orgs-'+ thisvalue + '-eligibility_0').is(':checked') || $('#id_orgs-'+ thisvalue + '-eligibility_1').is(':checked') || $('#id_orgs-'+ thisvalue + '-eligibility_2').is(':checked') || $('#id_orgs-'+ thisvalue + '-eligibility_3').is(':checked') || $('#id_orgs-'+ thisvalue + '-eligibility_4').is(':checked')) &&
        $('#form-error-org-website-error').length == 0 && $('#form-error-org-phone-error').length == 0 && $('#form-error-org-email-error').length == 0 && $('#form-error-org-zipcode-error').length == 0){
            if ($('.form-error-box--before-pt1' + thisvalue).children('#form-error-org-blank-error2').length != 0){
                $('.form-error-box--before-pt1' + thisvalue).children('#form-error-org-blank-error2').remove()
            }
            $('#editform' + thisvalue2).modal('hide');
            $('#editFormPT2' + thisvalue).modal('show');
        }
        else{
            if ($('#form-error-org-blank-error2').length == 0){
                $('.form-error-box--before-pt1' + thisvalue).append("<div class='form-error-box-card' id='form-error-org-blank-error2'><div class='form-error-box-ex' id='form-error-org-blank-ex2'><i class='bi bi-exclamation-lg'></i></div>One or more fields missing</div>")
                $('.form-error-box--before-pt1'+ thisvalue).css({'display': 'table-cell', 'visibility': 'visible'})
                $('#form-error-org-blank-error2').css({'display': 'flex', 'visibility': 'visible'})
                $('#form-error-org-blank-ex2').css({'display': 'flex', 'visibility': 'visible'})
            }
        }
    });

    $('body').on('click', '#editForm1-circle-2.page-circle-2-title', function(){
        var thisvalue = $(this).parent().parent().parent().parent().attr('id').replace(/editform/g, '');
        var thisvalue2 = parseInt(thisvalue);
        thisvalue--;
        if ($('#id_orgs-'+ thisvalue +'-org_name').val() && $('#id_orgs-'+ thisvalue +'-website').val() && $('#id_orgs-'+ thisvalue +'-org_phone').val() && $('#id_orgs-'+ thisvalue +'-org_email').val() && $('#id_orgs-'+ thisvalue +'-description').val() && $('#id_orgs-'+ thisvalue +'-street').val() && $('#id_orgs-'+ thisvalue +'-city').val() && $('#id_orgs-'+ thisvalue +'-zipcode').val() &&
        ($('#id_orgs-'+ thisvalue + '-eligibility_0').is(':checked') || $('#id_orgs-'+ thisvalue + '-eligibility_1').is(':checked') || $('#id_orgs-'+ thisvalue + '-eligibility_2').is(':checked') || $('#id_orgs-'+ thisvalue + '-eligibility_3').is(':checked') || $('#id_orgs-'+ thisvalue + '-eligibility_4').is(':checked')) &&
        $('#form-error-org-website-error').length == 0 && $('#form-error-org-phone-error').length == 0 && $('#form-error-org-email-error').length == 0 && $('#form-error-org-zipcode-error').length == 0){
            if ($('.form-error-box--before-pt1' + thisvalue).children('#form-error-org-blank-error2').length != 0){
                $('.form-error-box--before-pt1' + thisvalue).children('#form-error-org-blank-error2').remove()
            }
            $('#editform' + thisvalue2).modal('hide');
            $('#editFormPT2' + thisvalue).modal('show');
        }
        else{
            if ($('#form-error-org-blank-error2').length == 0){
                $('.form-error-box--before-pt1' + thisvalue).append("<div class='form-error-box-card' id='form-error-org-blank-error2'><div class='form-error-box-ex' id='form-error-org-blank-ex2'><i class='bi bi-exclamation-lg'></i></div>One or more fields missing</div>")
                $('.form-error-box--before-pt1'+ thisvalue).css({'display': 'table-cell', 'visibility': 'visible'})
                $('#form-error-org-blank-error2').css({'display': 'flex', 'visibility': 'visible'})
                $('#form-error-org-blank-ex2').css({'display': 'flex', 'visibility': 'visible'})
            }
        }
    });

    $('body').on('click', '#editForm1-circle-3.page-circle-3-title', function(){
        var thisvalue = $(this).parent().parent().parent().parent().attr('id').replace(/editform/g, '');
        var thisvalue2 = parseInt(thisvalue);
        thisvalue--;
        if ($('#id_orgs-'+ thisvalue +'-org_name').val() && $('#id_orgs-'+ thisvalue +'-website').val() && $('#id_orgs-'+ thisvalue +'-org_phone').val() && $('#id_orgs-'+ thisvalue +'-org_email').val() && $('#id_orgs-'+ thisvalue +'-description').val() && $('#id_orgs-'+ thisvalue +'-street').val() && $('#id_orgs-'+ thisvalue +'-city').val() && $('#id_orgs-'+ thisvalue +'-zipcode').val() &&
        ($('#id_orgs-'+ thisvalue + '-eligibility_0').is(':checked') || $('#id_orgs-'+ thisvalue + '-eligibility_1').is(':checked') || $('#id_orgs-'+ thisvalue + '-eligibility_2').is(':checked') || $('#id_orgs-'+ thisvalue + '-eligibility_3').is(':checked') || $('#id_orgs-'+ thisvalue + '-eligibility_4').is(':checked')) &&
        $('#form-error-org-website-error').length == 0 && $('#form-error-org-phone-error').length == 0 && $('#form-error-org-email-error').length == 0 && $('#form-error-org-zipcode-error').length == 0){
            if ($('.form-error-box--before-pt1' + thisvalue).children('#form-error-org-blank-error2').length != 0){
                $('.form-error-box--before-pt1' + thisvalue).children('#form-error-org-blank-error2').remove()
            }
            $('#editform' + thisvalue2).modal('hide');
            $('#editorgForm2' + thisvalue).modal('show');
        }
        else{
            if ($('#form-error-org-blank-error2').length == 0){
                $('.form-error-box--before-pt1' + thisvalue).append("<div class='form-error-box-card' id='form-error-org-blank-error2'><div class='form-error-box-ex' id='form-error-org-blank-ex2'><i class='bi bi-exclamation-lg'></i></div>One or more fields missing</div>")
                $('.form-error-box--before-pt1'+ thisvalue).css({'display': 'table-cell', 'visibility': 'visible'})
                $('#form-error-org-blank-error2').css({'display': 'flex', 'visibility': 'visible'})
                $('#form-error-org-blank-ex2').css({'display': 'flex', 'visibility': 'visible'})
            }
        }
    });

    $('body').on('click', '#editForm1-circle-4.page-circle-4-title', function(){
        var thisvalue = $(this).parent().parent().parent().parent().attr('id').replace(/editform/g, '');
        var thisvalue2 = parseInt(thisvalue);
        thisvalue--;
        if ($('#id_orgs-'+ thisvalue +'-org_name').val() && $('#id_orgs-'+ thisvalue +'-website').val() && $('#id_orgs-'+ thisvalue +'-org_phone').val() && $('#id_orgs-'+ thisvalue +'-org_email').val() && $('#id_orgs-'+ thisvalue +'-description').val() && $('#id_orgs-'+ thisvalue +'-street').val() && $('#id_orgs-'+ thisvalue +'-city').val() && $('#id_orgs-'+ thisvalue +'-zipcode').val() &&
        ($('#id_orgs-'+ thisvalue + '-eligibility_0').is(':checked') || $('#id_orgs-'+ thisvalue + '-eligibility_1').is(':checked') || $('#id_orgs-'+ thisvalue + '-eligibility_2').is(':checked') || $('#id_orgs-'+ thisvalue + '-eligibility_3').is(':checked') || $('#id_orgs-'+ thisvalue + '-eligibility_4').is(':checked')) &&
        $('#form-error-org-website-error').length == 0 && $('#form-error-org-phone-error').length == 0 && $('#form-error-org-email-error').length == 0 && $('#form-error-org-zipcode-error').length == 0){
            if ($('.form-error-box--before-pt1' + thisvalue).children('#form-error-org-blank-error2').length != 0){
                $('.form-error-box--before-pt1' + thisvalue).children('#form-error-org-blank-error2').remove()
            }
            $('#editform' + thisvalue2).modal('hide');
            $('#editorgForm3' + thisvalue).modal('show');
        }
        else{
            if ($('#form-error-org-blank-error2').length == 0){
                $('.form-error-box--before-pt1' + thisvalue).append("<div class='form-error-box-card' id='form-error-org-blank-error2'><div class='form-error-box-ex' id='form-error-org-blank-ex2'><i class='bi bi-exclamation-lg'></i></div>One or more fields missing</div>")
                $('.form-error-box--before-pt1'+ thisvalue).css({'display': 'table-cell', 'visibility': 'visible'})
                $('#form-error-org-blank-error2').css({'display': 'flex', 'visibility': 'visible'})
                $('#form-error-org-blank-ex2').css({'display': 'flex', 'visibility': 'visible'})
            }
        }
    });

    $('body').on('click', '#editForm1-circle-5.page-circle-5-title', function(){
        var thisvalue = $(this).parent().parent().parent().parent().attr('id').replace(/editform/g, '');
        var thisvalue2 = parseInt(thisvalue);
        thisvalue--;
        if ($('#id_orgs-'+ thisvalue +'-org_name').val() && $('#id_orgs-'+ thisvalue +'-website').val() && $('#id_orgs-'+ thisvalue +'-org_phone').val() && $('#id_orgs-'+ thisvalue +'-org_email').val() && $('#id_orgs-'+ thisvalue +'-description').val() && $('#id_orgs-'+ thisvalue +'-street').val() && $('#id_orgs-'+ thisvalue +'-city').val() && $('#id_orgs-'+ thisvalue +'-zipcode').val() &&
        ($('#id_orgs-'+ thisvalue + '-eligibility_0').is(':checked') || $('#id_orgs-'+ thisvalue + '-eligibility_1').is(':checked') || $('#id_orgs-'+ thisvalue + '-eligibility_2').is(':checked') || $('#id_orgs-'+ thisvalue + '-eligibility_3').is(':checked') || $('#id_orgs-'+ thisvalue + '-eligibility_4').is(':checked')) &&
        $('#form-error-org-website-error').length == 0 && $('#form-error-org-phone-error').length == 0 && $('#form-error-org-email-error').length == 0 && $('#form-error-org-zipcode-error').length == 0){
            if ($('.form-error-box--before-pt1' + thisvalue).children('#form-error-org-blank-error2').length != 0){
                $('.form-error-box--before-pt1' + thisvalue).children('#form-error-org-blank-error2').remove()
            }
            $('#editform' + thisvalue2).modal('hide');
            $('#editorgForm4' + thisvalue).modal('show');
        }
        else{
            if ($('#form-error-org-blank-error2').length == 0){
                $('.form-error-box--before-pt1' + thisvalue).append("<div class='form-error-box-card' id='form-error-org-blank-error2'><div class='form-error-box-ex' id='form-error-org-blank-ex2'><i class='bi bi-exclamation-lg'></i></div>One or more fields missing</div>")
                $('.form-error-box--before-pt1'+ thisvalue).css({'display': 'table-cell', 'visibility': 'visible'})
                $('#form-error-org-blank-error2').css({'display': 'flex', 'visibility': 'visible'})
                $('#form-error-org-blank-ex2').css({'display': 'flex', 'visibility': 'visible'})
            }
        }
    });

    $('body').on('click', '#editForm1-circle-6.page-circle-6-title', function(){
        var thisvalue = $(this).parent().parent().parent().parent().attr('id').replace(/editform/g, '');
        var thisvalue2 = parseInt(thisvalue);
        thisvalue--;
        if ($('#id_orgs-'+ thisvalue +'-org_name').val() && $('#id_orgs-'+ thisvalue +'-website').val() && $('#id_orgs-'+ thisvalue +'-org_phone').val() && $('#id_orgs-'+ thisvalue +'-org_email').val() && $('#id_orgs-'+ thisvalue +'-description').val() && $('#id_orgs-'+ thisvalue +'-street').val() && $('#id_orgs-'+ thisvalue +'-city').val() && $('#id_orgs-'+ thisvalue +'-zipcode').val() &&
        ($('#id_orgs-'+ thisvalue + '-eligibility_0').is(':checked') || $('#id_orgs-'+ thisvalue + '-eligibility_1').is(':checked') || $('#id_orgs-'+ thisvalue + '-eligibility_2').is(':checked') || $('#id_orgs-'+ thisvalue + '-eligibility_3').is(':checked') || $('#id_orgs-'+ thisvalue + '-eligibility_4').is(':checked')) &&
        $('#form-error-org-website-error').length == 0 && $('#form-error-org-phone-error').length == 0 && $('#form-error-org-email-error').length == 0 && $('#form-error-org-zipcode-error').length == 0){
            if ($('.form-error-box--before-pt1' + thisvalue).children('#form-error-org-blank-error2').length != 0){
                $('.form-error-box--before-pt1' + thisvalue).children('#form-error-org-blank-error2').remove()
            }
            $('#editform' + thisvalue2).modal('hide');
            $('#editorgForm5' + thisvalue).modal('show');
        }
        else{
            if ($('#form-error-org-blank-error2').length == 0){
                $('.form-error-box--before-pt1' + thisvalue).append("<div class='form-error-box-card' id='form-error-org-blank-error2'><div class='form-error-box-ex' id='form-error-org-blank-ex2'><i class='bi bi-exclamation-lg'></i></div>One or more fields missing</div>")
                $('.form-error-box--before-pt1'+ thisvalue).css({'display': 'table-cell', 'visibility': 'visible'})
                $('#form-error-org-blank-error2').css({'display': 'flex', 'visibility': 'visible'})
                $('#form-error-org-blank-ex2').css({'display': 'flex', 'visibility': 'visible'})
            }
        }
    });


    $('body').on('click', '#orgbtn2pt2.continueBtn2', function(){
        var thisvalue = $(this).attr('value');
        var thisvalue2 = parseInt(thisvalue);
        thisvalue2++;
        if ($('#id_orgs-'+ thisvalue +'-contact_name').val() && $('#id_orgs-'+ thisvalue +'-contact_phone').val() && $('#id_orgs-'+ thisvalue +'-contact_title').val() && $('#id_orgs-'+ thisvalue +'-contact_email').val() &&
        ($('#id_orgs-'+ thisvalue + '-languages_0').is(':checked') || $('#id_orgs-'+ thisvalue + '-languages_1').is(':checked')) && ($('#id_orgs-' + thisvalue + '-areas_served_0').is(':checked') || $('#id_orgs-'+ thisvalue + '-areas_served_1').is(':checked') || $('#id_orgs-'+ thisvalue + '-areas_served_2').is(':checked') || $('#id_orgs-'+ thisvalue + '-areas_served_3').is(':checked')) &&
        $('#form-error-org-mail-zipcode-error').length == 0 && $('#form-error-org-contact-mail-error').length == 0 && $('#form-error-org-contact-phone-error').length == 0){
            if ($('.form-error-box--before2-pt2' + thisvalue).children('#form-error-org-blank-error2').length != 0){
                $('.form-error-box--before2-pt2' + thisvalue).children('#form-error-org-blank-error2').remove()
            }
            $('#editFormPT2' + thisvalue).modal('hide');
            $('#editorgForm2' + thisvalue).modal('show');
        }
        else{
            if ($('#form-error-org-blank-error2').length == 0){
                $('.form-error-box--before2-pt2' + thisvalue).append("<div class='form-error-box-card' id='form-error-org-blank-error2'><div class='form-error-box-ex' id='form-error-org-blank-ex2'><i class='bi bi-exclamation-lg'></i></div>One or more fields missing</div>")
                $('.form-error-box--before2-pt2'+ thisvalue).css({'display': 'table-cell', 'visibility': 'visible'})
                $('#form-error-org-blank-error2').css({'display': 'flex', 'visibility': 'visible'})
                $('#form-error-org-blank-ex2').css({'display': 'flex', 'visibility': 'visible'})
            }
        }
    });

    $('body').on('click', '#editForm2-circle-1.page-circle-1-title', function(){
        var thisvalue = $(this).parent().parent().parent().parent().attr('id').replace(/editFormPT2/g, '');
        var thisvalue2 = parseInt(thisvalue);
        thisvalue2++;
        if ($('#id_orgs-'+ thisvalue +'-contact_name').val() && $('#id_orgs-'+ thisvalue +'-contact_phone').val() && $('#id_orgs-'+ thisvalue +'-contact_title').val() && $('#id_orgs-'+ thisvalue +'-contact_email').val() &&
        ($('#id_orgs-'+ thisvalue + '-languages_0').is(':checked') || $('#id_orgs-'+ thisvalue + '-languages_1').is(':checked')) && ($('#id_orgs-' + thisvalue + '-areas_served_0').is(':checked') || $('#id_orgs-'+ thisvalue + '-areas_served_1').is(':checked') || $('#id_orgs-'+ thisvalue + '-areas_served_2').is(':checked') || $('#id_orgs-'+ thisvalue + '-areas_served_3').is(':checked')) &&
        $('#form-error-org-mail-zipcode-error').length == 0 && $('#form-error-org-contact-mail-error').length == 0 && $('#form-error-org-contact-phone-error').length == 0){
            if ($('.form-error-box--before2-pt2' + thisvalue).children('#form-error-org-blank-error2').length != 0){
                $('.form-error-box--before2-pt2' + thisvalue).children('#form-error-org-blank-error2').remove()
            }
            $('#editFormPT2' + thisvalue).modal('hide');
            $('#editform' + thisvalue2).modal('show');
        }
        else{
            if ($('#form-error-org-blank-error2').length == 0){
                $('.form-error-box--before2-pt2' + thisvalue).append("<div class='form-error-box-card' id='form-error-org-blank-error2'><div class='form-error-box-ex' id='form-error-org-blank-ex2'><i class='bi bi-exclamation-lg'></i></div>One or more fields missing</div>")
                $('.form-error-box--before2-pt2'+ thisvalue).css({'display': 'table-cell', 'visibility': 'visible'})
                $('#form-error-org-blank-error2').css({'display': 'flex', 'visibility': 'visible'})
                $('#form-error-org-blank-ex2').css({'display': 'flex', 'visibility': 'visible'})
            }
        }
    });

    $('body').on('click', '#editForm2-circle-3.page-circle-3-title', function(){
        var thisvalue = $(this).parent().parent().parent().parent().attr('id').replace(/editFormPT2/g, '');
        var thisvalue2 = parseInt(thisvalue);
        thisvalue2++;
        if ($('#id_orgs-'+ thisvalue +'-contact_name').val() && $('#id_orgs-'+ thisvalue +'-contact_phone').val() && $('#id_orgs-'+ thisvalue +'-contact_title').val() && $('#id_orgs-'+ thisvalue +'-contact_email').val() &&
        ($('#id_orgs-'+ thisvalue + '-languages_0').is(':checked') || $('#id_orgs-'+ thisvalue + '-languages_1').is(':checked')) && ($('#id_orgs-' + thisvalue + '-areas_served_0').is(':checked') || $('#id_orgs-'+ thisvalue + '-areas_served_1').is(':checked') || $('#id_orgs-'+ thisvalue + '-areas_served_2').is(':checked') || $('#id_orgs-'+ thisvalue + '-areas_served_3').is(':checked')) &&
        $('#form-error-org-mail-zipcode-error').length == 0 && $('#form-error-org-contact-mail-error').length == 0 && $('#form-error-org-contact-phone-error').length == 0){
            if ($('.form-error-box--before2-pt2' + thisvalue).children('#form-error-org-blank-error2').length != 0){
                $('.form-error-box--before2-pt2' + thisvalue).children('#form-error-org-blank-error2').remove()
            }
            $('#editFormPT2' + thisvalue).modal('hide');
            $('#editorgForm2' + thisvalue).modal('show');
        }
        else{
            if ($('#form-error-org-blank-error2').length == 0){
                $('.form-error-box--before2-pt2' + thisvalue).append("<div class='form-error-box-card' id='form-error-org-blank-error2'><div class='form-error-box-ex' id='form-error-org-blank-ex2'><i class='bi bi-exclamation-lg'></i></div>One or more fields missing</div>")
                $('.form-error-box--before2-pt2'+ thisvalue).css({'display': 'table-cell', 'visibility': 'visible'})
                $('#form-error-org-blank-error2').css({'display': 'flex', 'visibility': 'visible'})
                $('#form-error-org-blank-ex2').css({'display': 'flex', 'visibility': 'visible'})
            }
        }
    });

    $('body').on('click', '#editForm2-circle-4.page-circle-4-title', function(){
        var thisvalue = $(this).parent().parent().parent().parent().attr('id').replace(/editFormPT2/g, '');
        var thisvalue2 = parseInt(thisvalue);
        thisvalue2++;
        if ($('#id_orgs-'+ thisvalue +'-contact_name').val() && $('#id_orgs-'+ thisvalue +'-contact_phone').val() && $('#id_orgs-'+ thisvalue +'-contact_title').val() && $('#id_orgs-'+ thisvalue +'-contact_email').val() &&
        ($('#id_orgs-'+ thisvalue + '-languages_0').is(':checked') || $('#id_orgs-'+ thisvalue + '-languages_1').is(':checked')) && ($('#id_orgs-' + thisvalue + '-areas_served_0').is(':checked') || $('#id_orgs-'+ thisvalue + '-areas_served_1').is(':checked') || $('#id_orgs-'+ thisvalue + '-areas_served_2').is(':checked') || $('#id_orgs-'+ thisvalue + '-areas_served_3').is(':checked')) &&
        $('#form-error-org-mail-zipcode-error').length == 0 && $('#form-error-org-contact-mail-error').length == 0 && $('#form-error-org-contact-phone-error').length == 0){
            if ($('.form-error-box--before2-pt2' + thisvalue).children('#form-error-org-blank-error2').length != 0){
                $('.form-error-box--before2-pt2' + thisvalue).children('#form-error-org-blank-error2').remove()
            }
            $('#editFormPT2' + thisvalue).modal('hide');
            $('#editorgForm3' + thisvalue).modal('show');
        }
        else{
            if ($('#form-error-org-blank-error2').length == 0){
                $('.form-error-box--before2-pt2' + thisvalue).append("<div class='form-error-box-card' id='form-error-org-blank-error2'><div class='form-error-box-ex' id='form-error-org-blank-ex2'><i class='bi bi-exclamation-lg'></i></div>One or more fields missing</div>")
                $('.form-error-box--before2-pt2'+ thisvalue).css({'display': 'table-cell', 'visibility': 'visible'})
                $('#form-error-org-blank-error2').css({'display': 'flex', 'visibility': 'visible'})
                $('#form-error-org-blank-ex2').css({'display': 'flex', 'visibility': 'visible'})
            }
        }
    });

    $('body').on('click', '#editForm2-circle-5.page-circle-5-title', function(){
        var thisvalue = $(this).parent().parent().parent().parent().attr('id').replace(/editFormPT2/g, '');
        var thisvalue2 = parseInt(thisvalue);
        thisvalue2++;
        if ($('#id_orgs-'+ thisvalue +'-contact_name').val() && $('#id_orgs-'+ thisvalue +'-contact_phone').val() && $('#id_orgs-'+ thisvalue +'-contact_title').val() && $('#id_orgs-'+ thisvalue +'-contact_email').val() &&
        ($('#id_orgs-'+ thisvalue + '-languages_0').is(':checked') || $('#id_orgs-'+ thisvalue + '-languages_1').is(':checked')) && ($('#id_orgs-' + thisvalue + '-areas_served_0').is(':checked') || $('#id_orgs-'+ thisvalue + '-areas_served_1').is(':checked') || $('#id_orgs-'+ thisvalue + '-areas_served_2').is(':checked') || $('#id_orgs-'+ thisvalue + '-areas_served_3').is(':checked')) &&
        $('#form-error-org-mail-zipcode-error').length == 0 && $('#form-error-org-contact-mail-error').length == 0 && $('#form-error-org-contact-phone-error').length == 0){
            if ($('.form-error-box--before2-pt2' + thisvalue).children('#form-error-org-blank-error2').length != 0){
                $('.form-error-box--before2-pt2' + thisvalue).children('#form-error-org-blank-error2').remove()
            }
            $('#editFormPT2' + thisvalue).modal('hide');
            $('#editorgForm4' + thisvalue).modal('show');
        }
        else{
            if ($('#form-error-org-blank-error2').length == 0){
                $('.form-error-box--before2-pt2' + thisvalue).append("<div class='form-error-box-card' id='form-error-org-blank-error2'><div class='form-error-box-ex' id='form-error-org-blank-ex2'><i class='bi bi-exclamation-lg'></i></div>One or more fields missing</div>")
                $('.form-error-box--before2-pt2'+ thisvalue).css({'display': 'table-cell', 'visibility': 'visible'})
                $('#form-error-org-blank-error2').css({'display': 'flex', 'visibility': 'visible'})
                $('#form-error-org-blank-ex2').css({'display': 'flex', 'visibility': 'visible'})
            }
        }
    });

    $('body').on('click', '#editForm2-circle-6.page-circle-6-title', function(){
        var thisvalue = $(this).parent().parent().parent().parent().attr('id').replace(/editFormPT2/g, '');
        var thisvalue2 = parseInt(thisvalue);
        thisvalue2++;
        if ($('#id_orgs-'+ thisvalue +'-contact_name').val() && $('#id_orgs-'+ thisvalue +'-contact_phone').val() && $('#id_orgs-'+ thisvalue +'-contact_title').val() && $('#id_orgs-'+ thisvalue +'-contact_email').val() &&
        ($('#id_orgs-'+ thisvalue + '-languages_0').is(':checked') || $('#id_orgs-'+ thisvalue + '-languages_1').is(':checked')) && ($('#id_orgs-' + thisvalue + '-areas_served_0').is(':checked') || $('#id_orgs-'+ thisvalue + '-areas_served_1').is(':checked') || $('#id_orgs-'+ thisvalue + '-areas_served_2').is(':checked') || $('#id_orgs-'+ thisvalue + '-areas_served_3').is(':checked')) &&
        $('#form-error-org-mail-zipcode-error').length == 0 && $('#form-error-org-contact-mail-error').length == 0 && $('#form-error-org-contact-phone-error').length == 0){
            if ($('.form-error-box--before2-pt2' + thisvalue).children('#form-error-org-blank-error2').length != 0){
                $('.form-error-box--before2-pt2' + thisvalue).children('#form-error-org-blank-error2').remove()
            }
            $('#editFormPT2' + thisvalue).modal('hide');
            $('#editorgForm5' + thisvalue).modal('show');
        }
        else{
            if ($('#form-error-org-blank-error2').length == 0){
                $('.form-error-box--before2-pt2' + thisvalue).append("<div class='form-error-box-card' id='form-error-org-blank-error2'><div class='form-error-box-ex' id='form-error-org-blank-ex2'><i class='bi bi-exclamation-lg'></i></div>One or more fields missing</div>")
                $('.form-error-box--before2-pt2'+ thisvalue).css({'display': 'table-cell', 'visibility': 'visible'})
                $('#form-error-org-blank-error2').css({'display': 'flex', 'visibility': 'visible'})
                $('#form-error-org-blank-ex2').css({'display': 'flex', 'visibility': 'visible'})
            }
        }
    });


})