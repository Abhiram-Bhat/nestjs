#  Assignment

This project was developed as part of the required assessment for the **SDE Intern (Backend)** position at CodeInbound LLP.  
The goal was to build a simple backend API using **Nest.js**, **TypeORM**, and **PostgreSQL** that supports basic user management with authentication.

---

## 👨‍💻 Developed By
**Name:** Abhiram Bhat  
**Framework:** Nest.js  
**Database:** PostgreSQL  
**ORM:** TypeORM  
**Auth:** JWT (JSON Web Tokens)

---

## 📦 Features

- User registration and login (JWT based)
- CRUD operations for user data
- Input validation and error handling
- Secure password hashing
- Role-based authorization (for demonstration)
- Example unit tests
- PostgreSQL integration using TypeORM

---

## ⚙️ Tech Stack

- **Nest.js** – Node.js framework
- **TypeORM** – Database ORM
- **PostgreSQL** – Relational database
- **JWT** – Token-based authentication
- **bcrypt** – Password hashing

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
 git clone : https://github.com/Abhiram-Bhat/nestjs
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup the environment file

Create a new `.env` file in the project root and add:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=asn_db
JWT_SECRET=abhiram_secret_key
PORT=3000
```

### 4️⃣ Create the database

Login to PostgreSQL and run:

```sql
CREATE DATABASE asn_db;
```

### 5️⃣ Run the application

```bash
npm run start:dev
```

Server should start on:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🧠 API Endpoints

| Method | Route          | Description                     |
| ------ | -------------- | ------------------------------- |
| POST   | `/auth/signup` | Register a new user             |
| POST   | `/auth/login`  | Login and receive a token       |
| GET    | `/users`       | Get all users (JWT required)    |
| GET    | `/users/:id`   | Get a single user by ID         |
| PATCH  | `/users/:id`   | Update user details             |
| DELETE | `/users/:id`   | Delete a user                   |
| GET    | `/users/count` | (Optional) Get total user count |

---

## 🧪 Running Tests

```bash
npm run test
```

Unit tests are included for basic CRUD operations and authentication.

---

## 📝 Notes

* Passwords are hashed using **bcrypt** before being stored.
* All endpoints are validated and protected using JWT.
* Code follows a clean, modular Nest.js structure with separate modules for Users and Auth.

---



```

---


```
