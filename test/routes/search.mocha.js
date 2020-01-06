'use strict';

const expect = require('chai').expect;
const Hapi   = require('hapi');
const plugin = require('../../src/plugin');
let server;

describe('Search route', function() {
    this.timeout(30000);

    before(async() => {
        server = new Hapi.Server();

        try {
            await server.register([
                {
                    plugin
                }
            ]);
        } catch (err) {
            console.log('Error registering plugins:', err);
        }
    });

    after(async() => await server.stop());

    it.only('responds with the storefronts array', async() => {
        const categoryCode = 'rec';

        const response = await server.inject({
            method: 'GET',
            url   : `/storefronts/search?categoryCode=${categoryCode}`
        });

        expect(response.statusCode).to.be.equal(200);
        expect(response.result.length).to.be.deep.equal(7);
    });

    xit('responds with properly ordered storefronts array', async() => {
        const categoryCode = 'rec';

        const response = await server.inject({
            method: 'GET',
            url   : `/storefronts/search?categoryCode=${categoryCode}`
        });
        const storefrontsIds = response.result.map((storefront) => storefront.id);

        expect(storefrontsIds).to.deep.equal([20, 8, 9, 2, 5, 11, 13]);
    });
});
