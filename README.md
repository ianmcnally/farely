# farely-react

A port to React of [Farely](http://github.com/imcnally/farely)

## Setup
Note: Having `node` (v0.10) installed is a prerequisite.
  - Use [https://github.com/creationix/nvm](nvm) until [a bug in jest](https://github.com/facebook/jest/issues/243) is resolved.

1. `npm install -g gulp`.
2. `npm install`.
3. Download the AWS config (farely-aws.json) from Github Gist.

## Dev

1. `gulp` - Compile, start server, watch for file changes

## Test

2. `gulp test` - Run test suite

## Deploy

1. `grunt compile deploy` - Compiles all assets into /dist; deploys to S3 (make sure farely-aws.json is downloaded to project root).
