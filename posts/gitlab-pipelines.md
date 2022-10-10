---
title: 'Gitlab Pipelines'
---

::: info
Course Link: https://www.freecodecamp.org/news/devops-with-gitlab-ci-course/
:::

Gitlab pipelines are a set of steps to assemble a software product. Gitllab starts a pipeline when it sees a pipeline definition file,
called ==.gitlab-ci.yaml==. This is the configuration file for the pipeline, which is written in YAML. Everytime we make changes to the codebase, a pipeline is executed.
The pipeline is essentially a set of jobs that are run in sequence to assemble a software product.

### Basic Job

```console
test:
    script: echo "hello world"
    - echo "hello world"
```

- 'test' is the job
- 'script' part where we right commands
- using a dash below the script allows us to right multiple commands.
- needs to be a space after the -.

### Basic Job - building a laptop

```console
build laptop:   // name of the job
    image: alpine     // name of the docker image to use. alpine is a lightweight distribution.
    script:
        - echo "build a laptop"
        - mkdir build
        - touch build/computer.txt     // touch modifies the timestamp of a file. if the file doesn't exist, it will create an empty file.
        - echo "mainboard" >> build/computer.txt // take output from one command and append to a specified a file
        - cat build/computer.txt   // cat => concatenate. can be used creating, modifying contents of a file.
        - echo "keyboard" >> build/computer.txt
        - cat build/computer.txt
```

### What is YAML?

It is a superset of json, a human readable data interchange format. It is mostly used for storing configuration.

- It follows a key/value storage principle (==key: value==) The space is important.
- Also called a mapping
- Lists are called sequences
- Uses indentation for scope

### What is a shell?

- Our pipeline jobs are essentially run on linux containers, and we use the command line interface (CLI) to issue commands.
- The CLI that computers have is called the shell.
- It is basically the outer layer of the systeml; the only part that we can see and interact with.
- Wen using gitlab CI, we are defining an automatic set of commands to be done in order.

## Gitlab Architecture

There are two main parts that we are concerned with:

- The server, which manages the exectuion of pipelines and stores the results. It knows what needs to be done, but passes this over to the runners.

- The runner, executes the jobs.

What does the runner do?

- It retrieves a set of instructions from the server.
- Downloads and starts the docker image specified.
- Gets the files from git repo.
- Run all the commands and reports back to the server.
- Then destory docker image.
- The git repo will not contain any files created during the execution.
- All jobs run in a container, which allows isolation and flexibility

::: info
All new jobs are created with new docker image, run commands, then the image is destroyed.
:::

### Pipeline stages

Adding stages to a pipeline:

```console
stages:  // define the stages here
    - build
    - test

build laptop:
    image: alpine
    stage: build // add the stage here
    script:
        - echo "build a laptop"
        - mkdir build
        - touch build/computer.txt
        - echo "mainboard" >> build/computer.txt
        - cat build/computer.txt
        - echo "keyboard" >> build/computer.txt
        - cat build/computer.txt

// This job will fail as it can't read what happened in the previous job
test laptop:
    image: alpine
    stage: test // add the stages here
    script:
        - test -f build/computer.txt // will test that a file exists
```

### Job Artifacts

Artifacts are essentially the result of the job, the output.
Generally they are something that comes out of the job that we want to save, to be used in another job, or tested somehow.
Remember that each job is a container, and is destroyed as soon as it is finished.

```console
build laptop:
    image: alpine
    stage: build
    script:
        - echo "build a laptop"
        - mkdir build
        - touch build/computer.txt
        - echo "mainboard" >> build/computer.txt
        - cat build/computer.txt
        - echo "keyboard" >> build/computer.txt
        - cat build/computer.txt
    artifacts:    // saves the output specified to the coordinator/server so can be used in the next job/container
        paths:
             - build

test laptop:
    image: alpine
    stage: test
    script:
        - test -f build/computer.txt
```

The next job to start will be able to access the artifacts from the previous job, basically copying files from job to another. We can view these files on the right hand side of the job page.

```console
test laptop:
    image: alpine
    stage: test
    script:
        - test -f build/computer.txt
        - grep "mainboard" build/computer.txt // allows us to search for a string in a file.
```

### Variables in jobs

We can set local variable within a job like this:

```console
build laptop:
    image: alpine
    stage: build
    script:
        - build_file_name=laptop.txt    // define variable here
        - echo "build a laptop"
        - mkdir build
        - touch build/$build_file_name
        - echo "mainboard" >> build/$build_file_name // use variable with a $. scope is local; only available in this script
        - cat build/$build_file_name
        - echo "keyboard" >> build/$build_file_name
        - cat build/$build_file_name
    artifacts:
        paths:
             - build
```

OR

```console

build laptop:
    image: alpine
    stage: build
    variables:
        build_file_name: laptop.txt  // define variables here
    script:
        - build_file_name=laptop.txt
        - echo "build a laptop"
        - mkdir build
        - touch build/$build_file_name
        - echo "mainboard" >> build/$build_file_name
        - cat build/$build_file_name
        - echo "keyboard" >> build/$build_file_name
        - cat build/$build_file_name
    artifacts:
        paths:
             - build
```

But a better approach is to set global variables, which can be accessed by all the jobs:

```
variables:
    build_file_name: laptop.txt

build laptop:
    image: alpine
    stage: build
    script:
        - build_file_name=laptop.txt
        - echo "build a laptop"
        - mkdir build
        - touch build/$build_file_name
        - echo "mainboard" >> build/$build_file_name
        - cat build/$build_file_name
        - echo "keyboard" >> build/$build_file_name
        - cat build/$build_file_name
    artifacts:
        paths:
             - build
```

### Basic principles of structuring a pipeline

- "failing fast". This means detecting failures early. Obvious things, like unit tests, should be done first.
- Be careful running jobs in parallel - jobs will still run even though a parallel job has failed.
- "dependencies between jobs" some jobs depend on others.
