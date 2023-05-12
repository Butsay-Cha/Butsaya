function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

//var id = getParameterByName('id');
var id = "6309681846";

function loadDoc() {
    
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        let json = this.responseText;
        let data = JSON.parse(json);
        for (let i = 0; i < data.length; i++) {
            if (id == data[i].studentId) {
                document.getElementById("fname").value = data[i].studentFirstName;
                document.getElementById("lname").value = data[i].studentLastName;
                document.getElementById("phone").value = data[i].mobilePhone;
                document.getElementById("tel").value = data[i].phone;
                document.getElementById("major").value = data[i].studyField;
                document.getElementById("year").value = data[i].studentYear;
                document.getElementById("advisor").value = data[i].advisor;

                document.getElementById("address").value = data[i].addressNumber;
                document.getElementById("moo").value = data[i].moo;
                document.getElementById("tumbol").value = data[i].tumbol;
                document.getElementById("amphur").value = data[i].amphur;
                document.getElementById("province").value = data[i].province;
                document.getElementById("postalCode").value = data[i].postalCode;
            }
        }

    }
    xhttp.open("GET", "/dataU9.json");
    xhttp.send();
}


function saveData9() {
    let data = {
        "studentId" : id,
        "studentFirstName" : document.getElementById("fname").value,
        "studentLastName" : document.getElementById("lname").value,
        "mobilePhone" : document.getElementById("phone").value,
        "phone" : document.getElementById("tel").value,
        "studyField" : document.getElementById("major").value,
        "studentYear" : document.getElementById("year").value,
        "advisor" : document.getElementById("advisor").value,

        "addressNumber" : document.getElementById("address").value,
        "moo" : document.getElementById("moo").value,
        "tumbol" : document.getElementById("tumbol").value,
        "amphur" : document.getElementById("amphur").value,
        "province" : document.getElementById("province").value,
        "postalCode" : document.getElementById("postalCode").value
    }
    
    const xhttp = new XMLHttpRequest();
    var update = JSON.stringify(data);
    xhttp.open("POST", "/saveData9");
    xhttp.send(update);
}

function editData() {
    window.location.href = "/edit";
}
var openEdit = false;

function Edit() {
    if (openEdit == false) {
        openInput();
        document.getElementById("edit").innerText = 'บันทึก';
        openEdit = true;
    } else if (openEdit == true) {
        var check = checkInput();
        if (check) {
            alert(check);
        } else {
            closeInput();
            document.getElementById("edit").innerText = 'แก้ไข';
            openEdit = false;
            saveData();
            alert("Complete !");
        }
    } else {
        alert("error");
    }
}

function openInput() {
    document.getElementById("fname").disabled = false;
    document.getElementById("lname").disabled = false;
    document.getElementById("phone").disabled = false;
    document.getElementById("tel").disabled = false;
    document.getElementById("major").disabled = false;
    document.getElementById("year").disabled = false;
    document.getElementById("advisor").disabled = false;

    document.getElementById("address").disabled = false;
    document.getElementById("moo").disabled = false;
    document.getElementById("tumbol").disabled = false;
    document.getElementById("amphur").disabled = false;
    document.getElementById("province").disabled = false;
    document.getElementById("postalCode").disabled = false;
}

function closeInput() {
    document.getElementById("fname").disabled = true;
    document.getElementById("lname").disabled = true;
    document.getElementById("phone").disabled = true;
    document.getElementById("tel").disabled = true;
    document.getElementById("major").disabled = true;
    document.getElementById("year").disabled = true;
    document.getElementById("advisor").disabled = true;

    document.getElementById("address").disabled = true;
    document.getElementById("moo").disabled = true;
    document.getElementById("tumbol").disabled = true;
    document.getElementById("amphur").disabled = true;
    document.getElementById("province").disabled = true;
    document.getElementById("postalCode").disabled = true;
}

function checkInput() {
    var msg = "";
    let FirstName = document.getElementById("fname").value;
    let LastName = document.getElementById("lname").value;
    let Phone = document.getElementById("phone").value;
    let tel = document.getElementById("tel").value;
    let major = document.getElementById("major").value;
    let Year = document.getElementById("year").value;
    let advisor = document.getElementById("advisor").value;

    let addressNumber = document.getElementById("address").value;
    let moo = document.getElementById("moo").value;
    let tumbol = document.getElementById("tumbol").value;
    let amphur = document.getElementById("amphur").value;
    let province = document.getElementById("province").value;
    let postalCode = document.getElementById("postalCode").value;

    let adPattern = /[0-9]+\u002F[0-9]+/;
    let phonePattern = /[0][8-9][0-9]+/;

    if (FirstName == null || !isNaN(FirstName)) {
        msg += "ชื่อไม่ถูกต้อง\n";
    } else if (LastName == null || !isNaN(LastName)) {
        msg += "นามสกุลไม่ถูกต้อง\n";
    } else if (Phone.length != 10 || isNaN(Phone) || Phone == null || !Phone.match(phonePattern)) {
        msg += "เบอร์โทรศัพท์มือถือไม่ถูกต้อง\n";
    } else if (tel != "-") {
        if (tel.length != 10 || isNaN(tel) || tel.charAt(0) != 0) {
            msg += "เบอร์โทรศัพท์บ้านไม่ถูกต้อง\n";
        }
    } else if (major == null || !isNaN(major)) {
        msg += "สาขาไม่ถูกต้อง\n";
    } else if (Year == null || isNaN(Year) || Year.length != 1) {
        msg += "ชั้นปีไม่ถูกต้อง\n";
    } else if (advisor == null || !isNaN(advisor)) {
        msg += "ชื่ออาจารย์ที่ปรึกษาไม่ถูกต้อง\n";
    } else if (addressNumber == null || !addressNumber.match(adPattern)) {
        msg += "บ้านเลขที่ไม่ถูกต้อง\n";
    } else if (moo == null || isNaN(moo)) {
        msg += "หมู่ไม่ถูกต้อง\n";
    } else if (tumbol == null || !isNaN(tumbol)) {
        msg += "ตำบลไม่ถูกต้อง\n";
    } else if (amphur == null || !isNaN(amphur)) {
        msg += "อำเภอไม่ถูกต้อง\n";
    } else if (province == null || !isNaN(province)) {
        msg += "จังหวัดไม่ถูกต้อง\n";
    } else if (postalCode == null || postalCode.length != 5 || isNaN(postalCode)) {
        msg += "รหัสไปรษณีย์ไม่ถูกต้อง\n";
    }

    return msg;
}

function goBack() {
    window.history.back();
}