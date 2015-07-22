
var utils = require('lodash');

module.exports = function (client) {
    var getByType = function(type, projectKey, repoSlug, options) {
        var options = options || {};
        options.type = type;

        return client.getCollection('projects/' + projectKey + '/repos/' + repoSlug + '/settings/hooks', options);
    };

    return {
        get: function(projectKey, repoSlug, options) {
            return client.getCollection('projects/' + projectKey + '/repos/' + repoSlug + '/settings/hooks', options);
        },

        getHook: function(projectKey, repoSlug, hookKey, options) {
            return client.get('projects/' + projectKey + '/repos/' + repoSlug + '/settings/hooks/' + hookKey , options);
        },

        getPreReceive: function(projectKey, repoSlug, options) {
            return getByType('PRE_RECEIVE', projectKey, repoSlug, options);
        },

        getPostReceive: function(type, projectKey, repoSlug, options) {
            return getByType('POST_RECEIVE', projectKey, repoSlug, options);
        },

        enable: function(projectKey, repoSlug, hookKey, hookDetails) {
            var path = 'projects/' + projectKey + '/repos/' + repoSlug + '/settings/hooks/' + hookKey + '/enabled';
            return client.put(path, hookDetails);
        }
    }
};
