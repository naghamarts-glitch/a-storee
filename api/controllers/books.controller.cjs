const db = require('../config/db.cjs');
const pool = db;

const getBooks = async (req, res) => {
  res.json({ success: true, data: [] });
};

module.exports = { getBooks };

