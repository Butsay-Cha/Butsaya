function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
let std_id = getParameterByName('id');
var newdata;
var data;
var id_index;

function LoadDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        let json = this.responseText;
        data = JSON.parse(json);
        newdata = data;
        for (let i = 0; i < data.length; i++) {
            if (std_id == data[i].id) {
                id_index = i;
                var std_name = data[i].firstName + " " + data[i].lastName;
                document.getElementById("name").value = std_name;
                document.getElementById("std_id").value = data[i].id;
                document.getElementById("major").value = data[i].Feild;
                document.getElementById("year").value = data[i].Year;
                document.getElementById("std_cause").value = data[i].cause;
                //create table
                var col = ["รหัสวิชา", "ชื่อวิชา", "Section", "หน่วยกิต", "ผู้สอน", "ผู้สอนอนุญาต"];

                var table = document.createElement("table");
                var tr = table.insertRow(-1);

                for (var j = 0; j < 6; j++) {
                    var th = document.createElement("th");
                    th.innerHTML = col[j];
                    tr.appendChild(th);
                }
                console.log(data[i].table.length);
                for (var j = 0; j < data[i].table.length; j++) {
                    tr = table.insertRow();

                    var sub_id = tr.insertCell(-1);
                    sub_id.innerHTML = data[i].table[j].table_1;

                    var sub_name = tr.insertCell(-1);
                    sub_name.innerHTML = data[i].table[j].table_2;

                    var sub_section = tr.insertCell(-1);
                    sub_section.innerHTML = data[i].table[j].table_3;

                    var sub_credit = tr.insertCell(-1);
                    sub_credit.innerHTML = data[i].table[j].table_5;

                    var sub_teacher = tr.insertCell(-1);
                    sub_teacher.innerHTML = data[i].table[j].table_6;

                    var check;
                    if (data[i].table[j].table_7 === true) {
                        check = "อนุญาติ";
                    } else {
                        check = "ไม่อนุญาติ";
                    }
                    var sub_check = tr.insertCell(-1);
                    sub_check.innerHTML = check;
                }
                var divContainer = document.getElementById("approve_info");
                divContainer.innerHTML = "";
                divContainer.appendChild(table);
            }
        }
    }
    xhttp.open("GET", "/getRequestForm");
    xhttp.send();
}

//not working
function Approve() {
    if (document.getElementById("teacher_reason").value == "") {
        alert("โปรดลงความเห็น");
    } else {
        newdata[id_index]["TeacherApprove"] = document.querySelector('input[name="check"]:checked').value;
        newdata[id_index]["TeacherReason"] = document.getElementById("teacher_reason").value;
        //console.log(newdata[id_index]);
        alert("submit!");

        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/approve");
        xhttp.send(JSON.stringify(newdata));
    }
    window.history.href = "/requestlist";
}