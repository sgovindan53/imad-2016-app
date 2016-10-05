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