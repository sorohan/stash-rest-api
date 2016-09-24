var assert = require("chai").assert;
var BitbucketClient = require('../index.js').Client;
var _ = require('lodash');

describe('Client', function () {
    var oauth = require('./mocks/oauth');

    it('should complain about missing baseUrl attribute', function (done) {
        assert.throws(function () {
            new BitbucketClient(null, oauth)
        }, 'Base URL is missing');

        done();
    });

    describe('should complain about missing oauth attributes', function () {
        var attributes = ['consumer_key', 'consumer_secret', 'signature_method', 'token', 'token_secret'];

        _.each(attributes, function (attribute) {
            it('missing oauth attribute ' + attribute, function (done) {
                assert.throws(function () {
                    new BitbucketClient('baseUrl', _.omit(oauth, attribute))
                }, 'oauth\'s ' + attribute + ' is missing');

                done();
            });

        });
    });

    it('should create a bitbucket client', function (done) {
        var bitbucketClient = new BitbucketClient('baseUrl', oauth);
        assert.typeOf(bitbucketClient, 'object');

        assert.equal(bitbucketClient.baseUrl, 'baseUrl');
        assert.equal(bitbucketClient.oauth, oauth);

        assert.isNotNull(bitbucketClient.projects);
        assert.isNotNull(bitbucketClient.repos);
        assert.isNotNull(bitbucketClient.prs);
        assert.isNotNull(bitbucketClient.hooks);

        done();
    });
});

