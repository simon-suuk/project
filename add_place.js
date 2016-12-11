
function addPlace(){
	/*
	*the various valaues entered by the user are stored in variables
	*/
	var place_name = document.getElementById("place_name").value;
	var place_lat = document.getElementById("place_lat").value;
	var place_lng = document.getElementById("place_lng").value;
	var website = document.getElementById("website").value;
	var place_type = document.getElementById("place_type").value;
	var phone = document.getElementById("phone").value;
	var address = document.getElementById("address").value;
	
	/**This checks if all fields are filled*/
	if(place_name=='' || place_lat=='' || place_lng=='' || website=='' || place_type=='' || phone=='' || address==''){
		alert("please fill all fields");
		return;
	}
	
	var ajaxurl = 'http://52.89.116.249/~simon_baaman/project/add_place.php?place_name='+ place_name + '&place_lat='+ place_lat + '&place_lng='+ place_lng + '&website='+ website + '&place_type='+ place_type + '&phone='+ phone + '&address='+ address;
	
	$.ajax(
		ajaxurl,
		{async:true, complete:addPlaceComplete}	
	);
}

/**
*callback function for sendSMS ajax call
*/
function addPlaceComplete(xhr,status){
	if(status!="success"){
		
		return;
	}
	console.log(xhr.responseText);
	var response = $.parseJSON(xhr.responseText);
	
	if (response.status != "OK"){
		
		alert(response.status);
	}else{
		window.location.assign("http://52.89.116.249/~simon_baaman/project/index.html");
		alert("Status: "response.status+ " New Place details: place_id=>"+ response.place_id+"; Place Scope=>"+response.scope+"; Reference=>"+response.reference);
	}
}