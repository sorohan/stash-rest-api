'use strict';

module.exports = function (client) {
    return {
        get: function (user, options) {
            return client.get('users/' + user + '/settings', options);
        }
    };
};
