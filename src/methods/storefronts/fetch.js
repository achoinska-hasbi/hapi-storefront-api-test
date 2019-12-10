
'use strict';

const storefronts = require('../../data/storefronts'); 

module.exports = (id) => {
  return storefronts.find(store => store.id === id);
};
