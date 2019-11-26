'use strict';

const packageInfo = require('../package.json');

/**
 * Manifest for the Service.
 */
const manifest = {
    server: {
        app: {
            slogan: packageInfo.description
        },
        debug: {
            request: ['error']
        },
        state: {
            strictHeader: false
        },
        router: {
            stripTrailingSlash: true
        },
        port  : 80,
        routes: {
            cors: {
                origin: ['*']
            }
        }
    },
    register: {
        plugins: [
            {
                plugin: require('./plugin'),
                select: ['web']
            },
            {
                plugin : 'inert',
                options: {},
                select : ['web']
            },
            {
                plugin : 'vision',
                options: {},
                select : ['web']
            },
            {
                plugin : 'hapi-swagger',
                options: {
                    info: {
                        title  : packageInfo.name,
                        version: packageInfo.version
                    },
                    swaggerUIPath    : '/',
                    documentationPath: '/specs',
                    jsonEditor       : false
                },
                select: ['web']
            }
        ]
    }
};

/**
 * Export the Instance to the World
 */
module.exports = manifest;
