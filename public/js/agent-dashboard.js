var sessionTranscriptEndpoint = '/api/session-transcript';

function getSessionTranscript(sessionId, callback){
    var http = new XMLHttpRequest(); 
    http.open('GET', sessionTranscriptEndpoint + '?session_id=' + sessionId, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function () {
        if (http.readyState === XMLHttpRequest.DONE) {
        var res = JSON.parse(http.responseText);
        console.log(res);
        callback(res);
        }
    };
    http.send();  
}

window.onload = function() {

    const urlParams = new URLSearchParams(window.location.search);
    sessionId = urlParams.get('session_id');

    getSessionTranscript(sessionId, function(res){
        
        document.getElementById("agentContent").appendChild(document.createElement("h3")).innerHTML = "Customer Conversation Context:<br>";

        document.getElementById("agentContent").appendChild(document.createElement("div")).innerHTML = JSON.stringify(res.chat_context);

        document.getElementById("agentContent").appendChild(document.createElement("h3")).innerHTML = "<br>Customer Conversation Transcript:<br>";

        res.chat_transcript.forEach(function(el){
            document.getElementById("agentContent").appendChild(document.createElement("div")).innerHTML = el;
        });

        document.getElementById("agentContent").appendChild(document.createElement("h3")).innerHTML = "<br>Continue Conversation:<br>";

        document.getElementById("agentContent").appendChild(document.createElement("button")).innerHTML = "Begin Live Chat with this Customer";
        
    });
}