
var assert = require('assert');
var sinon = require('sinon');
var PassThrough = require('stream').PassThrough;
var StashClient = require('../../index.js').Client;

describe('Projects', function() {
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

    it('should get list of projects', function(done) {
        // Mock the HTTP Client get.
        var expected = require('../mocks/projects.json');
        var response = new PassThrough();
        var request = new PassThrough();
        httpClientGet.callsArgWith(1, expected, response)
            .returns(request);

        // Test projects.get API.
        stashClient.projects.get().then(function(projects) {
            assert.equal(projects.size, 1);
            assert.deepEqual(projects.values[0], expected.values[0]);
            assert.equal(httpClientGet.getCall(0).args[0], 'http://localhost/projects?limit=1000');
            done();
        });
    });
});

