<?php
	$phone = $_REQUEST['phone'];
	$message = $_REQUEST['message'];
	
	$baseurl = 'http://192.168.74.128:13013/cgi-bin/sendsms?';
		
	$data =array(
		'username' => 'tester',
		'password' => 'foobar',
		'to' => $phone,
		'from' => 'Proximity',
		'smsc' => 'smscMTN',
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