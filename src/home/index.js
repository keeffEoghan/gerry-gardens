'use strict';

import { transform } from '../utils/dom';
import { transitionDelay } from '../utils/animation';
import smoothNoise from '../utils/noise';
import View from '../app/view';


export default class extends View {
    constructor(...rest) {
        super(...rest);

        this.offsetBoxes();
    }

    /**
     * Apply a combination of offsets, so that the elements are offset, but
     * don't overflow their containers.
     * To keep it smooth and continuous, we'll use a smooth noise function.
     */
    offsetBoxes() {
        // Tweak to an interesting/suitable range of the `smoothNoise` graph
        // (you'll have to take a look at the graph to see where this is).
        // It's scaled up so some integers line up on the smooth in-between
        // parts of the graph; and translated to a part of the graph that will
        // look good.
        const scale = 1.3333333;
        const translate = -8;

        Array.from(this.element.querySelectorAll('section, .project-title'))
            .forEach((box, i) => {
                let x = (i-translate)/scale;
                let offset = smoothNoise(x)*100;

                Object.assign(box.style, {
                    left: offset+'%',
                    [transform]: 'translateX('+Math.round(-offset)+'%)',
                    [transitionDelay]: (500*Math.random())+'ms, 0ms, 0ms'
                });
            });
    }
};
