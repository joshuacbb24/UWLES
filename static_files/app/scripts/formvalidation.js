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

var error_count1 = 0
var error_count2 = 0
var error_count3 = 0
var error_count4 = 0

function findForm1Errors(){
    showInput();
    error_count1 = 0
    if (!$('#id_org_name').val()){
        $('#id_org_name').addClass('error-review')
        $('.orgName').addClass('error-review-label')
        $('.form-error-box--before').append("<div class='form-error-box-card' id='form-error-org-nameb-error'><div class='form-error-box-ex' id='form-error-org-nameb-ex'><i class='bi bi-exclamation-lg'></i></div><div class='form-error-box-msg' id='form-error-org-nameb-msg'>Organization Name Missing</div></div>")
        $('.form-error-box--before').css({'display': 'table-cell', 'visibility': 'visible'})
        $('#form-error-org-nameb-error').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-nameb-msg').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-nameb-ex').css({'display': 'flex', 'visibility': 'visible'})
        error_count1++
    }

    if (!$('#id_website').val()){
        $('#id_website').addClass('error-review')
        $('.webName').addClass('error-review-label')
        $('.form-error-box--before').append("<div class='form-error-box-card' id='form-error-org-websiteb-error'><div class='form-error-box-ex' id='form-error-org-websiteb-ex'><i class='bi bi-exclamation-lg'></i></div><div class='form-error-box-msg' id='form-error-org-websiteb-msg'>Website Missing</div>")
        $('.form-error-box--before').css({'display': 'table-cell', 'visibility': 'visible'})
        $('#form-error-org-websiteb-error').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-websiteb-msg').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-websiteb-ex').css({'display': 'flex', 'visibility': 'visible'})
        error_count1++
    }

    if (!$('#id_org_phone').val()){
        $('#id_org_phone').addClass('error-review')
        $('.phoneName').addClass('error-review-label')
        $('.form-error-box--before').append("<div class='form-error-box-card' id='form-error-org-phoneb-error'><div class='form-error-box-ex' id='form-error-org-phoneb-ex'><i class='bi bi-exclamation-lg'></i></div><div class='form-error-box-msg' id='form-error-org-phoneb-msg'>Phone Number Missing</div>")
        $('.form-error-box--before').css({'display': 'table-cell', 'visibility': 'visible'})
        $('#form-error-org-phoneb-msg').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-phoneb-error').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-phoneb-ex').css({'display': 'flex', 'visibility': 'visible'})
        error_count1++
    }

    if (!$('#id_org_email').val()){
        $('#id_org_email').addClass('error-review')
        $('.emailName').addClass('error-review-label')
        $('.form-error-box--before').append("<div class='form-error-box-card' id='form-error-org-emailb-error'><div class='form-error-box-ex' id='form-error-org-emailb-ex'><i class='bi bi-exclamation-lg'></i></div><div class='form-error-box-msg' id='form-error-org-emailb-msg'>Email Missing</div>")
        $('.form-error-box--before').css({'display': 'table-cell', 'visibility': 'visible'})
        $('#form-error-org-emailb-msg').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-emailb-error').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-emailb-ex').css({'display': 'flex', 'visibility': 'visible'})
        error_count1++
    }

    if (!$('#id_description').val()){
        $('#id_description').addClass('error-review')
        $('.form-error-box--before').append("<div class='form-error-box-card' id='form-error-org-descriptionb-error'><div class='form-error-box-ex' id='form-error-org-descriptionb-ex'><i class='bi bi-exclamation-lg'></i></div><div class='form-error-box-msg' id='form-error-org-descriptionb-msg'>Description Missing</div>")
        $('.form-error-box--before').css({'display': 'table-cell', 'visibility': 'visible'})
        $('#form-error-org-descriptionb-error').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-descriptionb-msg').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-descriptionb-ex').css({'display': 'flex', 'visibility': 'visible'})
        error_count1++
    }

    if (!$('#id_street').val()){
        $('#id_street').addClass('error-review')
        $('.streetName').addClass('error-review-label')
        $('.form-error-box--before').append("<div class='form-error-box-card' id='form-error-org-streetb-error'><div class='form-error-box-ex' id='form-error-org-streetb-ex'><i class='bi bi-exclamation-lg'></i></div><div class='form-error-box-msg' id='form-error-org-streetb-msg'>Street Missing</div>")
        $('.form-error-box--before').css({'display': 'table-cell', 'visibility': 'visible'})
        $('#form-error-org-streetb-error').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-streetb-msg').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-streetb-ex').css({'display': 'flex', 'visibility': 'visible'})
        error_count1++
    }

    if (!$('#id_city').val()){
        $('#id_city').addClass('error-review')
        $('.cityName').addClass('error-review-label')
        $('.form-error-box--before').append("<div class='form-error-box-card' id='form-error-org-cityb-error'><div class='form-error-box-ex' id='form-error-org-cityb-ex'><i class='bi bi-exclamation-lg'></i></div><div class='form-error-box-msg' id='form-error-org-cityb-msg'>City Missing</div>")
        $('.form-error-box--before').css({'display': 'table-cell', 'visibility': 'visible'})
        $('#form-error-org-cityb-error').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-cityb-msg').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-cityb-ex').css({'display': 'flex', 'visibility': 'visible'})
        error_count1++
    }

    if (!$('#id_zipcode').val()){
        $('#id_zipcode').addClass('error-review')
        $('.zipName').addClass('error-review-label')
        $('.form-error-box--before').append("<div class='form-error-box-card' id='form-error-org-zipcodeb-error'><div class='form-error-box-ex' id='form-error-org-zipcodeb-ex'><i class='bi bi-exclamation-lg'></i></div><div class='form-error-box-msg' id='form-error-org-zipcodeb-msg'>Zipcode Missing</div>")
        $('.form-error-box--before').css({'display': 'table-cell', 'visibility': 'visible'})
        $('#form-error-org-zipcodeb-error').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-zipcodeb-msg').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-zipcodeb-ex').css({'display': 'flex', 'visibility': 'visible'})
        error_count1++
    }

    if (!$('#id_eligibility_0').is(':checked') && !$('#id_eligibility_1').is(':checked') && !$('#id_eligibility_2').is(':checked') && !$('#id_eligibility_3').is(':checked') && !$('#id_eligibility_4').is(':checked')){
        $('.eligName').addClass('error-review-label')
        $('.form-error-box--before').append("<div class='form-error-box-card' id='form-error-org-eligb-error'><div class='form-error-box-ex' id='form-error-org-eligb-ex'><i class='bi bi-exclamation-lg'></i></div><div class='form-error-box-msg' id='form-error-org-eligb-msg'>Eligibility Missing</div>")
        $('.form-error-box--before').css({'display': 'table-cell', 'visibility': 'visible'})
        $('#form-error-org-eligb-error').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-eligb-msg').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-eligb-ex').css({'display': 'flex', 'visibility': 'visible'})
        error_count1++
    }

    if (!$('#form-error-org-website-error').length == 0){
        error_count1++
    }

    if (!$('#form-error-org-phone-error').length == 0){
        error_count1++
    }

    if (!$('#form-error-org-name-error').length == 0){
        error_count1++
    }

    if (!$('#form-error-org-email-error').length == 0){
        error_count1++
    }

    if (!$('#form-error-org-zipcode-error').length == 0){
        error_count1++
    }

    console.log("Total errors: " + error_count1)

    if (error_count1 > 0){
        $('.page-circle-1').addClass('incorrect-dot')
        $('.page-circle-1').text(error_count1)
    }
    else{
        $('.page-circle-1').removeClass('incorrect-dot')
        $('.page-circle-1').text('')
    }
}

