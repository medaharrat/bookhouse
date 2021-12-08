# Deploy Container

## Overview

Deploying a project in a cloud environment poses a lot of challenges. One of the biggest challenges is versioning. Errors may arise if the given system has different versions of required packages. This is why deploying the application in a pre-built container is an optimal solution. Containers as opposed to virtual machines are much more light weight and scale better with system resources.

## Usage

You may deploy and run the entire application in a local container if you have `docker` and `docker-compose` installed. You need to have a separate instance of MongoDB running, since the container does not contain the database for security reasons.

### Build and run as different step

```bash
docker-compose build .
docker-compose up
```

### Build and then run every time

```bash
docker-compose up --build
```

### Stop

```bash
docker-compose down
```

## Technical Details

The containerization consists of 3 scripts:

1. `docker-compose.yml`: information about the instancing of the container for docker-compose
2. `Dockerfile`: information about the steps to build a container from the source files
3. `container/start-container.sh`: information about the commands to run when starting the container to run the application

Each of the processes are run in the background with the main thread waiting for them to exit. In case any of them exit, it returns it's exit code to the composer. If it encountered an error, it's the composer's job to determine if it will restart the container or wait for developer input.


> ℹ️ **Note**: When building the container, specific ports are exposed, but they may be remapped later on to standardize them.

# Room API

## Overview

The room API is used to create rooms where users can use voice chat to talk with their interest groups. These rooms are managing the underlying communication infrastructure through `WebSocket` using the `Socket.io` API.

> ℹ️ **Note**: We are using `https` protocol with a self generated TLS certificate for the entire room communication, since browsers only allow access to the user's microphone if the communication is provably encrypted.

## User Management

Every user receives a session token based on their connection using the `Socket.io` API. This is only loosely connected to the user's persistent ID, since one user theoretically may have multiple identifiers in separate rooms (for example administrators may join multiple rooms).

If a connection is dropped or timed out with a user, they will have to apply for a new one once they reconnect. Each user status change, such as connect, disconnect or an update to their settings (e.g.: mute, deafen) will be broadcast to the other participating members to update the user interface.

## Audio streaming

The audio streaming is achieved through the browsers' built-in `MediaStream` object accessed through the navigator.

> ℹ️ **Note**: Before accessing the `MediaStream` API the user has to explicitly accept to be recorded, which halts the execution of the script. For this reason asnync methods may be used.

The audio is only streamed if the user is not muted. In that case all of the chunks are dropped before sending. Sending the chunks is done in certain intervals pre-defined in the configuration file. This allows fine tuning of the latency and package count.

The sound data is periodically fetched from the API as a `Blob` and placed in a buffer. At the time the blobs need to be send, they are converted into a base64 string and sent through the `WebSocket`. These packages are then received on the server and distributed to the non-deafened members of the current room. Upon receiving the packets, they are unpacked and played using the browsers' built-in Audio API.

## Optimization

- Using async functions to transmit and receive the data yielded minimal performance improvements.
- Using WebAssembly to assemble the packages resulted in a performance drop (probably as a result of the time spent invoking the often accessed functions)

## Potential Improvements

*In no particular order of importance*

- Better server-side sanitization, so that only verifiably correct audio packages are transmitted (even though the risk of this causing security problems is minimal).
- Limiting the number of user interactions and sizes of packages.
- Compressing the audio packages before being sent by the client. (zlib?)
- Looking at other transmission methods for optimization.

# Running and Testing Web Application

# Bookhouse

### For developers

A VoIP based Progressive Web Application.

### For others

A social platform for book lovers.

## Scripts

In the project directory, you can run:

### Install dependencies

`yarn install`

### Important
The app runs the backend on https, using a self-signed certificate. You might need to allow your browser to show content even if it says it is unsecure.
One more option is to replace both the key and the certificate in ./server/certificate folder.

### Start services

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

1. Start the SocketIO and API Services\
`yarn server`
2. Start the local client service\
`yarn client`

(Run in different terminals)

### With docker
Check <a href='https://gitlab.com/medaharrat/bookhouse/-/wikis/Deploy-Container'>Docker Container</a> page in Wiki.

# Build Testing Pipeline

## Overview

Testing the downloading and building of packages is an essential step to ensure that packages installed in the current work session are properly added to the dependency database and they are available for later download.

## Resolving Packages

The dependencies are automatically installed using the `yarn install` command. This installs the default and the developer dependencies at the same time concurrently. This gives us better performance as opposed to `npm`, which we use to update node and install `yarn globally`. If yarn is inaccessible due to being installed locally or not being property added to the system path, as a quick fix you may run the command using the `npx` helper: `npx yarn install`.

The package resolving step only returns success, if each referenced package could be installed as their given version in `package.json` and `yarn.lock`.

## Building Project

