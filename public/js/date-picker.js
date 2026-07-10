jQuery(function ($) {
    $(document).ready(function(e) {
        $('.devo-date-time-picker').each(function(i) {
            $('#'+$(this).attr('id')).datetimepicker({
                //controlType: 'select',
                //oneLine: true,
    	        dateFormat: 'yy-mm-dd',
                timeFormat: 'h:mm TT'
            });
        });
        $('.devo-date-picker').each(function(i) {
            $('#'+$(this).attr('id')).datepicker({
    	        dateFormat: 'yy-mm-dd',
            });
        });

    });
});