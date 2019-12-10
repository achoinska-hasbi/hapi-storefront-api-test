'use strict';

const Boom = require('boom');
const fetchStorefrontsOrder = require('./fetchStorefrontsOrder.js');
const fetchStorefronts = require('./fetchStorefronts.js');
const orderedStorefronts = require('./orderedStorefronts.js');

module.exports = (request) => {
    const { query } = request;
    console.log(query)
    console.log(fetchStorefronts(query.categoryCode))
    return fetchStorefronts(query.categoryCode)
};