function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var name =  getParameterByName("name");// get value from param 'name'


function loadDoc(){
	// find student by name and show student detail
	const sHttp = new XMLHttpRequest(); //call api from js
	sHttp.onload = function(){
		let saveinfo = this.responseText;
		try{
			let table = JSON.parse(saveinfo);

			 for(let i = 0 ; i < table.length;i++){
			 		let j =i+1;
                    document.getElementById("sub"+j).innerHTML = table[i].sub;
    				document.getElementById("namesub"+j).innerHTML = table[i].namesub;
    				document.getElementById("status"+j).innerHTML = table[i].status;           
            }
		}
		catch(error){
			alert(error);
		}
	}
	
	sHttp.open("GET","/getdataT");
	sHttp.send();
}