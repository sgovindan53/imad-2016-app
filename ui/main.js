// Counter code
var button = document.getElementbyId("counter");
var counter = 0;
button.onclick = function() {
    
    //create a request object
    
    //capture the response and store it in our variable
    
    
    //Render the variable in the correct span
    counter = counter + 1;
    var span = document.getElementbyId("count");
    span.innerHTML = counter.toString();
                
}; 