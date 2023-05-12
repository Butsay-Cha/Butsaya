function search() {
    let searchName = document.getElementById("searchName").value;
    let searchPassword = parseInt(document.getElementById("searchPassword").value);
    // set url to search from input
    let targetUrl = window.location.pathname;
    let query = '';
    if (searchName) {
        query += '&name=' + searchName;
    }
    if (searchPassword) {
        query += '&password=' + searchPassword;
    }
    if (query) {
        query = query.replace("&", "?");
        window.location.href = targetUrl + query;
    } else {
        Swal.fire("Please Complete" + "\n" + "Username and Password");
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

let name = getParameterByName('name');
let password = getParameterByName('password');



function loadDoc() {
    let studentList = document.getElementById("studentList");
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        let json = this.responseText;
        try {
            let pattern = new RegExp(name);
            let student = JSON.parse(json);
            for (let index = 0; index < student.length; index++) {
               if ((password == student[index].password) && (pattern.test(student[index].name))) {
                    if (name.slice(name.length - 5) == "@dome") {
                        Swal.fire(
                            'Login Success',
                            'As Student'
                        ).then(function () {
                            window.location = "index.html";
                        });
                    } else if (name.slice(name.length - 6) == "@staff") {
                        Swal.fire(
                            'Login Success',
                            'As Staff'
                        ).then(function () {
                            window.location = "indexTeacher.html";
                        });
                    }
                }
                if ((password != student[index].password) && (pattern.test(student[index].name))) {
                    Swal.fire(
                        'Incorrect Password'
                    )

                }
            }

        } catch (err) {
            alert('User Not Found');
        }
    }
    xhttp.open("GET", "/getStudent");
    xhttp.send();
}