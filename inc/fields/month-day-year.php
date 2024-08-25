<?php
/*
 * An array of Month, Day Year
 */

$months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

$days = [];
for ( $d = 1; $d <= 31; $d++ ) {
    $days[] = $d;
}

$years = [];
for ( $y = date( 'Y' ) - 100; $y <= date( 'Y' ); $y++ ) {
    $years[] = $y;
}
rsort( $years );
