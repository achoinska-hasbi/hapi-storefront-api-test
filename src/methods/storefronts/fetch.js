
'use strict';

const storefronts = require('../../data/storefronts'); 

module.exports = (id) => { 
  return storefronts.find(storefront => storefront.id === id)
};
