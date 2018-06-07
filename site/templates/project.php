<?php
    snippet('header');
    $id = 'project-'.$page->uid();
?>
    <article class="project" id="<?= $id ?>">
        <h2 class="project-title current">
            <span class="project-title-text"><?= $page->title()->html() ?></span>
        </h2>

        <dl>
            <?php if($page->date()) { ?>
                <dt>Date</dt>
                <dd><time datetime="<?= $page->date('c') ?>"><?= $page->date('d M Y') ?></time></dd>
            <?php } ?>

            <?php if($page->categories()->isNotEmpty()) { ?>
                <dt>Categories</dt>
                <?php foreach($page->categories()->split() as $category) { ?>
                    <dd><?= $category ?></dd>
                <?php } ?>
            <?php } ?>
        </dl>

        <?php foreach($page->sections()->toStructure() as $section) { ?>
            <section>
                <?php if($section->heading()->isNotEmpty()) { ?>
                    <h3 class="section-heading"><?= $section->heading()->html() ?></h3>
                <?php } ?>

                <?php if($section->figure()->isNotEmpty() && $figure = $section->figure()->toFile()) { ?>
                    <figure>
                        <?php switch($figure->type()) {
                            /**
                             * @todo Render low-res thumbnail images as
                             *       placeholders (data-URIs?), then blur in CSS
                             *       (filters, or just stretching) until full
                             *       version has loaded.
                             */

                            case 'image': ?>
                                <img src="<?= $figure->url() ?>" alt="<?= $figure->name() ?>"
                                    title="&quot;<?= $figure->name() ?>&quot;"/>
                                <?php break;
                            case 'video': ?>
                                <video src="<?= $figure->url() ?>" title="Watch &quot;<?= $figure->name() ?>&quot;" controls>
                                    Your browser can't play this video
                                </video>
                                <?php break;
                            case 'audio': ?>
                                <audio src="<?= $figure->url() ?>" title="Listen to &quot;<?= $figure->name() ?>&quot;" controls>
                                    Your browser can't play this audio
                                </audio>
                                <?php break;
                            case 'code': ?>
                                // Open link and preview
                                <h4>
                                    <a href="<?= $figure->url() ?>" target="_blank"
                                        title="Open &quot;<?= $figure->name() ?>&quot;">
                                        <code><?= $figure->filename() ?></code>
                                    </a>
                                </h4>
                                <pre><code><?=
                                        htmlspecialchars(excerpt($figure->read(), 1000), ENT_QUOTES | ENT_HTML5);
                                    ?></code></pre>
                                <?php break;
                            case 'document':
                            case 'archive':
                            ​default: ?>
                                // Download link
                                <h4>
                                    <a href="<?= $figure->url() ?>" target="_blank"
                                        title="Open &quot;<?= $figure->name() ?>&quot;">
                                        <code><?= $figure->filename() ?></code>
                                    </a>
                                </h4>
                                <?php break;
                        } ?>
                        <?php if($figure->caption()->isNotEmpty()) { ?>
                            <figcaption><?= $figure->caption()->html() ?></figcaption>
                        <?php } ?>
                    </figure>
                <?php } ?>

                <?php if($section->text()->isNotEmpty()) { ?>
                    <div class="text"><?= $section->text()->kirbytext() ?></div>
                <?php } ?>
            </section>
        <?php } ?>

        <?php
            // The order is flipped so we get the most recent first.
            $prev = $page->nextVisible();
            $next = $page->prevVisible();

            if($prev || $next) { ?>
                <nav>
                    <?php
                    if($prev) {
                        snippet('project-link', ['project' => $prev,
                            'added_class' => 'prev',
                            'parent_selector' => '#'.$id]);
                    }
                    if($next) {
                        snippet('project-link', ['project' => $next,
                            'added_class' => 'next',
                            'parent_selector' => '#'.$id]);
                    }
                    ?>
                </nav>
        <?php } ?>

        <?php if($page->accent_hue()->isNotEmpty()) {
            // Set up the accent colors for this project.

            $accent_color = snippet('project-hsl', ['hue' => $page->accent_hue()->int()], true);

            ?>
            <style>
                #<?= $id ?>.hide {
                    background-color: hsl(<?= $accent_color ?>);
                }

                #<?= $id ?> .project-title-text {
                    background-color: hsl(<?= $accent_color ?>);
                }

                #<?= $id ?> dl {
                    color: hsl(<?= $accent_color ?>);
                }

                #<?= $id ?> .section-heading {
                    color: hsl(<?= $accent_color ?>);
                    border-bottom-color: hsl(<?= $accent_color ?>);
                }

                #<?= $id ?> a:not(.project-link) {
                    color: hsl(<?= $accent_color ?>);
                    border-color: hsla(<?= $accent_color ?>, 0.3);
                }

                #<?= $id ?> a:hover,
                #<?= $id ?> a:focus {
                    border-color: hsl(<?= $accent_color ?>);
                }

                #<?= $id ?> a:active {
                    border-color: hsla(<?= $accent_color ?>, 0.7);
                }

                #<?= $id ?> h1,
                #<?= $id ?> h2,
                #<?= $id ?> h3,
                #<?= $id ?> h4,
                #<?= $id ?> h5,
                #<?= $id ?> h6 {
                    color: hsl(<?= $accent_color ?>);
                }
            </style>
            <?php
        } ?>
    </article>
<?php snippet('footer') ?>
