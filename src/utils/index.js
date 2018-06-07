'use strict';

export let origin = (document.origin ||
        location.protocol+'//'+location.hostname+((location.port)? ':'+location.port : ''));
