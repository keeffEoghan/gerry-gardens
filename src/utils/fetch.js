'use strict';

const ready = 4;
const statusOK = 200;

/**
 * @todo Could polyfill this better if needed - makes assumptions for just fetching
 *       page content for now.
 */
export default ((self.fetch)?
        (url) =>
            fetch(url, {
                    headers: { 'X-Requested-With': 'XMLHttpRequest' }
                })
                .then((response) =>
                    ((response.ok)?
                        response.text()
                    :   Promise.reject(`${response.statusText} (${response.status})`)))
    :   function(url) {
            return new Promise((resolve, reject) => {
                    let xhr = new XMLHttpRequest();

                    xhr.open('GET', url, true);

                    xhr.onreadystatechange = () => {
                            if(xhr.readyState === ready) {
                                if(xhr.status === statusOK) {
                                    resolve(xhr.responseText);
                                }
                                else {
                                    reject(xhr.statusText);
                                }
                            }
                        };


                    // Handle XHR time outs

                    let wait = 3000;
                    let timedout = () => reject((xhr.statusText || 'request timed out'));

                    if('timeout' in xhr && 'ontimeout' in xhr) {
                        xhr.ontimeout = timedout;
                        xhr.timeout = wait;
                    }
                    else {
                        setTimeout(timedout, wait);
                    }


                    // Set the X-Requested-With header, to indicate this is an AJAX request.
                    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');


                    // Try to load the CSS asynchronously.
                    xhr.send();
                });
        });
