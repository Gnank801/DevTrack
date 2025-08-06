
# DevTrack – Distributed Bug-Tracking SaaS

DevTrack is a comprehensive, microservices-based bug tracking application designed to simulate a professional development environment. It features a full-stack architecture with a React frontend, multiple Python backend services, and a complete CI/CD pipeline for automated testing.

## Screenshots

**Login Page**
![Login Page](https://github.com/user-attachments/assets/fcf6795b-1cc4-4385-8f29-ed4cf0fd3b2f)

**Project Dashboard**
![Project Dashboard](https://github.com/user-attachments/assets/51472bb7-510f-44ed-9d55-20f6197ae70d)

**Issue Board**
![Issue Board](https://github.com/user-attachments/assets/a60845cc-55ac-4dec-bed7-a0524f8af4f3)

**Issue Detail & Comments**
![Issue Detail Page](https://github.com/user-attachments/assets/cfd362ab-9c13-470b-8e91-bd2324360648)

**GitHub Actions CI Pipeline**
![CI Pipeline](https://github.com/user-attachments/assets/14522cb2-9c9f-48e7-83d1-4175828a049c)

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Python, Flask, Gunicorn
- **Services:**
  - **Gateway:** NGINX
  - **Authentication Service:** PostgreSQL, JWT
  - **Project Service:** PostgreSQL
  - **Issue Service:** PostgreSQL
  - **Analytics Service:** MongoDB
- **Containerization:** Docker, Docker Compose
- **CI/CD:** GitHub Actions, Pytest

## Features

- **Microservice Architecture:** Fully containerized services for authentication, projects, issues, and analytics.
- **User Authentication:** Secure user registration and login using JWT (JSON Web Tokens).
- **Project & Issue Management:** Full CRUD (Create, Read, Update, Delete) functionality for projects and issues, including a commenting system.
- **Data Analytics:** An analytics service that logs key events (like project creation) to a MongoDB database.
- **Automated Testing:** A complete suite of unit tests for all core backend services.
- **Continuous Integration (CI):** A GitHub Actions pipeline that automatically runs all tests on every push to the `main` branch.

## Running Locally

To run this project locally, you will need Docker and Docker Compose installed.

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/Gnank801/DevTrack.git](https://github.com/Gnank801/DevTrack.git)
    cd DevTrack
    ```

2.  **Create an environment file:**
    Copy the `.env.sample` file to a new file named `.env`.
    ```sh
    cp .env.sample .env
    ```

3.  **Build and run the containers:**
    ```sh
    docker compose up --build -d
    ```

4.  **Access the application:**
    The application will be available at `http://localhost`.


