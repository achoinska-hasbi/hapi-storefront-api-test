
'use strict';

const storefronts = require('../../data/storefronts'); 

module.exports = (categoryCode) => { 

  return storefronts.map( store => { 
    // before we finished said that there should be an if with the statement below
    // and then return for matching storefront
     categoryCode.toLowerCase() === store.category.code.toLowerCase();
  });
  
};
