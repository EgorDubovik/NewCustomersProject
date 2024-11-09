
    $.ratePicker("#company_rating", {
        rate : function (stars){
            $('input[name=company_rating]').val(stars+1);
        }
    });

    // $.ratePicker("#company_view_rating", {
    //
    // });
