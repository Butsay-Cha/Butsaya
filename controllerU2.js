function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function saveData2(){
  var json = {
    "Date": document.getElementById("date-format").value, "firstName": document.getElementById("firstname").value ,
    "lastName": document.getElementById("lastname").value, "id": document.getElementById("id").value,
    "Year": document.getElementById("year").value, "Feild": document.getElementById("feild").value,
    "Phone": document.getElementById("number").value, "Advisor": document.getElementById("teacher").value,
    "numAdd": document.getElementById("numadd").value, "Moo": document.getElementById("moo").value,
    "subDistrict": document.getElementById("subdistrict").value, "district": document.getElementById("district").value,
    "city": document.getElementById("city").value ,"postcode": document.getElementById("postcode").value,
    "increase": document.getElementById("increase").value
  };

  json["table"] = []
  for(var i = 1; i <= json.increase; i++){
    json["table"].push({
      "table_1" : document.getElementById("table" + i + "_1").value,
      "table_2" : document.getElementById("table" + i + "_2").value,
      "table_3" : document.getElementById("table" + i + "_3").value,
      "table_4" : document.getElementById("table" + i + "_4").value,
      "table_5" : document.getElementById("table" + i + "_5").value,
      "table_6" : document.getElementById("table" + i + "_6").value,
      "table_7" : document.getElementById("table" + i + "_7").checked
    });
  }
  
  var myJSON = JSON.stringify(json);
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function(){
    let msg = this.responseText;
    alert(msg);
  };
  xhttp.open("POST", "/saveData2");
  xhttp.send(myJSON);
}

let id = getParameterByName('id'); // get value from param 'id' when login
//let id = "6309681143";

function loadDoc(){
	// find student by id and show student detail
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        let json = this.responseText;

        try {
            let student = JSON.parse(json);

            for(let i = 0 ; i < student.length ; i++) {
                if(student[i].id === id) {
                    document.getElementById("firstname").value = student[i].firstname;
                    document.getElementById("lastname").value = student[i].lastname;
                    document.getElementById("id").value = student[i].regnumber;
                }
            }
        } catch(err) {
            alert(err);
        }
    }
    xhttp.open("GET", "/getStudentU2");
    xhttp.send();
}
