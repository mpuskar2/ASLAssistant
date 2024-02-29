document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded!');
});

function addInput(){
    let br = document.createElement("br");
    let inVal = document.getElementById("chatbox-input-text").value;
    if (inVal !== "") {
        let div = document.getElementById("titleDiv");
        let input = document.createElement("output");
        input.value = "You: " + inVal;
        div.appendChild(input);
        div.appendChild(br);
    
        // Sends the typed text to the backend and receive a response from the assistant
        // This should eventually show the signed input as text and appropriate response
        let path = window.location.protocol + "//" + window.location.hostname + ":4000/send/" + inVal;
        fetch(path).then(res => res.text()
        .then(data => {
          addOutput(data);
        }));
    }
  }
  
  function addOutput(outVal){
    let br = document.createElement("br");
    let div = document.getElementById("titleDiv");
    let output = document.createElement("output");
    output.value = "Google Assistant: " + outVal;
    div.appendChild(output);
    div.appendChild(br);
  }
  
  function showImage() {
    document.getElementById('video').style.display = 'block';
  }
  
  function hideImage() {
    document.getElementById('video').style.display = 'none';
  }
  
  function addInputSign(prediction){
    let br = document.createElement("br");
    let div = document.getElementById("titleDiv");
    let input = document.createElement("output");
    input.value = "You: " + prediction;
    div.appendChild(input);
    div.appendChild(br);

    // Sends the typed text to the backend and receive a response from the assistant
    // This should eventually show the signed input as text and appropriate response
    let path = window.location.protocol + "//" + window.location.hostname + ":4000/send/" + prediction;
    fetch(path).then(res => res.text()
    .then(data => {
      addOutput(data);
    }));
  }

// BEAST MODE
var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
    
navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
        video.srcObject = stream;
    })
    .catch(function (error) {
        console.error('Error accessing webcam:', error);
    });

function captureFrame() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas image to a Blob
    canvas.toBlob(function (blob) {
        // Create a FormData object and append the Blob
        const formData = new FormData();
        formData.append('image', blob, 'image.jpg');

        // Make a POST request using fetch
        fetch('/upload', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the server
                console.log('Prediction:', data.prediction_text);
                //document.getElementById('predictionText').textContent = 'Prediction Text: ' + data.prediction_text;
                if (data.prediction_text && typeof data.prediction_text === 'string' && data.prediction_text.trim() !== '') {
                    addInputSign(data.prediction_text);
                } else {
                    // Handle the case where data.prediction_text is null, undefined, or an empty string
                    console.log("No sign detected");
                }
                })
            .catch(error => {
                console.error('Error uploading the image:', error);
            });
    }, 'image/jpeg'); // Specify the desired MIME type
}

// Call the API every 3 seconds
setInterval(captureFrame, 3000);