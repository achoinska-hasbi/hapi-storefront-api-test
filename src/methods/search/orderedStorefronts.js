
'use strict';

module.exports = (order, storefronts) => { 
   // order = [1,6, 3]
  // storefronts =[ {id: "3"}, {id: "6"}, {id: "1"},  ]
  //  

  //  find storefront that is in order, 
  // add to front of array
  // then add rest of items

  order.map(store => storefronts.find(storefront => storefront.id === store.id))

  //

};
