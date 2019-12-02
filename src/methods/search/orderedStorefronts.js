
'use strict';

module.exports = (order, storefronts) => { 
  if (storefronts.length == 0){
    return [];
  }
  const selectedStorefronts = order.map(id => storefronts.find(sf => sf.id == id))
  console.log(selectedStorefronts)
  const remainingStorefronts = storefronts.filter(sf => !order.includes(sf.id))
  console.log(remainingStorefronts)
  return selectedStorefronts.concat(remainingStorefronts);
};
