'use strict';

import View from '../app/view';

// @todo Set up the fullscreen toggle for images etc. Fullscreen or CSS? https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API

export default class extends View {
    constructor(...rest) {
        super(...rest);

        Object.assign(this.done, {
            show: (el, e) =>
                e.target === el && e.propertyName === 'background-color',
            hide: (el, e) =>
                e.target === el && e.propertyName === 'opacity'
        });

        this.wait.show = 1100;
        this.wait.hide = 650;
    }
};
