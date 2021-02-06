import Navigationbar from "./navigationbar";
import { AppStreamCam, WebCamera } from "./phototaking";
import { WebcamCapture } from 'react-webcam';
import { Webcam } from 'react-webcam';
import Docs from "./other";

function App() {
  return (
    <div className="App">
      <Navigationbar />
      {/* <WebcamCapture /> */}
      {/* <AppStreamCam /> live video stream */}
       <WebCamera /> 
       {/* take a picture */}
       {/* <Docs /> */}
      
    </div>
  );
}

export default App;
