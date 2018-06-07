<?php if(!defined('KIRBY')) exit ?>

title: Project
fields:
    title:
        label: Title
        type: text
    categories:
        label: Categories
        type: tags
        lower: true
        help: >
            These category tags will help to organise your work, and make it easier for people to explore.
            You can add new categories, as well as re-use existing ones for similar work.
        width: 1/2
    date:
        label: Date
        type: date
        format: DD/MM/YYYY
        default: today
        help: When was this project?
        width: 1/2
    theme_headline:
        label: Theme
        type: headline
    preview_image:
        label: Preview Image
        type: select
        options: images
        width: 1/2
        help: The image to use as a preview thumbnail.
    accent_hue:
        label: Accent Colour Hue
        type: number
        min: 1
        max: 360
        width: 1/2
        help: >
            A CSS colour hue (1 - 360), which complements/contrasts the preview image well - used to accent the preview and the project article.<br/>
            You can copy a value from <a href="../utils/hue-picker.html" target="_blank">this tool</a>.
    sections_headline:
        label: Article
        type: headline
    sections_info:
        type: info
        text: >
            Here's where you put together the main content of this project.

            Below, you can build and order sections to structure the article.


            In each section, you can:

            - add a section heading

            - pick a project file to feature

            - write about the project (with <a href="http://getkirby.com/docs/content/text" target="_blank">all of the usual formatting features</a>)


            Drag sections around to change their order.
    sections:
        label: Sections
        type: structure
        entry: >
            <strong>{{ heading }}</strong>&nbsp;&nbsp;&mdash;&nbsp;&nbsp;<em>{{ figure }}</em>
            <div>{{ text }}</div>
        fields:
            heading:
                label: Heading
                type: text
                help: (optional)
            figure:
                label: Figure
                type: select
                options: files
                help: (optional) - choose an image, video, etc. from the project files
            text:
                label: Text
                type: textarea
                help: (optional) - <a href="http://getkirby.com/docs/content/text" target="_blank">all of the usual formatting features</a> are available
    guide_line:
        type: line
    guide:
        label: Guides and Tools
        type: info
        text: >
            - (link: /panel/#/metatags text: Instructions in "Site Settings")

            - Markdown editors for writing (link: http://getkirby.com/docs/content/text text: KirbyText popup: yes):
            (link: http://hallojs.org/demo/markdown/ text: HalloJS popup: yes) /
            (link: http://dillinger.io/ text: Dillinger popup: yes) /
            (link: https://stackedit.io/editor text: StackEdit popup: yes)

            - Basic image editing: (link: https://pixlr.com/editor/ text: Pixlr popup: yes) / (link: http://www.photoshop.com/tools?wf=editor text: Photoshop Online popup: yes)

            - Compressing image files:
            (link: https://compressor.io/ text: Compressor popup: yes)

            - (link: http://getkirby.com/docs/ text: Learn more popup: yes)
files:
    sortable: true
    fields:
        caption:
            label: Caption
            type: text
    size: 20000000
pages: project
