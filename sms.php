<?php
function sendMeSMS($pool_id){
		
		include_once("pools.php");
			
		$poolsObj = new pools();
		$poolsObj->getPoolStatistics($pool_id);
		$results = $poolsObj->fetch();
		
		
		if($results["current_num_of_members"] == $results["max_members"]){
			
			$temp = "http://52.89.116.249:13013/cgi-bin/sendsms?username=mobileapp&password=foobar&to=0262859757&from=suuk_carpool&smsc=smscAirtel&text=Your%20pool%20is%20full%20and%20ready%20to%20depart";
			$url = filter_var ( $temp, FILTER_SANITIZE_URL);
			
			/*if (!filter_var($url, FILTER_VALIDATE_URL) === false) {
			    echo("$url is a valid URL");
			} else {
			    echo("$url is not a valid URL");
			}*/
			
			// Get cURL resource
			$curl = curl_init($url);
			
			// Send the request
			$response = curl_exec($curl);
			
			/*if(!$response){
			    die('Error: "' . curl_error($curl) . '" - Code: ' . curl_errno($curl));
			}*/
			
			// Close request to clear up some resources
			curl_close($curl);
		}else{
			return;
		}
	}
?>