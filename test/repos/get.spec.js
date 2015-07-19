
var assert = require('assert');
var sinon = require('sinon');
var PassThrough = require('stream').PassThrough;
var StashClient = require('../../index.js').Client;

describe('Repos', function() {
    var httpClientGet, httpClient, stashClient;

    beforeEach(function() {
        stashClient = new StashClient('http://localhost/', 'username', 'password');
        httpClient = stashClient.client;
        httpClientGet = sinon.stub(httpClient, 'get');
    });

    afterEach(function() {
        httpClient.get.restore();
    });

    it('should get list of repos for a project', function(done) {
        // Mock the HTTP Client get.
        var expected = require('../mocks/repos.json');
        var response = new PassThrough();
        var request = new PassThrough();
        httpClientGet.callsArgWith(1, expected, response)
            .returns(request);

        // Test repos.get API.
        stashClient.repos.get('PRJ').then(function(repos) {
            assert.equal(repos.size, 1);
            assert.deepEqual(repos.values[0], expected.values[0]);
            done();
        });
    });

    it('should get a single project', function(done) {
        // Mock the HTTP Client get.
        var expected = require('../mocks/repo-single.json');
        var response = new PassThrough();
        var request = new PassThrough();
        httpClientGet.callsArgWith(1, expected, response)
            .returns(request);

        // Test repos.get API.
        stashClient.repos.get('PRJ', 'my-repo').then(function(repos) {
            assert.deepEqual(repos, expected);
            done();
        });
    });
});

