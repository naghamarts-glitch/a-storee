<?php
/**
 * AUTO Database Setup for nagham_art_hub
 */
error_reporting(E_ALL);
ini_set('display_errors', 1);

define('DB_HOST', 'localhost');
define('DB_NAME', 'nagham_art_hub');
define('DB_USER', 'root');
define('DB_PASS', '');

try {
    $pdo = new PDO("mysql:host=".DB_HOST.";charset=utf8mb4", DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Create database
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `".DB_NAME."`");
    echo "✅ Database '$DB_NAME' created/verified\n";
    
    // Use database
    $pdo->exec("USE `".DB_NAME."`");
    
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
    echo "✅ Users table created\n";
    
    // Test connection
    $stmt = $pdo->query("SELECT 1");
    echo "✅ Database connection successful!\n";
    
    echo "\n🎉 Run: http://localhost/backend/register.php after Apache start\n";
    
} catch (Exception $e) {
    die("❌ Error: " . $e->getMessage());
}
?>

