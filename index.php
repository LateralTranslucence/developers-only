<?php get_header(); ?>
    <body>
        <?php if ( DO_ENVIRONMENT == 'prod' ) : ?>
            <!-- Google Tag Manager (noscript) -->
            <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PJ878CTW" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
            <!-- End Google Tag Manager (noscript) -->
        <?php endif; ?>
        <div id="root"></div>
    </body>
<?php get_footer() ?>