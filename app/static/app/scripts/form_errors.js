    $(document).ready(function(){
            if (document.formHasErrors){
                $('#orgForm1').modal('show');
                $('.form-error-box').css({'display': 'table-cell', 'visibility': 'visible'})
                $('.form-error-box-card').css({'display': 'flex', 'visibility': 'visible'})
                $('.form-error-box-ex').css({'display': 'flex', 'visibility': 'visible'})
            }
            var these_errors = $(".hide-errors")
            for (var i = 0; i < these_errors.length; i++){
                var this_error = these_errors[i]
                var this_form_id = $(this_error).text()
                console.log(this_form_id)
                $('#' + this_form_id + '').addClass('error-review')
                if (this_form_id == 'id_org_name'){
                    $('.orgName').addClass('error-review-label')
                }
                else if (this_form_id == 'id_website'){
                    $('.webName').addClass('error-review-label')
                }
                else if (this_form_id == 'id_org_phone'){
                    $('.phoneName').addClass('error-review-label')
                }
                else if (this_form_id == 'id_org_email'){
                    $('.emailName').addClass('error-review-label')
                }
                else if (this_form_id == 'id_street'){
                    $('.streetName').addClass('error-review-label')
                }
                else if (this_form_id == 'id_city'){
                    $('.cityName').addClass('error-review-label')
                }
                else if (this_form_id == 'id_zipcode'){
                    $('.zipName').addClass('error-review-label')
                }
                else if (this_form_id == 'id_contact_name'){
                    $('.cnameName').addClass('error-review-label')
                }
                else if (this_form_id == 'id_contact_phone'){
                    $('.cphoneName').addClass('error-review-label')
                }
                else if (this_form_id == 'id_contact_title'){
                    $('.ctitleName').addClass('error-review-label')
                }
                else if (this_form_id == 'id_contact_email'){
                    $('.cemailName').addClass('error-review-label')
                }
            }
        });