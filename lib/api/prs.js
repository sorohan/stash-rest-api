
var async = require('async');
var utils = require('lodash');

module.exports = function (client) {
    var repos = require('./repos')(client);
    return {
        get: function(projectKey, repo, options) {
            if (!options) {
                options = {};
            }
            options = { args: { 'state': options.state || 'OPEN' } };
            return client.get('projects/' + projectKey + '/repos/' + repo + '/pull-requests', options);
        },

        getCombined: function(projectKey, repo, options) {

            if (projectKey && repo) {
                return this.get(projectKey, repo);
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
