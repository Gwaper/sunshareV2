import React from 'react';
import './App.css';
import Home from './Components/Home/Home';
import Prevision from './Components/Prevision/Prevision';
import Statistique from './Components/Statistique/Statistique';
import Contact from './Components/Contact/Contact';
import Navbar from './Components/Navbar/Navbar';

import { Route, Switch } from 'react-router-dom';


function App() {
  return (
    <div>
      <Navbar/>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/prevision' component={Prevision} />
        <Route path='/statistique' component={Statistique} />
        <Route path='/contact' component={Contact} />
      </Switch>
    </div>
  );
}

export default App;

let data = {
  "name": "Information",
  "children": [{
    "name": "production",
    "percent": 20,
    "children": [{
      "name": "injection",
      "percent": 20
    }]
  }, {
    "name": "tirage",
    "percent": 80
  }]
}

// green : #86EBA0
// blue : #57A5FF
// orange : #FF885C
// yellow : #FFF04A
