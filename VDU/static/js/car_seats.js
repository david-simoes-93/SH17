$(function() {
    var submit_form = function(e) {
        $.getJSON($SCRIPT_ROOT + '/_car_seats_img', {
            n: $('#car-seats').val()
        }, function(data) {
            $('#car-occupation-img').html('');
            $('<img src="'+ data.result +'" width="600px" height="345px">').load(function() {
                $(this).appendTo('#car-occupation-img');
            });
        });
        return false;
    };

    $('#car-seats').bind('change', submit_form);
    $('#car-seats').trigger("change");
});