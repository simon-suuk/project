
function login(){
	/*
	*the various valaues entered by the user are stored in variables
	*/
	var username = $('#username').val();
	var password = $('#passwd').val();
	
	var ajaxurl = 'http://localhost/Mobile/project/security_ajax.php?cmd=1&username='+ username + '&password='+ password;
	
	$.ajax(
		ajaxurl,
		{async:true, complete:loginComplete}	
	);
}

/**
*callback function for sendSMS ajax call
*/
function loginComplete(xhr,status){
	
	$('#username').val('');
	$('#passwd').val('');
	
	if(status!="success"){
		
		return;
	}
	
	var response = $.parseJSON(xhr.responseText);
	
	if (response.result == 0){
		alert(response.message);
	}else{
		window.location.assign("http://localhost/Mobile/project/index.html")
	}
}
 
//signUp
function signUp(){
	/*
	*the various valaues entered by the user are stored in variables
	*/
	var username = $('#signupFrm #username').val();
	var password = $('#signupFrm #passwd').val();
	var firstname = $('#signupFrm #firstname').val();
	var lastname = $('#signupFrm #lastname').val();
	var phone = $('#signupFrm #phone').val();
	
	/**This checks if all fields are filled*/
	if(username==''){
		
		return;
	}
	
	var ajaxurl = 'http://52.89.116.249/~simon_baaman/car_pool/security_ajax.php?cmd=2&username='+ username + '&password='+ password + '&firstname='+ firstname + '&lastname='+ lastname + '&location_lat='+ loc_lat + '&location_long='+ loc_long +'&signup='+ btn+'&phone='+ phone;
	
	$.ajax(
		ajaxurl,
		{async:true, complete:signUpComplete}	
	);
}

/**
*callback function for sendSMS ajax call
*/
function signUpComplete(xhr,status){
	if(status!="success"){
		//document.getElementById("info").innerHTML = "Failed to deliver message";
		alert('Failed');
		return;
	}
	
	var response = $.parseJSON(xhr.responseText);
	
	if (response.result == 0){
		//errorMsg.innerHTML = response.message;
		alert(response.message);
	}else{
		
	}
}