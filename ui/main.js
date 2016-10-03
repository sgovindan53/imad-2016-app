// Counter code
var button = document.getElementById('counter');
var counter = 0;
button.onclick = function() {
    
    //create a request object
    var request = new XMLHttpRequest();
    
    //capture the response and store it in our variable
    request.onreadystatechange = function () {
       if (request.readystate === XMLHttpRequest.DONE) {
         //TAKE SOME ACTION
        if (request.status ===200) {
        var counter = request.responseText;
        
        var span = document.getElementById('count');
        span.innerHTML = counter.toString();
        //counter=counter+1;
        }
       }
    };
    
  request.open('GET', 'http://sgovindan53.imad.hasura-app.io/counter', true);
  request.send(null);
                
}; 