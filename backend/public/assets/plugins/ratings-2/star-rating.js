
$(function() {
    $(".my-rating-7").starRating({
        starSize: 20,
        initialRating: 0,
        strokeWidth: 0,
        readOnly: true,
        starShape: 'rounded'
    });
    $(".my-rating-8").starRating({
        starSize: 20,
        initialRating: 0,
        strokeWidth: 0,
        readOnly: true,
        starShape: 'rounded'
    });

    // $(".my-rating-driver").starRating({
    //     starSize: 30,
    //     initialRating: 5,
    //     useFullStars: true,
    //     strokeWidth: 0,
    //     starShape: 'rounded',
    //     disableAfterRate: false,
    //     callback: function(currentRating, $el){
    //         $('.rating-number').val(currentRating);
    //     }
    // });
});
