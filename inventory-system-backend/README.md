# Inventory Management System - Backend

RESTful API สำหรับระบบจัดการสินค้า (Inventory Management System)\
พัฒนาเพื่อใช้เป็น Portfolio สำหรับสมัครงาน Backend Developer

------------------------------------------------------------------------

## 🚀 Tech Stack

-   Node.js
-   Express.js
-   MySQL
-   RESTful API
-   dotenv

------------------------------------------------------------------------

## 📦 Features

-   CRUD Products
-   Manage Categories
-   Stock Management
-   Basic Validation & Error Handling
-   Structured MVC Architecture

------------------------------------------------------------------------

## 📁 Project Structure

``` bash
src/
├── controllers/
├── routes/
├── services/
├── models/
├── middlewares/
└── app.js
```

------------------------------------------------------------------------

## ⚙️ Setup & Installation

### 1️⃣ Clone repository

``` bash
git clone https://github.com/myframe258/inventory-system-backend.git
cd inventory-system-backend
```

### 2️⃣ Install dependencies

``` bash
npm install
```

### 3️⃣ Create `.env` file

``` env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=inventory_db
```

### 4️⃣ Run development server

``` bash
npm run dev
```

Server will run at:

    http://localhost:3000

------------------------------------------------------------------------

## 📡 API Example

### 🔹 Get all products

``` http
GET /api/products
```

### 🔹 Create product

``` http
POST /api/products
```

Request Body:

``` json
{
  "name": "Keyboard",
  "price": 890,
  "stock": 20,
  "category_id": 1
}
```

------------------------------------------------------------------------

## 🗄 Database Schema

### Products Table

-   id
-   name
-   price
-   stock
-   category_id
-   created_at
-   updated_at

### Categories Table

-   id
-   name
-   created_at
-   updated_at

------------------------------------------------------------------------

## 📦 API Response Format

### ✅ Success Response

``` json
{
  "success": true,
  "data": {},
  "message": "Request successful"
}
```

### ❌ Error Response

``` json
{
  "success": false,
  "message": "Error message"
}
```

------------------------------------------------------------------------

## 📌 Future Improvements

-   Add JWT Authentication
-   Add Pagination
-   Add Unit Testing
-   Add Docker Support
