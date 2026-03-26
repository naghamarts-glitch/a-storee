const db = require('../config/db.cjs');
const pool = db;

const getProducts = async (req, res) => {
  res.json({ success: true, data: [] });
};

module.exports = { getProducts };

