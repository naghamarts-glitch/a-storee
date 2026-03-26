const db = require('../config/db');
const pool = db;

const getAllProducts = async (req, res) => {
  try {
    const [products] = await pool.execute('SELECT * FROM products ORDER BY id DESC');
    res.json({ success: true, data: products });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    if (!name || !description) {
      return res.status(400).json({ success: false, message: 'Name and description required' });
    }

    const [result] = await pool.execute(
      'INSERT INTO products (name, description, image) VALUES (?, ?, ?)',
      [name, description, image || '']
    );

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { id: result.insertId, name, description, image }
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ success: false, message: 'Failed to create product' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.execute('DELETE FROM products WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete product' });
  }
};

module.exports = { getAllProducts, createProduct, deleteProduct };
