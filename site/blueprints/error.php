<?php if(!defined('KIRBY')) exit ?>

title: Error
pages: false
files: false
fields:
    title:
        label: Title
        type:  text
    text:
        label: Text
        type:  textarea
        size:  large
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
