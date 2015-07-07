
module.exports = function (client) {
    return {
        get: function(projectKey, options) {
            return client.get('projects/' + projectKey + '/repos');
        }
    }
};

