jQuery(function ($) {
    $(document).ready(function(e) {
        $('.do-date-time-picker').each(function(i) {
            $('#'+$(this).attr('id')).datetimepicker({
                //controlType: 'select',
                //oneLine: true,
    	        dateFormat: 'yy-mm-dd',
                timeFormat: 'h:mm TT'
            });
        });
        $('.do-date-picker').each(function(i) {
            $('#'+$(this).attr('id')).datepicker({
    	        dateFormat: 'yy-mm-dd',
            });
        });

    });
});