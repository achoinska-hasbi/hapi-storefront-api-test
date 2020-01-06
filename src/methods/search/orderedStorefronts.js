
'use strict';

module.exports = (order, storefronts) => { 
    if (!order || order.length === 0 || !storefronts || storefronts.length === 0) {
        return storefronts;
    }
    
    // length not the same
    if (order.length !== storefronts.length) {
        let ordered = order.map((id) => {
            return storefronts.find((storefront) => storefront.id === id);
        });

        let diff = storefronts.filter(storefront => !ordered.includes(storefront));
        
        return ordered.concat(diff);
    }

    return order.map((id) => {
        return storefronts.find((storefront) => storefront.id === id);
    });
};


function orderStorefronts(order, storefronts) {
    return order.map((id) => {
        return storefronts.find((storefront) => storefront.id === id);
    });
}
