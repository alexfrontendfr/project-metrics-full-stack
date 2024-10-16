# Employee Skill Tracker

Employee Skill Tracker is a full-stack application designed to help organizations manage employee skills and track training sessions efficiently.

## Project Structure

This project consists of two main parts:

- `employee_skill_tracker/`: A Ruby on Rails API (Backend)
- `employee-skill-frontend/`: A Next.js React application (Frontend)

## Getting Started

### Prerequisites

- Ruby 3.x
- Node.js 14.x or later
- PostgreSQL

### Running the Backend

1. Open a terminal and navigate to the backend directory:

   ```
   cd employee_skill_tracker
   ```

2. Start the Rails server:
   ```
   rails server
   ```

The API will be available at `http://localhost:3000`.

### Running the Frontend

1. Open another terminal and navigate to the frontend directory:

   ```
   cd employee-skill-frontend
   ```

2. Start the development server:
   ```
   npm run dev
   ```

The frontend will be available at `http://localhost:3001`.

## Bypassing Login/Register

For testing purposes, you can use the following credentials to bypass the login/register process:

- Email: test@example.com
- Password: testpassword

## Features

- User authentication
- Employee management
- Skill tracking
- Training session management
- Metrics visualization

## Development Notes

- You don't need to run `rails db:create db:migrate db:seed` every time you close VS Code. This is only necessary when you first set up the project or when there are new database migrations.
- Always ensure both the backend (Rails server) and frontend (Next.js server) are running when working on the project.
- If you make changes to the database schema, you may need to run `rails db:migrate` to apply those changes.
- Remember to remove the test user bypass before deploying to production.
