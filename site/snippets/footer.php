<?php
    // Don't send the full HTML if it's requested via AJAX.
    if(!kirby()->request()->is('ajax')) {
?>
                <!-- start of footer.php -->
            </main>
            <canvas></canvas>
            <footer>
                <small class="copyright"><?= $site->copyright()->kirbytext() ?></small>
                |
                <small class="credits">
                    <a href="http://getkirby.com/made-with-kirby-and-love" target="_blank">Made with Kirby and <b>♥</b></a>
                </small>
            </footer>

            <script src='/dist/js/index.js' async  type="text/javascript"></script>
            <noscript><link rel="stylesheet" href="/dist/css/index.css" type="text/css"></link></noscript>
        </body>
    </html>
<?php } ?>
