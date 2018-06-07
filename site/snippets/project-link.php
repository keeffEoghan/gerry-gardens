<?php // $project, $added_class, $parent_selector ?>

<h2 class="project-title <?= $added_class ?>"
    <?php if($preview_image = $project->preview_image()->toFile()) { ?>
        style="background-size: cover, auto;
            background-repeat: no-repeat, repeat;
            background-image: url('<?= thumb($preview_image,
                    ['width' => 500, 'height' => '100', 'crop' => true])->url()
                ?>'),
                url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAGklEQVQIW2M0MjLyYYCABkYopwHGOQNigKQAYr0FKif2cdoAAAAASUVORK5CYII=');"
    <?php } ?>>
    <?php
        // To provide custom accents on :hover/:focus for each
        // project link, need to add a <style> element (can't be
        // done with style attribute).
        $class = 'project-link-'.$project->uid();

        if($project->accent_hue()->isNotEmpty()) {
            $accent_hsl = snippet('project-hsl',
                    ['hue' => $project->accent_hue()->int()], true);
            ?>
            <style>
                <?= $parent_selector ?> .<?= $class ?> {
                    background-color: hsla(<?= $accent_hsl ?>, 0.25);
                    text-shadow: 0 0 0.5em hsl(<?= $accent_hsl ?>);
                }

                <?= $parent_selector ?> .<?= $class ?>:hover,
                <?= $parent_selector ?> .<?= $class ?>:focus,
                <?= $parent_selector ?> .<?= $class ?>:active {
                    background-color: hsl(<?= $accent_hsl ?>);
                }
            </style>
        <?php }
    ?>
    <a class="project-link <?= $class ?>" href="<?= $project->url() ?>"
        title="See <?= $project->title()->html() ?>">
        <?= $project->title()->html() ?>
    </a>
</h2>
