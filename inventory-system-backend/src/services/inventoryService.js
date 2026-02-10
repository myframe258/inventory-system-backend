const db = require('../config/database');

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
};