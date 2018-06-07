<?php if(!defined('KIRBY')) exit ?>

title: Site
fields:
    introduction_headline:
        label: Start Here
        type: headline
    info:
        label: Your Content Management System
        type: info
        text: >
            This is the control panel for your site - your Content Management System (CMS, built with **(link: http://getkirby.com text: KirbyCMS popup: yes)**).

            You can always find your way back to this CMS at the URL *(link: /panel text: /panel)*.


            ## Creating Content

            From here, you can bring content into your site - pages and projects, text, files (images, videos, etc), and so on.

            When writing text, you can use
            (link: http://getkirby.com/docs/content/text text: KirbyText popup: yes), a simple markup notation
            (based on (link: http://daringfireball.net/projects/markdown/syntax text: Markdown popup: yes))
            to add *decorations*, sections, and functionality.

            (This introduction used the same system.)


            You can also **use a Markdown tool** to help you write KirbyText/Markdown notation; for example:

            - (link: http://hallojs.org/demo/markdown/ text: HalloJS popup: yes) (write formatted text with familiar buttons, copy the Markdown text)

            - (link: http://dillinger.io/ text: Dillinger popup: yes) (write in Markdown using familiar buttons to help you, see a live preview)

            - (link: https://stackedit.io/editor text: StackEdit popup: yes) (write in Markdown using familiar buttons to help you, see a live preview)


            ## Guides and Tools

            Some of the above useful links will appear at the bottom of these pages, in the "Guides and Tools" section (see below).

    settings_headline:
        label: Site Settings
        type: headline
    title:
        label: Title
        type: text
        width: 1/2
    author:
        label: Author
        type: text
        width: 1/2
    copyright:
        label: Copyright
        type: textarea
        width: 1/2
    description:
        label: Description
        type: textarea
        help: This description appears in search results and social network shares - it should be short, to give an impression of this site in the one or two lines search engines typically show.
    keywords:
        label: Keywords
        type: tags
        width: 1/2
        help: These keywords appear in search results. Use none or as few as possible, or this'll have a negative effect on your site's search rankings.
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
pages:
    template:
        - home
        - error
    build:
      - title: Home
        uid: home
        template: home
        num: 1
