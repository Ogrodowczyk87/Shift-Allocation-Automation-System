# Shift Allocation Automation System

Shift Allocation Automation System is a full-stack warehouse operations app for employee management, daily shift allocation, task rotation, and coverage monitoring.

The project is designed to replace spreadsheet-based shift planning with a clearer workflow backed by persistent data and AWS infrastructure.

## Features

- employee list with filtering and pool selection
- add employee flow with training tags and photo support
- allocation board for slots and special tasks
- induct task support and grouped board display
- automatic allocation with rotation rules
- manual slot assignment
- assignment history stored in PostgreSQL
- dashboard with coverage and rotation compliance overview
- CSV export for planner output

## Current Architecture

### Frontend

- React 19
- TypeScript
- Vite 7
- Tailwind CSS 4

### Backend

- Node.js
- Express 5
- Apollo Server
- GraphQL
- PostgreSQL client (`pg`)

### AWS / Cloud

- Amazon RDS PostgreSQL for persistent data
- AWS App Runner for backend hosting
- planned: Amazon S3 for employee photo storage
- planned: AWS Amplify for frontend hosting
- planned: Amazon Cognito for authentication

## Product Areas

- `Dashboard`  
  coverage, open work, rotation compliance, planner summary

- `Employees`  
  employee list, filters, add employee flow, add-to-pool selection

- `Allocation`  
  slot activation, special task activation, induct task handling, auto allocation, manual assignment, CSV export

- `Settings`  
  placeholder for future configuration

## What Works Now

- backend and frontend build successfully
- GraphQL API is connected to PostgreSQL / RDS
- assignment history is persisted in the database
- dashboard reads assignment history from the backend
- allocation flow saves history through GraphQL
- rotation blocks repeating the same task on consecutive days
- backend is deployable on AWS App Runner

## In Progress

- persistent employee storage end-to-end
- employee photo upload to S3
- frontend deployment to AWS Amplify
- Cognito login and route/API protection
- tighter AWS networking and security hardening

## Local Development

### Frontend

Requirements:

- Node.js 20+
- npm

Run:

```bash
npm install
npm run dev
```

Useful commands:

```bash
npm run build
npm run preview
npm run lint
```

Frontend environment:

```env
VITE_API_URL=http://localhost:4000/graphql
```

### Backend

Backend lives in:

```text
src/server
```

Run:

```bash
cd src/server
npm install
npm run dev
```

Build:

```bash
cd src/server
npm run build
```

Backend environment example:

```env
PORT=4000
DATABASE_URL=postgres://USER:PASSWORD@HOST:5432/postgres
AWS_REGION=eu-west-1
S3_BUCKET_NAME=YOUR_EMPLOYEE_PHOTOS_BUCKET
```

## Backend Endpoints

- `GET /health`
- `POST /graphql`

Example health check:

```bash
curl http://localhost:4000/health
```

## GraphQL Scope

Current GraphQL includes:

- `health`
- `employees`
- `assignmentHistory(date)`
- `addEmployee`
- `archiveEmployee`
- `createEmployeePhotoUpload`
- `saveAssignmentHistory`

## Database

The backend uses PostgreSQL and currently includes:

- `employees`
- `assignment_history`

SQL files:

```text
src/server/sql/create-assignment-history.sql
src/server/sql/alter-employees-for-production.sql
```

Migration scripts:

```text
src/server/scripts/run-assignment-history-migration.ts
src/server/scripts/run-employees-migration.ts
```

## Project Structure

```text
src/
  app/
    layout/
  components/
    ui/
  features/
    AllocationPage/
    employees-page/
    setting-page/
    shift-planner/
  models/
  services/
    api/
    storage/
  utils/
  App.tsx

src/server/
  src/
    db/
    schema/
    storage/
    index.ts
  scripts/
  sql/
```

## AWS Deployment Status

### Already done

- RDS PostgreSQL instance created
- App Runner backend deployment tested successfully
- backend `/health` confirmed against RDS

### Planned next steps

- create S3 bucket for employee photos
- configure App Runner IAM access to S3
- deploy frontend with Amplify
- connect frontend environment to App Runner GraphQL URL
- add Cognito authentication

## Roadmap

1. finish persistent employee flow
2. finish S3 photo upload
3. deploy frontend to Amplify
4. add Cognito authentication
5. add CI/CD and automatic deployments
6. harden production networking and secrets management

## CV / Portfolio Summary

Full-stack warehouse shift planning application built with React, TypeScript, Node.js, Express, GraphQL, PostgreSQL and AWS. Includes employee management, allocation planning, task rotation rules, dashboard reporting, and cloud deployment architecture using RDS, App Runner, S3, Amplify and Cognito.
