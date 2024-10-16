# Employee Skill Tracker

Employee Skill Tracker is a full-stack application designed to help organizations manage employee skills and track training sessions efficiently.

## Project Structure

This project consists of two main parts:

- `backend/`: A Ruby on Rails API
- `frontend/`: A Next.js React application

## Getting Started

### Prerequisites

- Ruby 3.x
- Node.js 14.x or later
- PostgreSQL

### Setting up the Backend

1. Navigate to the backend directory:

   ```
   cd employee_skill_tracker
   ```

2. Install dependencies:

   ```
   bundle install
   ```

3. Set up the database:

   ```
   rails db:create db:migrate db:seed
   ```

4. Start the Rails server:
   ```
   rails server
   ```

The API will be available at `http://localhost:3000`.

### Setting up the Frontend

1. Navigate to the frontend directory:

   ```
   cd employee-skill-frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

The frontend will be available at `http://localhost:3001`.

## Features

- User authentication
- Employee management
- Skill tracking
- Training session management
- Metrics visualization
