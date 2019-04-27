import React, { useState } from 'react'
import { Button, Menu, Sidebar, ButtonGroup } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
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
    </div>
  )
}
