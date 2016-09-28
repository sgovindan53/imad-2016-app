// Counter code
var button = document.getElementbyId("counter");
var counter =0;
button.onclick = function() {
    
    //make a request to the counter endpoint
    
    //capture the response and store it in our variable
    
    //render the variable in the correct span
    counter = counter + 1;
    var span = document.getElementbyId("count");
    span.innerHTML = counter.toString();
    
};
    
