# Inventory Management System - Backend

RESTful API สำหรับระบบจัดการสินค้า (Inventory Management System)  
พัฒนาเพื่อใช้เป็น Portfolio สำหรับสมัครงาน Backend Developer

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MySQL
- RESTful API
- dotenv

---

## 📦 Features

- CRUD Products
- Manage Categories
- Stock Management
- Basic Validation & Error Handling

---

## 📁 Project Structure

src/
├── controllers/
├── routes/
├── services/
├── models/
├── middlewares/
└── app.js

## ⚙️ Setup & Installation

1. Clone repository

git clone https://github.com/myframe258/inventory-system-backend.git

2. Install dependencies

npm install


3. Create `.env` file

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=inventory_db


4. Run development server

npm run dev


---

## 📡 API Example

### Get all products

GET /api/products


### Create product

POST /api/products


Request Body:

json
{
  "name": "Keyboard",
  "price": 890,
  "stock": 20,
  "category_id": 1
}

---

## 🗄 Database Schema

- products
- categories

## 📦 API Response Format

Success Response:

{
  "success": true,
  "data": {},
  "message": "Request successful"
}

Error Response:

{
  "success": false,
  "message": "Error message"
}
