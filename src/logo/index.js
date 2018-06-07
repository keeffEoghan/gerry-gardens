'use strict';

import throttle from 'lodash.throttle';

export default function(element) {
    let checkScroll = () => {
            let toggle = ((document.body.scrollTop === 0)? 'remove' : 'add');

            element.classList[toggle]('small');
        };

    self.addEventListener('scroll', throttle(checkScroll, 100, {
            leading: true
        }));

    checkScroll();
};
