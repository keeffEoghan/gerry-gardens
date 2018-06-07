'use strict';

import View from '../app/view';

export default class extends View {
    constructor(...rest) {
        super(...rest);

        this.wait.show = this.wait.hide = 300;
    }
};
