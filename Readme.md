# Lambda serverless function

This application was build as guide to create a lambda serverless function using node.js. It is a simple project that allows you to create a lambda function that will return a simple message.

## Requirements

- Node.js
- AWS account

## In AWS Lambda

- Create a new lambda function, make sure the lambda function will have index.handler as starting point.

## In Aws API Gateway

- Create a new API Gateway endpoint tha will proxy the request to the lamda function , you have to make sure api gateway have the permisions to invoke the lambda function.You can check the role of lambda function to see the role that is using.

- Also in the role there a setting to allow role to be taken for the API Gateway.

## Runs this project

- Set AWS credential in your machine (https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html)
- `npm i`
- Change .env.example to .env and set the values
- `npm run start` will start the project locally.

## To deploy using DockerFile

This is the proper way to deploy inside this monorepo.
Dependencies get added to the root of the mono repo and then the docker file will build the project and deploy it to the lambda function.
Make sure docker is running.

```
docker build -t lambda-docker .
docker run lambda-docker
```

- docker run lambda-docker will execute `npm run deploy` is a script that will grab all content of this project zip it and deploy it to the lambda function. Using credentials from .env file and function name from .env file.

## To be aware

I spend a lot of time trouble shooting this , but it seems lambda rest do not work using "/" root path so when you test this please test in a different path like /test or /hello.

## About Recaptcha

Test site and secret key for recaptcha this was picked up from google docs

https://www.youtube.com/watch?v=CKoCRQPfvaY&t=888s

- Site key: 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
- Secret key: 6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe

## Asynchandler

Wraps endpoint functionany error and return a json response with the error message and status code.

```
throw new CustomError(403, errorMsg);

```

status is in integer and 500 as default.

message is in string and "Internal Server Error" as default.
