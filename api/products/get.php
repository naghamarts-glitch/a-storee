<?php
/**
 * Products API - Get all
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode(['status' => 'error', 'message' => 'Only GET method allowed']);
    exit;
}

require_once '../config/db.php';

try {
    $pdo = getDB();
    $stmt = $pdo->query("SELECT * FROM products");
    $products = $stmt->fetchAll();
    
    echo json_encode([
        'status' => 'success',
        'products' => $products
    ]);
    
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Error: ' . $e->getMessage()]);
}
?>

