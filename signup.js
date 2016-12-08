var glob_phone;

//signUp
function signUp(){
	/*
	*the various valaues entered by the user are stored in variables
	*/
	var username = document.getElementById("username").value;
	var password = document.getElementById("passwd").value;
	var email = document.getElementById("mail").value;
	var phone = document.getElementById("phone").value;
	
	glob_phone = phone;
	
	/**This checks if all fields are filled*/
	if(username=='' || password=='' || email=='' || phone==''){
		alert("please fill all fields");
		return;
	}
	
	var ajaxurl = 'http://52.89.116.249/~simon_baaman/project/security_ajax.php?cmd=2&username='+ username + '&password='+ password + '&email='+ email + '&phone='+ phone;
	
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
		alert(status);
		return;
	}
	
	var response = $.parseJSON(xhr.responseText);
	
	if (response.result == 0){
		alert(response.message);
	}else{
		
		var ajaxurl = 'http://52.89.116.249/~simon_baaman/project/sms.php?phone='+glob_phone+'&message='+response.message;
	
		$.ajax(
			ajaxurl,
			{async:true, complete:smsComplete}	
		);
		
		function smsComplete(xhr,status){
			alert(response.message+". You will receive a confirmation sms shortly");
		}
		
		window.location.assign("http://52.89.116.249/~simon_baaman/project/login.html");
	}
}