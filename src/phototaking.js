import React from 'react';
import { Webcam } from "react-webcam";


export const WebcamCapture = () => {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
      };
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);
  
    return (
      <>
        <Webcam
          audio={false}
          height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
    
        />
        <button onClick={capture}>Capture photo</button>
        {imgSrc && (
          <img
            src={imgSrc}
          />
        )}
      </>
    );
  };
  

  
  export class AppStreamCam extends React.Component {
    constructor(props) {
      super(props);
      this.streamCamVideo= this.streamCamVideo.bind(this)
    }
    streamCamVideo() {
      var constraints = { audio: true, video: { width: 1280, height: 720 } };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(mediaStream) {
          var video = document.querySelector("video");
  
          video.srcObject = mediaStream;
          video.onloadedmetadata = function(e) {
            video.play();
          };
        })
        .catch(function(err) {
          console.log(err.name + ": " + err.message);
        }); // always check for errors at the end.
    }
    render() {
      return (
        <div>
          <div id="container">
            <video autoPlay={true} id="videoElement" controls></video>
          </div>
          <br/>
          <button onClick={this.streamCamVideo}>Start streaming</button>
        </div>
      );
    }
  }