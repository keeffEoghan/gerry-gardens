<?php

/*

---------------------------------------
License Setup
---------------------------------------

Please add your license key, which you've received
via email after purchasing Kirby on http://getkirby.com/buy

It is not permitted to run a public website without a
valid license key. Please read the End User License Agreement
for more information: http://getkirby.com/license

*/

// c::set('debug', true);
c::set('license', 'put your license key here');
c::set('routes', [
        [
            'pattern' => '(:any)',
            'action' => function($uid) {
                $page = page($uid);

                if(!$page) {
                    $page = page('home/'.$uid);
                }

                if(!$page) {
                    $page = site()->errorPage();
                }

                return site()->visit($page);
            }
        ],
        [
            'pattern' => 'home/(:any)',
            'action' => function($uid) {
                go($uid);
            }
        ]
    ]);

/*

---------------------------------------
Kirby Configuration
---------------------------------------

By default you don't have to configure anything to
make Kirby work. For more fine-grained configuration
of the system, please check out http://getkirby.com/docs/advanced/options

*/
