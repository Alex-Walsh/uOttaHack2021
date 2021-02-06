import React from 'react';
import { Webcam } from "react-webcam";
import Camera from 'react-dom-camera';
import styled, { createGlobalStyle, keyframes } from "styled-components";
import './style.css';

const Images = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.87); }
  to { opacity: 1; transform: none; }
`;

const settings = {
  colors: {
    headings: "#7A08FA",
    text: "#A82FFC"
  },
  space: 24
};

const Image = styled.img`
  animation: ${fadeIn} 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  border: 1px solid #fafafa;
  border-radius: 1px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  height: auto;
  margin-bottom: ${settings.space / 3}px;
  margin-right: ${settings.space / 3}px;
  width: calc(33.333% - ${settings.space / 4}px);
  &:nth-child(3n) {
    margin-right: 0;
  }
`;

export class WebCamera extends React.Component{
  constructor() {
    super();
    this.state = {
      photos: []
    }
  }
    

  render() {
    return (
      <div className="camera">
      <Camera className="othercam"
  captureButtonRenderer={onClick => <button onClick={onClick} />}
  onTakePhoto={image =>
    window.alert(image)
    // t  
  }
/>
<Images>
             {this.state.photos.map(img => (
                <Image key={img} src={img} />
              ))}
            </Images>
            </div>
  );
  }
}



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
      var constraints = { audio: false  , video: { width:600, height: 300 } };
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
        <div className="videoelement"   style={{
          position: 'absolute'
      
      }}>
          <div id="container" className="directvideo">
            <video autoPlay={true} id="videoElement" controls></video>
          </div>
          <br/>
          <button onClick={this.streamCamVideo}>Start</button>
        </div>
      );
    }
  }
