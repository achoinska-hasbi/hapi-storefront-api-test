
'use strict';

module.exports = (order, storefronts) => {
  const ordered = []
  const stores = [...storefronts];
  order.forEach(o => {
    const store = stores.findIndex(store => o === store.id);
    console.log(store)
    if (store !== -1) {
      console.log(stores)
      const removed = stores.splice(store, 1);
      ordered.push(removed[0])
    }
  })

  console.log(order)
  console.log(ordered)
  console.log(stores)

  return ordered.concat(stores)
};
