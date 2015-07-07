
exports.Client = require('./lib/client');

// Eg:

var auth = require('./auth.json');
stash = new exports.Client(
    'http://stash.backbase.com:7990/rest/api/1.0/',
    auth.user,
    auth.password
);

stash.hooks.getPreReceive('LPM', 'module-accounts', {}).then(function(response) {
    response.values.forEach(function(hook) {
        console.log(hook.details);
    });
});

/*

stash.hooks.get('LPM', 'module-accounts').then(function(response) {
    console.log(response.values);
    response.values.forEach(function(hook) {
        console.log(hook.details);
    });
});

stash.projects.get({}).then(function(response) {
    response.values.forEach(function(project) {
        stash.repos.get(project.key, {}).then(function(response) {
            console.log(response);
        });
    });
});
*/
