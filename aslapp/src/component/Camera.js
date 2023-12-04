import React, { useRef } from 'react';

export default function Camera() {

  const videoRef = useRef(null);

  // Get the camera stream
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      let video = videoRef.current;
      video.srcObject = stream;
  
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
 // Stop the camera stream
  function stopCamera() {
    
    videoRef.current.pause();

  }

  // function stopUsingCamera() {
  //   // Stop using the camera.
  //   navigator.mediaDevices.getUserMedia({video: false}).then(function(stream) {
  //     // Stop the video stream.
  //     stream.stop();
  //   });
  // }

  function resumeCamera(){
    videoRef.current.play()
  }

  return(
    <>
    <center>
    <video ref={videoRef}></video>
    <br></br>
    <button onClick={() => stopCamera()}>stop Camera</button>
    <button onClick={() => resumeCamera()}>resume Camera</button>
    </center>
    </>
  )



}
