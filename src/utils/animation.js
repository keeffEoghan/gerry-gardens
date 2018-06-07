'use strict';

export const transitionEnd = ({
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'transition': 'transitionend'
    })[Modernizr.prefixed('transition')];

export const transitionDelay = Modernizr.prefixed('transitionDelay');

/**
 * Transition an element, with a timeout limit.
 * Fairly specific but common use-case for responding to an element's completed
 * transition:
 *     - If transition end events are supported, resolves the promise
 *       after the element's transition ends; if the callback doesn't
 *       return `false`, it also removes the event listener.
 *     - If they're not supported, resolves immediately.
 *
 * @param {Element} element The element to watch.
 * @param {?Number} wait How long to wait for the transition to end before
 *                       timing out; -1 by default, which means no timeout.
 * @param {?Function} done Callback to check whether the transition is done; by
 *                         default, checks if the transition event originated
 *                         from the element itself.
 * @return {Promise} The promise resolved when the transition is done, and
 *                   rejected if it times out.
 */
export const timeTransition = ((transitionEnd)?
        (element, wait = -1, done = (element, e) => e.target === element) => {
            let onEnd;
            let t;
            let off = () => {
                    clearTimeout(t);
                    element.removeEventListener(transitionEnd, onEnd);
                };

            return new Promise((resolve, reject) => {
                    t = setTimeout(() => {
                                off();
                                reject('Timed out');
                            },
                            wait);

                    onEnd = (e) => {
                            if(done(element, e) !== false) {
                                off();
                                resolve(element);
                            }
                        };

                    element.addEventListener(transitionEnd, onEnd);
                })
                .catch((...rest) => {
                    off();

                    return Promise.reject(...rest);
                });
        }
    :   (element) => Promise.resolve(element));
