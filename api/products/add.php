<?php
/**
 * Products API - Add product
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Only POST method allowed']);
    exit;
}

require_once '../config/db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['name']) || !isset($data['description']) || !isset($data['image'])) {
    echo json_encode(['status' => 'error', 'message' => 'name, description, image required']);
    exit;
}

$name = trim($data['name']);
$description = trim($data['description']);
$image = trim($data['image']);

if (empty($name) || empty($description) || empty($image)) {
    echo json_encode(['status' => 'error', 'message' => 'All fields required']);
    exit;
}

if (strlen($name) < 3) {
    echo json_encode(['status' => 'error', 'message' => 'Name min 3 chars']);
    exit;
}

try {
    $pdo = getDB();
$stmt = $pdo->prepare("INSERT INTO products (name, description, image) VALUES (?, ?, ?)");
    $stmt->execute([$name, $description, $image]);
    
    echo json_encode([
        'status' => 'success',
        'message' => 'Product added successfully',
        'id' => $pdo->lastInsertId()
    ]);
    
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Error: ' . $e->getMessage()]);
}
?>

