# own

A service to own couchdb instances

## API

All requests require a valid `Authorization` header like `Basic TOKEN` or `Bearer TOKEN`.

### POST /:app
Own app

_any user_


### GET /:app
Get code for app

_admin only_

### PURGE /:app
Renew app's code

_admin only_


### PUT /:app/:code
Join the app as the current user with a code

_any user_

### DELETE /:app/:email
Make user leave the app

_admin only_


## TODO

### LOCK /:app
Prevent users from outside the app to see its contents without being logged in.

_admin only_

### UNLOCK /:app
Allow users from outside the app to see its contents without being logged in.

_admin only_

Ref: http://docs.couchdb.org/en/stable/api/database/security.html


License MIT
with <3 by Uxtemple :)
