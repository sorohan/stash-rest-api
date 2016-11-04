'use strict';

module.exports = function (client) {
  return {
    get: function (userSlug, options) {
      return client.get('users/' + userSlug + '/settings', options);
    }
  };
};
