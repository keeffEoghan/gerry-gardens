<?php if(!defined('KIRBY')) exit ?>

title: Home
fields:
    title:
        label: Title
        type: text
    about_headline:
        label: About
        type: headline
    about:
        label: Text
        type: textarea
        size: large
        help: A concise introduction to you and your work.
    contact_headline:
        label: Contact
        type: headline
    contact:
        label: Text
        type: textarea
        size: large
        help: Invite people to get in touch.
    email:
        label: Email
        type: email
        width: 1/2
    phone:
        label: Phone
        type: tel
        width: 1/2
    address:
        label: Address
        type: text
        width: 1/2
    coordinates:
        label: Map Marker Coordinates
        type: text
        width: 1/4
        help: Map marker latitude/longitude (try Google Maps).
    center:
        label: Map Center Coordinates
        type: text
        width: 1/4
        help: Map center latitude/longitude (try Google Maps).
    projects_headline:
        label: Projects
        type: headline
    info:
        type: info
        text: >
            Your projects are the heart of this site, what people come here to find.

            They'll be shown up-front, right below your intro.


            To add a project, take a look at the **pages** section in the panel on the left.

            Here, you'll be able to write about the project;
            add images, videos, and other media to richly describe it;
            and go into as much depth as you like with further sections.


            A project can be a garden, or anything you've worked on or simply find interesting.

            You can give them categories (for example, *garden*) - you can find this option in each project page.
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
    size: 8000000
pages:
    template: project
    sort: flip
    build:
      - title: Example Garden Project
        uid: example-garden-project
        template: project
        num: 1
        text: >
            In this section, describe the work that went into creating a garden.


            # Writing

            You can go into as much depth as you like, or keep it at a light and focussed impression.


            You can break the text into subsections with headings (as this paragraph does).


            # Media

            You can add images, video, and other media files to your project page using the **files** panel on the left.

            Each of these may contain more text beneath it - which can be a full subsection, a simple caption, or left blank.


            # Sections

            If you want to break your project up into further full sections, you can create these as pages using the **pages** panel on the left.

            These will be displayed within your project page, below the content you create here.
        categories: example,garden
