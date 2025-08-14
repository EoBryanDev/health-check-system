# Requirements Analysis

## Function Requiments

- Create a web server app to monitoring remote services healthy
- Periodically, the application must check service's health
- All responses must be consisted on DB

- Create a web client app to list health check services log
- Create table ordenation
- Create filters table filter

- Create a README summarizing architectural decisions, dev dependencies and how to startup the solution

## Non-Function Requirements

- Admin must be able to stop/start job
- Admin must parametrize what's "too slow"
- Admin should be able to add a new service to monitoring list
- Admin should be able to remove an existing service from monitoring list
- Response's status must return with
  - Caller (sys or http)
  - Status code;
  - Requirer_Id (default: uuid (system));
  - Request timestamp;
  - Reponse timestamp;
  - Interval;
  - RequestInfo:
    - url tested;
- Responses 2xx must be logged with success flag
- Responses not 2xx must be logged with error flag
- Responses 2xx but with delaytime over the parameter must be logged with warning flag
- Block http request when job is running
- Create backend route to list logs with pagination params
- Ordernable by create date
- Create filters:
  - services
  - status: success, warning, error
- export backend metrics
- use cors
- use rate-limiter

## Design Requirements

- Use NodeJS to build the solutions
- Use any NodeJS webserver framework: Express, Fastify, Hapi, Koa, etc...
- Use lib NodeCron to run health checker service
- Use Redis to manage check_services call (if is running do not return 500 to http request)
- Compile frontend application in a docker image
- Compile backend application in a docker image
- Compile db in a docker image
- Manifest to up all containers compiled in docker_compose
- Use Zod to check http body, params and query
- Use Zod to check front end config params
