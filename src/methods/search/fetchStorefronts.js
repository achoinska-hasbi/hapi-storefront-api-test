
'use strict';

const storefronts = require('../../data/storefronts'); 

module.exports = (categoryCode) => { 
  return storefronts.filter((storefront) => storefront.category.code.toLowerCase() === categoryCode.toLowerCase())
};
