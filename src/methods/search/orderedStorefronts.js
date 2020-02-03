
'use strict';

module.exports = (order, storefronts) => {
    const filteredOrder = order.filter((item) => storefronts.find((storefront) => storefront.id === item));
    const orderedStorefronts = filteredOrder.map((id) => storefronts.find((storefront) => storefront.id === id));
    storefronts.forEach((storefront) => {
        if (!orderedStorefronts.find((sf) => sf.id === storefront.id)) {
            orderedStorefronts.push(storefront);
        }
    });

    return orderedStorefronts;
};
