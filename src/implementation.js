'use strict';

const defaultOptions = {};

const Plugin = function Plugin() {
    this.options = defaultOptions;
};

Plugin.prototype = Object.assign(Plugin.prototype, {
    config     : require('./methods/config'),
    storefronts: require('./methods/storefronts/index.js'),
    search     : require('./methods/search/index.js')
});

/**
 * Export the Instance to the World
 */
module.exports = Plugin;
