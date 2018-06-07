<?php
    // Don't send the full HTML if it's requested via AJAX.
    if(!kirby()->request()->is('ajax')) {
?>
    <!DOCTYPE html>
    <html lang="en" class="no-js base-styled">
        <head>
            <?php
                $page_title = $site->title()->html().r($page->title()->html(), ' - '.$page->title()->html(), '');
                $page_description = $site->description()->html();
                $assets_url = url('/dist/img/meta');
            ?>


            <title><?= $page_title ?></title>

            <meta charset="utf-8"/>
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
            <meta name="mobile-web-app-capable" content="yes">
            <meta name="apple-mobile-web-app-capable" content="yes">
            <meta name="apple-mobile-web-app-status-bar-style" content="black">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, minimal-ui">

            <!-- Crawling and sharing -->
                <meta name="description" content="<?= $page_description ?>">
                <meta name="keywords" content="<?= $site->keywords()->html() ?>">

                <meta property="og:site_name" content="<?= $site->title()->html() ?>">
                <meta property="og:title" content="<?= $page_title ?>">
                <meta property="og:url" content="<?= $page->url() ?>">
                <meta property="og:image" content="<?= $assets_url ?>site-image.png">
                <meta property="og:description" content="<?= $page_description ?>">
                <meta property="og:type" content="website">

                <meta name="twitter:card" content="summary">
                <meta name="twitter:site" content=""><!-- @todo -->
                <meta name="twitter:title" content="<?= $page_title ?>">
                <meta name="twitter:image" content="<?= $assets_url ?>site-image.png">
                <meta name="twitter:description" content="<?= $page_description ?>">

                <meta property="fb:app_id" content=""><!-- @todo -->

                <meta name="application-name" content="<?= $page_title ?>"/>
            <!-- / -->

            <!-- Site icons -->
                <link rel="shortcut icon" type="image/png" sizes="196x196" href="/dist/img/meta/favicon-196x196.png"/>
                <link rel="shortcut icon" type="image/png" sizes="96x96" href="/dist/img/meta/favicon-96x96.png"/>
                <link rel="shortcut icon" type="image/png" sizes="32x32" href="/dist/img/meta/favicon-32x32.png"/>
                <link rel="shortcut icon" type="image/png" sizes="16x16" href="/dist/img/meta/favicon-16x16.png"/>
                <link rel="shortcut icon" type="image/png" sizes="128x128" href="/dist/img/meta/favicon-128.png"/>

                <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/dist/img/meta/apple-touch-icon-57x57.png"/>
                <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/dist/img/meta/apple-touch-icon-114x114.png"/>
                <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/dist/img/meta/apple-touch-icon-72x72.png"/>
                <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/dist/img/meta/apple-touch-icon-144x144.png"/>
                <link rel="apple-touch-icon-precomposed" sizes="60x60" href="/dist/img/meta/apple-touch-icon-60x60.png"/>
                <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/dist/img/meta/apple-touch-icon-120x120.png"/>
                <link rel="apple-touch-icon-precomposed" sizes="76x76" href="/dist/img/meta/apple-touch-icon-76x76.png"/>
                <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/dist/img/meta/apple-touch-icon-152x152.png"/>

                <meta name="msapplication-TileColor" content="#000000"/>
                <meta name="msapplication-TileImage" content="/dist/img/meta/mstile-144x144.png"/>
                <meta name="msapplication-square70x70logo" content="/dist/img/meta/mstile-70x70.png"/>
                <meta name="msapplication-square150x150logo" content="/dist/img/meta/mstile-150x150.png"/>
                <meta name="msapplication-wide310x150logo" content="/dist/img/meta/mstile-310x150.png"/>
                <meta name="msapplication-square310x310logo" content="/dist/img/meta/mstile-310x310.png"/>
            <!-- / -->

            <style id="critical-styles"><?= f::read(join(DS, [getcwd(), 'dist', 'css', 'base.css'])) ?></style>
            <script type="text/javascript"><?= f::read(join(DS, [getcwd(), 'dist', 'js', 'base.js'])) ?></script>
        </head>
        <body>
            <header><h1><a href="/" title="Go to the main page"><?= $site->title()->html() ?></a></h1></header>
            <main>
                <!-- end of header.php -->
<?php } ?>
