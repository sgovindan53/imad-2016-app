// Counter code
var button = document.getElementById('counter');

button.onclick = function() {
    
    //create a request object
    var request = new XMLHttpRequest();
    
    //capture the response and store it in our variable
    request.onreadystatechange = function () {
       if (request.readyState === XMLHttpRequest.DONE) {
         //TAKE SOME ACTION
        if (request.status ===200) {
        var counter = request.responseText;
        
        var span = document.getElementById('count');
        span.innerHTML = counter.toString();
        //counter=counter+1;
        }
       }
    };
   // Make the request 
  request.open('GET', 'http://sgovindan53.imad.hasura-app.io/counter', true);
  request.send(null);
                
}; 

//submit name

var submit = document.getElementById("submit_btn");
submit.onclick = function() {
    // Make a request to the server and send the name
    //create a request object
    var request = new XMLHttpRequest();
    
    //capture the response and store it in our variable
    request.onreadystatechange = function () {
       if (request.readyState === XMLHttpRequest.DONE) {
         //TAKE SOME ACTION
        if (request.status ===200) {
        var names = request.responseText;
        names = JSON.parse(names);
        var list='';
        for (var i=0; i<names.length; i++) {
            list += '<li>' + names[i] + '</li>';
        }
        var ul = document.getElementById('namelist');
        ul.innerHTML = list;
        
        }
       }
    };
   // Make the request 
  var nameInput = document.getElementById("name");
  var name = nameInput.value;
  request.open('GET', 'http://sgovindan53.imad.hasura-app.io/submit-name?name=' + name, true);
  request.send(null);
                
}; 