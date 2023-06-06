This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Beat Sheet

## Running for development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker image for api

This project was build consuming an api running in a docker container provided by @fmatar

### Running the Docker api

#### Prerequisites

- Docker
- Clone the service from: https://github.com/fmatar/beatsheet-exercise

git clone from the repo

    git clone git@github.com:fmatar/beatsheet-exercise.git

Start the backend

    cd ./beatsheet-exercise
    docker compose up -d

#### Access the service and documentation:

- The service is running at :http://localhost:8080
- The Swagger documentation is available at :http://localhost:8080/swagger-ui
