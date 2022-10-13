Introduction to AWS Elastic Beanstalk

- can rent virtual machines from AWS, with cpu and disk storage

- instead of providing all the files, we will provide the entire application, self contained in a docker container

Creating a new AWS EB app

- search for elastic beanstalk
- creat new application
- "Platform" should be docker
- use a "sample application" to start off with

- creates a new environment for the application. Applications are an umbrella for environments
- search for EC2 (elastic compute)
- in background?

  - ec2 - virtual servers.

- in repo, we have a `Dockerrun.aws.public.json` file
- contains config, manifst file, tells AWS which container to run.

Creating the Dockerfile

- add a DockerFile to the repo

```
FROM nginx:1.21.5-alpine    // this is our webserver
COPY build /usr/share/nginx/html  // add the files to the directory nginx expects
```

Building the Docker image

```
build docker image:
    stage: package
    image: docker:20.10.12
    services:
        - docker:20.10.12-dind
    script:
        - docker build -t $CI_REGISTRY_IMAGE -t $CI_REGISTRY_IMAGE:$APP_VERSION .   // adding the tags
        - docker image ls
```

Docker Container Registry

add a docker image to the gitlab private registry

```
stages:
    - build
    - package

variables:
    APP_VERSION: $CI_PIPELINE_IID

build website:
    image: node:16-alpine
    stage: build
    script:
        - yarn install
        - yarn lint
        - yarn test
        - yarn build
        - echo $APP_VERSION > build/version.html
    artifacts:
        paths:
            - build

build docker image:
    stage: package
    image: docker:20.10.12
    services:
        - docker:20.10.12-dind
    script:
        - echo $CI_REGISTRY_PASSWORD | docker login -u $CI_REGISTRY_USER $CI_REGISTRY --password-stdin  // login to registry,  using a pipe for password ensures security
        - docker build -t $CI_REGISTRY_IMAGE -t $CI_REGISTRY_IMAGE:$APP_VERSION .
        - docker image ls
        - docker push --all-tags $CI_REGISTRY_IMAGE   // push the docker image to the registry
```

Testing the Container

```
stages:
    - build
    - package
    - test

variables:
    APP_VERSION: $CI_PIPELINE_IID

build website:
    image: node:16-alpine
    stage: build
    script:
        - yarn install
        - yarn lint
        - yarn test
        - yarn build
        - echo $APP_VERSION > build/version.html
    artifacts:
        paths:
            - build

build docker image:
    stage: package
    image: docker:20.10.12
    services:
        - docker:20.10.12-dind
    script:
        - echo $CI_REGISTRY_PASSWORD | docker login -u $CI_REGISTRY_USER $CI_REGISTRY --password-stdin
        - docker build -t $CI_REGISTRY_IMAGE -t $CI_REGISTRY_IMAGE:$APP_VERSION .
        - docker image ls
        - docker push --all-tags $CI_REGISTRY_IMAGE

test docker image:
    stage: test
    image: curlimages/curl  // simple image that uses curl
    services:
        - name: $CI_REGISTRY_IMAGE:$APP_VERSION   // how do we start this container?. this starts the docker container that we have just created. Which will create a http server. This service will help us start the image
          alias: website // just a friendly name
    script:
        - curl http://website/version.html | grep $APP_VERSION  // docker image is starting an http sever, and the file uploaded is available and contains version we expected.
```

Private Registry Authentication

Store the docker information and auth info in the S3 bucket created.

```
deploy to production:
    image:
        name: amazon/aws-cli:2.4.11
        entrypoint: [""]
    stage: deploy
    environment: production
    script:
        - aws --version
        - yum install -y gettext   // need to install this to read text
        - export DEPLOY_TOKEN=$(echo $GITLAB_DEPLOY_TOKEN | tr -d "\n" | base64) // this deploy token is a gitlab variable which we need to store in the auth.json file.
        - envsubst < templates/Dockerrun.aws.json > Dockerrun.aws.json // env substition
        - envsubst < templates/auth.json > auth.json
        - cat Dockerrun.aws.json
        - cat auth.json
        - aws s3 cp Dockerrun.aws.json s3://$AWS_S3_BUCKET/Dockerrun.aws.json
        - aws s3 cp auth.json s3://$AWS_S3_BUCKET/auth.json
```

// taking the dockerrun file and creating a new application
// tell eb which environment we want to update (might have more than one)
Deploying to AWS EB

