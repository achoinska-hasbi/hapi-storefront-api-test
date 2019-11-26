'use strict';

const expect = require('chai').expect;
const Hapi   = require('hapi');
const plugin = require('../../src/plugin');
const sinon  = require('sinon');
let server;

describe.only('Storefronts route', function() {
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

    it.only('responds with the storefront data', async() => {
        const id = 9;

        const response = await server.inject({
            method: 'GET',
            url   : `/storefronts/${id}`
        });

        expect(response.statusCode).to.be.equal(200);
        expect(response.result).to.be.deep.equal({
            id,
            name    : 'Ballroom at the Hilton 9',
            location: {
                city : 'New York',
                state: 'NY'
            },
            category: {
                name: 'Reception Venue',
                code: 'REC'
            },
            marketCode: '001'
        });
    });

    it('responds with 404 if storefront is not found', async() => {
        const id = 89;

        const response = await server.inject({
            method: 'GET',
            url   : `/storefronts/${id}`
        });

        expect(response.statusCode).to.be.equal(404);
        expect(response.result.error).to.be.equal('Not Found');
    });

    it('responds with 400 if id fails validation (number)', async() => {
        const id = 'xyz';

        const response = await server.inject({
            method: 'GET',
            url   : `/storefronts/${id}`
        });

        expect(response.statusCode).to.be.equal(400);
    });
});
