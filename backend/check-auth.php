<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Simple auth check - for development
session_start();
if (isset($_SESSION['user_id'])) {
    echo json_encode(['authenticated' => true]);
} else {
    echo json_encode(['authenticated' => false]);
}
?>