function findForm2Errors(){
    showInput();
    error_count2 = 0
    if (!$('#id_contact_name').val()){
        $('#id_contact_name').addClass('error-review')
        $('.cnameName').addClass('error-review-label')
        $('.form-error-box--before2').append("<div class='form-error-box-card' id='form-error-org-cnameb-error'><div class='form-error-box-ex' id='form-error-org-cnameb-ex'><i class='bi bi-exclamation-lg'></i></div><div class='form-error-box-msg' id='form-error-org-cnameb-msg'>Contact Name Missing</div></div>")
        $('.form-error-box--before2').css({'display': 'table-cell', 'visibility': 'visible'})
        $('#form-error-org-cnameb-error').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-cnameb-msg').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-cnameb-ex').css({'display': 'flex', 'visibility': 'visible'})
        error_count2++
    }

    if (!$('#id_contact_phone').val()){
        $('#id_contact_phone').addClass('error-review')
        $('.cphoneName').addClass('error-review-label')
        $('.form-error-box--before2').append("<div class='form-error-box-card' id='form-error-org-cphoneb-error'><div class='form-error-box-ex' id='form-error-org-cphoneb-ex'><i class='bi bi-exclamation-lg'></i></div><div class='form-error-box-msg' id='form-error-org-cphoneb-msg'>Contact Phone Missing</div></div>")
        $('.form-error-box--before2').css({'display': 'table-cell', 'visibility': 'visible'})
        $('#form-error-org-cphoneb-error').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-cphoneb-msg').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-cphoneb-ex').css({'display': 'flex', 'visibility': 'visible'})
        error_count2++
    }

    if (!$('#id_contact_title').val()){
        $('#id_contact_title').addClass('error-review')
        $('.ctitleName').addClass('error-review-label')
        $('.form-error-box--before2').append("<div class='form-error-box-card' id='form-error-org-ctitleb-error'><div class='form-error-box-ex' id='form-error-org-ctitleb-ex'><i class='bi bi-exclamation-lg'></i></div><div class='form-error-box-msg' id='form-error-org-ctitleb-msg'>Contact Title Missing</div></div>")
        $('.form-error-box--before2').css({'display': 'table-cell', 'visibility': 'visible'})
        $('#form-error-org-ctitleb-error').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-ctitleb-msg').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-ctitleb-ex').css({'display': 'flex', 'visibility': 'visible'})
        error_count2++
    }

    if (!$('#id_contact_email').val()){
        $('#id_contact_email').addClass('error-review')
        $('.cemailName').addClass('error-review-label')
        $('.form-error-box--before2').append("<div class='form-error-box-card' id='form-error-org-cemailb-error'><div class='form-error-box-ex' id='form-error-org-cemailb-ex'><i class='bi bi-exclamation-lg'></i></div><div class='form-error-box-msg' id='form-error-org-cemailb-msg'>Contact Name Missing</div></div>")
        $('.form-error-box--before2').css({'display': 'table-cell', 'visibility': 'visible'})
        $('#form-error-org-cemailb-error').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-cemailb-msg').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-cemailb-ex').css({'display': 'flex', 'visibility': 'visible'})
        error_count2++
    }

    if (!$('#id_languages_0').is(':checked') && !$('#id_languages_1').is(':checked')){
        $('.languagesName').addClass('error-review-label')
        $('.form-error-box--before2').append("<div class='form-error-box-card' id='form-error-org-langb-error'><div class='form-error-box-ex' id='form-error-org-langb-ex'><i class='bi bi-exclamation-lg'></i></div><div class='form-error-box-msg' id='form-error-org-langb-msg'>Language(s) Missing</div></div>")
        $('.form-error-box--before2').css({'display': 'table-cell', 'visibility': 'visible'})
        $('#form-error-org-langb-error').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-langb-msg').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-langb-ex').css({'display': 'flex', 'visibility': 'visible'})
        error_count2++
    }

    if (!$('#id_areas_served_0').is(':checked') && !$('#id_areas_served_1').is(':checked') && !$('#id_areas_served_2').is(':checked') && !$('#id_areas_served_3').is(':checked')){
        $('.areasName').addClass('error-review-label')
        $('.form-error-box--before2').append("<div class='form-error-box-card' id='form-error-org-areasb-error'><div class='form-error-box-ex' id='form-error-org-areasb-ex'><i class='bi bi-exclamation-lg'></i></div><div class='form-error-box-msg' id='form-error-org-areasb-msg'>Area(s) Missing</div></div>")
        $('.form-error-box--before2').css({'display': 'table-cell', 'visibility': 'visible'})
        $('#form-error-org-areasb-error').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-areasb-msg').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-areasb-ex').css({'display': 'flex', 'visibility': 'visible'})
        error_count2++
    }

    if (!$('#form-error-org-mail-zipcode-error').length == 0){
        error_count2++
    }

    if (!$('#form-error-org-contact-email-error').length == 0){
        error_count2++
    }

    if (!$('#form-error-org-contact-phone-error').length == 0){
        error_count2++
    }

    console.log("Total errors: " + error_count2)

    if (error_count2 > 0){
        $('.page-circle-2').addClass('incorrect-dot')
        $('.page-circle-2').text(error_count2)
    }
    else{
        $('.page-circle-2').removeClass('incorrect-dot')
        $('.page-circle-2').text('')
    }
}

