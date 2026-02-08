<?php
require_once __DIR__ . '/../../includes/functions.php';

loadEnv();

$send = $_ENV['SEND_EMAIL'] ?? 'your_email@example.com';
