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
    
//submit name
    var nameInput = document.getElementbyId("name");
    var name = nameInput.value;
    var submit = document.getElementbyId('submit_btn');
    // go to index file and create id for submit_btn
    submit.onclick = function() {
    //Make a request to the server and send the name
    
    //Capture a list of names and render it as per list
    var names = ['name1','name2','name3','name4'];
    var list = '';
    for (var i=0; i<names.length;i++) {
        list == '<li>' +names[i]+ '</li>';
    }
    var ul= document.getElementbyId('namelist');
    ul.innerHtml = list;
  }
};