function findForm3Errors(inc){
    showInput2(inc);
    error_count3 = 0
    if (!$('#id_orgs-' + inc + '-org_name').val()){
        $('#id_orgs-' + inc + '-org_name').addClass('error-review')
        $('.orgName').addClass('error-review-label')
        $('.form-error-box--before-pt1' + inc).append("<div class='form-error-box-card' id='form-error-org-nameb-error'><div class='form-error-box-ex' id='form-error-org-nameb-ex'><i class='bi bi-exclamation-lg'></i></div><div class='form-error-box-msg' id='form-error-org-nameb-msg'>Organization Name Missing</div></div>")
        $('.form-error-box--before-pt1' + inc).css({'display': 'table-cell', 'visibility': 'visible'})
        $('#form-error-org-nameb-error').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-nameb-msg').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-nameb-ex').css({'display': 'flex', 'visibility': 'visible'})
        error_count3++
    }

    if (!$('#id_orgs-' + inc + '-website').val()){
        $('#id_orgs-' + inc + '-website').addClass('error-review')
        $('.webName').addClass('error-review-label')
        $('.form-error-box--before-pt1' + inc).append("<div class='form-error-box-card' id='form-error-org-websiteb-error'><div class='form-error-box-ex' id='form-error-org-websiteb-ex'><i class='bi bi-exclamation-lg'></i></div><div class='form-error-box-msg' id='form-error-org-websiteb-msg'>Website Missing</div></div>")
        $('.form-error-box--before-pt1' + inc).css({'display': 'table-cell', 'visibility': 'visible'})
        $('#form-error-org-websiteb-error').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-websiteb-msg').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-websiteb-ex').css({'display': 'flex', 'visibility': 'visible'})
        error_count3++
    }

    if (!$('#id_orgs-' + inc + '-org_phone').val()){
        console.log("dont have phone??????")
        $('#id_orgs-' + inc + '-org_phone').addClass('error-review')
        $('.phoneName').addClass('error-review-label')
        $('.form-error-box--before-pt1' + inc).append("<div class='form-error-box-card' id='form-error-org-phoneb-error'><div class='form-error-box-ex' id='form-error-org-phoneb-ex'><i class='bi bi-exclamation-lg'></i></div><div class='form-error-box-msg' id='form-error-org-phoneb-msg'>Phone Number Missing</div>")
        $('.form-error-box--before-pt1' + inc).css({'display': 'table-cell', 'visibility': 'visible'})
        $('#form-error-org-phoneb-msg').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-phoneb-error').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-phoneb-ex').css({'display': 'flex', 'visibility': 'visible'})
        error_count3++
    }

    if (!$('#id_orgs-' + inc + '-org_email').val()){
        $('#id_orgs-' + inc + '-org_email').addClass('error-review')
        $('.emailName').addClass('error-review-label')
        $('.form-error-box--before-pt1' + inc).append("<div class='form-error-box-card' id='form-error-org-emailb-error'><div class='form-error-box-ex' id='form-error-org-emailb-ex'><i class='bi bi-exclamation-lg'></i></div><div class='form-error-box-msg' id='form-error-org-emailb-msg'>Email Missing</div>")
        $('.form-error-box--before-pt1' + inc).css({'display': 'table-cell', 'visibility': 'visible'})
        $('#form-error-org-emailb-msg').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-emailb-error').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-emailb-ex').css({'display': 'flex', 'visibility': 'visible'})
        error_count3++
    }

    if (!$('#id_orgs-' + inc + '-description').val()){
        $('#id_orgs-' + inc + '-description').addClass('error-review')
        $('.form-error-box--before-pt1' + inc).append("<div class='form-error-box-card' id='form-error-org-descriptionb-error'><div class='form-error-box-ex' id='form-error-org-descriptionb-ex'><i class='bi bi-exclamation-lg'></i></div><div class='form-error-box-msg' id='form-error-org-descriptionb-msg'>Description Missing</div>")
        $('.form-error-box--before-pt1' + inc).css({'display': 'table-cell', 'visibility': 'visible'})
        $('#form-error-org-descriptionb-error').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-descriptionb-msg').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-descriptionb-ex').css({'display': 'flex', 'visibility': 'visible'})
        error_count3++
    }

    if (!$('#id_orgs-' + inc + '-street').val()){
        $('#id_orgs-' + inc + '-street').addClass('error-review')
        $('.streetName').addClass('error-review-label')
        $('.form-error-box--before-pt1' + inc).append("<div class='form-error-box-card' id='form-error-org-streetb-error'><div class='form-error-box-ex' id='form-error-org-streetb-ex'><i class='bi bi-exclamation-lg'></i></div><div class='form-error-box-msg' id='form-error-org-streetb-msg'>Street Missing</div>")
        $('.form-error-box--before-pt1' + inc).css({'display': 'table-cell', 'visibility': 'visible'})
        $('#form-error-org-streetb-error').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-streetb-msg').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-streetb-ex').css({'display': 'flex', 'visibility': 'visible'})
        error_count3++
    }

    if (!$('#id_orgs-' + inc + '-city').val()){
        $('#id_orgs-' + inc + '-city').addClass('error-review')
        $('.cityName').addClass('error-review-label')
        $('.form-error-box--before-pt1' + inc).append("<div class='form-error-box-card' id='form-error-org-cityb-error'><div class='form-error-box-ex' id='form-error-org-cityb-ex'><i class='bi bi-exclamation-lg'></i></div><div class='form-error-box-msg' id='form-error-org-cityb-msg'>City Missing</div>")
        $('.form-error-box--before-pt1' + inc).css({'display': 'table-cell', 'visibility': 'visible'})
        $('#form-error-org-cityb-error').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-cityb-msg').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-cityb-ex').css({'display': 'flex', 'visibility': 'visible'})
        error_count3++
    }

    if (!$('#id_orgs-' + inc + '-zipcode').val()){
        $('#id_orgs-' + inc + '-zipcode').addClass('error-review')
        $('.zipName').addClass('error-review-label')
        $('.form-error-box--before-pt1' + inc).append("<div class='form-error-box-card' id='form-error-org-zipcodeb-error'><div class='form-error-box-ex' id='form-error-org-zipcodeb-ex'><i class='bi bi-exclamation-lg'></i></div><div class='form-error-box-msg' id='form-error-org-zipcodeb-msg'>Zipcode Missing</div>")
        $('.form-error-box--before-pt1' + inc).css({'display': 'table-cell', 'visibility': 'visible'})
        $('#form-error-org-zipcodeb-error').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-zipcodeb-msg').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-zipcodeb-ex').css({'display': 'flex', 'visibility': 'visible'})
        error_count3++
    }

    if (!$('#id_orgs-' + inc + '-eligibility_0').is(':checked') && !$('#id_orgs-' + inc + '-eligibility_1').is(':checked') && !$('#id_orgs-' + inc + '-eligibility_2').is(':checked') && !$('#id_orgs-' + inc + '-eligibility_3').is(':checked') && !$('#id_orgs-' + inc + '-eligibility_4').is(':checked')){
        $('.eligName').addClass('error-review-label')
        $('.form-error-box--before-pt1' + inc).append("<div class='form-error-box-card' id='form-error-org-eligb-error'><div class='form-error-box-ex' id='form-error-org-eligb-ex'><i class='bi bi-exclamation-lg'></i></div><div class='form-error-box-msg' id='form-error-org-eligb-msg'>Eligibility Missing</div>")
        $('.form-error-box--before-pt1' + inc).css({'display': 'table-cell', 'visibility': 'visible'})
        $('#form-error-org-eligb-error').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-eligb-msg').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-eligb-ex').css({'display': 'flex', 'visibility': 'visible'})
        error_count3++
    }

    if (!$('#form-error-org-website-error').length == 0){
        error_count3++
    }

    if (!$('#form-error-org-phone-error').length == 0){
        error_count3++
    }

    if (!$('#form-error-org-name-error').length == 0){
        error_count3++
    }

    if (!$('#form-error-org-email-error').length == 0){
        error_count3++
    }

    if (!$('#form-error-org-zipcode-error').length == 0){
        error_count3++
    }

    console.log("Total errors: " + error_count3)

    if (error_count3 > 0){
        $('.page-circle-1').addClass('incorrect-dot')
        $('.page-circle-1').text(error_count3)
    }
    else{
        $('.page-circle-1').removeClass('incorrect-dot')
        $('.page-circle-1').text('')
    }
}

