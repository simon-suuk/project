<?php
if (isset($_REQUEST['place_lat'])) {
			
	function ProcessCurl($URL, $fieldString){ //Initiate Curl request and send back the result
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
		curl_setopt($ch, CURLOPT_URL, $URL);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_VERBOSE, 1);
		//curl_setopt($ch, CURLOPT_POST, 1);
		
		curl_setopt($ch, CURLOPT_POSTFIELDS, $fieldString);
		
		$resulta = curl_exec ($ch);
		
		if (curl_errno($ch)) {
			print curl_error($ch);
		} else {
		curl_close($ch);
		}
		echo $resulta;
	}
	
	$place_name = $_REQUEST['place_name'];
	$place_lat = $_REQUEST['place_lat'];
	$place_lng = $_REQUEST['place_lng'];
	$website = $_REQUEST['website'];
	$place_type = $_REQUEST['place_type'];
	$phone = $_REQUEST['phone'];
	$address = $_REQUEST['address'];
	$accurate = 50;

	$jsonpost = '{
		"location": {
			"lat": '.$place_lat.','
			.'"lng": '.$place_lng
		.'},'
		.'"accuracy": '.$accurate.','
		.'"name":  "'.$place_name.'",'
		.'"phone_number": '.$phone.','
		.'"address":  "'.$address.'",'
		.'"types": ["'.$place_type.'"],' 
		.'"website": "'.$website.'",'
		.'"language": "en-AU"'
	.'}';
	
	//echo $jsonpost;

	$url = "https://maps.googleapis.com/maps/api/place/add/json?sensor=false&key=AIzaSyAIycY6g4-PkvM1xgwezfp5qnKLzKB3eXA";

	$results = ProcessCurl ($url, $jsonpost);

	//echo $results;
}
?>