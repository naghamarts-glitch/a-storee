const db = require('../config/db');
const pool = db;

const getAllBooks = async (req, res) => {
  try {
    const [books] = await pool.execute('SELECT * FROM books ORDER BY id DESC');
    res.json({ success: true, data: books });
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch books' });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description required' });
    }

    const [result] = await pool.execute(
      'INSERT INTO books (title, description, image) VALUES (?, ?, ?)',
      [title, description, image || '']
    );

    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: { id: result.insertId, title, description, image }
    });
  } catch (error) {
    console.error('Create book error:', error);
    res.status(500).json({ success: false, message: 'Failed to create book' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.execute('DELETE FROM books WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    res.json({ success: true, message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Delete book error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete book' });
  }
};

module.exports = { getAllBooks, createBook, deleteBook };
