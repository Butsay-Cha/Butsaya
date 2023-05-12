function search(){
	let searchName = document.getElementById("searchName").value;
	// set url to search from input
	let targetUrl = window.location.pathname;
	let query = '';
	if (searchName) {
		query += '&name=' + searchName;
	}
	if (query) {
		query = query.replace("&","?");
		window.location.href = targetUrl + query;
	}
	else{
		window.location.href = targetUrl + query;
	}
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var name = String(getParameterByName("name")); // get value from param 'name'

function loadDoc(){
	// search student by name param and set hyperlink to info of student
	const sHttp = new XMLHttpRequest();
	sHttp.onload = function(){
		let saveinfo = this.responseText;
		try{
			let dataContact = JSON.parse(saveinfo);
			let all = document.getElementById("contactList");
			if(name != "null"){
				for(let i = 0 ; i < dataContact.length ; i++){

					if(dataContact[i].Name.includes(name)){
						let valueUI = document.createElement("li");
						let saveLink = dataContact[i].Name.link("/u3_search?name="+dataContact[i].Name);
						valueUI.innerHTML = saveLink;
						all.appendChild(valueUI);
					}
				
				}
			}
			else {
				for(let i = 0 ; i < dataContact.length ; i++){
						let valueUI = document.createElement("li");
						let saveLink = dataContact[i].Name.link("/u3_search?name="+dataContact[i].Name);
						valueUI.innerHTML = saveLink;
						all.appendChild(valueUI);
				
				}
			}
		}
		catch(error){
		alert(error);
	}
}
	sHttp.open("GET","/getdataContact");
	sHttp.send();
}