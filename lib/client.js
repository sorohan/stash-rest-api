'use strict';

var qs = require('query-string');
var request = require('request-promise');
var _ = require('lodash');

var Client = function (baseUrl, oauth) {
    // required baseUrl
    if (!baseUrl) {
        throw new Error('Base URL is missing');
    }

    // required attributes in oauth object
    var attributes = ['consumer_key', 'consumer_secret', 'signature_method', 'token', 'token_secret'];
    _.each(attributes, function (attribute) {
        if (_.isEmpty(oauth[attribute])) {
            throw new Error('oauth\'s ' + attribute + ' is missing');
        }
    });

    this.baseUrl = baseUrl;
    this.oauth = oauth;

    // Init API.
    this.projects = require('./api/projects')(this);
    this.repos = require('./api/repos')(this);
    this.prs = require('./api/prs')(this);
    this.hooks = require('./api/hooks')(this);
};

Client.prototype.getCollection = function (path, options) {
    options = options || {};
    options.args = _.defaults(options.args || {}, {'limit': 1000});
    return this.get(path, options);
};

Client.prototype.get = function (path, options) {
    options = options || {};
    options.args = options.args || {};
    var query = qs.stringify(options.args);
    if (query) {
        query = '?' + query;
    }

    var params = {
        uri: this.baseUrl + path + query,
        oauth: this.oauth,
        json: true
    };

    return request.get(params);

    //return new Promise(function (resolve, reject) {
    //    try {
    //        this.client.get(this.baseUrl + path + query, function (data, response) {
    //            resolve(data);
    //        });
    //    }
    //    catch (err) {
    //        reject(err);
    //    }
    //    ;
    //}.bind(this));
};

Client.prototype.put = function (path, data, body) {
    var params = {
        method: 'POST',
        uri: this.baseUrl + path,
        headers: {'Content-Type': 'application/json'},
        body: data,
        oauth: this.oauth,
        json: true // Automatically stringifies the body to JSON
    };

    return request(params);

    //return new Promise(function (resolve, reject) {
    //    this.client.put(this.baseUrl + path, args, function (data, response) {
    //        resolve(data);
    //    })
    //}.bind(this));
};

module.exports = Client;
