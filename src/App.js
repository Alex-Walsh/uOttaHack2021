import Navigationbar from "./navigationbar";
import { AppStreamCam, WebCamera } from "./phototaking";
import Docs from "./other";
import Dashboard from './dashaboard';
import { useState, useContext, useEffect } from 'react';
import React, { createContext } from 'react';
import MainPage from "./monitorpage";
import { BrowserRouter, Switch,  Route} from 'react-router-dom'; 
import Tensor from './Tensor.js';
import axios from 'axios';

export const AppContext = createContext({});

function App() {
  const [cough, setcough] = useState();
  const [facetouch, setfacetouch] = useState();
  const store = {
    cough: {get: cough, set: setcough},
    facetouch: {get: facetouch,set: setfacetouch}
  }
  //console.log("running here");
  useEffect(() => {
    //console.log("running here2");

    axios.get('https://us-central1-virtual-vinyls.cloudfunctions.net/api/gethackdata')
    .then(function(response) {
      //console.log(context);
      setcough(parseInt(response.data.cough));
      setfacetouch(parseInt(response.data.facethouch));
    });

  }, []);
  

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
