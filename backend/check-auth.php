<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://clinquant-nasturtium-bfe777.netlify.app');
header('Access-Control-Allow-Credentials: true');

session_start();

if (isset($_SESSION['user_id'])) {
    echo json_encode([
        'authenticated' => true
    ]);
} else {
    echo json_encode([
        'authenticated' => false
    ]);
}
?>