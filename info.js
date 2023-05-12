function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
let id = getParameterByName('id') ; 

function loadDoc(){
	const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        let json = this.responseText;
        let student = JSON.parse(json);
        try{
            for(var i = 0; i < student.length; i++){
                if(student[i].regnumber === id){
                    document.getElementById("dateformat").value = student[i].dateformat;
                    document.getElementById("firstname").value = student[i].firstname;
                    document.getElementById("lastname").value = student[i].lastname;
                    document.getElementById("regnumber").value = student[i].regnumber;
                    document.getElementById("year").value = student[i].year;
                    document.getElementById("field").value = student[i].field; 
                    document.getElementById("address").value = student[i].address;
                    document.getElementById("moo").value = student[i].moo;
                    document.getElementById("tumbol").value = student[i].tumbol;
                    document.getElementById("amphur").value = student[i].amphur;
                    document.getElementById("province").value = student[i].province;
                    document.getElementById("postcode").value = student[i].postcode;
                    document.getElementById("mobilephone").value = student[i].mobilephone;
                    document.getElementById("phone").value = student[i].phone;
                    document.getElementById("teachers").value = student[i].teachers; 
                    document.getElementById("cause").value = student[i].cause;

                    document.getElementById("nosubject1").value = student[i].addSubjectList1.nosubject;
                    document.getElementById("namesubject1").value = student[i].addSubjectList1.namesubject;
                    document.getElementById("section1").value = student[i].addSubjectList1.section;
                    document.getElementById("datetime1").value = student[i].addSubjectList1.datetime;
                    document.getElementById("value1").value = student[i].addSubjectList1.value;
                    document.getElementById("nameteacher1").value = student[i].addSubjectList1.nameteacher;

                    document.getElementById("nosubject2").value = student[i].addSubjectList2.nosubject;
                    document.getElementById("namesubject2").value = student[i].addSubjectList2.namesubject;
                    document.getElementById("section2").value = student[i].addSubjectList2.section;
                    document.getElementById("datetime2").value = student[i].addSubjectList2.datetime;
                    document.getElementById("value2").value = student[i].addSubjectList2.value;
                    document.getElementById("nameteacher2").value = student[i].addSubjectList2.nameteacher;
                }
            }
        }catch(err){
            alert('Not Found');
        }
    }
    xhttp.open("GET","/getStudentU13");
    xhttp.send();
	
} 
