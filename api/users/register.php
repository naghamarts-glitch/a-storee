<?php
/**
 * Users API - Register (Fixed for clean JSON)
 */

error_reporting(0);
ob_start();

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    ob_end_clean();
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    ob_end_clean();
    echo json_encode(['success' => false, 'message' => 'Only POST method allowed']);
    exit;
}

require_once '../config/db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['name']) || !isset($data['email']) || !isset($data['password'])) {
    ob_end_clean();
    echo json_encode(['success' => false, 'message' => 'name, email, password required']);
    exit;
}

$name = trim($data['name']);
$email = trim($data['email']);
$password = $data['password'];

if (empty($name) || empty($email) || empty($password)) {
    ob_end_clean();
    echo json_encode(['success' => false, 'message' => 'All fields required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    ob_end_clean();
    echo json_encode(['success' => false, 'message' => 'Invalid email']);
    exit;
}

if (strlen($password) < 6) {
    ob_end_clean();
    echo json_encode(['success' => false, 'message' => 'Password min 6 chars']);
    exit;
}

try {
    $pdo = getDB();
    
    // Check existing
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        ob_end_clean();
        echo json_encode(['success' => false, 'message' => 'Email exists']);
        exit;
    }
    
    // Hash & insert
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    $stmt->execute([$name, $email, $hashedPassword]);
    
    $userId = $pdo->lastInsertId();
    
    session_start();
    $_SESSION['user_id'] = $userId;
    $_SESSION['user_name'] = $name;
    $_SESSION['user_email'] = $email;
    $_SESSION['user_role'] = 'customer';
    
    $token = bin2hex(random_bytes(32));
    $_SESSION['token'] = $token;
    
    ob_end_clean();
    echo json_encode([
        'success' => true,
        'message' => 'Registration successful',
        'token' => $token,
        'user' => [
            'id' => $userId,
            'name' => $name,
            'email' => $email,
            'role' => 'customer'
        ]
    ]);
    exit;
    
} catch (Exception $e) {
    error_log('Register error: ' . $e->getMessage());
    ob_end_clean();
    echo json_encode(['success' => false, 'message' => 'Server error']);
    exit;
}
?>

