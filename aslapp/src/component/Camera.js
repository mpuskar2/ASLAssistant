import React, { useRef } from 'react';

export default function Camera() {

  const videoRef = useRef(null);
  let currentStream; // Variable to store the current stream
  
  // Function to start the video stream
  const startVideoStream = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        currentStream = stream;
  
        // Add event listener for when metadata is loaded
        video.addEventListener('loadedmetadata', () => {
          // Mirror the video
          video.style.transform = 'scaleX(-1)';
        });
  
        video.play();
      })
      .catch(err => {
        console.error(err);
      });
  };
  
  // Function to stop the video stream
  const stopVideoStream = () => {
    if (currentStream) {
      let tracks = currentStream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };
  
  // Function to restart the video stream
  const restartVideoStream = () => {
    stopVideoStream();
    startVideoStream();
  };
  
  // Check if camera is enabled
  const isCameraRunning = () => {
    return currentStream !== undefined && currentStream.active;
  };

  // Capture an image
  const captureImage = () => {
    if (isCameraRunning()) {
      let video = videoRef.current;
      let canvas = document.createElement('canvas');
      canvas.width = video.videoWidth; // set image width
      canvas.height = video.videoHeight; // set image height
      let context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert the canvas to an image
      let image = new Image();
      image.src = canvas.toDataURL('image/png');

      // Display image in the page body
      // This should go to the model input once connected
      document.body.removeChild(document.body.lastChild);
      document.body.appendChild(image);
    }
  };

  // Capture an image every 83 ms ~ 12 fps
  setInterval(() => {
    captureImage();
  }, 83);

  return(
    <>
    <center>
    <video ref={videoRef}></video>
    <br></br>
    <button onClick={() => stopVideoStream()}>Stop Camera</button>
    <button onClick={() => restartVideoStream()}>Start Camera</button>
    </center>
    </>
  )



}
