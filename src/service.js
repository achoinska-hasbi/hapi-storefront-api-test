'use strict';

const Glue      = require('glue');
const Manifest  = require('./manifest');

const startService = async function() {
    const server = await Glue.compose(Manifest, {
        relativeTo: __dirname
    });

    try {
        await server.start();

        server.log(['log'], 'Service started');
    } catch (err) {
        throw err;
    }
};

startService();
