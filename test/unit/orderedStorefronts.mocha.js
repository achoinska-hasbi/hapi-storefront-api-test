'use strict';

const expect = require('chai').expect;
const orderedStorefronts = require('../../src/methods/search/orderedStorefronts.js');

describe.only('orderedStorefronts', () => {
    let storefronts;

    beforeEach(() => {
        storefronts = [
            {
                id  : 1,
                name: 'Venue #1',
            },
            {
                id  : 2,
                name: 'Venue #2',
            },
            {
                id  : 3,
                name: 'Venue #3',
            },
            {
                id  : 4,
                name: 'Venue #4',
            }
        ];
    });


    describe('with an empty order array', () => {
        it('returns storefronts in original order', () => {
            const order = [];

            const s = orderedStorefronts(order, storefronts);

            expect(s.length).to.be.equal(storefronts.length);
            expect(s).to.be.deep.equal([
                {
                    id: 1,
                    name: 'Venue #1'
                },
                {
                    id: 2,
                    name: 'Venue #2'
                },
                {
                    id: 3,
                    name: 'Venue #3'
                },
                {
                    id: 4,
                    name: 'Venue #4'
                }
            ]);
        });
    });

    describe('with an empty storefronts array', () => {
        it('returns storefronts in original order', async () => {
            const order = [5, 4];
            storefronts = [];

            const s = orderedStorefronts(order, storefronts);

            expect(s.length).to.be.equal(storefronts.length);
            expect(s).to.be.deep.equal([]);
        });
    });

    describe('with order and storefront arrays of equal lengths', () => {
        it('returns storefronts in proper order', () => {
            const order = [4, 2, 3, 1];

            const s = orderedStorefronts(order, storefronts);

            expect(s.length).to.be.equal(storefronts.length);
            expect(s).to.be.deep.equal([
                {
                    id  : 4,
                    name: 'Venue #4',
                },
                {
                    id  : 2,
                    name: 'Venue #2',
                },
                {
                    id  : 3,
                    name: 'Venue #3',
                },
                {
                    id  : 1,
                    name: 'Venue #1',
                }
            ]);
        });
    });

    describe('with order array shorter than storefronts array', () => {
        it('returns storefronts in proper order', () => {
            const order = [3, 1, 2];

            const s = orderedStorefronts(order, storefronts);

            expect(s.length).to.be.equal(storefronts.length);
            expect(s).to.be.deep.equal([
                {
                    id  : 3,
                    name: 'Venue #3'
                },
                {
                    id  : 1,
                    name: 'Venue #1'
                },
                {
                    id  : 2,
                    name: 'Venue #2'
                },
                {
                    id  : 4,
                    name: 'Venue #4'
                }
            ]);
        });
    });

  // we may assume that they always should be equal
  // describe('with order array longer than storefronts array', () => {
  //   it('returns storefronts in proper order', () => {
  //       const order = [3, 1, 2];
  //       storefronts = [
  //         { 
  //           id: 1,
  //           name: 'Venue #1'
  //         },
  //         { 
  //           id: 2,
  //           name: 'Venue #2'
  //         }
  //       ];

  //       const s = orderedStorefronts(order, storefronts);

  //       expect(s.length).to.be.equal(storefronts.length);
  //       expect(s).to.be.deep.equal([
  //         { 
  //           id: 1,
  //           name: 'Venue #1',
  //         },
  //         { 
  //           id: 2,
  //           name: 'Venue #2',
  //         }
  //       ])
  //   });
  // });
});