
# Rest client for Atlassian Stash

Provides access to *some* of Stash's APIs.

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
