'use strict';

const Boom = require('boom');
const storefronts = require('../../data/storefronts'); 

// Boom.notFound();
// Boom.badRequest();
// Boom.badImplementation();

module.exports = async(request) => {
    const { params } = request;
    let storefront = storefronts.find((store) => store.id === params.id);

    if (storefront) {
        return storefront;
    } else {
        return Boom.notFound();
    }
};