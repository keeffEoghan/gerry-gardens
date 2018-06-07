'use strict';

import Router from 'ampersand-router';
import throttle from 'lodash.throttle';
import imagesLoaded from 'imagesloaded';

import { origin } from '../utils';
import fetch from '../utils/fetch';
import { fragment, onDOMEvent, perspectiveOrigin } from '../utils/dom';

// View classes, for managing the view elements.
import Home from '../home';
import Project from '../project';
import ServerMessage from '../server-message';
import setupLogo from '../logo';
import tendrils from '../tendrils';


export default Router.extend({
    initialize(options) {
        // @todo Deal with AJAX pagination, if/when it's added - matching something like `/^(?:page:([0-9]+))$/gi`

        this.route(/^(?:\/)?(.+?)(?:\/)?$/i,
            'showProject', ::this.showProject);

        this.route(/^(?:\/)?$/i,
            'showHome', ::this.showHome);


        onDOMEvent(document.body, 'click', 'a', ::this.handleLink);

        this.container = document.querySelector('main');
        this.footer = document.querySelector('footer');

        this.activeView = null;

        setupLogo(document.querySelector('header'));


        // Keep the perspective origin in the center of the screen.

        let viewportChanged = () => {
                let hw = self.innerWidth*0.5;
                let hh = self.innerHeight*0.5;

                let sl = document.body.scrollLeft;
                let st = document.body.scrollTop;

                this.container.style[perspectiveOrigin] =
                    (sl+hw)+'px '+(st+hh)+'px';


                this.pinFooter();
            };

        let throttledPerspective = throttle(viewportChanged, 100,
                { leading: true });

        self.addEventListener('resize', throttledPerspective);
        self.addEventListener('scroll', throttledPerspective);

        viewportChanged();


        this.loadImages(document.body);

        // tendrils(document.querySelector('canvas'));
    },


    // Route callbacks.

    showHome() {
        return Promise.all([
                    this.callActiveView('hide'),
                    this.setupView('/', document.getElementById('home'), Home)
                ])
                .then(([hid, view]) => this.showView(hid, view))
                .catch((...rest) => console.warn(...rest));
    },

    showProject(route) {
        let hiding = this.callActiveView('hide');

        if(!route) {
            throw 'App error: tried to route to invalid project ID: '+route;
        }

        let id = this.cleanRoute(route);

        return Promise.all([
                    hiding,
                    this.setupView('/'+id,
                        document.getElementById('project-'+id), Project)

                ])
                .then(([hid, view]) => this.showView(hid, view))
                .catch((...rest) => console.warn(...rest));
    },

    showMessage(message) {
        let text = (''+message).trim();

        let existing = Array.from(this.container
                    .querySelectorAll('.server-message'))
                .find((element) => {
                    let same = element.innerText.trim() === message

                    if(!same) {
                        element.classList.add('hide');
                    }

                    return same;
                });

        return Promise.all([this.callActiveView('hide')])
            .then(([hid]) => {
                if(hid) {
                    document.body.scrollTop = 0;
                }

                if(existing) {
                    this.activeView = (existing['data-view'] ||
                        new ServerMessage(existing));

                    return this.activeView.show();
                }
                else {
                    let parsed = fragment('<article class="server-message">'+
                                text+
                            '</article>');

                    let view = new ServerMessage(parsed.childNodes);

                    return view.hideNow()
                        .then(() => {
                            this.container.appendChild(parsed);
                            this.activeView = view;
                            view.show();
                        });
                }
            });
    },


    showView(hid, view) {
        this.loadImages(view.element);
        this.activeView = view;

        if(hid) {
            document.body.scrollTop = 0;
        }

        return view.show()
                .then(() => this.pinFooter());
    },


    /**
     * Hijack internal `a` clicks, to stay within the app and trigger this
     * router.
     * @todo Use `target="_self"` as an opt-in attribute?
     */
    handleLink(e, el) {
        // Get the bit after the History root, to see if this is an internal
        // link.
        let route = el.href.split(origin)[1];

        // If this site can handle the app, and it's not explicitly meant
        // for another target.
        // Also, don't mess with user overrides (keyboard commands).
        if(route && el.target.match(/^(_self)?$/gi) &&
            !e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
            // Always kill the default linking.
            e.preventDefault();

            this.navigate(route);
        }
    },


    // Conveniences

    /**
     * Convenience - call the given method of the active view, if any.
     *
     * @param {String} method The method name.
     * @param {*?} ...rest Any arguments to pass to the view's method.
     * @return {*?} The result of calling the method.
     */
    callActiveView(method, ...rest) {
        return (this.activeView && this.activeView[method](...rest));
    },

    /**
     * Set the active view from a given element.
     *
     * @param {Element} element The DOM element whose view will be set
     *                          as the active view.
     * @return {View} The new active view.
     */
    activateElement(element) {
        return this.activeView = element.getAttribute('data-view');
    },


    /**
     * Insert a page of a given ID into the DOM - a convenience that makes
     * assumptions about how generic views are handled in this app.
     * Use an existing one if present, or fetch from the server, render
     * into HTML, and append.
     * Set up a view instance, if needed - if the element already has a
     * view, it'll just use that.
     *
     * @param {String} url The ID/URL of the page, by which it's fetched.
     * @param {Node?} existing An existing element, if any; just resolved
     *                         in a promise and returned if given (to be
     *                         then-able).
     * @param {Class} View The view class to manage and attach to the
     *                     element.
     * @return {Promise} A promise to be resolved with the view instance.
     */
    setupView(url, existing, View) {
        return ((existing)?
                // Use the existing view.
                Promise.resolve(existing['data-view'] ||
                    (existing['data-view'] = new View(existing)))

                // Fetch and append the new view(s).
                // @todo Remove old ones if the DOM gets too heavy later?
            :   new Promise((resolve, reject) => {
                    fetch(url)
                        .then((html) => {
                            let parsed = fragment(html);
                            let view = new View(parsed.childNodes);

                            view.hideNow()
                                .then(() => {
                                    this.container.appendChild(parsed);
                                    resolve(view);
                                });
                        })
                        // @todo Show the error to the user (404 = "Couldn't find that page", etc.)
                        .catch((error) => {
                            reject(error);
                            this.showMessage(error);
                        });
                }));
    },

    loadImages: (element) => new Promise((resolve, reject) => {
        imagesLoaded(element)
            .on('progress', (imagesLoading, image) =>
                image.img.classList.add('loaded'))
            .on('always', resolve);
    }),

    pinFooter() {
        if(this.activeView) {
            this.footer.style.top = this.activeView.element.offsetHeight+'px';
        }
    },

    /**
     * Clean any `home/` prefixes from routes.
     *
     * @param {String} route The URL/fragment to clean.
     * @return {String} The cleaned URL/fragment.
     */
    cleanRoute: (route) => route.replace(/^(\/)?home(?:\/?)/gi, '$1')
});
