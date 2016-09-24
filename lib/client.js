var _ = require('lodash');
var qs = require('query-string');
var request = require('request-promise');

var Client = function (baseUrl, oauth) {
    if (!baseUrl) {
        throw new Error('Base URL is missing');
    }
    // TODO: REFACTOR
    if (!oauth.consumer_key) {
        throw new Error('oauth\'s consumer_key is missing');
    }
    if (!oauth.consumer_secret) {
        throw new Error('oauth\'s consumer_secret is missing');
    }
    if (!oauth.signature_method) {
        throw new Error('oauth\'s signature_method is missing');
    }
    if (!oauth.token) {
        throw new Error('oauth\'s token is missing');
    }
    if (!oauth.token_secret) {
        throw new Error('oauth\'s token_secret is missing');
    }

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
