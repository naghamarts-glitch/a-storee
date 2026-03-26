<?php
/**
 * Products API - Delete product
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$allowed_methods = ['POST', 'DELETE'];
if (!in_array($_SERVER['REQUEST_METHOD'], $allowed_methods)) {
    echo json_encode(['status' => 'error', 'message' => 'POST or DELETE only']);
    exit;
}

require_once '../config/db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['id']) || !is_numeric($data['id']) || $data['id'] <= 0) {
    echo json_encode(['status' => 'error', 'message' => 'Valid id required']);
    exit;
}

$id = (int)$data['id'];

try {
    $pdo = getDB();
    $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
    $stmt->execute([$id]);
    
    if ($stmt->rowCount() === 0) {
        echo json_encode(['status' => 'error', 'message' => 'Product not found']);
        exit;
    }
    
    echo json_encode([
        'status' => 'success',
        'message' => 'Product deleted'
    ]);

    
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Error: ' . $e->getMessage()]);
}
?>

