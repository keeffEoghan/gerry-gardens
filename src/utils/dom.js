'use strict';

/**
 * Convert text into HTML elements.
 * Uses DOMFragment to reduce the number of operations needed to
 * be performed on the DOM when manipulating elements.
 * Assumes a naive parsing of text into HTML (doesn't handle special
 * cases like scripts or required parent types).
 *
 * @param {String} text Text to parse into HTML (naively).
 * @return {DocumentFragment} A new document fragment containing the
 *                              newly created nodes.
 */
export function fragment(text) {
        let fragment = document.createDocumentFragment();
        let container = document.createElement('div');

        // Create the elements.
        /**
         * @todo This ignores special cases, where an element needs a particular
         *       type of parent (<tr>, etc); need to take care of these cases too?
         */
        container.innerHTML = text.trim();
        container.normalize();

        // Move them from the temporary container to the document fragment.
        for(let el; el = container.lastChild;) {
            fragment.appendChild(el);
        }

        container.textContent = '';

        // Return the fragment, so we have the option of inserting all the elements
        // in one go.
        return fragment;
    };

/**
 * Add an element as the first child of the parent.
 * @param {Node} el The element to add.
 * @param {Node} parent The element to add it to.
 * @return {Node} The added element.
 */
export function prepend(el, parent) {
        let first = parent.firstChild;

        return ((first)?
                parent.insertBefore(el, first)
            :   parent.appendChild(el));
    };


export const matches = (Element.prototype.matches || Element.prototype.msMatches);
export const match = (element, selector) => element::matches(selector);

export const onDOMEvent = (element, event, selector, callback) =>
        element.addEventListener(event, (e) => {
                for(let el = e.target; el && el !== element; el = el.parentNode) {
                    if(el::matches(selector)) {
                        return callback(e, el);
                    }
                }
            });

export const transform = Modernizr.prefixed('transform');
export const perspectiveOrigin = Modernizr.prefixed('perspectiveOrigin');
