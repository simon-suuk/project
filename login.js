
function login(){
	/*
	*the various valaues entered by the user are stored in variables
	*/
	var username = document.getElementById("username").value;
	var password = document.getElementById("passwd").value;
	
	var ajaxurl = 'http://52.89.116.249/~simon_baaman/project/security_ajax.php?cmd=1&username='+ username + '&password='+ password;
	
	$.ajax(
		ajaxurl,
		{async:true, complete:loginComplete}	
	);
}

/**
*callback function for sendSMS ajax call
*/
function loginComplete(xhr,status){
	document.getElementById("username").value = "";
	document.getElementById("passwd").value = "";
	
	if(status!="success"){
		
		return;
	}
	
	var response = $.parseJSON(xhr.responseText);
	
	if (response.result == 0){
		alert(response.message);
	}else{
		var userInfo = JSON.parse(window.localStorage.getItem("contacts_obj"));
		alert(userInfo);
		window.location.assign("http://52.89.116.249/~simon_baaman/project/index.html");
	}
}