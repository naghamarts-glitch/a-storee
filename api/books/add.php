<?php
/**
 * Books API - Add book
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

if (!isset($data['title']) || !isset($data['description']) || !isset($data['image'])) {
    echo json_encode(['status' => 'error', 'message' => 'title, description, image required']);
    exit;
}

$title = trim($data['title']);
$description = trim($data['description']);
$image = trim($data['image']);

if (empty($title) || empty($description) || empty($image)) {
    echo json_encode(['status' => 'error', 'message' => 'All fields required']);
    exit;
}

if (strlen($title) < 3) {
    echo json_encode(['status' => 'error', 'message' => 'Title min 3 chars']);
    exit;
}

try {
    $pdo = getDB();
    $stmt = $pdo->prepare("INSERT INTO books (title, description, image) VALUES (?, ?, ?)");
    $stmt->execute([$title, $description, $image]);
    
    echo json_encode([
        'status' => 'success',
        'message' => 'Book added successfully',
        'id' => $pdo->lastInsertId()
    ]);

    
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Error: ' . $e->getMessage()]);
}
?>

