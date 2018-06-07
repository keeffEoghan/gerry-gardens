<?php snippet('header') ?>
    <article id="home">
        <section>
            <?= $page->about()->kirbytext() ?>
        </section>

        <section>
            <?= $page->contact()->kirbytext() ?>
            <address>
                <p>
                    <a class="contact" title="email" href="mailto:<?= $page->email()->escape() ?>"><?= $page->email()->html() ?></a>
                    /
                    <a class="contact" title="telephone" href="tel:<?= preg_replace('/\s/i', '', $page->phone()->escape()) ?>"><?= $page->phone()->html() ?></a>
                </p>

                <?php // @todo Move this to a second <address> after the projects? Delays focus on the projects. ?>
                <p class="location">
                    <?php
                        $coords = $page->coordinates();
                        $center = $page->center();
                        $zoom = 12;
                        $link = 'href="https://www.google.com/maps/place/'.$coords.'/@'.$center.','.$zoom.'z"';
                    ?>
                    <a <?= $link ?> target="_blank" class="address-text"><?= $page->address()->text() ?></a>
                    <a class="open-map" <?= $link ?> target="_blank">
                        <img class="map-static" src="http://maps.googleapis.com/maps/api/staticmap?<?=
                                'center='.$center.'&'.
                                'zoom='.$zoom.'&'.
                                'format=png&'.
                                'sensor=false&'.
                                'size=420x200&'.
                                'markers=color:0x0a85c2|52.689860,-6.216051&'.
                                'maptype=roadmap&'.
                                'style=feature:poi|element:labels|visibility:off&'.
                                'style=feature:road|element:labels|visibility:off&'.
                                'style=feature:transit|visibility:off&'.
                                'style=feature:water|color:0x777777&'.
                                'style=feature:road|saturation:-100|lightness:-20&'.
                                'style=feature:landscape.natural|color:0xffffff&'.
                                'style=feature:landscape.man_made|saturation:-100|lightness:-20&'.
                                'style=feature:poi|saturation:-100|lightness:50&'.
                                'style=feature:road.highway|weight:0.5|color:0x0a85c2&'.
                                'style=feature:road.arterial|weight:0.3&'.
                                'style=feature:road.local|weight:0.2&'.
                                'style=feature:administrative.locality|element:labels.text.fill|color:0x333333&'.
                                'style=feature:administrative.neighborhood|element:labels|visibility:off&'.
                                'style=feature:administrative.land_parcel|element:labels|visibility:off&'.
                                'style=feature:poi|element:labels|visibility:off&'.
                                'style=feature:road|element:labels|visibility:off&'.
                                'style=feature:transit|element:labels|visibility:off&'.
                                'style=feature:administrative|element:geometry|visibility:off'
                            ?>" />
                    </a>
                </p>
            </address>
        </section>

        <?php foreach($page->children()->visible()->flip() as $project) {
            snippet('project-link',
                ['project' => $project, 'parent_selector' => '#home',
                    'added_class' => '']);
        } ?>
    </article>
<?php snippet('footer') ?>
