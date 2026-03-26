const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    multipleStatements: true
  });

  try {
    // Create database
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'nagham777'}\``);
    console.log('✅ Database nagham777 created/verified');

    // Use database
    await connection.execute(`USE \`${process.env.DB_NAME || 'nagham777'}\``);

    // Users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table ready');

    // Books table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        image VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Books table ready');

    // Products table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        description TEXT,
        image VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Products table ready');

    // Insert sample data
    await connection.execute(`
      INSERT IGNORE INTO users (name, email, password) VALUES 
      ('Admin User', 'admin@example.com', '$2a$12$examplehashedpassword12345678901234567890'),
      ('Test User', 'test@example.com', '$2a$12$examplehashedpassword12345678901234567890')
    `);
    console.log('✅ Sample users added');

    await connection.execute(`
      INSERT IGNORE INTO books (title, description, image) VALUES 
      ('كتاب الرسم الأساسي', 'دليل شامل للمبتدئين في الرسم', '/assets/book1.jpg'),
      ('ألوان مائية', 'تقنيات الرسم بالألوان المائية', '/assets/book2.jpg')
    `);
    console.log('✅ Sample books added');

    await connection.execute(`
      INSERT IGNORE INTO products (name, description, image) VALUES 
      ('ألوان زيتية', 'مجموعة ألوان زيتية احترافية 12 لون', '/assets/products/oil-colors.png'),
      ('فرشاة قماش', 'فرشاة قماش للرسم 50x70', '/assets/products/canvas.png')
    `);
    console.log('✅ Sample products added');

    console.log('\n🎉 Backend ready! Run: npm run api');
  } catch (error) {
    console.error('❌ Setup error:', error.message);
  } finally {
    await connection.end();
  }
}

setupDatabase();
