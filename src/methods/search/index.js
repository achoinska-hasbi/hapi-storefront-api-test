'use strict';

const Boom = require('boom');
//const fetchStorefrontsOrder = require('./fetchStorefrontsOrder.js');
const fetchStorefronts = require('./fetchStorefronts.js');
//const orderedStorefronts = require('./orderedStorefronts.js');

module.exports = (request) => {
    const { query } = request;
    const searchRES = fetchStorefronts(query.categoryCode);
console.log(searchRES);
    return searchRES;
};