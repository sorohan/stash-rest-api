
module.exports = function (client) {
    return {
        get: function(options) {
            return client.get('projects', options);
        }
    }
};
