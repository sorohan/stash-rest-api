
var assert = require('assert');
var sinon = require('sinon');
var PassThrough = require('stream').PassThrough;
var StashClient = require('../../index.js').Client;

describe('Hooks', function() {
    var httpClientGet, httpClient, stashClient;

    beforeEach(function() {
        stashClient = new StashClient('http://localhost/', 'username', 'password');
        httpClient = stashClient.client;
        httpClientGet = sinon.stub(httpClient, 'get');
        sinon.spy(httpClientGet);
    });

    afterEach(function() {
        httpClientGet.restore();
    });

    it('should get list of hooks', function(done) {
        // Mock the HTTP Client get.
        var expected = require('../mocks/hooks.json');
        var response = new PassThrough();
        var request = new PassThrough();
        httpClientGet.callsArgWith(1, expected, response)
            .returns(request);

        // Test hooks.get API.
        stashClient.hooks.get('PRJ', 'my-repo').then(function(hooks) {
            assert.equal(hooks.size, 1);
            assert.deepEqual(hooks.values[0], expected.values[0]);
            assert.equal(
                httpClientGet.getCall(0).args[0],
                'http://localhost/projects/PRJ/repos/my-repo/settings/hooks?limit=1000'
            );
            done();
        });
    });

    it('should get a single hook', function(done) {
        // Mock the HTTP Client get.
        var expected = require('../mocks/hook-single.json');
        var response = new PassThrough();
        var request = new PassThrough();
        httpClientGet.callsArgWith(1, expected, response)
            .returns(request);

        // Test hooks.get API.
        var hookKey = 'com.atlassian.stash.plugin.example:example-repository-hook';
        stashClient.hooks.getHook('PRJ', 'my-repo', hookKey).then(function(hook) {
            assert.deepEqual(hook.details, expected.details);
            assert.equal(
                httpClientGet.getCall(0).args[0],
                'http://localhost/projects/PRJ/repos/my-repo/settings/hooks/' + hookKey
            );
            done();
        });
    });

    it('should just get the PRE_RECEIVE hooks', function(done) {
        // Mock the HTTP Client get.
        var expected = require('../mocks/hooks.json');
        var response = new PassThrough();
        var request = new PassThrough();
        httpClientGet.callsArgWith(1, expected, response)
            .returns(request);

        // Test hooks.get API.
        stashClient.hooks.getPreReceive('PRJ', 'my-repo').then(function(hooks) {
            assert.equal(hooks.size, 1);
            assert.deepEqual(hooks.values[0], expected.values[0]);
            done();
        });
    });

    it('should just get the POST_RECEIVE hooks', function(done) {
        // Mock the HTTP Client get.
        var expected = require('../mocks/hooks.json');
        var response = new PassThrough();
        var request = new PassThrough();
        httpClientGet.callsArgWith(1, expected, response)
            .returns(request);

        // Test hooks.get API.
        stashClient.hooks.getPostReceive('PRJ', 'my-repo').then(function(hooks) {
            assert.equal(hooks.size, 1);
            assert.deepEqual(hooks.values[0], expected.values[0]);
            done();
        });
    });
});

