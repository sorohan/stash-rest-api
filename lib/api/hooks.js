
var utils = require('lodash');

module.exports = function (client) {
    var getByType = function(type, projectKey, repoSlug, options) {
        var options = options || {};
        options.type = type;

        return client.get('projects/' + projectKey + '/repos/' + repoSlug + '/settings/hooks', options);
    };

    return {
        get: function(projectKey, repoSlug, options) {
            return client.get('projects/' + projectKey + '/repos/' + repoSlug + '/settings/hooks', options);
        },

        getPreReceive: utils.curry(getByType)('PRE_RECEIVE'),

        getPostReceive: utils.curry(getByType)('POST_RECEIVE'),

        getHook: function(projectKey, repoSlug, hookKey, options) {
            return client.get('projects/' + projectKey + '/repos/' + repoSlug + '/settings/hooks/' + hookKey , options);
        }
    }
};
