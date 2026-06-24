# 🛍️ Vastra – Full Stack E-Commerce Application

Vastra is a full-stack e-commerce web application built using **Spring Boot (Backend)** and **React (Frontend)**.  
The project demonstrates real-world features like authentication, role-based authorization, product management, cart, wishlist, orders, and deployment on cloud platforms.

---

## 🌐 Live Demo

- **Frontend (Netlify):**  
  https://vashtra.netlify.app

- **Backend (Railway):**  
  https://vastra-production.up.railway.app

---

## 🧩 Project Structure

```
vastra/
│
├── frontend/   → React frontend
├── backend/    → Spring Boot backend
└── README.md   → Project documentation
```

---

## 🚀 Features

### 👤 User
- User registration & login (JWT based)
- View & update profile
- Add to cart (bag)
- Wishlist management
- Address management
- Place orders (Cash on Delivery)
- Order history

### 🛠️ Admin
- Admin login
- Product management (Add / Update / Delete)
- View all orders

---

## 🧑‍💻 Tech Stack

### Frontend
- React (Vite)
- Redux Toolkit
- React Router
- Axios
- React Toastify
- CSS (Mobile-first responsive design)

### Backend
- Java
- Spring Boot
- Spring Security (JWT Authentication)
- JPA / Hibernate
- MySQL
- Maven

### Deployment
- Frontend: **Netlify**
- Backend: **Railway**
- Database: **Railway MySQL**

---

## 🔐 Authentication & Security

- JWT based authentication
- Role-based authorization (`USER`, `ADMIN`)
- Protected routes on frontend
- Secure APIs on backend using Spring Security

---

## ⚙️ Environment Variables

### Backend (Railway)
```
PORT=8080
JWT_SECRET_KEY=your_secret_key
SPRING_DATASOURCE_URL=jdbc:mysql://...
SPRING_DATASOURCE_USERNAME=...
SPRING_DATASOURCE_PASSWORD=...
```

### Frontend (Netlify)
```
VITE_API_BASE_URL=https://vastra-production.up.railway.app
```

---

## 🖥️ How to Run Locally

### Backend
```
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend
```
cd frontend
npm install
npm run dev
```

---

## 📦 Database

- MySQL database hosted on Railway
- Tables managed using JPA & Hibernate
- Data persisted on cloud database

---

## 🎯 Purpose of the Project

This project was built for:
- Learning full-stack development
- Understanding real-world application architecture
- Interview preparation
- Showcasing backend + frontend integration

---

## 👨‍💻 Developer

**Ajay**  
Java Backend Developer with Frontend Awareness  
Focused on clean architecture, security, and scalable design.

---

## 📌 Note

This project is a **mono-repo**, containing both frontend and backend in a single GitHub repository with proper structure and documentation.
