'use strict';

module.exports = {
    /**
     *  An array of objects symbolising bundles requiring built.
     *
     *  Bundle Options:
     *  `srcPath` - Folder where source files can be found. Relative to `package.json` and `gulpfile.js`.
     *  `fileName` - File within `srcPath` which is the bundle starting point.
     *
     *  Example Bundles:
     *  { srcPath: './css/src/', fileName: 'homepage' },
     *  { srcPath: './css/src/', fileName: 'contact-us' }
     */
    bundles: [
        // Default critical/base styles entry point - all other critical modules/files are
        // `@import`ed in this file. This bundle's output is inlined at the top of the page.
        /**
         * @todo If per-module critical styles should be loaded by the server, then `@import`ing
         *       here will work bottom-up instead of top-down: a given module's `base.scss` will
         *       `@import` the global `base.scss`, along with any other dependencies, and each will
         *       be output as a separate bundle here.
         */
        { srcPath: './src/', fileName: 'base' },

        // Default full entry point - all other full modules/files are `@import`ed in this file.
        { srcPath: './src/', fileName: 'index' }
    ],

    // Where to place the built bundles. Is prefixed with `destPath` from global settings.
    outputFolder: './css/',

    // Settings to be passed through to gulp-sass and node-sass.
    sassSettings: {
        outputStyle: 'compressed',
        errLogToConsole: true
    },

    // Settings for AutoPrefixer.
    autoPrefixSettings: {
        browsers: ['last 2 versions', 'ios 6.1', 'android >= 4'],
        cascade: false
    }
};
