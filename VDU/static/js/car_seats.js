$(function() {
    var submit_form = function(e) {
        $.getJSON($SCRIPT_ROOT + '/_car_seats_img', {
            n: $('#car-seats').val()
        }, function(data) {
            $('#result').html('');
            $('<img src="'+ data.result +'">').load(function() {
                $(this).appendTo('#result');
            });
        });
        return false;
    };

    $('#car-seats').bind('change', submit_form);
    $('#car-seats').trigger("change");
});