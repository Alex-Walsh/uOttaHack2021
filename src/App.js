import Navigationbar from "./navigationbar";
import { AppStreamCam } from "./phototaking";
import { Webcam } from 'react-webcam';

function App() {
  return (
    <div className="App">
      <Navigationbar />
      {/* <WebcamCapture /> */}
      <AppStreamCam />
    </div>
  );
}

export default App;
