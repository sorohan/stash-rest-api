
var async = require('async');
var utils = require('lodash');
var Promise = require('promise');

function filterByAuthor(author) {
    return function(pr) {
        return !author || author === pr.author.user.name;
    };
}

module.exports = function (client) {
    var repos = require('./repos')(client);
    return {
        get: function(projectKey, repo, options) {
            if (!options) {
                options = {};
            }

            clientOptions = { args: { 'state': options.state || 'OPEN' } };
            var path = 'projects/' + projectKey + '/repos/' + repo + '/pull-requests';

            return client.getCollection(path, clientOptions).then(function(response) {
                // filter by author.
                if (options.author) {
                    response.values = response.values.filter(filterByAuthor(options.author));
                };
                return response;
            });
        },

        getCombined: function(projectKey, repo, options) {

            if (projectKey && repo) {
                return this.get(projectKey, repo, options);
            }
            else {

                var prsCombined = [ ];
                var API = this;

                // Find all repos matching projectKey/repo & return all PRs for each.
                return new Promise(function(resolve, reject) {
                    // Find all repos.
                    repos.getCombined(projectKey).then(function(reposResponse) {
                        // Async loop.
                        async.forEachOf(reposResponse.values, function(repo, index, callback) {
                            API.get(repo.project.key, repo.slug, options).then(function(prResponse) {
                                prsCombined = utils(prsCombined).concat(prResponse.values).value();
                                callback();
                            });

                        }, function(err) { // all PRs resolved.
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve({values:prsCombined});
                            }
                        });
                    });
                });
            }
        }
    }
};
