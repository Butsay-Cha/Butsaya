var http = require('http');
var fs = require('fs');
var os = require("os");
http.createServer(function (req, res) {
  console.log(req.url);
  //console.log(req);
  if(req.method === 'GET'){
    var url = '';
    var index = req.url.indexOf('?');
    var path;
    if(index != -1)
      path = req.url.substring(0,index);
    else
      path = req.url;
    console.log('path: ' + path);
    switch(path){
      case '/index':
          url = 'index.html';
          break;
      case '/indexTeacher':
          url = 'indexTeacher.html';
          break;
      case '/getJson':
          url = 'dataU4.json';
          break;
      case '/formStudent.html':
          url = 'formStudent.html';
          break;
      case '/getStudentU2':
          url = 'dataU2.json';
          break;  
      case '/u3_search':
          url = 'u3_search.html';
          break;
      case '/getdataContact':
          url = 'dataContact.json';
          break;
      case '/u3_1':
          url = 'u3_1.html';
          break;
      case '/u3_show.html':
          url = 'u3_show.html';
          break;
      case '/u4.html':
          url = 'u4.html';
          break;
      case '/u4_student':
          url = 'u4_student.html';
          break;
      case '/requestlist':
          url = 'U11_list.html';
          break;
      case '/requestInfo':
          url = 'U11_approve.html';
          break;
      case '/getRequestForm':
          url = 'dataU2.json';
          break;
      case '/staff':
          url = 'U13check.html';
          break;
      case '/getStudent':
          url = 'student.json';
          break;
      case '/studentProfile':
          url = 'U13form.html';
          break;
      case '/search':
          url = 'search.html';
          break;
      case '/info':
          url = 'info.html';
          break;
      case '/index.html':
          url = 'index.html';
          break;
      case '/exit':
          process.exit();
          break;
      case '/getdataT':
          url = 'table.json';
          break;
      case '/u5':
          url = 'u5.html';
          break;
      case '/edit':
          url = 'edit.html';
          break;
      case '/getStudentU9':
          url = 'dataU9.json';
          break;
      case '/showU9':
          url = 'showU9.html';
          break;
      case '/edit':
          url = 'edit.html';
          break;
      case '/getStudentU13':
          url = 'studentU13.json';
          break;


      default:
          if(req.url.includes('.')){
            url = req.url;
            break;
          }
          url = 'search.html';
          break;
      }
      

      console.log(url);
      if(url){
        if(url.charAt(0) == '/'){
          url = url.substring(1);
        }
        fs.readFile(url, function(err, data) {
        
            console.log(err);
            if(err){
              res.writeHead(404, {'Content-Type': 'text/html'});
              res.write('<h1>404 NOT FOUND</h1>');
              return res.end();
            }else{
              if(url.endsWith('.html'))
                res.writeHead(200, {'Content-Type': 'text/html'});
              else if(url.endsWith('.js')){
                res.writeHead(200, {'Content-Type': 'text/javascript'});
              }
              //----------------เพิ่มโค้ดตรงนี้เข้าไปแก้ให้อ่าน css ได้--------//
              else if(url.endsWith('.css')){
                res.writeHead(200, {'Content-Type': 'text/css'});
              //--------------------------------------------------//
              }else if(url.endsWith('.json')){
                res.writeHead(200, {'Content-Type': 'application/json'});
              }else{
                res.writeHead(200, {'Content-Type': 'text/plain'});
              }
              res.write(data);
              return res.end();
            }
        });
      }else{
        res.end();
      }
    }
    
  else if(req.method === 'POST'){
    var url = '';
    var index = req.url.indexOf('?');
    var path;
    if(index != -1){
      path = req.url.substring(0, index);
    }else{
      path = req.url;
    }
    switch(path){
      case '/saveData' :
        req.on('data', chunk => {
          let json = JSON.parse(chunk);

          let outputJson = [];
          let data = fs.readFileSync('dataContact.json',{encoding: "utf-8"});
          outputJson = JSON.parse(data);
          outputJson.push(json);
          outputJson = JSON.stringify(outputJson);

          fs.writeFileSync('dataContact.json', outputJson);
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.write('Complete!');
          res.end();
        })
        break;

        case '/saveDataU4' :
        req.on('data', chunk => {
          let json = JSON.parse(chunk);

          let outputJson = [];
          let data = fs.readFileSync('dataU4.json',{encoding: "utf-8"});
          outputJson = JSON.parse(data);
          for(let i = 0; i < outputJson.length; i++){
            if(outputJson[i].id === json.id){
                outputJson.splice(i, 1);
            }
          }
          outputJson.push(json);
          outputJson = JSON.stringify(outputJson);
          
          fs.writeFileSync('dataU4.json', outputJson);
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.write('Complete!');
          res.end();
        })
        break;


        case '/saveData2' :
          req.on('data', chunk => {
            let json = JSON.parse(chunk);
  
            let outputJson = [];
            let data = fs.readFileSync('dataU2.json',{encoding: "utf-8"});
            outputJson = JSON.parse(data);
            outputJson.push(json);
            outputJson = JSON.stringify(outputJson);
            
            console.log("1");
            fs.writeFileSync('dataU2.json', outputJson);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write('Complete!');
            res.end();
          })
          break;

        case '/approve':
          req.on('data', chunk => {
              let json = JSON.parse(chunk);
              outputJson = JSON.stringify(json);
              fs.writeFileSync('dataU2.json', outputJson);
              res.writeHead(200, { 'Content-Type': 'text/plain' });
              res.write('Complete!');
              res.end();
          })
        break;

        case '/saveDataT' :
        req.on('data', chunk => {
          let json = JSON.parse(chunk);

          let outputJson = [];
          let data = fs.readFileSync('table.json',{encoding: "utf-8"});
          outputJson = JSON.parse(data);
          outputJson.push(json);
          outputJson = JSON.stringify(outputJson);

          fs.writeFileSync('table.json', outputJson);
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.write('Complete!');
          res.end();
        })
        break;

        case '/saveData9':
            req.on('data', chunk => {
            let json = JSON.parse(chunk);
            let outputJson = [];
            let data = fs.readFileSync('dataU9.json',{encoding: "utf-8"});
                    outputJson = JSON.parse(data);
                    for(let i = 0; i < outputJson.length; i++){
                        if(outputJson[i].id === json.id){
                            outputJson.splice(i, 1);
                        }
                    }
                    outputJson.push(json);
                    outputJson = JSON.stringify(outputJson);
                    
                    fs.writeFileSync('dataU9.json', outputJson);
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.write('Complete!');
                    res.end();
        })
        break;  
      default: res.end();
    }
  }else{
    res.end();
  }
}).listen(8080);

