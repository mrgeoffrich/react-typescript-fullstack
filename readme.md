# React Typescript Full Stack Starter Kit

[![CircleCI](https://circleci.com/gh/mrgeoffrich/react-typescript-fullstack.svg?style=svg)](https://circleci.com/gh/mrgeoffrich/react-typescript-fullstack)

## Info

This starter kit provides a great out of the box starting point for developers who are looking to develop a website in Typescript using the following technologies:

* Typescript 3 - <https://www.typescriptlang.org/>
* Webpack 4 - <https://webpack.js.org/>
* Express - <https://expressjs.com/>
* React Hot Module Reload - <https://github.com/gaearon/react-hot-loader>
* React 16 - <https://reactjs.org/>
* React Router 4 - <https://reacttraining.com/react-router/>
* NodeJS 8 LTS - <https://nodejs.org>
* Yarn - <https://yarnpkg.com>
* Semantic UI React - <https://react.semantic-ui.com/>
* Docker - <https://www.docker.com/>
* Visual Studio Code - <https://code.visualstudio.com/>
* Circle CI Builds - <https://circleci.com>

## Pre-requisites

You must have Yarn installed globally to use this project:

To do this run

```bash
npm install yarn -g
```

## Usage

### Visual Studio Code Debugging

"Launch Dev" will run the application with debugging and "Launch Chrome" will then run Chrome with browser debugging enabled in VSCode.

### Run in development mode

```bash
yarn install
yarn run dev
```

### Production build

```bash
yarn install
yarn run prod:build
```

### Run production

```bash
yarn run prod:run
```

### Build a production docker container

```bash
docker build -t react-typescript-fullstack .
```

## CI Builds

Ensure that as part of the build, you have a context called "Docker Credentials" configured against your Circle CI account, with DOCKER_USER and DOCKER_PASS defined as your dockerhub username and password.

## Note

This starter kit will automatically build in Circle CI and get pushed to Docker Hub to provide an example of how to do this. The docker hub link is as follows: <https://hub.docker.com/r/mrgeoffrich/react-typescript-fullstack/>
