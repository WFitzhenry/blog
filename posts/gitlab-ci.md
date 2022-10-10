---
title: 'Gitlab Continuous Integration'
---

Continuous integration means that we are continually making sure any changes are run through a pipeline to be ready for review.

- a pipeline will run on a merge request when commits are pushed to it
- when Mr is merged, the pipeline will run again on main

## Integration Tests

- How can we test that our website is working correctly?

```console
stages:
    - build
    - test

build website:
    image: node:16-alpine // a slimmed down docker image for node version 16. we need node in order to run yarn
    stage: build
    script:
        - yarn install
        - yarn build
    artifacts:
        paths:
            - build  // the output of the job

test:
    image: node:16-alpine
    stage: test
    script:
        - yarn global add serve // need to add serve from yarn
        - apk add curl // need to add curl from the 'alpine package manager' - apk.
        - serve -s build & // the ampersand means it rund in the background and will terminate upon the next command. We serve the build files here.
        - sleep 10 // curl doesn't wait for anything, so we have to sleep here for a bit before the server starts
        - curl http://localhost:3000 | grep "React App" // curl downloads the html of the website, and passes this to grep, and we can serch for the title of the page
```
