# Shift Allocation Automation System

A frontend application for shift planning and employee management.

## Project Goal

The system is designed to improve day-to-day shift management by enabling:
- fast assignment of employees to roles and tasks,
- clear visibility into staffing and coverage,
- one place for people management (`Employees`),
- a foundation for history, reporting, and settings.

## Problem It Solves

In many teams, shift planning is still handled manually (spreadsheets, chat messages, ad-hoc notes), which leads to:
- assignment errors,
- no single source of truth,
- limited visibility of employee status and availability,
- poor traceability of changes over time.

This project consolidates those workflows into one operational interface.

## Current Scope

- `Shift Planner`: configure shifts and review generated assignments.
- `Employees (People)`: add employees and display list items (photo, first name, last name, ID).
- `History`: placeholder for scheduling history and audit events.
- `Reports`: placeholder for KPI summaries and exports.
- `Settings`: basic settings page.

## Technology Stack

- React 19
- TypeScript 5
- Vite 7
- Tailwind CSS 4
- ESLint 9

## Local Development

Requirements:
- Node.js 20+ (LTS recommended)
- npm

Run locally:

```bash
npm install
npm run dev
```

Useful scripts:

```bash
npm run build   # production build
npm run preview # preview production build
npm run lint    # static analysis
```

## Project Structure

```text
src/
  app/
    layout/                 # AppLayout, Sidebar, page types
  components/
    ui/                     # shared UI components (Navbar, Button, Upload, etc.)
  features/
    employees-page/         # employees view + Add Employee modal
    shift-planner/          # core shift planning module
    history-page/           # history placeholder
    reports-page/           # reports placeholder
    setting-page/           # settings
  models/                   # domain models (e.g. Employee)
  App.tsx                   # active-page mapping
  main.tsx                  # application entry point
```

## Architecture Overview

- The app follows a `feature`-based structure.
- `App.tsx` switches views based on the active tab.
- `AppLayout` provides the shared shell (navbar + sidebar + content area).
- Local state is managed at feature-page level (e.g., employee list in `EmployeesPage`).

## Project Status

Frontend MVP in active development.  
Current focus areas: `Shift Planner` and `Employees`.