function findForm4Errors(inc){
    showInput2(inc);
    error_count4 = 0
    if (!$('#id_orgs-' + inc + '-contact_name').val()){
        $('#id_orgs-' + inc + '-contact_name').addClass('error-review')
        $('.cnameName').addClass('error-review-label')
        $('.form-error-box--before2-pt2' + inc).append("<div class='form-error-box-card' id='form-error-org-cnameb-error'><div class='form-error-box-ex' id='form-error-org-cnameb-ex'><i class='bi bi-exclamation-lg'></i></div><div class='form-error-box-msg' id='form-error-org-cnameb-msg'>Contact Name Missing</div></div>")
        $('.form-error-box--before2-pt2' + inc).css({'display': 'table-cell', 'visibility': 'visible'})
        $('#form-error-org-cnameb-error').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-cnameb-msg').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-cnameb-ex').css({'display': 'flex', 'visibility': 'visible'})
        error_count4++
    }

    if (!$('#id_orgs-' + inc + '-contact_phone').val()){
        $('#id_orgs-' + inc + '-contact_phone').addClass('error-review')
        $('.cphoneName').addClass('error-review-label')
        $('.form-error-box--before2-pt2' + inc).append("<div class='form-error-box-card' id='form-error-org-cphoneb-error'><div class='form-error-box-ex' id='form-error-org-cphoneb-ex'><i class='bi bi-exclamation-lg'></i></div><div class='form-error-box-msg' id='form-error-org-cphoneb-msg'>Contact Phone Missing</div></div>")
        $('.form-error-box--before2-pt2' + inc).css({'display': 'table-cell', 'visibility': 'visible'})
        $('#form-error-org-cphoneb-error').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-cphoneb-msg').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-cphoneb-ex').css({'display': 'flex', 'visibility': 'visible'})
        error_count4++
    }

    if (!$('#id_orgs-' + inc + '-contact_title').val()){
        $('#id_orgs-' + inc + '-contact_title').addClass('error-review')
        $('.ctitleName').addClass('error-review-label')
        $('.form-error-box--before2-pt2' + inc).append("<div class='form-error-box-card' id='form-error-org-ctitleb-error'><div class='form-error-box-ex' id='form-error-org-ctitleb-ex'><i class='bi bi-exclamation-lg'></i></div><div class='form-error-box-msg' id='form-error-org-ctitleb-msg'>Contact Title Missing</div></div>")
        $('.form-error-box--before2-pt2' + inc).css({'display': 'table-cell', 'visibility': 'visible'})
        $('#form-error-org-ctitleb-error').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-ctitleb-msg').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-ctitleb-ex').css({'display': 'flex', 'visibility': 'visible'})
        error_count4++
    }

    if (!$('#id_orgs-' + inc + '-contact_email').val()){
        $('#id_orgs-' + inc + '-contact_email').addClass('error-review')
        $('.cemailName').addClass('error-review-label')
        $('.form-error-box--before2-pt2' + inc).append("<div class='form-error-box-card' id='form-error-org-cemailb-error'><div class='form-error-box-ex' id='form-error-org-cemailb-ex'><i class='bi bi-exclamation-lg'></i></div><div class='form-error-box-msg' id='form-error-org-cemailb-msg'>Contact Name Missing</div></div>")
        $('.form-error-box--before2-pt2' + inc).css({'display': 'table-cell', 'visibility': 'visible'})
        $('#form-error-org-cemailb-error').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-cemailb-msg').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-cemailb-ex').css({'display': 'flex', 'visibility': 'visible'})
        error_count4++
    }

    if (!$('#id_orgs-' + inc + '-languages_0').is(':checked') && !$('#id_orgs-' + inc + '-languages_1').is(':checked')){
        $('.languagesName').addClass('error-review-label')
        $('.form-error-box--before2-pt2' + inc).append("<div class='form-error-box-card' id='form-error-org-langb-error'><div class='form-error-box-ex' id='form-error-org-langb-ex'><i class='bi bi-exclamation-lg'></i></div><div class='form-error-box-msg' id='form-error-org-langb-msg'>Language(s) Missing</div></div>")
        $('.form-error-box--before2-pt2' + inc).css({'display': 'table-cell', 'visibility': 'visible'})
        $('#form-error-org-langb-error').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-langb-msg').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-langb-ex').css({'display': 'flex', 'visibility': 'visible'})
        error_count4++
    }

    if (!$('#id_orgs-' + inc + '-areas_served_0').is(':checked') && !$('#id_orgs-' + inc + '-areas_served_1').is(':checked') && !$('#id_orgs-' + inc + '-areas_served_2').is(':checked') && !$('#id_orgs-' + inc + '-areas_served_3').is(':checked')){
        $('.areasName').addClass('error-review-label')
        $('.form-error-box--before2-pt2' + inc).append("<div class='form-error-box-card' id='form-error-org-areasb-error'><div class='form-error-box-ex' id='form-error-org-areasb-ex'><i class='bi bi-exclamation-lg'></i></div><div class='form-error-box-msg' id='form-error-org-areasb-msg'>Area(s) Missing</div></div>")
        $('.form-error-box--before2-pt2' + inc).css({'display': 'table-cell', 'visibility': 'visible'})
        $('#form-error-org-areasb-error').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-areasb-msg').css({'display': 'flex', 'visibility': 'visible'})
        $('#form-error-org-areasb-ex').css({'display': 'flex', 'visibility': 'visible'})
        error_count4++
    }

    if (!$('#form-error-org-mail-zipcode-error').length == 0){
        error_count4++
    }

    if (!$('#form-error-org-contact-email-error').length == 0){
        error_count4++
    }

    if (!$('#form-error-org-contact-phone-error').length == 0){
        error_count4++
    }

    console.log("Total errors: " + error_count4)

    if (error_count4 > 0){
        $('.page-circle-2').addClass('incorrect-dot')
        $('.page-circle-2').text(error_count4)
    }
    else{
        $('.page-circle-2').removeClass('incorrect-dot')
        $('.page-circle-2').text('')
    }
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

    $('button[name=submit_formx]').click(function(e){
        if (!$('.incorrect-dot').length == 0){
            console.log("preventing...")
            e.preventDefault();
            $('#orgFormErrorMsg').modal('show');
        }
        else{
            var thisval = $(this).val();
            revertFormat(thisval);
        }
    });

    $('button[name=submit_form1]').click(function(e){
        if (!$('.incorrect-dot').length == 0){
            console.log("preventing...")
            e.preventDefault();
            $('#orgFormErrorMsg').modal('show');
        }
        else{
            revertFormat1();
        }
    });
});

