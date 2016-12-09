
function login(){
	document.addEventListener("deviceready", init, false);
	function init() {
	  navigator.contacts.find([navigator.contacts.fieldType.displayName],gotContacts,errorHandler);
	}
	function errorHandler(e) {
	 console.log("errorHandler: "+e);
	}

	function gotContacts(c) {
	 console.log("gotContacts, number of results "+c.length);


	 /* Retriving phoneNumbers */
	 for(var i=0, len=c.length; i<len; i++) {
	 if(c[i].phoneNumbers && c[i].phoneNumbers.length > 0) {
	 addContact(c[i].displayName, c[i].phoneNumbers[0].value);
	 }
	 }
	}
	
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
		window.location.assign("http://52.89.116.249/~simon_baaman/project/index.html");
	}
}