# RoleTrack – Role-Based Employee Activity Dashboard

RoleTrack is a frontend-only web application that simulates an internal employee management and activity tracking system with strict role-based access control.

The project is built to demonstrate frontend engineering fundamentals: clean architecture, component design, state management, role isolation, UI logic, and data persistence.

---

## Live Demo
https://role-track-livid.vercel.app/

## GitHub Repository
https://github.com/nithyasreeee/RoleTrack.git

---

## Tech Stack

- React (Vite)
- React Router
- Context API + useReducer
- Tailwind CSS
- localStorage (data persistence)
- Vercel (deployment)

Constraints followed:
- No UI libraries
- No templates or admin dashboards
- No backend
- Hooks-only functional components

---

## Features

### Authentication (Frontend Simulation)
- Role-based login: Admin / Manager / Employee
- Session persistence using localStorage
- Manual session expiry handling
- Logout support

### Role-Based Access Control
- Admin: manage employees + review activities
- Manager: review activities + read-only employees
- Employee: view profile + submit activities
- Route-level protection to prevent URL manipulation

### Employee Management
- Auto-generated employee IDs
- Add employees (admin only)
- Active / inactive status
- Search, filter, sort
- Manual pagination logic

### Activity Tracking
- Employees submit daily activities
- Admin / Manager approve or reject
- Status tracking (pending / approved / rejected)
- Optional remarks

### UI & UX
- Responsive dashboard layout
- Collapsible animated sidebar
- Dark / light mode toggle (persistent)
- Modal forms
- Loading and empty states
- Basic animations and transitions
- Accessible form labels

### Data Handling
- Global state via Context API
- Reducer-based updates
- Persistence using localStorage

---

## Project Architecture

router/ → Routing & role protection
context/ → Global state (auth, employees, activities, theme)
pages/ → Route-level screens
modules/ → Business features (employees, activities)
components/ → Reusable UI components
utils/ → Helpers (storage, ids)

---

Design principles:

- Feature-based separation
- No prop drilling
- UI separated from business logic
- Predictable state updates via reducers
- Scalable structure

---

## State Management Approach

- useContext → global access
- useReducer → complex state (employees, activities)
- useState → local UI state
- useEffect → persistence and side effects

This avoids Redux while keeping state transitions explicit and maintainable.

---

## Role Handling Strategy

- Role stored in session object
- Route-level guards using ProtectedRoute
- UI conditional rendering + route blocking
- No cross-role access via direct URL navigation

---

## Persistence Strategy

All data is stored in localStorage:

- Session information
- Employee records
- Activity records
- Theme preference

This allows refresh-safe usage without a backend.

---


## Trade-offs

- No backend → data is device-specific
- Authentication is simulated
- Charts implemented without external libraries
- UI kept minimalistic to prioritize logic and architecture

---

## Setup Instructions

```bash
npm install
npm run dev
