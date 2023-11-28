import React, { useRef } from 'react';
import * as ReactDOM from 'react-dom';

export default function Camera() {

  
  const videoRef = useRef(null)
  navigator.mediaDevices.getUserMedia({video: true})
  .then(stream => {
    let video = videoRef.current;
    video.srcObject = stream;
    video.play();
    })
  .catch(err =>{
    console.error(err);
  })

 // Stop the camera stream
  function stopCamera() {
    videoRef.current.pause();

  }

  function resumeCamera(){
    videoRef.current.play()
  }

  return(
    <>
    <video ref={videoRef}></video>
    <button onClick={() => stopCamera()}>stop Camera</button>
    <button onClick={() => resumeCamera()}>resume Camera</button>

    </>
  )



}
