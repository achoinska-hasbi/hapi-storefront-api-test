'use strict';

const Boom = require('boom');
const fetch = require('./fetch.js');

// Boom.notFound();
// Boom.badRequest();
// Boom.badImplementation();

module.exports = async(request) => {
    const { params } = request;
    const id = fetch(params.id);

    if ( id === undefined) {
        return Boom.notFound();
    } else {
        return id;
    }
};
