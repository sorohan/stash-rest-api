
var utils = require('lodash');

module.exports = function (client) {

    var repos = require('./repos')(client);

    return {
        post: function(projectKey, repoSlug, semver) {
            var data = {
                type: 'LIGHTWEIGHT',
                name: semver,
                message: 'Bumping version to ' + semver
            };
            return client.post('projects/' + projectKey + '/repos/' + repoSlug + '/tags', data);
        }
    };
};
