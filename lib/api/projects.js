
module.exports = function (client) {
    return {
        get: function(options) {
            return client.getCollection('projects', options);
        }
    }
};
