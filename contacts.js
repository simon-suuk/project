
document.addEventListener("deviceready", init, false);
function init() {
  navigator.contacts.find([navigator.contacts.fieldType.displayName],gotContacts,errorHandler);
}
function errorHandler(e) {
 console.log("errorHandler: "+e);
}

function gotContacts(c) {
 console.log("gotContacts, number of results "+c.length);

 mobileDiv = document.querySelector("#mobile");
 emailDiv = document.querySelector("#email");

 /* Retriving phoneNumbers */
mobileDiv.innerHTML = "<select name='contacts' multiple>";
for(var i=0, len=c.length; i<len; i++) {
	if(c[i].phoneNumbers && c[i].phoneNumbers.length > 0) {
		mobileDiv.innerHTML += "<option value='+c[i].phoneNumbers[0].value+'>c[i].displayName</option>";
	}
}
mobileDiv.innerHTML += "</select>";

 /* Retriving Email */
emailDiv.innerHTML = "<select name='email' multiple>";
for(var i=0, len=c.length; i<len; i++) {
	if(c[i].emails && c[i].emails.length > 0) {
		emailDiv.innerHTML += "<option value='+c[i].emails[0].value+'>c[i].emails[0].value</option>";
	}
}
emailDiv.innerHTML += "</select>";
 
}