# What Is Docker?

Docker is a tool that lets you package your applications and all their dependencies into "containers." Think of a container as a lightweight, portable box that holds everything your app needs to run—this way, your app behaves the same on any machine, removing the common “it works on my machine” problem.

---

## Table of Contents
1. [Introduction to Docker](#1-introduction-to-docker)
2. [Project Structure Explained](#2-project-structure-explained)
3. [Setting Up the Environment](#3-setting-up-the-environment)
4. [Dockerfiles: Line-by-Line Breakdown](#4-dockerfiles-line-by-line-breakdown)
5. [Building Docker Images: Commands & Use Cases](#5-building-docker-images-commands--use-cases)
6. [Docker Compose Deep Dive](#6-docker-compose-deep-dive)
7. [Deploying the Application](#7-deploying-the-application)
8. [Advanced Use Cases](#8-advanced-use-cases)
9. [Troubleshooting & Best Practices](#9-troubleshooting--best-practices)
10. [Conclusion](#10-conclusion)

---

## 🌟 Show Your Support
If you found this project helpful, give it a ⭐️!

## 1. Introduction to Docker

### Key Concepts:
- **Image**: A blueprint for containers (e.g., `node:14`).
- **Container**: A running instance of an image.
- **Dockerfile**: A script to build images.
- **Docker Compose**: A tool to manage multi-container apps.

### Why Use Docker?
- **Consistency**: No more "works on my machine" issues.
- **Isolation**: Apps run in separate environments.
- **Portability**: Easily share and deploy anywhere.

---

## 2. Project Structure Explained

```
docker-project
├── backend
│   ├── Dockerfile    # Instructions to build the backend
│   └── server.js     # Node.js server code
├── frontend
│   ├── Dockerfile    # Instructions to build the frontend
│   └── index.html    # HTML file for the UI
├── docker-compose.yml # Defines how to run the app
└── README.md
```

- **Backend**: Handles logic/database (Node.js here).
- **Frontend**: User interface (static HTML served by Nginx).
- **docker-compose.yml**: Orchestrates both services.

---

## 3. Setting Up the Environment

### Installing Docker & Docker Compose
- **Windows/Mac**: Download [Docker Desktop](https://www.docker.com/products/docker-desktop).
- **Linux**: Use package managers (e.g., `apt-get install docker docker-compose`).

### Verify Installation:
```bash
docker --version          # Should show Docker version
docker-compose --version  # Should show Docker Compose version
```

---

## 4. Dockerfiles: Line-by-Line Breakdown

### Backend Dockerfile (`backend/Dockerfile`)
```dockerfile
# Use Node.js version 14 as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files to leverage Docker's caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app code
COPY . .

# Expose port 3000 for the Node.js server
EXPOSE 3000

# Command to start the app
CMD ["node", "server.js"]
```

**Key Points**:
- `COPY package*.json ./` before copying the entire app speeds up builds by caching dependencies.
- `EXPOSE 3000` informs Docker the app uses port 3000 (you still need to map it to the host in Compose).

### Frontend Dockerfile (`frontend/Dockerfile`)
```dockerfile
# Use lightweight Nginx image
FROM nginx:alpine

# Copy HTML file to Nginx's default directory
COPY index.html /usr/share/nginx/html

# Expose port 80 (HTTP)
EXPOSE 80
```

**Key Points**:
- `nginx:alpine` is a minimal image for efficiency.
- Nginx serves static files from `/usr/share/nginx/html` by default.

---

## 5. Building Docker Images: Commands & Use Cases

### Build the Backend Image:
```bash
cd backend
docker build -t my-backend .  # -t tags the image as "my-backend"
```

### Build the Frontend Image:
```bash
cd frontend
docker build -t my-frontend .
```

**Use Cases**:
- **Rebuilding After Changes**: Modify code → Rebuild image → Redeploy.
- **Tagging Versions**: Use `-t my-backend:v1` for versioning.

---

## 6. Docker Compose Deep Dive

### `docker-compose.yml` Explained:
```yaml
version: '3'  # Uses Compose version 3 syntax

services:
  backend:
    build: ./backend  # Path to Dockerfile
    ports:
      - "3000:3000"   # Host:Container port mapping

  frontend:
    build: ./frontend
    ports:
      - "80:80"       # Host port 80 → Container port 80
```

### Key Commands:
```bash
# Start all services in the foreground
docker-compose up

# Start in detached mode (background)
docker-compose up -d

# Stop and remove containers
docker-compose down

# Rebuild images if Dockerfiles change
docker-compose up --build
```

---

## 7. Deploying the Application

### Accessing the App:
- **Frontend**: Open `http://localhost` in your browser.
- **Backend**: Access API at `http://localhost:3000`.

### Stopping the App:
```bash
docker-compose down  # Stops and removes containers
```

---

## 8. Advanced Use Cases

### 1. Environment Variables
**Use Case**: Configure API endpoints or database credentials.

```yaml
services:
  backend:
    environment:
      - DB_HOST=db
      - DB_USER=admin
```

### 2. Volumes for Development
**Use Case**: Live-reload code changes without rebuilding.

```yaml
services:
  backend:
    volumes:
      - ./backend:/usr/src/app  # Sync local code with container
```

### 3. Custom Networks
**Use Case**: Isolate services or connect multiple projects.

```yaml
networks:
  app-network:
    driver: bridge

services:
  backend:
    networks:
      - app-network
```

### 4. Adding a Database (Example with MySQL)
```yaml
services:
  db:
    image: mysql:5.7
    environment:
      - MYSQL_ROOT_PASSWORD=secret
    volumes:
      - db-data:/var/lib/mysql

volumes:
  db-data:  # Named volume for data persistence
```

---

## 9. Troubleshooting & Best Practices

### Common Issues:
- **Port Conflicts**: Use `docker ps` to check running containers.
- **Image Not Found**: Ensure you built images with `docker-compose build`.
- **Permission Errors**: Use `chmod` on files or run containers as non-root.

### Best Practices:
- **Use `.dockerignore`**: Exclude unnecessary files (e.g., `node_modules`).
- **Minimize Layers**: Combine commands in Dockerfiles (e.g., `RUN apt-get update && apt-get install -y`).
- **Security**: Avoid running containers as root; use official images.

---

## 10. Conclusion

You’ve learned how to:
- Structure a Docker project.
- Write Dockerfiles for backend/frontend.
- Use Docker Compose to orchestrate services.
- Handle advanced scenarios like volumes and networking.

**Next Steps**:
- Explore Docker Hub for pre-built images.
- Learn about Kubernetes for scaling containers.
- Implement CI/CD pipelines with Docker.

## 👤 Author
**Syed Tasavour**  
- GitHub: [@syedtasavour](https://github.com/syedtasavour)
- Portfolio: [syedtasavour.me](https://syedtasavour.me)


## 📞 Contact
For any queries or support:
- Email: `help@syedtasavour.me`
- GitHub Issues: [Create an issue](https://github.com/syedtasavour/docker/issues)

<div align="center">
  <sub>Built with passion (and a lot of coffee) by Syed Tasavour.</sub>
</div>