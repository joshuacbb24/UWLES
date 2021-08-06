$(document).ready(function(){
    var has_filter = false;

    var has_efilter = false;

    $('.location-dorchester').click(function(){
        if ($(this).hasClass('filtered')){
            $(this).removeClass('filtered');
            has_filter = false;
            var theseorgs = $('.orgCard')
            var theseorgs2 = $('.org-list')
            for (var i = 0 ; i < theseorgs.length; i++){
                if ($(theseorgs[i]).hasClass('show-this')){
                    $(theseorgs[i]).removeClass('show-this')
                }
                if ($(theseorgs[i]).hasClass('hide-this')){
                    $(theseorgs[i]).removeClass('hide-this')
                }
                if (has_efilter){
                    if ($(theseorgs[i]).hasClass('show-this2')){
                        $(theseorgs[i]).show();
                    }
                    else{
                        $(theseorgs[i]).hide();
                    }
                }
                else{
                    $(theseorgs[i]).show();
                }
            }
            for (var i = 0 ; i < theseorgs2.length; i++){
                if ($(theseorgs2[i]).hasClass('show-this')){
                    $(theseorgs2[i]).removeClass('show-this')
                }
                if ($(theseorgs2[i]).hasClass('hide-this')){
                    $(theseorgs2[i]).removeClass('hide-this')
                }
                if (has_efilter){
                    if ($(theseorgs2[i]).hasClass('show-this2')){
                        $(theseorgs2[i]).show();
                    }
                    else{
                        $(theseorgs2[i]).hide();
                    }
                }
                else{
                    $(theseorgs2[i]).show();
                }
            }
        }
        else{
            if ($('.filtered').length > 0){
                $('.filtered').removeClass('filtered');
            }

            $(this).addClass('filtered');
            has_filter = true;
            var theseorgs = $('.orgCard')
            var theseorgs2 = $('.org-list')
            for (var i = 0 ; i < theseorgs.length; i++){
                if($(theseorgs[i]).hasClass('show-this')){
                    $(theseorgs[i]).removeClass('show-this')
                }
                if($(theseorgs[i]).hasClass('hide-this')){
                    $(theseorgs[i]).removeClass('hide-this')
                }
                if (has_efilter && has_filter){
                    if ($(theseorgs[i]).hasClass('show-this2')){
                        if ($(theseorgs[i]).children('p.filter-me-county:contains("Dorchester")').length > 0){
                            $(theseorgs[i]).show();
                            $(theseorgs[i]).addClass('show-this');
                        }
                        else{
                            $(theseorgs[i]).addClass('hide-this');
                            $(theseorgs[i]).hide();
                        }
                    }
                    else{
                        if ($(theseorgs[i]).children('p.filter-me-county:contains("Dorchester")').length > 0){
                            $(theseorgs[i]).hide();
                            $(theseorgs[i]).addClass('show-this');
                        }
                        else{
                            $(theseorgs[i]).addClass('hide-this');
                            $(theseorgs[i]).hide();
                        }
                    }
                }
                else if (has_filter){
                    if ($(theseorgs[i]).children('p.filter-me-county:contains("Dorchester")').length > 0){
                        $(theseorgs[i]).show();
                        $(theseorgs[i]).addClass('show-this');
                    }
                    else{
                        $(theseorgs[i]).addClass('hide-this');
                        $(theseorgs[i]).hide();
                    }
                }
            }
            for (var i = 0 ; i < theseorgs2.length; i++){
                if($(theseorgs2[i]).hasClass('show-this')){
                    $(theseorgs2[i]).removeClass('show-this')
                }
                if($(theseorgs2[i]).hasClass('hide-this')){
                    $(theseorgs2[i]).removeClass('hide-this')
                }
                if (has_efilter && has_filter){
                    if ($(theseorgs2[i]).hasClass('show-this2')){
                        if ($(theseorgs2[i]).children('p.filter-me-county2:contains("Dorchester")').length > 0){
                            $(theseorgs2[i]).show();
                            $(theseorgs2[i]).addClass('show-this');
                        }
                        else{
                            $(theseorgs2[i]).addClass('hide-this');
                            $(theseorgs2[i]).hide();
                        }
                    }
                    else{
                        if ($(theseorgs2[i]).children('p.filter-me-county2:contains("Dorchester")').length > 0){
                            $(theseorgs2[i]).hide();
                            $(theseorgs2[i]).addClass('show-this');
                        }
                        else{
                            $(theseorgs2[i]).addClass('hide-this');
                            $(theseorgs2[i]).hide();
                        }
                    }
                }
                else if (has_filter){
                    if ($(theseorgs2[i]).children('p.filter-me-county2:contains("Dorchester")').length > 0){
                        $(theseorgs2[i]).show();
                        $(theseorgs2[i]).addClass('show-this');
                    }
                    else{
                        $(theseorgs2[i]).addClass('hide-this');
                        $(theseorgs2[i]).hide();
                    }
                }
            }
        }
    });
    

    $('.location-somerset').click(function(){
        if ($(this).hasClass('filtered')){
            $(this).removeClass('filtered');
            has_filter = false;
            var theseorgs = $('.orgCard')
            var theseorgs2 = $('.org-list')
            for (var i = 0 ; i < theseorgs.length; i++){
                if ($(theseorgs[i]).hasClass('show-this')){
                    $(theseorgs[i]).removeClass('show-this')
                }
                if ($(theseorgs[i]).hasClass('hide-this')){
                    $(theseorgs[i]).removeClass('hide-this')
                }
                if (has_efilter){
                    if ($(theseorgs[i]).hasClass('show-this2')){
                        $(theseorgs[i]).show();
                    }
                    else{
                        $(theseorgs[i]).hide();
                    }
                }
                else{
                    $(theseorgs[i]).show();
                }
            }
            for (var i = 0 ; i < theseorgs2.length; i++){
                if ($(theseorgs2[i]).hasClass('show-this')){
                    $(theseorgs2[i]).removeClass('show-this')
                }
                if ($(theseorgs2[i]).hasClass('hide-this')){
                    $(theseorgs2[i]).removeClass('hide-this')
                }
                if (has_efilter){
                    if ($(theseorgs2[i]).hasClass('show-this2')){
                        $(theseorgs2[i]).show();
                    }
                    else{
                        $(theseorgs2[i]).hide();
                    }
                }
                else{
                    $(theseorgs2[i]).show();
                }
            }
        }
        else{
            if ($('.filtered').length > 0){
                $('.filtered').removeClass('filtered');
            }

            $(this).addClass('filtered');
            has_filter = true;
            var theseorgs = $('.orgCard')
            var theseorgs2 = $('.org-list')
            for (var i = 0 ; i < theseorgs.length; i++){
                if($(theseorgs[i]).hasClass('show-this')){
                    $(theseorgs[i]).removeClass('show-this')
                }
                if($(theseorgs[i]).hasClass('hide-this')){
                    $(theseorgs[i]).removeClass('hide-this')
                }
                if (has_efilter && has_filter){
                    if ($(theseorgs[i]).hasClass('show-this2')){
                        if ($(theseorgs[i]).children('p.filter-me-county:contains("Somerset")').length > 0){
                            $(theseorgs[i]).show();
                            $(theseorgs[i]).addClass('show-this');
                        }
                        else{
                            $(theseorgs[i]).addClass('hide-this');
                            $(theseorgs[i]).hide();
                        }
                    }
                    else{
                        if ($(theseorgs[i]).children('p.filter-me-county:contains("Somerset")').length > 0){
                            $(theseorgs[i]).hide();
                            $(theseorgs[i]).addClass('show-this');
                        }
                        else{
                            $(theseorgs[i]).addClass('hide-this');
                            $(theseorgs[i]).hide();
                        }
                    }
                }
                else if (has_filter){
                    if ($(theseorgs[i]).children('p.filter-me-county:contains("Somerset")').length > 0){
                        $(theseorgs[i]).show();
                        $(theseorgs[i]).addClass('show-this');
                    }
                    else{
                        $(theseorgs[i]).addClass('hide-this');
                        $(theseorgs[i]).hide();
                    }
                }
            }
            for (var i = 0 ; i < theseorgs2.length; i++){
                if($(theseorgs2[i]).hasClass('show-this')){
                    $(theseorgs2[i]).removeClass('show-this')
                }
                if($(theseorgs2[i]).hasClass('hide-this')){
                    $(theseorgs2[i]).removeClass('hide-this')
                }
                if (has_efilter && has_filter){
                    if ($(theseorgs2[i]).hasClass('show-this2')){
                        if ($(theseorgs2[i]).children('p.filter-me-county2:contains("Somerset")').length > 0){
                            $(theseorgs2[i]).show();
                            $(theseorgs2[i]).addClass('show-this');
                        }
                        else{
                            $(theseorgs2[i]).addClass('hide-this');
                            $(theseorgs2[i]).hide();
                        }
                    }
                    else{
                        if ($(theseorgs2[i]).children('p.filter-me-county2:contains("Somerset")').length > 0){
                            $(theseorgs2[i]).hide();
                            $(theseorgs2[i]).addClass('show-this');
                        }
                        else{
                            $(theseorgs2[i]).addClass('hide-this');
                            $(theseorgs2[i]).hide();
                        }
                    }
                }
                else if (has_filter){
                    if ($(theseorgs2[i]).children('p.filter-me-county2:contains("Somerset")').length > 0){
                        $(theseorgs2[i]).show();
                        $(theseorgs2[i]).addClass('show-this');
                    }
                    else{
                        $(theseorgs2[i]).addClass('hide-this');
                        $(theseorgs2[i]).hide();
                    }
                }
            }
        }
    });

    $('.location-wicomico').click(function(){
        if ($(this).hasClass('filtered')){
            $(this).removeClass('filtered');
            has_filter = false;
            var theseorgs = $('.orgCard')
            var theseorgs2 = $('.org-list')
            for (var i = 0 ; i < theseorgs.length; i++){
                if ($(theseorgs[i]).hasClass('show-this')){
                    $(theseorgs[i]).removeClass('show-this')
                }
                if ($(theseorgs[i]).hasClass('hide-this')){
                    $(theseorgs[i]).removeClass('hide-this')
                }
                if (has_efilter){
                    if ($(theseorgs[i]).hasClass('show-this2')){
                        $(theseorgs[i]).show();
                    }
                    else{
                        $(theseorgs[i]).hide();
                    }
                }
                else{
                    $(theseorgs[i]).show();
                }
            }
            for (var i = 0 ; i < theseorgs2.length; i++){
                if ($(theseorgs2[i]).hasClass('show-this')){
                    $(theseorgs2[i]).removeClass('show-this')
                }
                if ($(theseorgs2[i]).hasClass('hide-this')){
                    $(theseorgs2[i]).removeClass('hide-this')
                }
                if (has_efilter){
                    if ($(theseorgs2[i]).hasClass('show-this2')){
                        $(theseorgs2[i]).show();
                    }
                    else{
                        $(theseorgs2[i]).hide();
                    }
                }
                else{
                    $(theseorgs2[i]).show();
                }
            }
        }
        else{
            if ($('.filtered').length > 0){
                $('.filtered').removeClass('filtered');
            }

            $(this).addClass('filtered');
            has_filter = true;
            var theseorgs = $('.orgCard')
            var theseorgs2 = $('.org-list')
            for (var i = 0 ; i < theseorgs.length; i++){
                if($(theseorgs[i]).hasClass('show-this')){
                    $(theseorgs[i]).removeClass('show-this')
                }
                if($(theseorgs[i]).hasClass('hide-this')){
                    $(theseorgs[i]).removeClass('hide-this')
                }
                if (has_efilter && has_filter){
                    if ($(theseorgs[i]).hasClass('show-this2')){
                        if ($(theseorgs[i]).children('p.filter-me-county:contains("Wicomico")').length > 0){
                            $(theseorgs[i]).show();
                            $(theseorgs[i]).addClass('show-this');
                        }
                        else{
                            $(theseorgs[i]).addClass('hide-this');
                            $(theseorgs[i]).hide();
                        }
                    }
                    else{
                        if ($(theseorgs[i]).children('p.filter-me-county:contains("Wicomico")').length > 0){
                            $(theseorgs[i]).hide();
                            $(theseorgs[i]).addClass('show-this');
                        }
                        else{
                            $(theseorgs[i]).addClass('hide-this');
                            $(theseorgs[i]).hide();
                        }
                    }
                }
                else if (has_filter){
                    if ($(theseorgs[i]).children('p.filter-me-county:contains("Wicomico")').length > 0){
                        $(theseorgs[i]).show();
                        $(theseorgs[i]).addClass('show-this');
                    }
                    else{
                        $(theseorgs[i]).addClass('hide-this');
                        $(theseorgs[i]).hide();
                    }
                }
            }
            for (var i = 0 ; i < theseorgs2.length; i++){
                if($(theseorgs2[i]).hasClass('show-this')){
                    $(theseorgs2[i]).removeClass('show-this')
                }
                if($(theseorgs2[i]).hasClass('hide-this')){
                    $(theseorgs2[i]).removeClass('hide-this')
                }
                if (has_efilter && has_filter){
                    if ($(theseorgs2[i]).hasClass('show-this2')){
                        if ($(theseorgs2[i]).children('p.filter-me-county2:contains("Wicomico")').length > 0){
                            $(theseorgs2[i]).show();
                            $(theseorgs2[i]).addClass('show-this');
                        }
                        else{
                            $(theseorgs2[i]).addClass('hide-this');
                            $(theseorgs2[i]).hide();
                        }
                    }
                    else{
                        if ($(theseorgs2[i]).children('p.filter-me-county2:contains("Wicomico")').length > 0){
                            $(theseorgs2[i]).hide();
                            $(theseorgs2[i]).addClass('show-this');
                        }
                        else{
                            $(theseorgs2[i]).addClass('hide-this');
                            $(theseorgs2[i]).hide();
                        }
                    }
                }
                else if (has_filter){
                    if ($(theseorgs2[i]).children('p.filter-me-county2:contains("Wicomico")').length > 0){
                        $(theseorgs2[i]).show();
                        $(theseorgs2[i]).addClass('show-this');
                    }
                    else{
                        $(theseorgs2[i]).addClass('hide-this');
                        $(theseorgs2[i]).hide();
                    }
                }
            }
        }
    });

    $('.location-worcester').click(function(){
        if ($(this).hasClass('filtered')){
            $(this).removeClass('filtered');
            has_filter = false;
            var theseorgs = $('.orgCard')
            var theseorgs2 = $('.org-list')
            for (var i = 0 ; i < theseorgs.length; i++){
                if ($(theseorgs[i]).hasClass('show-this')){
                    $(theseorgs[i]).removeClass('show-this')
                }
                if ($(theseorgs[i]).hasClass('hide-this')){
                    $(theseorgs[i]).removeClass('hide-this')
                }
                if (has_efilter){
                    if ($(theseorgs[i]).hasClass('show-this2')){
                        $(theseorgs[i]).show();
                    }
                    else{
                        $(theseorgs[i]).hide();
                    }
                }
                else{
                    $(theseorgs[i]).show();
                }
            }
            for (var i = 0 ; i < theseorgs2.length; i++){
                if ($(theseorgs2[i]).hasClass('show-this')){
                    $(theseorgs2[i]).removeClass('show-this')
                }
                if ($(theseorgs2[i]).hasClass('hide-this')){
                    $(theseorgs2[i]).removeClass('hide-this')
                }
                if (has_efilter){
                    if ($(theseorgs2[i]).hasClass('show-this2')){
                        $(theseorgs2[i]).show();
                    }
                    else{
                        $(theseorgs2[i]).hide();
                    }
                }
                else{
                    $(theseorgs2[i]).show();
                }
            }
        }
        else{
            if ($('.filtered').length > 0){
                $('.filtered').removeClass('filtered');
            }

            $(this).addClass('filtered');
            has_filter = true;
            var theseorgs = $('.orgCard')
            var theseorgs2 = $('.org-list')
            for (var i = 0 ; i < theseorgs.length; i++){
                if($(theseorgs[i]).hasClass('show-this')){
                    $(theseorgs[i]).removeClass('show-this')
                }
                if($(theseorgs[i]).hasClass('hide-this')){
                    $(theseorgs[i]).removeClass('hide-this')
                }
                if (has_efilter && has_filter){
                    if ($(theseorgs[i]).hasClass('show-this2')){
                        if ($(theseorgs[i]).children('p.filter-me-county:contains("Worcester")').length > 0){
                            $(theseorgs[i]).show();
                            $(theseorgs[i]).addClass('show-this');
                        }
                        else{
                            $(theseorgs[i]).addClass('hide-this');
                            $(theseorgs[i]).hide();
                        }
                    }
                    else{
                        if ($(theseorgs[i]).children('p.filter-me-county:contains("Worcester")').length > 0){
                            $(theseorgs[i]).hide();
                            $(theseorgs[i]).addClass('show-this');
                        }
                        else{
                            $(theseorgs[i]).addClass('hide-this');
                            $(theseorgs[i]).hide();
                        }
                    }
                }
                else if (has_filter){
                    if ($(theseorgs[i]).children('p.filter-me-county:contains("Worcester")').length > 0){
                        $(theseorgs[i]).show();
                        $(theseorgs[i]).addClass('show-this');
                    }
                    else{
                        $(theseorgs[i]).addClass('hide-this');
                        $(theseorgs[i]).hide();
                    }
                }
            }
            for (var i = 0 ; i < theseorgs2.length; i++){
                if($(theseorgs2[i]).hasClass('show-this')){
                    $(theseorgs2[i]).removeClass('show-this')
                }
                if($(theseorgs2[i]).hasClass('hide-this')){
                    $(theseorgs2[i]).removeClass('hide-this')
                }
                if (has_efilter && has_filter){
                    if ($(theseorgs2[i]).hasClass('show-this2')){
                        if ($(theseorgs2[i]).children('p.filter-me-county2:contains("Worcester")').length > 0){
                            $(theseorgs2[i]).show();
                            $(theseorgs2[i]).addClass('show-this');
                        }
                        else{
                            $(theseorgs2[i]).addClass('hide-this');
                            $(theseorgs2[i]).hide();
                        }
                    }
                    else{
                        if ($(theseorgs2[i]).children('p.filter-me-county2:contains("Worcester")').length > 0){
                            $(theseorgs2[i]).hide();
                            $(theseorgs2[i]).addClass('show-this');
                        }
                        else{
                            $(theseorgs2[i]).addClass('hide-this');
                            $(theseorgs2[i]).hide();
                        }
                    }
                }
                else if (has_filter){
                    if ($(theseorgs2[i]).children('p.filter-me-county2:contains("Worcester")').length > 0){
                        $(theseorgs2[i]).show();
                        $(theseorgs2[i]).addClass('show-this');
                    }
                    else{
                        $(theseorgs2[i]).addClass('hide-this');
                        $(theseorgs2[i]).hide();
                    }
                }
            }
        }
    });
/*************************************************************************************************************************************************************** */
    $('.elig-all').click(function(){
        if ($(this).hasClass('filtered2')){
            $(this).removeClass('filtered2');
            has_efilter = false;
            var theseorgs = $('.orgCard')
            var theseorgs2 = $('.org-list')
            for (var i = 0 ; i < theseorgs.length; i++){
                if ($(theseorgs[i]).hasClass('show-this2')){
                    $(theseorgs[i]).removeClass('show-this2');
                }
                if ($(theseorgs[i]).hasClass('hide-this2')){
                    $(theseorgs[i]).removeClass('hide-this2');
                }
                if (has_filter){
                    if ($(theseorgs[i]).hasClass('show-this')){
                        $(theseorgs[i]).show();
                    }
                    else {
                        $(theseorgs[i]).hide();
                    }
                }
                else{
                    $(theseorgs[i]).show();
                }
            }
            for (var i = 0 ; i < theseorgs2.length; i++){
                if ($(theseorgs2[i]).hasClass('show-this2')){
                    $(theseorgs2[i]).removeClass('show-this2');
                }
                if ($(theseorgs2[i]).hasClass('hide-this2')){
                    $(theseorgs2[i]).removeClass('hide-this2');
                }
                if (has_filter){
                    if ($(theseorgs2[i]).hasClass('show-this')){
                        $(theseorgs2[i]).show();
                    }
                    else {
                        $(theseorgs2[i]).hide();
                    }
                }
                else{
                    $(theseorgs2[i]).show();
                }
            }
        }
        else{
            if ($('.filtered2').length > 0){
                $('.filtered2').removeClass('filtered2');
            }

            $(this).addClass('filtered2');
            has_efilter = true;
            var theseorgs = $('.orgCard')
            var theseorgs2 = $('.org-list')
            for (var i = 0 ; i < theseorgs.length; i++){
                if($(theseorgs[i]).hasClass('show-this2')){
                    $(theseorgs[i]).removeClass('show-this2')
                }
                if($(theseorgs[i]).hasClass('hide-this2')){
                    $(theseorgs[i]).removeClass('hide-this2')
                }
                if (has_efilter && has_filter){
                    if ($(theseorgs[i]).hasClass('show-this')){
                        if ($(theseorgs[i]).children('p.filter-me-elig:contains("All Ages")').length > 0){
                            $(theseorgs[i]).show();
                            $(theseorgs[i]).addClass('show-this2');
                        }
                        else{
                            $(theseorgs[i]).addClass('hide-this2');
                            $(theseorgs[i]).hide();
                        }
                    }
                    else{
                        if ($(theseorgs[i]).children('p.filter-me-elig:contains("All Ages")').length > 0){
                            $(theseorgs[i]).hide();
                            $(theseorgs[i]).addClass('show-this2');
                        }
                        else{
                            $(theseorgs[i]).addClass('hide-this2');
                            $(theseorgs[i]).hide();
                        }
                    }
                }
                else if (has_efilter){
                    if ($(theseorgs[i]).children('p.filter-me-elig:contains("All Ages")').length > 0){
                        $(theseorgs[i]).show();
                        $(theseorgs[i]).addClass('show-this2');
                    }
                    else{
                        $(theseorgs[i]).addClass('hide-this2');
                        $(theseorgs[i]).hide();
                    }
                }
            }
            for (var i = 0 ; i < theseorgs2.length; i++){
                if($(theseorgs2[i]).hasClass('show-this2')){
                    $(theseorgs2[i]).removeClass('show-this2')
                }
                if($(theseorgs2[i]).hasClass('hide-this2')){
                    $(theseorgs2[i]).removeClass('hide-this2')
                }
                if (has_efilter && has_filter){
                    if ($(theseorgs2[i]).hasClass('show-this')){
                        if ($(theseorgs2[i]).children('p.filter-me-elig2:contains("All Ages")').length > 0){
                            $(theseorgs2[i]).show();
                            $(theseorgs2[i]).addClass('show-this2');
                        }
                        else{
                            $(theseorgs2[i]).addClass('hide-this2');
                            $(theseorgs2[i]).hide();
                        }
                    }
                    else{
                        if ($(theseorgs2[i]).children('p.filter-me-elig2:contains("All Ages")').length > 0){
                            $(theseorgs2[i]).hide();
                            $(theseorgs2[i]).addClass('show-this2');
                        }
                        else{
                            $(theseorgs2[i]).addClass('hide-this2');
                            $(theseorgs2[i]).hide();
                        }
                    }
                }
                else if (has_efilter){
                    if ($(theseorgs2[i]).children('p.filter-me-elig2:contains("All Ages")').length > 0){
                        $(theseorgs2[i]).show();
                        $(theseorgs2[i]).addClass('show-this2');
                    }
                    else{
                        $(theseorgs2[i]).addClass('hide-this2');
                        $(theseorgs2[i]).hide();
                    }
                }
            }
        }
    });


    $('.elig-youth').click(function(){
        if ($(this).hasClass('filtered2')){
            $(this).removeClass('filtered2');
            has_efilter = false;
            var theseorgs = $('.orgCard')
            var theseorgs2 = $('.org-list')
            for (var i = 0 ; i < theseorgs.length; i++){
                if ($(theseorgs[i]).hasClass('show-this2')){
                    $(theseorgs[i]).removeClass('show-this2');
                }
                if ($(theseorgs[i]).hasClass('hide-this2')){
                    $(theseorgs[i]).removeClass('hide-this2');
                }
                if (has_filter){
                    if ($(theseorgs[i]).hasClass('show-this')){
                        $(theseorgs[i]).show();
                    }
                    else {
                        $(theseorgs[i]).hide();
                    }
                }
                else{
                    $(theseorgs[i]).show();
                }
            }
            for (var i = 0 ; i < theseorgs2.length; i++){
                if ($(theseorgs2[i]).hasClass('show-this2')){
                    $(theseorgs2[i]).removeClass('show-this2');
                }
                if ($(theseorgs2[i]).hasClass('hide-this2')){
                    $(theseorgs2[i]).removeClass('hide-this2');
                }
                if (has_filter){
                    if ($(theseorgs2[i]).hasClass('show-this')){
                        $(theseorgs2[i]).show();
                    }
                    else {
                        $(theseorgs2[i]).hide();
                    }
                }
                else{
                    $(theseorgs2[i]).show();
                }
            }
        }
        else{
            if ($('.filtered2').length > 0){
                $('.filtered2').removeClass('filtered2');
            }

            $(this).addClass('filtered2');
            has_efilter = true;
            var theseorgs = $('.orgCard')
            var theseorgs2 = $('.org-list')
            for (var i = 0 ; i < theseorgs.length; i++){
                if($(theseorgs[i]).hasClass('show-this2')){
                    $(theseorgs[i]).removeClass('show-this2')
                }
                if($(theseorgs[i]).hasClass('hide-this2')){
                    $(theseorgs[i]).removeClass('hide-this2')
                }
                if (has_efilter && has_filter){
                    if ($(theseorgs[i]).hasClass('show-this')){
                        if ($(theseorgs[i]).children('p.filter-me-elig:contains("Youth(under 12)")').length > 0){
                            $(theseorgs[i]).show();
                            $(theseorgs[i]).addClass('show-this2');
                        }
                        else{
                            $(theseorgs[i]).addClass('hide-this2');
                            $(theseorgs[i]).hide();
                        }
                    }
                    else{
                        if ($(theseorgs[i]).children('p.filter-me-elig:contains("Youth(under 12)")').length > 0){
                            $(theseorgs[i]).hide();
                            $(theseorgs[i]).addClass('show-this2');
                        }
                        else{
                            $(theseorgs[i]).addClass('hide-this2');
                            $(theseorgs[i]).hide();
                        }
                    }
                }
                else if (has_efilter){
                    if ($(theseorgs[i]).children('p.filter-me-elig:contains("Youth(under 12)")').length > 0){
                        $(theseorgs[i]).show();
                        $(theseorgs[i]).addClass('show-this2');
                    }
                    else{
                        $(theseorgs[i]).addClass('hide-this2');
                        $(theseorgs[i]).hide();
                    }
                }
            }
            for (var i = 0 ; i < theseorgs2.length; i++){
                if($(theseorgs2[i]).hasClass('show-this2')){
                    $(theseorgs2[i]).removeClass('show-this2')
                }
                if($(theseorgs2[i]).hasClass('hide-this2')){
                    $(theseorgs2[i]).removeClass('hide-this2')
                }
                if (has_efilter && has_filter){
                    if ($(theseorgs2[i]).hasClass('show-this')){
                        if ($(theseorgs2[i]).children('p.filter-me-elig2:contains("Youth(under 12)")').length > 0){
                            $(theseorgs2[i]).show();
                            $(theseorgs2[i]).addClass('show-this2');
                        }
                        else{
                            $(theseorgs2[i]).addClass('hide-this2');
                            $(theseorgs2[i]).hide();
                        }
                    }
                    else{
                        if ($(theseorgs2[i]).children('p.filter-me-elig2:contains("Youth(under 12)")').length > 0){
                            $(theseorgs2[i]).hide();
                            $(theseorgs2[i]).addClass('show-this2');
                        }
                        else{
                            $(theseorgs2[i]).addClass('hide-this2');
                            $(theseorgs2[i]).hide();
                        }
                    }
                }
                else if (has_efilter){
                    if ($(theseorgs2[i]).children('p.filter-me-elig2:contains("Youth(under 12)")').length > 0){
                        $(theseorgs2[i]).show();
                        $(theseorgs2[i]).addClass('show-this2');
                    }
                    else{
                        $(theseorgs2[i]).addClass('hide-this2');
                        $(theseorgs2[i]).hide();
                    }
                }
            }
        }
    });

    $('.elig-teens').click(function(){
        if ($(this).hasClass('filtered2')){
            $(this).removeClass('filtered2');
            has_efilter = false;
            var theseorgs = $('.orgCard')
            var theseorgs2 = $('.org-list')
            for (var i = 0 ; i < theseorgs.length; i++){
                if ($(theseorgs[i]).hasClass('show-this2')){
                    $(theseorgs[i]).removeClass('show-this2');
                }
                if ($(theseorgs[i]).hasClass('hide-this2')){
                    $(theseorgs[i]).removeClass('hide-this2');
                }
                if (has_filter){
                    if ($(theseorgs[i]).hasClass('show-this')){
                        $(theseorgs[i]).show();
                    }
                    else {
                        $(theseorgs[i]).hide();
                    }
                }
                else{
                    $(theseorgs[i]).show();
                }
            }
            for (var i = 0 ; i < theseorgs2.length; i++){
                if ($(theseorgs2[i]).hasClass('show-this2')){
                    $(theseorgs2[i]).removeClass('show-this2');
                }
                if ($(theseorgs2[i]).hasClass('hide-this2')){
                    $(theseorgs2[i]).removeClass('hide-this2');
                }
                if (has_filter){
                    if ($(theseorgs2[i]).hasClass('show-this')){
                        $(theseorgs2[i]).show();
                    }
                    else {
                        $(theseorgs2[i]).hide();
                    }
                }
                else{
                    $(theseorgs2[i]).show();
                }
            }
        }
        else{
            if ($('.filtered2').length > 0){
                $('.filtered2').removeClass('filtered2');
            }

            $(this).addClass('filtered2');
            has_efilter = true;
            var theseorgs = $('.orgCard')
            var theseorgs2 = $('.org-list')
            for (var i = 0 ; i < theseorgs.length; i++){
                if($(theseorgs[i]).hasClass('show-this2')){
                    $(theseorgs[i]).removeClass('show-this2')
                }
                if($(theseorgs[i]).hasClass('hide-this2')){
                    $(theseorgs[i]).removeClass('hide-this2')
                }
                if (has_efilter && has_filter){
                    if ($(theseorgs[i]).hasClass('show-this')){
                        if ($(theseorgs[i]).children('p.filter-me-elig:contains("Teens(13-17)")').length > 0){
                            $(theseorgs[i]).show();
                            $(theseorgs[i]).addClass('show-this2');
                        }
                        else{
                            $(theseorgs[i]).addClass('hide-this2');
                            $(theseorgs[i]).hide();
                        }
                    }
                    else{
                        if ($(theseorgs[i]).children('p.filter-me-elig:contains("Teens(13-17)")').length > 0){
                            $(theseorgs[i]).hide();
                            $(theseorgs[i]).addClass('show-this2');
                        }
                        else{
                            $(theseorgs[i]).addClass('hide-this2');
                            $(theseorgs[i]).hide();
                        }
                    }
                }
                else if (has_efilter){
                    if ($(theseorgs[i]).children('p.filter-me-elig:contains("Teens(13-17)")').length > 0){
                        $(theseorgs[i]).show();
                        $(theseorgs[i]).addClass('show-this2');
                    }
                    else{
                        $(theseorgs[i]).addClass('hide-this2');
                        $(theseorgs[i]).hide();
                    }
                }
            }
            for (var i = 0 ; i < theseorgs2.length; i++){
                if($(theseorgs2[i]).hasClass('show-this2')){
                    $(theseorgs2[i]).removeClass('show-this2')
                }
                if($(theseorgs2[i]).hasClass('hide-this2')){
                    $(theseorgs2[i]).removeClass('hide-this2')
                }
                if (has_efilter && has_filter){
                    if ($(theseorgs2[i]).hasClass('show-this')){
                        if ($(theseorgs2[i]).children('p.filter-me-elig2:contains("Teens(13-17)")').length > 0){
                            $(theseorgs2[i]).show();
                            $(theseorgs2[i]).addClass('show-this2');
                        }
                        else{
                            $(theseorgs2[i]).addClass('hide-this2');
                            $(theseorgs2[i]).hide();
                        }
                    }
                    else{
                        if ($(theseorgs2[i]).children('p.filter-me-elig2:contains("Teens(13-17)")').length > 0){
                            $(theseorgs2[i]).hide();
                            $(theseorgs2[i]).addClass('show-this2');
                        }
                        else{
                            $(theseorgs2[i]).addClass('hide-this2');
                            $(theseorgs2[i]).hide();
                        }
                    }
                }
                else if (has_efilter){
                    if ($(theseorgs2[i]).children('p.filter-me-elig2:contains("Teens(13-17)")').length > 0){
                        $(theseorgs2[i]).show();
                        $(theseorgs2[i]).addClass('show-this2');
                    }
                    else{
                        $(theseorgs2[i]).addClass('hide-this2');
                        $(theseorgs2[i]).hide();
                    }
                }
            }
        }
    });

    $('.elig-adults').click(function(){
        if ($(this).hasClass('filtered2')){
            $(this).removeClass('filtered2');
            has_efilter = false;
            var theseorgs = $('.orgCard')
            var theseorgs2 = $('.org-list')
            for (var i = 0 ; i < theseorgs.length; i++){
                if ($(theseorgs[i]).hasClass('show-this2')){
                    $(theseorgs[i]).removeClass('show-this2');
                }
                if ($(theseorgs[i]).hasClass('hide-this2')){
                    $(theseorgs[i]).removeClass('hide-this2');
                }
                if (has_filter){
                    if ($(theseorgs[i]).hasClass('show-this')){
                        $(theseorgs[i]).show();
                    }
                    else {
                        $(theseorgs[i]).hide();
                    }
                }
                else{
                    $(theseorgs[i]).show();
                }
            }
            for (var i = 0 ; i < theseorgs2.length; i++){
                if ($(theseorgs2[i]).hasClass('show-this2')){
                    $(theseorgs2[i]).removeClass('show-this2');
                }
                if ($(theseorgs2[i]).hasClass('hide-this2')){
                    $(theseorgs2[i]).removeClass('hide-this2');
                }
                if (has_filter){
                    if ($(theseorgs2[i]).hasClass('show-this')){
                        $(theseorgs2[i]).show();
                    }
                    else {
                        $(theseorgs2[i]).hide();
                    }
                }
                else{
                    $(theseorgs2[i]).show();
                }
            }
        }
        else{
            if ($('.filtered2').length > 0){
                $('.filtered2').removeClass('filtered2');
            }

            $(this).addClass('filtered2');
            has_efilter = true;
            var theseorgs = $('.orgCard')
            var theseorgs2 = $('.org-list')
            for (var i = 0 ; i < theseorgs.length; i++){
                if($(theseorgs[i]).hasClass('show-this2')){
                    $(theseorgs[i]).removeClass('show-this2')
                }
                if($(theseorgs[i]).hasClass('hide-this2')){
                    $(theseorgs[i]).removeClass('hide-this2')
                }
                if (has_efilter && has_filter){
                    if ($(theseorgs[i]).hasClass('show-this')){
                        if ($(theseorgs[i]).children('p.filter-me-elig:contains("Adults(18+)")').length > 0){
                            $(theseorgs[i]).show();
                            $(theseorgs[i]).addClass('show-this2');
                        }
                        else{
                            $(theseorgs[i]).addClass('hide-this2');
                            $(theseorgs[i]).hide();
                        }
                    }
                    else{
                        if ($(theseorgs[i]).children('p.filter-me-elig:contains("Adults(18+)")').length > 0){
                            $(theseorgs[i]).hide();
                            $(theseorgs[i]).addClass('show-this2');
                        }
                        else{
                            $(theseorgs[i]).addClass('hide-this2');
                            $(theseorgs[i]).hide();
                        }
                    }
                }
                else if (has_efilter){
                    if ($(theseorgs[i]).children('p.filter-me-elig:contains("Adults(18+)")').length > 0){
                        $(theseorgs[i]).show();
                        $(theseorgs[i]).addClass('show-this2');
                    }
                    else{
                        $(theseorgs[i]).addClass('hide-this2');
                        $(theseorgs[i]).hide();
                    }
                }
            }
            for (var i = 0 ; i < theseorgs2.length; i++){
                if($(theseorgs2[i]).hasClass('show-this2')){
                    $(theseorgs2[i]).removeClass('show-this2')
                }
                if($(theseorgs2[i]).hasClass('hide-this2')){
                    $(theseorgs2[i]).removeClass('hide-this2')
                }
                if (has_efilter && has_filter){
                    if ($(theseorgs2[i]).hasClass('show-this')){
                        if ($(theseorgs2[i]).children('p.filter-me-elig2:contains("Adults(18+)")').length > 0){
                            $(theseorgs2[i]).show();
                            $(theseorgs2[i]).addClass('show-this2');
                        }
                        else{
                            $(theseorgs2[i]).addClass('hide-this2');
                            $(theseorgs2[i]).hide();
                        }
                    }
                    else{
                        if ($(theseorgs2[i]).children('p.filter-me-elig2:contains("Adults(18+)")').length > 0){
                            $(theseorgs2[i]).hide();
                            $(theseorgs2[i]).addClass('show-this2');
                        }
                        else{
                            $(theseorgs2[i]).addClass('hide-this2');
                            $(theseorgs2[i]).hide();
                        }
                    }
                }
                else if (has_efilter){
                    if ($(theseorgs2[i]).children('p.filter-me-elig2:contains("Adults(18+)")').length > 0){
                        $(theseorgs2[i]).show();
                        $(theseorgs2[i]).addClass('show-this2');
                    }
                    else{
                        $(theseorgs2[i]).addClass('hide-this2');
                        $(theseorgs2[i]).hide();
                    }
                }
            }
        }
    });

    $('.elig-seniors').click(function(){
        if ($(this).hasClass('filtered2')){
            $(this).removeClass('filtered2');
            has_efilter = false;
            var theseorgs = $('.orgCard')
            var theseorgs2 = $('.org-list')
            for (var i = 0 ; i < theseorgs.length; i++){
                if ($(theseorgs[i]).hasClass('show-this2')){
                    $(theseorgs[i]).removeClass('show-this2');
                }
                if ($(theseorgs[i]).hasClass('hide-this2')){
                    $(theseorgs[i]).removeClass('hide-this2');
                }
                if (has_filter){
                    if ($(theseorgs[i]).hasClass('show-this')){
                        $(theseorgs[i]).show();
                    }
                    else {
                        $(theseorgs[i]).hide();
                    }
                }
                else{
                    $(theseorgs[i]).show();
                }
            }
            for (var i = 0 ; i < theseorgs2.length; i++){
                if ($(theseorgs2[i]).hasClass('show-this2')){
                    $(theseorgs2[i]).removeClass('show-this2');
                }
                if ($(theseorgs2[i]).hasClass('hide-this2')){
                    $(theseorgs2[i]).removeClass('hide-this2');
                }
                if (has_filter){
                    if ($(theseorgs2[i]).hasClass('show-this')){
                        $(theseorgs2[i]).show();
                    }
                    else {
                        $(theseorgs2[i]).hide();
                    }
                }
                else{
                    $(theseorgs2[i]).show();
                }
            }
        }
        else{
            if ($('.filtered2').length > 0){
                $('.filtered2').removeClass('filtered2');
            }

            $(this).addClass('filtered2');
            has_efilter = true;
            var theseorgs = $('.orgCard')
            var theseorgs2 = $('.org-list')
            for (var i = 0 ; i < theseorgs.length; i++){
                if($(theseorgs[i]).hasClass('show-this2')){
                    $(theseorgs[i]).removeClass('show-this2')
                }
                if($(theseorgs[i]).hasClass('hide-this2')){
                    $(theseorgs[i]).removeClass('hide-this2')
                }
                if (has_efilter && has_filter){
                    if ($(theseorgs[i]).hasClass('show-this')){
                        if ($(theseorgs[i]).children('p.filter-me-elig:contains("Seniors(60+)")').length > 0){
                            $(theseorgs[i]).show();
                            $(theseorgs[i]).addClass('show-this2');
                        }
                        else{
                            $(theseorgs[i]).addClass('hide-this2');
                            $(theseorgs[i]).hide();
                        }
                    }
                    else{
                        if ($(theseorgs[i]).children('p.filter-me-elig:contains("Seniors(60+)")').length > 0){
                            $(theseorgs[i]).hide();
                            $(theseorgs[i]).addClass('show-this2');
                        }
                        else{
                            $(theseorgs[i]).addClass('hide-this2');
                            $(theseorgs[i]).hide();
                        }
                    }
                }
                else if (has_efilter){
                    if ($(theseorgs[i]).children('p.filter-me-elig:contains("Seniors(60+)")').length > 0){
                        $(theseorgs[i]).show();
                        $(theseorgs[i]).addClass('show-this2');
                    }
                    else{
                        $(theseorgs[i]).addClass('hide-this2');
                        $(theseorgs[i]).hide();
                    }
                }
            }
            for (var i = 0 ; i < theseorgs2.length; i++){
                if($(theseorgs2[i]).hasClass('show-this2')){
                    $(theseorgs2[i]).removeClass('show-this2')
                }
                if($(theseorgs2[i]).hasClass('hide-this2')){
                    $(theseorgs2[i]).removeClass('hide-this2')
                }
                if (has_efilter && has_filter){
                    if ($(theseorgs2[i]).hasClass('show-this')){
                        if ($(theseorgs2[i]).children('p.filter-me-elig2:contains("Seniors(60+)")').length > 0){
                            $(theseorgs2[i]).show();
                            $(theseorgs2[i]).addClass('show-this2');
                        }
                        else{
                            $(theseorgs2[i]).addClass('hide-this2');
                            $(theseorgs2[i]).hide();
                        }
                    }
                    else{
                        if ($(theseorgs2[i]).children('p.filter-me-elig2:contains("Seniors(60+)")').length > 0){
                            $(theseorgs2[i]).hide();
                            $(theseorgs2[i]).addClass('show-this2');
                        }
                        else{
                            $(theseorgs2[i]).addClass('hide-this2');
                            $(theseorgs2[i]).hide();
                        }
                    }
                }
                else if (has_efilter){
                    if ($(theseorgs2[i]).children('p.filter-me-elig2:contains("Seniors(60+)")').length > 0){
                        $(theseorgs2[i]).show();
                        $(theseorgs2[i]).addClass('show-this2');
                    }
                    else{
                        $(theseorgs2[i]).addClass('hide-this2');
                        $(theseorgs2[i]).hide();
                    }
                }
            }
        }
    });

});