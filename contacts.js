function addContact(contact_name, contact_num){
	var ajaxurl = 'http://52.89.116.249/~simon_baaman/project/add_contact.php?cmd=1&contact_name='+ contact_name + '&contact_num='+ contact_num;
	
	$.ajax(
		ajaxurl,
		{async:true, complete:addContactComplete}	
	);
}

/**
*callback function for sendSMS ajax call
*/
function addContactComplete(xhr,status){
	
}

function getContacts(){
	var ajaxurl = 'http://52.89.116.249/~simon_baaman/project/add_contact.php?cmd=2';
	
	$.ajax(
		ajaxurl,
		{async:true, complete:getContactsComplete}	
	);
}

/**
*callback function for sendSMS ajax call
*/
function getContactsComplete(xhr,status){
	var response = $.parseJSON(xhr.responseText);
	
	var cont_List = "";
	
	for(i = 0; i < response.length; i++){
		//cont_List = cont_List + "<option value="+response[i].contact_num+">"+response[i].contact_name+"</option>";
		cont_List = cont_List + "<li><div class='item-content'><div class='item-inner'><div class='item-title'>"+response[i].contact_name+"</div></div></div></li>";
	}

	document.getElementById("phone_contacts").innerHTML = cont_List;
}