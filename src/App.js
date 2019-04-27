import React from 'react';
import Home from './Components/Home/Home';
import './App.css';

function App() {
  return (
    <div>
      <Home data={data}/>
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