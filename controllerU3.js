function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
    var nameProf = getParameterByName("nameProf");
    var faculty = getParameterByName("faculty");
    var email = getParameterByName("Email");
    var detail1 = getParameterByName("detail1");
    var line = getParameterByName("lineId");
    var detail2 = getParameterByName("detail2");
    var facebook = getParameterByName("facebookName");
    var detail3 = getParameterByName("detail3");
    var phone = getParameterByName("phone");
    var detail4 = getParameterByName("detail4");
    var centre = getParameterByName("centre");
    var addressTeacher = getParameterByName("addressTeacher");
	var floor = parseInt(getParameterByName("floor"));
    var room = getParameterByName("room");
    var detail5 = getParameterByName("detail5");

    document.getElementById("nameProf").value = nameProf;
    document.getElementById("faculty").value = faculty;
    document.getElementById("Email").value = email;
    document.getElementById("detail1").value = detail1;
    document.getElementById("lineId").value = line;
    document.getElementById("detail2").value = detail2;
    document.getElementById("facebookName").value = facebook;
    document.getElementById("detail3").value = detail3;
    document.getElementById("phone").value = phone;
    document.getElementById("detail4").value = detail4;
    document.getElementById("centre").value = centre;
    document.getElementById("addressTeacher").value = addressTeacher;
    document.getElementById("floor").value = floor;
    document.getElementById("room").value = room;
    document.getElementById("detail5").value = detail5;

    if(document.getElementById("faculty").value === "") {
        document.getElementById("faculty").value = "select";
    }
    if(document.getElementById("centre").value === "") {
        document.getElementById("centre").value = "select";
    }


    var whichFaculty = this.form.faculty;
    var whichCentre = this.form.centre;
    var chosenFaculty = whichFaculty.options.selectedIndex;
    var chosenCentre = whichCentre.options.selectedIndex;
    if(document.getElementById("faculty").required === false && document.getElementById("centre").required === false){
        whichFaculty.onchange = function(){
            whichFaculty.options.selectedIndex = chosenFaculty;
        } 
        whichCentre.onchange = function(){
            whichCentre.options.selectedIndex = chosenCentre;
        }
    }
    
