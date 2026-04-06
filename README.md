# Shift Allocation Automation System

A work-in-progress operations app for employee pool management, daily allocation, and shift coverage overview.

## Project Goal

The goal of this project is to replace spreadsheet-style shift coordination with one clearer workflow:

- manage employees and their training records
- add available people to the daily pool
- activate slots and special tasks for the current shift
- assign employees to active work areas
- review coverage and export the result

## Current Product Scope

The application currently includes these main areas:

- `Dashboard`: operational overview with live coverage, open work, and readiness summary
- `Employees`: employee list, filters, and add-to-pool workflow
- `Allocation`: slot activation, special task activation, automatic allocation, manual slot assignment, CSV export, and reset flow
- `Settings`: placeholder page for future configuration

Removed placeholders:

- `History`
- `Reports`

## Current Status

This is an MVP frontend in active development, with a backend foundation now being added.

What already works:

- employee management in the frontend
- daily pool selection
- allocation setup and board split into separate tabs
- manual employee assignment to active slots
- allocation reset and CSV export
- dashboard overview based on current allocation state

What is still in progress:

- persistent backend-driven data
- authentication and authorization
- production database integration
- AWS deployment

## Tech Stack

Frontend:

- React 19
- TypeScript
- Vite 7
- Tailwind CSS 4
- ESLint 9

Backend foundation:

- Node.js
- Express
- Apollo Server
- GraphQL
- PostgreSQL client (`pg`)

## Local Development

### Frontend

Requirements:

- Node.js 20+
- npm

Run the frontend:

```bash
npm install
npm run dev
```

Useful frontend scripts:

```bash
npm run build
npm run preview
npm run lint
```

### Backend

The backend scaffold lives in `src/server`.

Run the backend:

```bash
cd src/server
npm install
npm run dev
```

Current backend endpoints:

- `GET /health`
- `POST /graphql`

The backend expects an `.env` file in `src/server/` with:

```env
PORT=4000
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DB_NAME
```

Example health check:

```bash
curl http://localhost:4000/health
```

## GraphQL Foundation

The initial backend setup includes:

- a GraphQL schema for `Employee`
- a `health` query
- an `employees` query
- an `addEmployee` mutation

Current server structure:

```text
src/server/
  src/
    index.ts
    db/
      client.ts
    schema/
      typeDefs.ts
      resolvers.ts
```

## Frontend Structure

```text
src/
  app/
    layout/                 # app shell, sidebar, page types
  components/
    ui/                     # shared UI components
  features/
    AllocationPage/         # daily slot and task allocation
    employees-page/         # employee list and add employee flow
    setting-page/           # future app settings
    shift-planner/          # dashboard / overview module
  models/                   # shared domain types
  services/                 # local storage utilities
  utils/                    # helper functions
  App.tsx                   # top-level page mapping
```

## Architecture Notes

- The frontend is feature-based.
- The current frontend still uses local state and local storage for the main allocation workflow.
- The backend is being introduced incrementally instead of replacing everything at once.
- The long-term target is AWS deployment with managed persistence and Cognito-based authentication.

## Planned Next Steps

- connect frontend employee data to the backend
- move allocation state from local storage to the backend
- add PostgreSQL persistence
- add authentication with Amazon Cognito
- deploy frontend and backend to AWS

## Portfolio Context

This project is intended to solve a real operational problem and to serve as a fullstack learning project.
It is intentionally being developed in stages:

1. working frontend MVP
2. backend foundation
3. database integration
4. authentication
5. AWS deployment
