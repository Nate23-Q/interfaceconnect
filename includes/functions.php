<?php
// Security and utility functions

// Load environment variables
function loadEnv() {
    $envFile = __DIR__ . '/../.env';
    if (file_exists($envFile)) {
        $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            if (strpos(trim($line), '#') === 0) continue;
            list($name, $value) = explode('=', $line, 2);
            $_ENV[trim($name)] = trim($value);
        }
    }
}

// Initialize error logging
function initErrorLogging() {
    ini_set('log_errors', 1);
    ini_set('error_log', __DIR__ . '/../logs/error.log');
    ini_set('display_errors', 0);
}

// Secure session start
function secureSessionStart() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start([
            'cookie_httponly' => true,
            'cookie_samesite' => 'Strict'
        ]);
    }
}

// Generate CSRF token
function generateCSRFToken() {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

// Verify CSRF token
function verifyCSRFToken($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

// Sanitize input
function sanitizeInput($data) {
    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}

// Validate email
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

// Rate limiting (simple file-based)
function checkRateLimit($identifier, $maxAttempts = 5, $timeWindow = 300) {
    $file = __DIR__ . '/../logs/rate_limit_' . md5($identifier) . '.txt';
    $attempts = [];
    
    if (file_exists($file)) {
        $attempts = json_decode(file_get_contents($file), true) ?: [];
    }
    
    $now = time();
    $attempts = array_filter($attempts, function($timestamp) use ($now, $timeWindow) {
        return ($now - $timestamp) < $timeWindow;
    });
    
    if (count($attempts) >= $maxAttempts) {
        return false;
    }
    
    $attempts[] = $now;
    file_put_contents($file, json_encode($attempts));
    return true;
}

// Get client IP
function getClientIP() {
    $ip = '';
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    }
    return filter_var($ip, FILTER_VALIDATE_IP) ? $ip : '0.0.0.0';
}

// Send Telegram message with error handling
function sendTelegramMessage($message) {
    loadEnv();
    
    $botToken = $_ENV['TELEGRAM_BOT_TOKEN'] ?? '';
    $chatIds = explode(',', $_ENV['TELEGRAM_CHAT_ID'] ?? '');
    
    if (empty($botToken) || empty($chatIds[0])) {
        error_log("Telegram credentials not configured");
        return false;
    }
    
    $website = "https://api.telegram.org/bot" . $botToken;
    $success = true;
    
    foreach ($chatIds as $chatId) {
        $chatId = trim($chatId);
        if (empty($chatId)) continue;
        
        $params = [
            'chat_id' => $chatId,
            'text' => $message,
        ];
        
        $ch = curl_init($website . '/sendMessage');
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        
        $result = curl_exec($ch);
        if ($result === false) {
            error_log("Telegram API error: " . curl_error($ch));
            $success = false;
        }
        curl_close($ch);
    }
    
    return $success;
}

// Log activity
function logActivity($action, $details = []) {
    $logEntry = [
        'timestamp' => date('Y-m-d H:i:s'),
        'ip' => getClientIP(),
        'action' => $action,
        'details' => $details
    ];
    
    $logFile = __DIR__ . '/../logs/activity.log';
    file_put_contents($logFile, json_encode($logEntry) . PHP_EOL, FILE_APPEND);
}
