
'use strict';

const storefronts = require('../../data/storefronts'); 

module.exports = (id) => { 
  for(let i = 0; i < storefronts.length; i++) {
    if (id === storefronts[i].id) {
      return storefronts[i];
    }
  }
};
