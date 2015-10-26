var defaults = require('lodash.defaults');
var nets = require('nets');

var jar  = require('../lib/jar.js');
var log = require('../lib/log.js');

var CookieMixinFactory = require('./cookieMixinFactory.jsx');

var Api = {
    mixins: [
        // Provides useScratchcsrftoken
        CookieMixinFactory('scratchcsrftoken', '/csrf_token/')
    ],
    api: function (opts, callback) {
        defaults(opts, {
            host: process.env.API_HOST,
            headers: {},
            json: {},
            useCsrf: false
        });

        defaults(opts.headers, {
            'X-Requested-With': 'XMLHttpRequest'
        });

        opts.uri = opts.host + opts.uri;

        var apiRequest = function (opts) {
            nets(opts, function (err, res, body) {
                if (err) log.error(err);
                callback(err, body);
            });
        }.bind(this);

        if (typeof jar.get('scratchlanguage') !== 'undefined') {
            opts.headers['Accept-Language'] = jar.get('scratchlanguage') + ', en;q=0.8';
        }
        if (opts.useCsrf) {
            this.useScratchcsrftoken(function (err, csrftoken) {
                if (err) return log.error('Error while retrieving CSRF token', err);
                opts.json.csrftoken = csrftoken;
                opts.headers['X-CSRFToken'] = csrftoken;
                apiRequest(opts);
            }.bind(this));
        } else {
            apiRequest(opts);
        }
    }
};

module.exports = Api;
