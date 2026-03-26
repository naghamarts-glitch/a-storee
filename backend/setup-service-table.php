<?php
/**
 * Add Service Requests Table
 */
error_reporting(E_ALL);
ini_set('display_errors', 1);

define('DB_HOST', 'localhost');
define('DB_NAME', 'nagham_art_hub');
define('DB_USER', 'root');
define('DB_PASS', '');

try {
    $pdo = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=utf8mb4", DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $sql = "CREATE TABLE IF NOT EXISTS service_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        service_type VARCHAR(100) NOT NULL,
        details TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_phone (phone),
        INDEX idx_service (service_type)
    )";
    
    $pdo->exec($sql);
    echo "✅ Service requests table created successfully!\n";
    echo "📋 Run this ONCE: http://localhost/backend/setup-service-table.php\n";
    
    // Test insert
    $testCount = $pdo->query("SELECT COUNT(*) as count FROM service_requests")->fetch()['count'];
    echo "📊 Current requests: $testCount\n";
    
} catch (Exception $e) {
    die("❌ Error: " . $e->getMessage());
}
?>

