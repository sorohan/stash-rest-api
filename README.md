
# Rest client for Atlassian Stash

Provides access to *some* of Stash's APIs.

[![Coverage Status](https://coveralls.io/repos/sorohan/stash-rest-api/badge.svg?branch=master&service=github)](https://coveralls.io/github/sorohan/stash-rest-api?branch=master)

## Initialising Client

```
var auth = {
    "user": "username",
    "password": "password"
};

var Client = require('stash-rest-api').Client;

var stash = new Client(
    'http://localhost:7990/rest/api/1.0/',
    auth.user,
    auth.password
);
```

## APIS

### projects

Get all projects.

```
stash.projects.get(); // Promise
```

### repos

Get all repos for a project.

```
stash.repos.get(projectKey); // Promise
```

Get all repos for all projects.

```
stash.repos.getCombined(); // Promise
```

### pull requests

Get all pull requests for a repo.

```
stash.prs.get(projectKey, repoSlug); // Promise
```

Get all pull requests for a project.

```
stash.prs.getCombined(projectKey); // Promise
```

Get all pull requests on all projects.

```
stash.prs.getCombined(); // Promise
```

Get all pull requests by a specific author.

```
stash.prs.getCombined(null, null, { author: "ben" }); // Promise
```

Get all pull requests in a specific state (defaults OPEN).

```
stash.prs.getCombined(null, null, { state: "MERGED" }); // Promise
```

*Possible states: ALL, OPEN, DECLINED or MERGED.*

### hooks

Get all hooks for a repo.

```
stash.hooks.get(projectKey, repoSlug); // Promise
```

Get all pre-recieve hooks.

```
stash.hooks.getPreReceive(projectKey, repoSlug); // Promise
```

Get all post-recieve hooks.

```
stash.hooks.getPostReceive(projectKey, repoSlug); // Promise
```

Get details for a single hook.

```
stash.hooks.getHook(projectKey, repoSlug, hookKey); // Promise
```

## API Coverage

 - /rest/api/1.0/projects [GET]
 - /rest/api/1.0/projects/{projectKey}/repos [GET]
 - /rest/api/1.0/projects/{projectKey}/repos/{repositorySlug} [GET]
 - /rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/pull-requests [GET]
 - /rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/settings/hooks [GET]
 - /rest/api/1.0/projects/{projectKey}/repos/{repositorySlug}/settings/hooks/{hookKey}/enabled [PUT]
