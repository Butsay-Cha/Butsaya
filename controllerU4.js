function makeJson(){
    //var id = getParameterByName('id'); // get value from param 'id'
    var id = "6309681366";
    var receiveForm = document.getElementById("receiveForm").checked;
    var tb1 = document.getElementById("tb1").value;
    var teacherSign = document.getElementById("teacherSign").checked;
    var tb2 = document.getElementById("tb2").value;
    var teacherApprove = document.getElementById("teacherApprove").checked;
    var tb3 = document.getElementById("tb3").value;
    var adminComment = document.getElementById("adminComment").checked;
    var tb4 = document.getElementById("tb4").value;
    var complete = document.getElementById("complete").checked;
    var tb5 = document.getElementById("tb5").value;

    var json = {"id" : id, "receiveForm" : receiveForm, "tb1" : tb1, "teacherSign" : teacherSign,
    "tb2" : tb2, "teacherApprove" : teacherApprove, "tb3" : tb3, "adminComment" : adminComment,
    "tb4" : tb4, "complete" : complete, "tb5" : tb5
    }

    var myJSON = JSON.stringify(json);
    const xhttp = new XMLHttpRequest();   
    xhttp.open("POST", "/saveDataU4");
    xhttp.send(myJSON);
    
}

function takeData(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        let json = this.responseText;

        try {
            let student = JSON.parse(json);
            console.log(student);
            if(student[0].receiveForm){
                document.getElementById("receiveForm").innerHTML = "Checked!!";
            }
            document.getElementById("tb1").innerHTML = student[0].tb1;
            if(student[0].teacherSign){
                document.getElementById("teacherSign").innerHTML = "Checked!!";
            }
            document.getElementById("tb2").innerHTML = student[0].tb2;
            if(student[0].teacherApprove){
                document.getElementById("teacherApprove").innerHTML = "Checked!!";
            }
            document.getElementById("tb3").innerHTML = student[0].tb3;
            if(student[0].adminComment){
                document.getElementById("adminComment").innerHTML = "Checked!!";
            }
            document.getElementById("tb4").innerHTML = student[0].tb4;
            if(student[0].complete){
                document.getElementById("complete").innerHTML = "Checked!!";
            }
            document.getElementById("tb5").innerHTML = student[0].tb5;
        } catch(err) {
            alert('Not Found');
        }
    }
    xhttp.open("GET", "/getJson");
    xhttp.send();
}
