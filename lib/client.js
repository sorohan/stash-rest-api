
var utils = require('lodash');
var queryString = require('query-string');
var RestClient = require('node-rest-client').Client;
var Promise = require('promise');

var Client = function(baseUrl, user, password) {
    this.baseUrl = baseUrl;
    this.client = new RestClient({ 'user': user, 'password' : password });

    // Init API.
    this.projects = require('./api/projects')(this);
    this.repos = require('./api/repos')(this);
    this.prs = require('./api/prs')(this);
    this.hooks = require('./api/hooks')(this);
};

Client.prototype.getCollection = function(path, options) {
    options = options || {};
    options.args = utils.defaults(options.args || {}, { 'limit': 1000 });
    return this.get(path, options);
};

Client.prototype.get = function(path, options) {
    options = options || {};
    options.args = options.args || {};
    var query = queryString.stringify(options.args);
    if (query) {
        query = '?' + query;
    }
    return new Promise(function(resolve, reject) {
        try {
            this.client.get(this.baseUrl + path + query, function(data, response){
                resolve(data);
            });
        }
        catch(err) {
            reject(err);
        };
    }.bind(this));
};

Client.prototype.put = function(path, data, body) {
    var args = {
        data: data,
        headers: { 'Content-Type': 'application/json' }
    };
    return new Promise(function(resolve, reject) {
        this.client.put(this.baseUrl + path, args, function(data, response){
            resolve(data);
        })
    }.bind(this));
};

module.exports = Client;
