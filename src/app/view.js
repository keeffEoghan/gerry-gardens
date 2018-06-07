/**
 * The view base class - used for managing view DOM elements, animations,
 * etc.
 */

'use strict';

import { timeTransition } from '../utils/animation';

export default class {
    constructor(elements) {
        /** @todo Assume the first element for our purposes so far. */
        this.element = (('length' in elements)? elements[0] : elements);
        this.element['data-view'] = this;

        /**
         * Map of pending promises and their resolve/reject callbacks,
         * for tracking and interruption.
         * Each key has either null or an object entry containing:
         *     - {Promise} promise The promise in progress.
         *     - {Function} resolve The promise's resolve callback.
         *     - {Function} reject The promise's reject callback.
         *
         * @type {Object.<?Object.<Promise, Function, Function>>}
         */
        this.pending = {
                show: null,
                hide: null
            };

        /**
         * Map of `done` callbacks for related animations - if given with the
         * same key as the animation, is provided to `timeTransition`, to
         * determine whether an transition end event should complete the
         * animation for an element.
         *
         * @type {Object.<?String, Function>}
         */
        this.done = {
                show: undefined,
                hide: undefined
            };

        /**
         * Map of timeout delays for related animations - if given with the
         * same key as the animation, is provided to `timeTransition`, to
         * set the time before an animation times out. Measured in `ms`.
         *
         * @type {Object.<?String, Number>}
         */
        this.wait = {
                show: 1000,
                hide: 1000
            };
    }

    /**
     * Hiding the view element(s).
     * This implements some basic behaviour controlled mainly by a "hide" class.
     *
     * @return {Promise} A promise resolved when the element(s) have hidden.
     */
    show() {
        let el = this.element;

        return this.endAction('hide', 'reject', 'Interrupted by "show".')
            .then(() => this.useAction('show', (resolve, reject) => {
                if(!el.classList.contains('hide')) {
                    resolve(el);
                }
                else {
                    timeTransition(el, this.wait.show, this.done.show)
                        .then(resolve)
                        .catch((...rest) => {
                            console.warn(...rest);
                            resolve(...rest);
                        });

                    el.style.display = '';
                    setTimeout(() => el.classList.remove('hide'), 0);
                }
            }));
    }

    /**
     * Similar to `show`, but (nearly) instant (need a 0ms delay).
     *
     * @return {Promise} A promise resolved when the element's hidden.
     */
    showNow() {
        let el = this.element;

        return Promise.all([
                this.endAction('hide', 'reject', 'Interrupted by "showNow".'),
                this.endAction('show', 'resolve', 'Interrupted by "showNow".')
            ])
            .then(() => new Promise((resolve, reject) => {
                el.classList.add('now');
                el.classList.remove('hide');
                el.style.display = '';

                setTimeout(() => {
                        el.classList.remove('now');
                        resolve();
                    },
                    0);
            }));
    }

    /**
     * Showing the view element(s).
     * This implements some basic behaviour controlled mainly by a "hide" class.
     *
     * @return {Promise} A promise resolved when the element(s) have shown.
     */
    hide() {
        let el = this.element;

        return this.endAction('show', 'reject', 'Interrupted by "hide".')
            .then(() => this.useAction('hide', (resolve, reject) => {
                if(el.classList.contains('hide')) {
                    resolve(el);
                }
                else {
                    let hide = () => el.style.display = 'none';

                    timeTransition(el, this.wait.hide, this.done.hide)
                        .then((...rest) => {
                            hide();
                            resolve(...rest);
                        })
                        .catch((...rest) => {
                            console.warn(...rest);
                            hide();
                            resolve(...rest);
                        });

                    setTimeout(() => el.classList.add('hide'), 0);
                }
            }));
    }

    hideNow() {
        let el = this.element;

        return Promise.all([
                this.endAction('show', 'reject', 'Interrupted by "hideNow".'),
                this.endAction('hide', 'resolve', 'Interrupted by "hideNow".')
            ])
            .then(() => {
                el.classList.add('hide');
                el.style.display = 'none';

                return el;
            });
    }


    /**
     * A convenience to reuse a currently pending action by name if
     * present; or set it up with a given function to manage it
     * if not.
     *
     * Sets up the action for tracking (store the promise and
     * callbacks), and management (call the function) - as needed.
     *
     * @param {String} name The name of the pending action.
     * @param {Function} action The function to perform the new
     *                          action, if none exists already.
     * @return {Promise} The promise of the pending action
     *                   (existing or new).
     */
    useAction(name, action) {
        let pending = this.pending[name];

        if(pending) {
            return pending.promise;
        }
        else {
            pending = this.pending[name] = {};

            let clearWith = (done, ...rest) => {
                    if(this.pending[name]) {
                        this.pending[name] = null;
                    }

                    done(...rest);
                };

            return pending.promise = new Promise((resolve, reject) => {
                    // Clean up after ourselves when the promise is done.
                    pending.resolve = (...rest) => clearWith(resolve, ...rest);
                    pending.reject = (...rest) => clearWith(reject, ...rest);

                    return action(pending.resolve, pending.reject);
                });
        }
    }

    /**
     * A convenience to end a currently running promise by name.
     *
     * @param {String} name The name of the pending action.
     * @param {String} endWith The name of the callback to end the promise.
     * @param {*?} ...rest Any arguments to pass to the callback.
     * @return {Promise} The ended promise, or a resolved promise.
     */
    endAction(name, endWith, ...rest) {
        let pending = this.pending[name];

        if(pending) {
            let ended = pending.promise
                    .catch((...rest) => console.warn('Ended action', ...rest));

            pending[endWith](...rest);

            return ended;
        }
        else {
            return Promise.resolve(...rest);
        }
    }
};
