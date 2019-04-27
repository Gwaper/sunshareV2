import React, { useState } from 'react';
import './App.css';
import Home from './Components/Home/Home';
import Prevision from './Components/Prevision/Prevision';
import Statistique from './Components/Statistique/Statistique';
import Contact from './Components/Contact/Contact';

import { Button, Menu, Sidebar, ButtonGroup } from 'semantic-ui-react';
import { Route, Switch, BrowserRouter, NavLink } from 'react-router-dom';


function App() {
  const [visible, setVisible] = useState(false);

  const handleHideClick = () => setVisible(false);
  const handleShowClick = () => setVisible(true);
  const handleSidebarHide = () => setVisible(false);

  return (
    <div>
      <ButtonGroup className='btnDroite'>
        <Button
          disabled={visible}
          onClick={handleShowClick}
          icon='bars'
          className='btnMenu'
          size='massive'
        />
      </ButtonGroup>
      <BrowserRouter>
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
          <Menu.Item >
            <Button 
              disabled={!visible} 
              onClick={handleHideClick} 
              icon='bars'
              className='menuTitle'
              />
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
      </BrowserRouter>
    </div>

  );
}

export default App;