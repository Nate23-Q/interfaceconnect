<?php
require_once __DIR__ . '/../includes/functions.php';

// Initialize
loadEnv();
initErrorLogging();
secureSessionStart();

// Telegram configuration
function send_telegram_msg($message) {
    return sendTelegramMessage($message);
}
