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
			let dataContact = JSON.parse(saveinfo);

			 for(let i = 0 ; i < dataContact.length;i++){

                if(dataContact[i].Name === name){

                    document.getElementById("name").innerHTML = dataContact[i].Name;
    				document.getElementById("faculty").innerHTML = dataContact[i].Faculty;
    				document.getElementById("Email").innerHTML = dataContact[i].Email;
    				document.getElementById("detail1").innerHTML = dataContact[i].รายละเอียดEmail;
    				document.getElementById("lineId").innerHTML = dataContact[i].Lineid;
    				document.getElementById("detail2").innerHTML = dataContact[i].รายละเอียดLine;
    				document.getElementById("facebookName").innerHTML = dataContact[i].Facebook;
    				document.getElementById("detail3").innerHTML = dataContact[i].รายละเอียดFacebook;
    				document.getElementById("phone").innerHTML = dataContact[i].โทรศัพท์;
    				document.getElementById("detail4").innerHTML  = dataContact[i].รายละเอียดโทรศัพท์;
    				document.getElementById("centre").innerHTML = dataContact[i].ศูนย์;
    				document.getElementById("addressTeacher").innerHTML = dataContact[i].อาคาร;
    				document.getElementById("floor").innerHTML = dataContact[i].ชั้น;
    				document.getElementById("room").innerHTML  = dataContact[i].ห้อง;
    				document.getElementById("detail5").innerHTML  = dataContact[i].รายละเอียดที่อยู่;
    				break;
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