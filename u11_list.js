const { nextTick } = require("process");

function LoadDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        let json = this.responseText;
        let data = JSON.parse(json);
        var col = ["รหัสนักศึกษา", "ชื่อ", "วันที่", "พิจารณา"];

        var table = document.createElement("table");
        var tr = table.insertRow(-1);

        for (var i = 0; i < 4; i++) {
            var th = document.createElement("th");
            th.innerHTML = col[i];
            tr.appendChild(th);
        }
        //work!
        if (data.length != 0) {
            for (var i = 0; i < data.length; i++) {
                var count = Object.keys(data[i]).length;
                if (count > 18) {

                } else {
                    tr = table.insertRow();
                    var tabCell1 = tr.insertCell(-1);
                    tabCell1.innerHTML = data[i].id;

                    var std_name = data[i].firstName + " " + data[i].lastName;
                    var tabCell2 = tr.insertCell(-1);
                    tabCell2.innerHTML = std_name;

                    var tabCell3 = tr.insertCell(-1);
                    tabCell3.innerHTML = data[i].Date;

                    var link = document.createElement("a");
                    link.setAttribute("href", "requestInfo?id=" + data[i].id);
                    var linkText = document.createTextNode("พิจารณา");
                    link.appendChild(linkText);
                    var tabCell4 = tr.insertCell(-1);
                    tabCell4.appendChild(link);
                }
            }
        } else {
            document.getElementById("ann").innerHTML = "ไม่มีคำร้อง";
        }

        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    }
    xhttp.open("GET", "/getRequestForm");
    xhttp.send();
}