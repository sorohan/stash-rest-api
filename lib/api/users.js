'use strict';

module.exports = function (client) {
  return {
    get: function (options) {
      return client.getCollection('users', options);
    },

    getUser: function (userSlug, options) {
      return client.get('users/' + userSlug, options);
    }
  };
};

