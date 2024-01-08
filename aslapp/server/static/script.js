document.addEventListener('DOMContentLoaded', function() {
    // Your JavaScript code goes here
    console.log('Page loaded!');
});

  function addInput(){
    let br = document.createElement("br");
    let inVal = document.getElementById("chatbox-input-text").value;
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

  function addOutput(outVal){
    let br = document.createElement("br");
    let div = document.getElementById("titleDiv");
    let output = document.createElement("output");
    output.value = "Google Assistant: " + outVal;
    div.appendChild(output);
    div.appendChild(br);
  }
/*
  function startPredictionPolling() {
    setInterval(() => {
        fetch("/get_prediction")  // Change the URL to the endpoint that returns the prediction
            .then(response => response.text())
            .then(predictionText => {
                if (predictionText.trim() !== "") {
                    console.log(predictionText);
                }
            })
            .catch(error => console.error("Error fetching prediction:", error));
    }, 1000);  // Adjust the interval as needed (e.g., every second)
} */

function showImage() {
    document.getElementById('videoFeed').style.display = 'block';
  }

  function hideImage() {
    document.getElementById('videoFeed').style.display = 'none';
  }
/*
  document.addEventListener("DOMContentLoaded", function () {
    // Fetch the prediction text
    setInterval(fetchPrediction, 1000); // Update every second (adjust as needed)

    function fetchPrediction() {
        fetch('/video_feed')
            .then(response => response.text())
            .then(data => {
                // Update the content of the prediction text element
                document.getElementById('predictionText').textContent = 'Prediction Text: ' + data.prediction_text;
                console.log(data.prediction_text);
            })
            .catch(error => console.error('Error fetching prediction text:', error));
    }
}); */

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

function callApi() {
    fetch('http://localhost:5000/get_prediction')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
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
            console.error('Error:', error);
        });
}


// Call the API every 5 seconds
setInterval(callApi, 5000);