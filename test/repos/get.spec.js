
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
        httpClientGet.onCall(0).callsArgWith(1, expected, response)
            .returns(request);
        httpClientGet.onCall(1).callsArgWith(1, expected, response)
            .returns(request);

        // Test repos.get API.
        stashClient.repos.get('PRJ').then(function(repos) {
            assert.equal(repos.size, 1);
            assert.deepEqual(repos.values[0], expected.values[0]);
            assert.equal(httpClientGet.getCall(0).args[0], 'http://localhost/projects/PRJ/repos?limit=1000');
        }).then(function() {
            // Test that getCombined proxies to normal get, when project key given.
            stashClient.repos.getCombined('PRJ').then(function(repos) {
                assert.equal(repos.size, 1);
                assert.deepEqual(repos.values[0], expected.values[0]);
                assert.equal(httpClientGet.getCall(1).args[0], 'http://localhost/projects/PRJ/repos?limit=1000');
                done();
            });
        });
    });

    it('should get a combined list of repos for all projects', function(done) {
        // Mock the HTTP Client get.
        var expectedProjects = require('../mocks/projects.json');
        var expectedRepos = require('../mocks/repos.json');
        var response = new PassThrough();
        var request = new PassThrough();
        httpClientGet.onCall(0).callsArgWith(1, expectedProjects, response)
            .returns(request);
        httpClientGet.onCall(1).callsArgWith(1, expectedRepos, response)
            .returns(request);

        // Test repos.get API.
        stashClient.repos.getCombined().then(function(repos) {
            assert.deepEqual(repos.values[0], expectedRepos.values[0]);
            assert.equal(httpClientGet.getCall(0).args[0], 'http://localhost/projects?limit=1000');
            assert.equal(httpClientGet.getCall(1).args[0], 'http://localhost/projects/PRJ/repos?limit=1000');
            done();
        });
    });

    it('should fail gracefully when getting repos', function(done) {
        // Mock the HTTP Client get.
        var expectedProjects = require('../mocks/projects.json');
        var expectedRepos = require('../mocks/repos.json');
        var response = new PassThrough();
        var request = new PassThrough();

        httpClientGet.onCall(0).callsArgWith(1, expectedProjects, response)
            .returns(request);
        httpClientGet.onCall(1).throws();

        // Test error.
        stashClient.repos.getCombined().then(function() {
            assert.fail();
            done()
        })
        .catch(function(e) {
            assert.equal(e.message, 'Error');

            // Test error on 2nd call.
            httpClientGet.onCall(2).throws();
            httpClientGet.onCall(3).callsArgWith(1, expectedProjects, response)
                .returns(request);

            // Test error.
            stashClient.repos.getCombined().then(function() {
                assert.fail();
                done()
            })
            .catch(function(e) {
                assert.equal(e.message, 'Error');
                done();
            });
        });
    });

    it('should get a single project', function(done) {
        // Mock the HTTP Client get.
        var expected = require('../mocks/repo-single.json');
        var response = new PassThrough();
        var request = new PassThrough();
        httpClientGet.callsArgWith(1, expected, response)
            .returns(request);

        stashClient.repos.getRepo('PRJ', 'my-repo').then(function(repos) {
            assert.deepEqual(repos, expected);
            assert.equal(httpClientGet.getCall(0).args[0], 'http://localhost/projects/PRJ/repos/my-repo');
            done();
        });
    });

    it('should browse a repo', function(done) {
        // Mock the HTTP Client get.
        var expected = require('../mocks/repo-browse.json');
        var response = new PassThrough();
        var request = new PassThrough();
        httpClientGet.onCall(0).callsArgWith(1, expected, response)
            .returns(request);
        httpClientGet.onCall(1).callsArgWith(1, expected, response)
            .returns(request);

        stashClient.repos.browse('PRJ', 'my-repo').then(function(browse) {
            assert.deepEqual(browse, expected);
            assert.equal(httpClientGet.getCall(0).args[0], 'http://localhost/projects/PRJ/repos/my-repo/browse?limit=1000');
        }).then(function() {
            stashClient.repos.browse('PRJ', 'my-repo', { path: 'my-path/foo.html' }).then(function(browse) {
                var toCall = 'http://localhost/projects/PRJ/repos/my-repo/browse/my-path/foo.html?limit=1000';
                assert.equal(httpClientGet.getCall(1).args[0], toCall);
                done();
            });
        });
    });
});

