import { useState, useContext, useEffect } from 'react';
import React, { createContext } from 'react';
import MainPage from "./monitorpage";
import { BrowserRouter, Switch,  Route, HashRouter} from 'react-router-dom'; 
import axios from 'axios';
import Navigationbar from './navigationbar';
import Aboutus from './aboutus';
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
    <HashRouter basename="/">
      <AppContext.Provider value={store}>
        <div className="App">
          <Navigationbar />
        </div>
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route> 
          <Route path="aboutus">
            <Aboutus />
          </Route>
        </Switch>
      </AppContext.Provider>
    </HashRouter>
  );
}

export default App;
