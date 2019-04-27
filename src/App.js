import React, { useState } from 'react';
import './App.css';
import Home from './Components/Home/Home';
import Prevision from './Components/Prevision/Prevision';
import Statistique from './Components/Statistique/Statistique';
import Contact from './Components/Contact/Contact';

import { Button, Menu, Sidebar } from 'semantic-ui-react';
import { Route, Switch, NavLink } from 'react-router-dom';


function App() {
  const [visible, setVisible] = useState(false);

  const handleHideClick = () => setVisible(false);
  const handleShowClick = () => setVisible(true);
  const handleSidebarHide = () => setVisible(false);

  return (
    <div>
      <Button.Group>
        <Button disabled={visible} onClick={handleShowClick}>
          Show sidebar
          </Button>
        <Button disabled={!visible} onClick={handleHideClick}>
          Hide sidebar
          </Button>
      </Button.Group>
        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          inverted
          onHide={handleSidebarHide}
          vertical
          visible={visible}
          width='thin'
          direction='right'
        >
          <Menu.Item className='menuTitle'>
            SunShare
          </Menu.Item>
          <Menu.Item className='menuSize'>
            <NavLink exact to='/'>
              Home
            </NavLink>
          </Menu.Item>
          <Menu.Item className='menuSize'>
            <NavLink to='/Prevision'>
              Prévision
            </NavLink>
          </Menu.Item>
          <Menu.Item className='menuSize'>
            <NavLink to='/Statistique'>
              Statistique
            </NavLink>
          </Menu.Item>
          <Menu.Item className='menuSize'>
            <NavLink to='/Contact'>
              Contact
            </NavLink>
          </Menu.Item>
        </Sidebar>
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
