import Navigationbar from "./navigationbar";
import { AppStreamCam, WebCamera } from "./phototaking";
import Docs from "./other";
import Dashboard from './dashaboard';
import { useState } from 'react';
import React, { createContext } from 'react';
import MainPage from "./monitorpage";
import { BrowserRouter, Switch,  Route} from 'react-router-dom'; 

export const AppContext = createContext({});

function App() {

  const [cough, setcough] = useState(0);
  const [facetouch, setfacetouch] = useState(0);
  const store = {
    cough: {get: cough, set: setcough},
    facetouch: {get: facetouch,set: setfacetouch}
  }

  return (
    <BrowserRouter>
    <AppContext.Provider value={store}>
    <div className="App">

      <Navigationbar />
      {/* <WebcamCapture /> */}
      {/* <AppStreamCam /> */}
      {/* <Dashboard /> */}
       {/* <WebCamera />  */}
       {/* take a picture */}
       {/* <Docs /> */}
      <MainPage />
    </div>
    <Switch>
      <Route exact path="/">

      </Route> 
      <Route path="About Us">
        {/* <Aboutus /> */}
      </Route>
    </Switch>
    </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
