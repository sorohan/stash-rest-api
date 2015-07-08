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
stash.repos.get('PROJECT-KEY'); // Promise
```

Get all repos for all projects.

```
stash.repos.getCombined(); // Promise
```

### pull requests

Get all pull requests for a repo.

```
stash.prs.get('PROJECT-KEY', 'REPO-SLUG'); // Promise
```

Get all pull requests for a project.

```
stash.prs.getCombined('PROJECT-KEY'); // Promise
```

Get all pull requests on all projects.

```
stash.prs.getCombined(); // Promise
```
