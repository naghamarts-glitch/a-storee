<?php
/**
 * Users API - Login (Fixed for clean JSON)
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

if (!isset($data['email']) || !isset($data['password'])) {
    ob_end_clean();
    echo json_encode(['success' => false, 'message' => 'email, password required']);
    exit;
}

$email = trim($data['email']);
$password = $data['password'];

if (empty($email) || empty($password)) {
    ob_end_clean();
    echo json_encode(['success' => false, 'message' => 'All fields required']);
    exit;
}

try {
    $pdo = getDB();
    
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    if (!$user || !password_verify($password, $user['password'])) {
        ob_end_clean();
        echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
        exit;
    }
    
    session_start();
    
    // Generate simple token (session-based)
    $token = bin2hex(random_bytes(32));
    $_SESSION['token'] = $token;
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_name'] = $user['name'];
    $_SESSION['user_email'] = $user['email'];
    
    ob_end_clean();
    echo json_encode([
        'success' => true,
        'message' => 'Login successful',
        'token' => $token,
        'user' => [
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email']
        ]
    ]);
    exit;
    
} catch (Exception $e) {
    error_log('Login error: ' . $e->getMessage());
    ob_end_clean();
    echo json_encode(['success' => false, 'message' => 'Server error']);
    exit;
}
?>

