# farely-react

[![Greenkeeper badge](https://badges.greenkeeper.io/ianmcnally/farely.svg)](https://greenkeeper.io/)

A port to React of [Farely](http://github.com/imcnally/farely)

## Setup
1. `npm install`.
2. Download the AWS config (farely-aws.json) from Github Gist.

## Dev

1. `npm start` - Compile, start server, watch for file changes

## Test

2. `npm run test` - Run test suite

## Deploy

1. `./node_modules/.bin/gulp compile deploy` - Compiles all assets into /dist; deploys to S3 (make sure farely-aws.json is downloaded to project root).
