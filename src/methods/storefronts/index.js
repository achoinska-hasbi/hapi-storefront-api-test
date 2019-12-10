'use strict';

const Boom = require('boom');
const fetch = require('./fetch.js');

// Boom.notFound();
// Boom.badRequest();
// Boom.badImplementation();

module.exports = async(request) => {
    const { params } = request;
    const found = fetch(params.id)
    if (found) {
        return found;
    } else {
        return Boom.notFound();
    }
};