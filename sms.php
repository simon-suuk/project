<?php
	$phone = $_REQUEST['phone'];
	$message = $_REQUEST['message'];
	
	$baseurl = 'http://52.89.116.249:13013/cgi-bin/sendsms?';
		
	$data =array(
		'username' => 'mobileapp',
		'password' => 'foobar',
		'to' => $phone,
		'from' => 'Proximity',
		'smsc' => 'esstigo',
		'text' => $message
	);
	
	echo $url = $baseurl.http_build_query($data);
	
	// Get cURL resource
	$curl = curl_init($url);
	
	// Send the request
	$response = curl_exec($curl);
	
	if(!$response){
	    die('Error: "' . curl_error($curl) . '" - Code: ' . curl_errno($curl));
	}
	
	// Close request to clear up some resources
	curl_close($curl);
?>