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
  
  // Start the video stream initially

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
