<?php
	$temp = "http://52.89.116.249:13013/cgi-bin/sendsms?username=mobileapp&password=foobar&to=0262859757&from=suuk_carpool&smsc=smscAirtel&text=you%20have%20signed%20up%20for%20proximity";
	$url = filter_var ( $temp, FILTER_SANITIZE_URL);
	
	// Get cURL resource
	$curl = curl_init($url);
	
	// Send the request
	$response = curl_exec($curl);
	
	// Close request to clear up some resources
	curl_close($curl);
?>