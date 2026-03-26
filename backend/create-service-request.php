<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

require_once 'db.php';

try {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['name']) || !isset($input['phone']) || !isset($input['service_type']) ) {
        throw new Exception('Missing required fields');
    }

    $name = trim($input['name']);
    $phone = trim($input['phone']);
    $service_type = trim($input['service_type']);
    $details = isset($input['details']) ? trim($input['details']) : '';

    if (empty($name) || empty($phone) || empty($service_type)) {
        throw new Exception('All fields are required');
    }

    // Insert into database
$stmt = $pdo->prepare("INSERT INTO service_requests (name, phone, service_type, details, created_at) VALUES (?, ?, ?, ?, NOW()) ON DUPLICATE KEY UPDATE name=VALUES(name)");
    
    if (!$stmt->execute([$name, $phone, $service_type, $details])) {
        throw new Exception('Database error: ' . implode(', ', $pdo->errorInfo()));
    }

    // Optional: Send email notification
    /*
    $to = 'admin@nagham.com';
    $subject = 'New Service Request';
    $message = "Name: $name\nPhone: $phone\nService: $service_type\nDetails: $details";
    mail($to, $subject, $message);
    */

    echo json_encode(['success' => true, 'message' => 'Request submitted successfully']);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>

