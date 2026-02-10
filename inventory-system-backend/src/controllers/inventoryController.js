const inventoryService = require('../services/inventoryService');

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
};