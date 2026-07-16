# Lost2Found

![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=springboot)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

### A Secure Campus Lost & Found Management Platform

Lost2Found is a full-stack web application that simplifies the process of reporting, searching, and claiming lost belongings within educational institutions. The platform replaces informal communication channels with a secure and centralized system, enabling students to reconnect with their belongings quickly and efficiently.

> **Project Status:** 🚧 Active Development

---

## Overview

Managing lost belongings on campus often depends on WhatsApp groups, word of mouth, or notice boards, making the process slow and unreliable. Lost2Found provides a centralized digital platform where users can securely report lost or found items, search listings, and manage claim requests through an intuitive interface.

The application is designed with scalability, security, and usability in mind, following modern software engineering practices.

---

## Key Features

- 🔐 Secure User Authentication (JWT)
- 📦 Lost & Found Item Management
- 🔍 Advanced Search Functionality
- 📨 Claim Request System
- 🖼️ Image Upload Support
- 📍 Location-Based Item Information
- 📱 Responsive User Interface
- 🛡️ Secure RESTful APIs

---

## Technology Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | React, HTML5, CSS3, JavaScript |
| **Backend** | Java, Spring Boot, Spring Security |
| **Database** | MySQL, Hibernate (JPA) |
| **Authentication** | JWT, BCrypt |
| **Tools** | Git, GitHub, Maven, VS Code, Postman |

---

## Project Architecture

The application follows a modern three-tier architecture, separating the presentation layer, business logic, and data access layer to ensure scalability, maintainability, and clean code organization.

```
                Client (React)
                      │
                      ▼
        Spring Boot REST API
                      │
                      ▼
          Service Layer (Business Logic)
                      │
                      ▼
         Repository Layer (JPA/Hibernate)
                      │
                      ▼
                MySQL Database
```

---

## Project Structure

```
Lost2Found/
│
├── backend/
│   ├── src/
│   ├── uploads/
│   ├── pom.xml
│   └── ...
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── README.md
└── .gitignore
```
---

## Getting Started

### Prerequisites

- Java 17+
- Node.js
- MySQL
- Maven
- Git

### Clone the Repository

```bash
git clone https://github.com/rahman121120/Lost2Found.git
```

### Backend Setup

```bash
cd backend
mvn spring-boot:run
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on the Vite development server and communicate with the Spring Boot backend.