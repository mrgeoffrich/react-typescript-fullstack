# React Typescript Full Stack Starter Kit

## Info

This starter kit provides a great out of the box starting point for developers who are looking to develop a website in Typescript using the following technologies:

* Typescript - <https://www.typescriptlang.org/>
* Webpack 4 - <https://webpack.js.org/>
* React Hot Module Reload - <https://github.com/gaearon/react-hot-loader>
* React 16 - <https://reactjs.org/>
* React Router 4 - <https://reacttraining.com/react-router/>
* Redux - <https://redux.js.org/>
* NodeJS - <https://nodejs.org>
* Yarn - <https://yarnpkg.com>
* Semantic UI React - <https://react.semantic-ui.com/>
* RethinkDB - <https://rethinkdb.com/>

## Pre-requisites

You must have the following installed globally to use this project:

* Yarn

To do this run

```bash
npm install yarn -g
```

* Docker

Docker is use to start the project's software dependencies.

Install docker for mac or windows at: <https://www.docker.com/docker-mac> or <https://www.docker.com/docker-windows>

## Usage

To run in development mode run:

```bash
docker-compose up
yarn
yarn run dev
```

To perform a production build run:

```bash
docker-compose up
yarn
yarn run prod:build
yarn run prod:run
```
