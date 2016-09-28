// Counter code
var button = document.getElementbyId('counter');

button.onclick = function() {
    
    //create a request object
    var request = XMLHttpRequest();
    
    //capture the response and store it in our variable
    request.onreadystatechange = function() {
       if (request.readystate === XMLHttpRequest.DONE) {
             //TAKE SOME ACTION
            if (request.status ===200) {
                var counter = request.responseText;
                var span = document.getElementbyId('count');
                span.innerHTML = counter.toString();
                
              }
            }
           
       };
  // make the request
  request.open('GET', 'http://sgovindan53.imad.hasura-app.io/counter', true);
  request.send(null);
};
    
