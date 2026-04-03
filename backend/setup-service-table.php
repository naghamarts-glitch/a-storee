<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

define('DB_HOST', 'sql309.infinityfree.com');
define('DB_NAME', 'if0_41570297_nagmarts');
define('DB_USER', 'if0_41570297');
define('DB_PASS', 'yDRvPyjPxWojf1');

try {
    $dsn = "mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=utf8mb4";
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

    echo "✅ Connected to nagmarts hosted DB<br>";

    $pdo->exec("CREATE TABLE IF NOT EXISTS service_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        service_type VARCHAR(100) NOT NULL,
        details TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");

    echo "✅ service_requests table created/verified!";

} catch (Exception $e) {
    die("❌ Error: " . $e->getMessage());
}
?>