The build step also builds the react server and watches for any errors during the process. If the react server could resolve all dependencies then this step will return success.

# Server Testing Pipeline

## Overview

Server API testing is usually a challenging part of web development. Unit tests rarely yield useful results, since the incoming and outgoing traffic has a wide range of possibilities and often time depend on some other part of the application, such as having the user logged in with a session.

## Technical Details

Our server testing is based on `jest` and `supertest` packages, which together are able to simulate sending requests to the `express` web server, and test the response times, codes, types and contents. We can set set and expect individual headers or explicit or broader contents.

These units we are testing are individual request routes in the broader context of routers. Each test imports a specific router and runs the predefined tests.

> ℹ️ **Note**: This method of testing requires each router to function as a standalone web server. In certain cases however, dummy middleware is needed to bridge gap with sessions.

Each of the tests are run upon calling jest or the `yarn test-server` command.

> ⚠️ **Warning**: `yarn install` must be run at least once to install the required packages on your system.

## Pipelining

The server tests automatically run upon pushing to the repository using GitLab's CI/CD pipelines on the third stage (`tests`). This is done by using a `.gitlab-ci.yml` descriptor file to build a container and start the tests. For optimization, the packages are only installed once in the `build` stage, then they are saved as an artifact for subsequent runs of the application.

Using this method tests may optionally be run during development locally, then they are ran each time the changes are pushed to the repository. If the tests fail on the given branch, that will be visible in the merge request, so we can prevent merging faulty code into the main line branch.

## Potential Improvements

- Testing the routers together, simulating potential actions a user might take during usage.
- Stress testing the application with a large amount of concurrent users using the sight and talking in rooms.

# API Testing

## Overview

The main point of this documentation, to get a wider grasp of the intention of the different schemas and requests, hence it is mandatory to test almost every critical endpoint the project uses.


## Details

As in the [Room API](/Room API) was mentioned, for testing purposes `jest` and `supertest` was used. It requires a connection with `Mongoose` for any database modification purposes, and `JSON` for proper request sending. 

The first evaluation is sending multiple requests, so it should be break into 3 parts

> ℹ️ **Note**: For local testing purposes, the requests was sent on localhost, so these requests are for demonstration purposes

## Create a Room

`POST https://localhost:8000/create`
`Content-Type: application/json`
```json
{
    "title": String,
    "book": JSON object,
    "attendees": Array
}
```

> :warning: **Warning**: If any of the attributes are missing from the JSON object, it will be counted as an error

- If successful: Gets a `201` code, with the created room in a JSON format
- else: It will get a `400` code, and an error message


## Get a Room by ID

`GET https://localhost:8000/:ID`

- If successful: Returns a `201` code, and the representative Room object from the database
- else: If it is not a valid `ObjectID`, It returns a `500` code and a **_"Room not found"_** string, else a `404` code with the same error message

## Delete a Room by ID

`DELETE https://localhost:8000/delete/:ID`

- If successful: Returns a `200` code, and the representative Room object that was deleted from the database
- else: Returns a `500` code with an error message

# API: Authentication

## Overview

In the below requests we are sending requests, to make User changes on the server side (authentication, login, registering and existing User deletion)

## Details

> ℹ️ **Note**: For local testing purposes, the requests was sent on localhost, so these requests are for demonstration purposes

## Signup

`POST https://localhost:8000/api/auth/signup`

`Content-Type: application/json`
```json
{
    firstname: String,
    lastname: String,
    email: String,
    password: String
}
```

> :warning: **Warning**: If any of the attributes are missing from the JSON object, it will be counted as an error

- If successful: Gets a `200` code, with the created User in a JSON format
- else: It will get a `500` code, and an error message


## Login

`POST https://localhost:8000/api/auth/login`

`Content-Type: application/json`
```json
{
    email: String,
    password: String
}
```

- If successful: Returns a `200` code, the representative user object from the database and a generated token
- else: If something is wrong on the server side, It returns a `500` code with an error message, else if the credentials aren't matching it returns a `403` code with an error message: **Email or password is wrong.**

# API User

## Overview

In the [Authentication](Testing/API/Authentication) tab, we defined how and in what format should we send data to the API, but it's backbone is the User schema.

## Get specific User

`GET https://localhost:8000/user/:ID`

- If successful: Gets a `200` code, with the representative User in a JSON format
- else: If the ID format is good, but there is no User by that ID, it returns a `404` code with an error message: **Cannot find user by id: :ID**
- If the ID format is unsatisfactory for a Mongoose ObjectID, it returns a `500` code with an error message

## Delete User

`DELETE https://localhost:8000/user/:ID`

- If successful: Gets a `200` code, and a message: **Deleted user**
> ℹ️ **Note**: If the ID is not valid, or do not point to a correct User, it gets the same message as above