```
deploy to production:
    image:
        name: amazon/aws-cli:2.4.11
        entrypoint: [""]
    stage: deploy
    environment: production
    script:
        - aws --version
        - yum install -y gettext
        - export DEPLOY_TOKEN=$(echo $GITLAB_DEPLOY_TOKEN | tr -d "\n" | base64)
        - envsubst < templates/Dockerrun.aws.json > Dockerrun.aws.json
        - envsubst < templates/auth.json > auth.json
        - cat Dockerrun.aws.json
        - cat auth.json
        - aws s3 cp Dockerrun.aws.json s3://$AWS_S3_BUCKET/Dockerrun.aws.json
        - aws s3 cp auth.json s3://$AWS_S3_BUCKET/auth.json
        - aws elasticbeanstalk create-application-version --application-name "$APP_NAME" --version-label $APP_VERSION --source-bundle S3Bucket=$AWS_S3_BUCKET, S3Key=Dockerrun.aws.json // taking the dockerrun file and creating a new application
        --source-bundle S3Bucket=$AWS_S3_BUCKET, S3Key=Dockerrun.aws.json
        - aws elasticbeanstalk update-environment --application-name "$APP_NAME" --version-label $APP_VERSION --environment-name $APP_ENV_NAME // tell eb which environment we want to update (might have more than one)
Deploying to AWS EB
```

Post Deployment Testing

```
stages:
    - build
    - package
    - test
    - deploy

variables:
    APP_VERSION: $CI_PIPELINE_IID


// Building our code, compiling it, testing it.
// Outputing some artifacts
build website:
    image: node:16-alpine
    stage: build
    script:
        - yarn install
        - yarn lint
        - yarn test
        - yarn build
        - echo $APP_VERSION > build/version.html
    artifacts:
        paths:
            - build


// Then create a docker image, essentially create an application
// Here we run "docker build", which runs the Dockerfile (the . at the end of the file says we are in this directory), which copies the "build" folder to nginx and runs a webserver
// We then push the docker image to the gitlab registry
build docker image:
    stage: package
    image: docker:20.10.12
    services:
        - docker:20.10.12-dind
    script:
        - echo $CI_REGISTRY_PASSWORD | docker login -u $CI_REGISTRY_USER $CI_REGISTRY --password-stdin
        - docker build -t $CI_REGISTRY_IMAGE -t $CI_REGISTRY_IMAGE:$APP_VERSION .
        - docker image ls
        - docker push --all-tags $CI_REGISTRY_IMAGE


// We can test the docker image by using services -> initiates an image
test docker image:
    stage: test
    image: curlimages/curl
    services:
        - name: $CI_REGISTRY_IMAGE:$APP_VERSION
          alias: website
    script:
        - curl http://website/version.html | grep $APP_VERSION

deploy to production:
    image:
        name: amazon/aws-cli:2.4.11
        entrypoint: [""]
    stage: deploy
    variables:
        APP_NAME: My website
        APP_ENV_NAME: Mywebsite-env
    environment: production
    script:
        - aws --version
        - yum install -y gettext
        - export DEPLOY_TOKEN=$(echo $GITLAB_DEPLOY_TOKEN | tr -d "\n" | base64)
        - envsubst < templates/Dockerrun.aws.json > Dockerrun.aws.json
        - envsubst < templates/auth.json > auth.json
        - cat Dockerrun.aws.json
        - cat auth.json
        - aws s3 cp Dockerrun.aws.json s3://$AWS_S3_BUCKET/Dockerrun.aws.json
        - aws s3 cp auth.json s3://$AWS_S3_BUCKET/auth.json
        - aws elasticbeanstalk create-application-version --application-name "$APP_NAME" --version-label $APP_VERSION --source-bundle S3Bucket=$AWS_S3_BUCKET,S3Key=Dockerrun.aws.json
        - aws elasticbeanstalk update-environment --application-name "$APP_NAME" --version-label $APP_VERSION --environment-name $APP_ENV_NAME
        - aws elasticbeanstalk wait update-environment --application-name "$APP_NAME" --version-label $APP_VERSION --environment-name $APP_ENV_NAME  // wait for the env to finish updating
        - curl $CI_ENVIRONMENT_URL/version.html | grep $APP_VERSION   // testing the URL
```

CI/CD Recap