$(document).ready(function(){
    $('#id_org_name').on('input', function (){
        if ($('#form-error-org-nameb-error').length > 0){
            $('#id_org_name').removeClass('error-review')
            $('.orgName').removeClass('error-review-label')
            $('.form-error-box--before').children('#form-error-org-nameb-error').remove()
        }
    });
    $('#id_website').on('input', function (){
        if ($('#form-error-org-websiteb-error').length > 0){
            $('#id_website').removeClass('error-review')
            $('.webName').removeClass('error-review-label')
            $('.form-error-box--before').children('#form-error-org-websiteb-error').remove()
        }
    });
    $('#id_org_phone').on('input', function (){
        if ($('#form-error-org-phoneb-error').length > 0){
            $('#id_phone').removeClass('error-review')
            $('.phoneName').removeClass('error-review-label')
            $('.form-error-box--before').children('#form-error-org-phoneb-error').remove()
        }
    });
    $('#id_org_email').on('input', function (){
        if ($('#form-error-org-emailb-error').length > 0){
            $('#id_org_email').removeClass('error-review')
            $('.emailName').removeClass('error-review-label')
            $('.form-error-box--before').children('#form-error-org-emailb-error').remove()
        }
    });
    $('#id_description').on('input', function (){
        if ($('#form-error-org-descriptionb-error').length > 0){
            $('#id_description').removeClass('error-review')
            $('.form-error-box--before').children('#form-error-org-descriptionb-error').remove()
        }
    });
    $('#id_street').on('input', function (){
        if ($('#form-error-org-streetb-error').length > 0){
            $('#id_street').removeClass('error-review')
            $('.streetName').removeClass('error-review-label')
            $('.form-error-box--before').children('#form-error-org-streetb-error').remove()
        }
    });
    $('#id_city').on('input', function (){
        if ($('#form-error-org-cityb-error').length > 0){
            $('#id_city').removeClass('error-review')
            $('.cityName').removeClass('error-review-label')
            $('.form-error-box--before').children('#form-error-org-cityb-error').remove()
        }
    });
    $('#id_zipcode').on('input', function (){
        if ($('#form-error-org-zipcodeb-error').length > 0){
            $('#id_zipcode').removeClass('error-review')
            $('.zipName').removeClass('error-review-label')
            $('.form-error-box--before').children('#form-error-org-zipcodeb-error').remove()
        }
    });

    $('#id_eligibility_0').change(function(){
        if ($('#form-error-org-eligb-error').length > 0){
            $('.eligName').removeClass('error-review-label')
            $('.form-error-box--before').children('#form-error-org-eligb-error').remove()
        }
    })

    $('#id_eligibility_1').change(function(){
        if ($('#form-error-org-eligb-error').length > 0){
            $('.eligName').removeClass('error-review-label')
            $('.form-error-box--before').children('#form-error-org-eligb-error').remove()
        }
    })

    $('#id_eligibility_2').change(function(){
        if ($('#form-error-org-eligb-error').length > 0){
            $('.eligName').removeClass('error-review-label')
            $('.form-error-box--before').children('#form-error-org-eligb-error').remove()
        }
    })

    $('#id_eligibility_3').change(function(){
        if ($('#form-error-org-eligb-error').length > 0){
            $('.eligName').removeClass('error-review-label')
            $('.form-error-box--before').children('#form-error-org-eligb-error').remove()
        }
    })

    $('#id_eligibility_4').change(function(){
        if ($('#form-error-org-eligb-error').length > 0){
            $('.eligName').removeClass('error-review-label')
            $('.form-error-box--before').children('#form-error-org-eligb-error').remove()
        }
    })

    $('#id_contact_name').on('input', function (){
        if ($('#form-error-org-cnameb-error').length > 0){
            $('#id_contact_name').removeClass('error-review')
            $('.cnameName').removeClass('error-review-label')
            $('.form-error-box--before2').children('#form-error-org-cnameb-error').remove()
        }
    });
    $('#id_contact_phone').on('input', function (){
        if ($('#form-error-org-cphoneb-error').length > 0){
            $('#id_contact_phone').removeClass('error-review')
            $('.cphoneName').removeClass('error-review-label')
            $('.form-error-box--before2').children('#form-error-org-cphoneb-error').remove()
        }
    });
    $('#id_contact_email').on('input', function (){
        if ($('#form-error-org-cemailb-error').length > 0){
            $('#id_contact_email').removeClass('error-review')
            $('.cemailName').removeClass('error-review-label')
            $('.form-error-box--before2').children('#form-error-org-cemailb-error').remove()
        }
    });
    $('#id_contact_title').on('input', function (){
        if ($('#form-error-org-ctitleb-error').length > 0){
            $('#id_contact_title').removeClass('error-review')
            $('.ctitleName').removeClass('error-review-label')
            $('.form-error-box--before2').children('#form-error-org-ctitleb-error').remove()
        }
    });

    $('#id_languages_0').change(function(){
        if ($('#form-error-org-langb-error').length > 0){
            $('.languagesName').removeClass('error-review-label')
            $('.form-error-box--before2').children('#form-error-org-langb-error').remove()
        }
    })

    $('#id_languages_1').change(function(){
        if ($('#form-error-org-langb-error').length > 0){
            $('.languagesName').removeClass('error-review-label')
            $('.form-error-box--before2').children('#form-error-org-langb-error').remove()
        }
    })

    $('#id_areas_served_0').change(function(){
        if ($('#form-error-org-areasb-error').length > 0){
            $('.areasName').removeClass('error-review-label')
            $('.form-error-box--before2').children('#form-error-org-areasb-error').remove()
        }
    })
    $('#id_areas_served_1').change(function(){
        if ($('#form-error-org-areasb-error').length > 0){
            $('.areasName').removeClass('error-review-label')
            $('.form-error-box--before2').children('#form-error-org-areasb-error').remove()
        }
    })
    $('#id_areas_served_2').change(function(){
        if ($('#form-error-org-areasb-error').length > 0){
            $('.areasName').removeClass('error-review-label')
            $('.form-error-box--before2').children('#form-error-org-areasb-error').remove()
        }
    })
    $('#id_areas_served_3').change(function(){
        if ($('#form-error-org-areasb-error').length > 0){
            $('.areasName').removeClass('error-review-label')
            $('.form-error-box--before2').children('#form-error-org-areasb-error').remove()
        }
    })
    $('#id_areas_served_4').change(function(){
        if ($('#form-error-org-areasb-error').length > 0){
            $('.areasName').removeClass('error-review-label')
            $('.form-error-box--before2').children('#form-error-org-areasb-error').remove()
        }
    })

    







    $('[id^=id_orgs-][id$=-org_name]').on('input', function (){
        var thisvalue = $(this).parent().parent().parent().parent().attr('id').replace(/editform/g, '');
        thisvalue--;
        if ($('#form-error-org-nameb-error').length > 0){
            $('[id^=id_orgs-][id$=-org_name]').removeClass('error-review')
            $('.orgName').removeClass('error-review-label')
            $('.form-error-box--before-pt1' + thisvalue).children('#form-error-org-nameb-error').remove()
        }
    });



    $('[id^=id_orgs-][id$=-website]').on('input', function (){
        var thisvalue = $(this).parent().parent().parent().parent().attr('id').replace(/editform/g, '');
        thisvalue--;
        if ($('#form-error-org-websiteb-error').length > 0){
            $('[id^=id_orgs-][id$=-website]').removeClass('error-review')
            $('.webName').removeClass('error-review-label')
            $('.form-error-box--before-pt1' + thisvalue).children('#form-error-org-websiteb-error').remove()
        }
    });
    $('[id^=id_orgs-][id$=-org_phone]').on('input', function (){
        var thisvalue = $(this).parent().parent().parent().parent().attr('id').replace(/editform/g, '');
        thisvalue--;
        if ($('#form-error-org-phoneb-error').length > 0){
            $('[id^=id_orgs-][id$=-org_phone]').removeClass('error-review')
            $('.phoneName').removeClass('error-review-label')
            $('.form-error-box--before-pt1' + thisvalue).children('#form-error-org-phoneb-error').remove()
        }
    });
    $('[id^=id_orgs-][id$=-org_email]').on('input', function (){
        var thisvalue = $(this).parent().parent().parent().parent().attr('id').replace(/editform/g, '');
        thisvalue--;
        if ($('#form-error-org-emailb-error').length > 0){
            $('[id^=id_orgs-][id$=-org_email]').removeClass('error-review')
            $('.emailName').removeClass('error-review-label')
            $('.form-error-box--before-pt1' + thisvalue).children('#form-error-org-emailb-error').remove()
        }
    });
    $('[id^=id_orgs-][id$=-description]').on('input', function (){
        var thisvalue = $(this).parent().parent().parent().parent().attr('id').replace(/editform/g, '');
        thisvalue--;
        if ($('#form-error-org-descriptionb-error').length > 0){
            $('[id^=id_orgs-][id$=-description]').removeClass('error-review')
            $('.form-error-box--before-pt1' + thisvalue).children('#form-error-org-descriptionb-error').remove()
        }
    });
    $('[id^=id_orgs-][id$=-street]').on('input', function (){
        var thisvalue = $(this).parent().parent().parent().parent().attr('id').replace(/editform/g, '');
        thisvalue--;
        if ($('#form-error-org-streetb-error').length > 0){
            $('[id^=id_orgs-][id$=-street]').removeClass('error-review')
            $('.streetName').removeClass('error-review-label')
            $('.form-error-box--before-pt1' + thisvalue).children('#form-error-org-streetb-error').remove()
        }
    });
    $('[id^=id_orgs-][id$=-city]').on('input', function (){
        var thisvalue = $(this).parent().parent().parent().parent().attr('id').replace(/editform/g, '');
        thisvalue--;
        if ($('#form-error-org-cityb-error').length > 0){
            $('[id^=id_orgs-][id$=-city]').removeClass('error-review')
            $('.cityName').removeClass('error-review-label')
            $('.form-error-box--before-pt1' + thisvalue).children('#form-error-org-cityb-error').remove()
        }
    });
    $('[id^=id_orgs-][id$=-zipcode]').on('input', function (){
        var thisvalue = $(this).parent().parent().parent().parent().attr('id').replace(/editform/g, '');
        thisvalue--;
        if ($('#form-error-org-zipcodeb-error').length > 0){
            $('#id_zipcode').removeClass('error-review')
            $('.zipName').removeClass('error-review-label')
            $('.form-error-box--before-pt1' + thisvalue).children('#form-error-org-zipcodeb-error').remove()
        }
    });

    $('[id^=id_orgs-][id$=-eligibility_0]').change(function(){
        var thisvalue = $(this).parent().parent().parent().parent().attr('id').replace(/editform/g, '');
        thisvalue--;
        if ($('#form-error-org-eligb-error').length > 0){
            $('.eligName').removeClass('error-review-label')
            $('.form-error-box--before-pt1' + thisvalue).children('#form-error-org-eligb-error').remove()
        }
    })

    $('[id^=id_orgs-][id$=-eligibility_1]').change(function(){
        if ($('#form-error-org-eligb-error').length > 0){
            $('.eligName').removeClass('error-review-label')
            $('.form-error-box--before-pt1' + thisvalue).children('#form-error-org-eligb-error').remove()
        }
    })

    $('[id^=id_orgs-][id$=-eligibility_2]').change(function(){
        var thisvalue = $(this).parent().parent().parent().parent().attr('id').replace(/editform/g, '');
        thisvalue--;
        if ($('#form-error-org-eligb-error').length > 0){
            $('.eligName').removeClass('error-review-label')
            $('.form-error-box--before-pt1' + thisvalue).children('#form-error-org-eligb-error').remove()
        }
    })

    $('[id^=id_orgs-][id$=-eligibility_3]').change(function(){
        var thisvalue = $(this).parent().parent().parent().parent().attr('id').replace(/editform/g, '');
        thisvalue--;
        if ($('#form-error-org-eligb-error').length > 0){
            $('.eligName').removeClass('error-review-label')
            $('.form-error-box--before-pt1' + thisvalue).children('#form-error-org-eligb-error').remove()
        }
    })

    $('[id^=id_orgs-][id$=-eligibility_4]').change(function(){
        var thisvalue = $(this).parent().parent().parent().parent().attr('id').replace(/editform/g, '');
        thisvalue--;
        if ($('#form-error-org-eligb-error').length > 0){
            $('.eligName').removeClass('error-review-label')
            $('.form-error-box--before-pt1' + thisvalue).children('#form-error-org-eligb-error').remove()
        }
    })

    $('[id^=id_orgs-][id$=-contact_name]').on('input', function (){
        var thisvalue = $(this).parent().parent().parent().parent().attr('id').replace(/editFormPT2/g, '');
        if ($('#form-error-org-cnameb-error').length > 0){
            $('[id^=id_orgs-][id$=-contact_name]').removeClass('error-review')
            $('.cnameName').removeClass('error-review-label')
            $('.form-error-box--before2-pt2' + thisvalue).children('#form-error-org-cnameb-error').remove()
        }
    });
    $('[id^=id_orgs-][id$=-contact_phone]').on('input', function (){
        var thisvalue = $(this).parent().parent().parent().parent().attr('id').replace(/editFormPT2/g, '');
        if ($('#form-error-org-cphoneb-error').length > 0){
            $('[id^=id_orgs-][id$=-contact_phone]').removeClass('error-review')
            $('.cphoneName').removeClass('error-review-label')
            $('.form-error-box--before2-pt2' + thisvalue).children('#form-error-org-cphoneb-error').remove()
        }
    });
    $('[id^=id_orgs-][id$=-contact_email]').on('input', function (){
        var thisvalue = $(this).parent().parent().parent().parent().attr('id').replace(/editFormPT2/g, '');
        if ($('#form-error-org-cemailb-error').length > 0){
            $('[id^=id_orgs-][id$=-contact_email]').removeClass('error-review')
            $('.cemailName').removeClass('error-review-label')
            $('.form-error-box--before2-pt2' + thisvalue).children('#form-error-org-cemailb-error').remove()
        }
    });
    $('[id^=id_orgs-][id$=-contact_title]').on('input', function (){
        var thisvalue = $(this).parent().parent().parent().parent().attr('id').replace(/editFormPT2/g, '');
        if ($('#form-error-org-ctitleb-error').length > 0){
            $('[id^=id_orgs-][id$=-contact_title]').removeClass('error-review')
            $('.ctitleName').removeClass('error-review-label')
            $('.form-error-box--before2-pt2' + thisvalue).children('#form-error-org-ctitleb-error').remove()
        }
    });

    $('[id^=id_orgs-][id$=-languages_0]').change(function(){
        var thisvalue = $(this).parent().parent().parent().parent().parent().attr('id').replace(/editFormPT2/g, '');
        if ($('#form-error-org-langb-error').length > 0){
            $('.languagesName').removeClass('error-review-label')
            $('.form-error-box--before2-pt2' + thisvalue).children('#form-error-org-langb-error').remove()
        }
    })

    $('[id^=id_orgs-][id$=-languages_1]').change(function(){
        var thisvalue = $(this).parent().parent().parent().parent().parent().attr('id').replace(/editFormPT2/g, '');
        if ($('#form-error-org-langb-error').length > 0){
            $('.languagesName').removeClass('error-review-label')
            $('.form-error-box--before2-pt2' + thisvalue).children('#form-error-org-langb-error').remove()
        }
    })

    $('[id^=id_orgs-][id$=-areas_served_0]').change(function(){
        var thisvalue = $(this).parent().parent().parent().parent().parent().attr('id').replace(/editFormPT2/g, '');
        if ($('#form-error-org-areasb-error').length > 0){
            $('.areasName').removeClass('error-review-label')
            $('.form-error-box--before2-pt2' + thisvalue).children('#form-error-org-areasb-error').remove()
        }
    })
    $('[id^=id_orgs-][id$=-areas_served_1]').change(function(){
        var thisvalue = $(this).parent().parent().parent().parent().parent().attr('id').replace(/editFormPT2/g, '');
        if ($('#form-error-org-areasb-error').length > 0){
            $('.areasName').removeClass('error-review-label')
            $('.form-error-box--before2-pt2' + thisvalue).children('#form-error-org-areasb-error').remove()
        }
    })
    $('[id^=id_orgs-][id$=-areas_served_2]').change(function(){
        var thisvalue = $(this).parent().parent().parent().parent().parent().attr('id').replace(/editFormPT2/g, '');
        if ($('#form-error-org-areasb-error').length > 0){
            $('.areasName').removeClass('error-review-label')
            $('.form-error-box--before2-pt2' + thisvalue).children('#form-error-org-areasb-error').remove()
        }
    })
    $('[id^=id_orgs-][id$=-areas_served_3]').change(function(){
        var thisvalue = $(this).parent().parent().parent().parent().parent().attr('id').replace(/editFormPT2/g, '');
        if ($('#form-error-org-areasb-error').length > 0){
            $('.areasName').removeClass('error-review-label')
            $('.form-error-box--before2-pt2' + thisvalue).children('#form-error-org-areasb-error').remove()
        }
    })
    $('[id^=id_orgs-][id$=-areas_served_4]').change(function(){
        var thisvalue = $(this).parent().parent().parent().parent().parent().attr('id').replace(/editFormPT2/g, '');
        if ($('#form-error-org-areasb-error').length > 0){
            $('.areasName').removeClass('error-review-label')
            $('.form-error-box--before2-pt2' + thisvalue).children('#form-error-org-areasb-error').remove()
        }
    })



})