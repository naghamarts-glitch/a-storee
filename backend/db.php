<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json");

// بيانات الاتصال
define('DB_HOST', 'sql309.infinityfree.com');
define('DB_NAME', 'if0_41570297_nagmarts');
define('DB_USER', 'if0_41570297');
define('DB_PASS', 'yDRvPyjPxWojf1');

class Database {
    private $pdo;
    
    public function __construct() {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];
        
        try {
            $this->pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            // ❗ خطأ آمن (مايظهرش تفاصيل السيرفر)
            echo json_encode([
                "success" => false,
                "message" => "Database connection failed"
            ]);
            exit;
        }
    }
    
    public function getConnection() {
        return $this->pdo;
    }
}

// دالة جاهزة للاستدعاء
function getDB() {
    $db = new Database();
    return $db->getConnection();
}
?>
