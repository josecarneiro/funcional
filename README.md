# `funcional`

Requires node version `8.x.x`. The compatibility of this library should match the node LTS release schedule, since that is the version used by Google Cloud Functions.

### Client

The client class should be used in response to a `http` trigger.

Initiating it takes two arguments: the `request` and `response` objects passed to the GCP function.

The instance has two methods:

#### json(data[, status])

Stands for a valid response. Responds with a JSON object. Can optionally include a status code (defaults to 200).

#### error(data[, status])

Responds with an error.

### Server

The `funcional` library also includes an interface to interact with GCP functions in the server.

### TO DO:

Rename as `funcional`.