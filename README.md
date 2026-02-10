📑 API Documentation

Inventory Management System – Backend

🔐 Authentication
Login

POST /login

Request Body:

{
  "username": "admin",
  "password": "123456"
}


Response:

{
  "token": "jwt_token_here"
}


📌 ใช้ JWT Token ใน Header:

Authorization: Bearer <token>

📦 Inventory Management
Get All Items

GET /items

Response:

[
  {
    "id": 1,
    "name": "Product A",
    "quantity": 50,
    "price": 120
  }
]

Get Item by ID

GET /items/:id

Create Item

POST /items

Request:

{
  "name": "Product B",
  "quantity": 100,
  "price": 250
}

Update Item

PUT /items/:id

Delete Item

DELETE /items/:id

📊 Stock Adjustment Logic

เมื่อลดจำนวนสินค้า ระบบจะตรวจสอบว่า stock ต้องไม่ต่ำกว่า 0

ทุกการเปลี่ยนแปลงจะถูกอัปเดตในฐานข้อมูลทันที

🗂 Database Design (Example)

Table: users

id

username

password

role

Table: items

id

name

quantity

price

created_at

🧠 Architecture

Client → REST API (Express) → Controller → Database (MySQL)
