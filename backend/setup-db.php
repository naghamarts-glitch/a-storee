<?php
/**
 * AUTO Database Setup for hosted InfinityFree
 */
error_reporting(E_ALL);
ini_set('display_errors', 1);

define('DB_HOST', 'sql309.infinityfree.com');
define('DB_NAME', 'if0_41570297_nagmarts');
define('DB_USER', 'if0_41570297');
define('DB_PASS', 'yDRvPyjPxWojf1'); 

try {
    $dsn = "mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=utf8mb4";
    $pdo = new PDO($dsn, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "✅ Connected to hosted DB: " . DB_NAME . "\n";
    
    // Create users table
    $sql = "CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(50),
        password VARCHAR(255) NOT NULL,
        role ENUM('customer', 'admin') DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";
    $pdo->exec($sql);
    echo "✅ Users table created/verified\n";
    
    // Create books table
    $books_sql = "CREATE TABLE IF NOT EXISTS books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";
    $pdo->exec($books_sql);
    echo "✅ Books table created/verified\n";
    
    // Create products table
    $products_sql = "CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        image VARCHAR(500),
        price DECIMAL(10,2) DEFAULT 0.00,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";
    $pdo->exec($products_sql);
    echo "✅ Products table created/verified\n";
    
    // Test connection
    $stmt = $pdo->query("SELECT 1");
    echo "✅ Database connection successful!\n";
    
    echo "\n🎉 Backend ready for online deployment\n";
    
} catch (Exception $e) {
    die("❌ Error: " . $e->getMessage());
}
?>
