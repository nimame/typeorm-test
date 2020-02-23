# TypeORM examples

This repository contains sample test cases for TypeORM as a reference or to demonstrate issues. It uses the `typeorm-fixtures-cli` package to generate mock data and `mocha` as the test runner.  

The default `npm test` command runs mocha with the `--watch` flag, so that it will watch the files in `src` directory for changes.  

The simplest way to run the tests, is using docker-compose, which requires that Docker is installed:

```sh
docker-compose up
```
