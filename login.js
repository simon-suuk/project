
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
		
		$(document).ready(function(){
			var myDB;
			//Open Database Connection
			document.addEventListener("deviceready",onDeviceReady,false);
			function onDeviceReady(){
				myDB = window.sqlitePlugin.openDatabase({name: "mySQLite.db", location: 'default'});
				
				navigator.contacts.find([navigator.contacts.fieldType.displayName],gotContacts,errorHandler);
			}

			//Create new table
			myDB.transaction(function(transaction) {
			transaction.executeSql('CREATE TABLE IF NOT EXISTS user_contacts (id integer primary key autoincrement, contact_name text, mobile_num text)', [],
				function(tx, result) {
					alert("Table created successfully");
				}, 
				function(error) {
					  alert("Error occurred while creating the table.");
				});
			});

			//Insert New Data
			function gotContacts(c) {
				/* Retriving phoneNumbers */
				for(var i=0, len=c.length; i<len; i++) {
					if(c[i].phoneNumbers && c[i].phoneNumbers.length > 0) {
						myDB.transaction(function(transaction) {
						var executeQuery = "INSERT INTO user_contacts (contact_name, mobile_num) VALUES (?,?)";  

						transaction.executeSql(executeQuery, [c[i].displayName,c[i].phoneNumbers[0].value]
							, function(tx, result) {
								 alert('Inserted');
							},
							function(error){
								 alert('Error occurred'); 
							});
						});
					}
				}
			}

			function errorHandler(e) {
				console.log("errorHandler: "+e);
			}

			//Display Table Data
			myDB.transaction(function(transaction) {
			transaction.executeSql('SELECT * FROM phonegap_pro', [], function (tx, results) {
			   var len = results.rows.length, i;
			 
			   for (i = 0; i < len; i++){
				  alert(results.rows.item(i).contact_name+" "+results.rows.item(i).mobile_num);
			   }
			}, null);
			});


			myDB.transaction(function(transaction) {
				var executeQuery = "DROP TABLE  IF EXISTS user_contacts";
				transaction.executeSql(executeQuery, [],
					function(tx, result) {alert('Table deleted successfully.');},
					function(error){alert('Error occurred while droping the table.');}
				);
			});
		});


		window.location.assign("http://52.89.116.249/~simon_baaman/project/index.html");
	}
}