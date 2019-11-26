'use strict';

const BaseJoi       = require('joi');
const DateExtension = require('joi-date-extensions');
const Joi           = BaseJoi.extend(DateExtension);

const entryPoints = function(server, plugin) {
    server.bind(plugin);

    server.route(
        {
            method : 'GET',
            path   : '/storefronts/{id}',
            handler: plugin.storefronts,
            config : {
                id: 'storefront',
                //Support for swagger, look at the hapi-swagger documentation for more options
                //When params/query/payload joi validation are used, model contract will generate
                //into swagger documentation
                tags       : ['api'],
                description: 'Get a single vendor with the specified GUID or display ID',
                validate   : {
                    params: {
                        id: [
                            Joi.number().integer()
                        ]
                    }
                }
            }
        }
    );
    server.route(
        {
            method : 'GET',
            path   : '/storefronts/search',
            handler: plugin.search,
            config : {
                id: 'search',
                //Support for swagger, look at the hapi-swagger documentation for more options
                //When params/query/payload joi validation are used, model contract will generate
                //into swagger documentation
                tags       : ['api'],
                description: 'Get storefronts matching search criteria',
                validate   : {
                    query: Joi.object({
                        categoryCode: Joi.string().allow('')
                    }).unknown().empty(null)
                }
            }
        }
    );
};

module.exports = entryPoints;
