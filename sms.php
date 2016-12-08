<?php
	$phone = $_REQUEST['phone'];
	$message = $_REQUEST['message'];
	
	$temp = "http://52.89.116.249:13013/cgi-bin/sendsms?username=mobileapp&password=foobar&to="+$phone+"&from=Lookup&smsc=esstigo&text="+$message;
	$url = filter_var ( $temp, FILTER_SANITIZE_URL);
	
	// Get cURL resource
	$curl = curl_init($url);
	
	// Send the request
	$response = curl_exec($curl);
	
	// Close request to clear up some resources
	curl_close($curl);
?>