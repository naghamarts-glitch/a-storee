<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once 'db.php';

// TODO: Replace with real Google OAuth credentials from Google Cloud Console
$clientId = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'; // Replace!
$redirectUri = 'http://localhost:5173/backend/google-callback.php'; // Frontend dev URL + callback

$authUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' . http_build_query([
    'client_id' => $clientId,
    'redirect_uri' => $redirectUri,
    'response_type' => 'code',
    'scope' => 'email profile',
    'access_type' => 'offline',
    'prompt' => 'consent'
]);

echo json_encode([
    'success' => true,
    'auth_url' => $authUrl,
    'message' => 'Google credentials needed in $clientId. Get from console.cloud.google.com'
]);
?>

