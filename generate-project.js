const fs = require('fs');
const path = require('path');

// ชื่อโปรเจกต์
const rootDir = 'inventory-system-backend';

// โครงสร้างไฟล์และเนื้อหาที่จะสร้าง
const files = {
  'package.json': JSON.stringify({
    name: "inventory-system-backend",
    version: "1.0.0",
    main: "src/app.js",
    scripts: {
      "start": "node src/app.js",
      "dev": "nodemon src/app.js"
    },
    dependencies: {
      "express": "^4.18.2",
      "mysql2": "^3.6.0",
      "dotenv": "^16.3.1",
      "cors": "^2.8.5",
      "jsonwebtoken": "^9.0.1",
      "bcrypt": "^5.1.0"
    },
    devDependencies: {
      "nodemon": "^3.0.1"
    }
  }, null, 2),

  '.env': `PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=inventory_db
JWT_SECRET=mysecretkey123`,

  'src/app.js': `const express = require('express');
const cors = require('cors');
require('dotenv').config();

const inventoryRoutes = require('./routes/inventoryRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/inventory', inventoryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,

  'src/config/database.js': `const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;`,

  'src/controllers/inventoryController.js': `const inventoryService = require('../services/inventoryService');

exports.withdrawItem = async (req, res) => {
  try {
    const { productId, quantity, note } = req.body;
    // สมมติว่า userId ได้มาจาก middleware (req.user.id)
    const userId = 1; 

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    const result = await inventoryService.withdrawStock(userId, productId, quantity, note);
    res.json(result);

  } catch (error) {
    console.error(error);
    if (error.message === 'INSUFFICIENT_STOCK') {
      return res.status(400).json({ message: 'Stock not enough' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};`,

  'src/services/inventoryService.js': `const db = require('../config/database');

exports.withdrawStock = async (userId, productId, quantity, note) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Lock row for update
    const [rows] = await connection.query(
      'SELECT quantity FROM products WHERE id = ? FOR UPDATE', 
      [productId]
    );

    if (rows.length === 0) throw new Error('PRODUCT_NOT_FOUND');
    
    const currentStock = rows[0].quantity;
    if (currentStock < quantity) throw new Error('INSUFFICIENT_STOCK');

    // Update stock
    await connection.query(
      'UPDATE products SET quantity = quantity - ? WHERE id = ?',
      [quantity, productId]
    );

    // Log transaction
    await connection.query(
      'INSERT INTO inventory_transactions (product_id, user_id, type, quantity, note) VALUES (?, ?, "OUT", ?, ?)',
      [productId, userId, quantity, note]
    );

    await connection.commit();
    return { success: true, message: 'Withdraw successful' };

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};`,

  'src/routes/inventoryRoutes.js': `const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// POST /api/inventory/withdraw
router.post('/withdraw', inventoryController.withdrawItem);

module.exports = router;`,

  'README.md': `# Inventory Management System Backend
  
Generated for job application portfolio.

## Setup
1. \`npm install\`
2. Setup MySQL database using schema provided.
3. \`npm run dev\`
`
};

// ฟังก์ชันสร้างไฟล์
function createProject() {
  if (!fs.existsSync(rootDir)) {
    fs.mkdirSync(rootDir);
    console.log(`Created directory: ${rootDir}`);
  }

  Object.entries(files).forEach(([filePath, content]) => {
    const fullPath = path.join(rootDir, filePath);
    const dirName = path.dirname(fullPath);

    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName, { recursive: true });
    }

    fs.writeFileSync(fullPath, content);
    console.log(`Created file: ${filePath}`);
  });

  console.log('\n✅ Project setup complete!');
  console.log(`\ncd ${rootDir}`);
  console.log('npm install');
  console.log('npm run dev');
}

createProject();
