# Task Management Application

This project is a full-stack task management application that uses:
- **Angular** for the frontend.
- **Django** (Python) for the backend REST API.
- **PostgreSQL** as the database.
- **Docker Compose** to orchestrate the containers.

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started with Docker](#getting-started-with-docker)
- [How the Code Works](#how-the-code-works)
  - [Angular Frontend](#angular-frontend)
  - [Django Backend](#django-backend)
- [Running Tests](#running-tests)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Project Structure
There are two parts here, one folder containing the Django for the backend anda another is Angular framework on the frontend. 


## Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your system.
- [Docker Compose](https://docs.docker.com/compose/) (Docker Desktop includes it on most platforms).
- *(Optional)* [Node.js](https://nodejs.org) installed for local Angular development.
- *(Optional)* [Python 3](https://www.python.org) installed for local Django development.

## Getting Started with Docker

This project is containerized using Docker Compose, which defines three services:
- **db**: PostgreSQL database.
- **backend**: Django backend API.
- **frontend**: Angular frontend served by Nginx.

### 1. Build and Run Containers

Open a terminal in the project root and run:

```bash
docker-compose down -v        # Stop and remove existing containers and volumes (if any)
docker-compose build --no-cache # Build fresh images for all services
docker-compose up -d            # Start all containers in detached mode

This command will:

Build the backend image using backend/Dockerfile, install Python dependencies, apply migrations, and run Django on port 8000.
Build the frontend image using frontend/Dockerfile, compile the Angular production build, and serve it via Nginx on port 80.
Start the db container running PostgreSQL with the defined credentials.

2. Accessing the Application
Frontend: Open your browser and navigate to http://localhost. The Angular app is served by Nginx.
Backend API: The Django API is accessible inside the Docker network as http://backend:8000/api/… (Nginx proxies API calls from the frontend, so you usually don’t access it directly).
Note: In the production build (environment.prod.ts), the Angular code should reference API calls using a relative URL (e.g. /api/tasks/) so that Nginx properly proxies them to the backend container.


How the Code Works
Angular Frontend
Entry Point:
The Angular application is built using Angular CLI. The source code is located in the frontend/src folder.

Environments:

src/environments/environment.ts: Used for development (e.g., apiUrl: 'http://localhost:8000/api').
src/environments/environment.prod.ts: Used for production. It should use a relative URL (e.g., apiUrl: '/api') so that Nginx proxies API calls.
Task Service and Components:

The TaskService handles HTTP requests (GET, POST, PUT, DELETE) to the backend.
The TaskListComponent and other components display and update tasks using Angular Material.
Docker Build:

The frontend Dockerfile first builds the Angular application in a Node.js container, then copies the production build into an Nginx image.
Nginx is configured (via nginx.conf) to serve static files and proxy API requests (from /api/) to the backend container.


Django Backend
Project Structure:
The Django backend code is located in the backend/ folder.

Configuration:

Django settings are in backend/config/settings.py.
Environment variables (loaded with python-dotenv) define database credentials and other settings.
API Endpoints:

The tasks app defines models, serializers, and views to create a REST API using Django REST Framework.
URL patterns (in backend/config/urls.py and tasks/urls.py) expose endpoints such as /api/tasks/ for listing, creating, updating, and deleting tasks.
Docker Build:

The backend Dockerfile installs Python dependencies, copies the code, runs database migrations, and starts the Django development server on port 8000.
Database:

PostgreSQL is used as the database and runs as a separate Docker service (db).


Running Tests
Django Backend Tests
Run the Django tests inside the backend container:

bash
Copy
docker-compose exec backend python manage.py test tasks
This command executes your Django tests (found in backend/tasks/tests.py or within a tests/ folder).



