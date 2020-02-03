
'use strict';

const storefronts = require('../../data/storefronts'); 

module.exports = (categoryCode) => {
  console.log(storefronts, categoryCode)
  return storefronts.filter((store) => store.category.code === categoryCode.toUpperCase())
};
