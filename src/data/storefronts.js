'use strict';

const receptions = [9, 5, 2, 11, 8, 13, 20].map((i) => ({
    id      : i,
    name    : `Ballroom at the Hilton ${i}`,
    category: {
        name: 'Reception Venue',
        code: 'REC'
    },
    location: {
        city : 'New York',
        state: 'NY'
    },
    marketCode: '001'
}));

const florists = [7, 1, 12, 4, 6, 10].map((i) => ({
    id      : i,
    name    : `Designs by ${i}`,
    category: {
        name: 'Florist',
        code: 'FLO'
    },
    location: {
        city : 'New York',
        state: 'NY'
    },
    marketCode: '001'
}));

module.exports = [...receptions, ...florists];
