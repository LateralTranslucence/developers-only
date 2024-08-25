<?php
/*
 * An array of Years
 */

$max = date( 'Y' );
$min = $max - 100;

$years = [];

for ( $i = $min; $i <= $max; $i++ ) {
    $years[] = $i;
}

rsort( $years );