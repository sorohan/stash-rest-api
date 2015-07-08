
var utils = require('lodash');
var queryString = require('query-string');
var RestClient = require('node-rest-client').Client;

var Client = function(baseUrl, user, password) {
    this.baseUrl = baseUrl;
    this.client = new RestClient({ 'user': user, 'password' : password });

    // Init API.
    this.projects = require('./api/projects')(this);
    this.repos = require('./api/repos')(this);
    this.prs = require('./api/prs')(this);
    this.hooks = require('./api/hooks')(this);
};

Client.prototype.get = function(path, options) {
    return new Promise(function(resolve, reject) {
        options = options || {};
        args = utils.defaults(options.args || {}, { 'limit': 1000 });

        this.client.get(this.baseUrl + path + '?' + queryString.stringify(args), function(data, response){
            resolve(data);
        })
    }.bind(this));
};

module.exports = Client;
