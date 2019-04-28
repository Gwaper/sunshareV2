import React, { useState } from 'react';
import {  Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [activeItem, setActiveItem] = useState(window.location.pathname.replace(/^\/([^\/]*).*$/, '$1'));
  const handleItemClick = (name) => {
    setActiveItem(name);
  }
  
  return (
    <div>
      <Menu 
        className='menu' 
        fixed='bottom' 
        borderless='false' 
        size='massive'>
        <NavLink exact to='/'>
          <Menu.Item
            className='btnMenu'
            active={activeItem === 'home'}
            onClick={() => handleItemClick('home')}
            icon='home'
            >
          </Menu.Item>
        </NavLink>
        <NavLink to='/prevision'>
          <Menu.Item
            className='btnMenu'
            active={activeItem === 'prevision'}
            onClick={() => handleItemClick('prevision')}
            icon='area graph'
            >
          </Menu.Item>
        </NavLink>
        <NavLink to='/statistique'>
          <Menu.Item
            className='btnMenu'
            active={activeItem === 'statistique'}
            onClick={() => handleItemClick('statistique')}
            icon='line graph'
            >
          </Menu.Item>
        </NavLink>
        <NavLink to='/contact'>
          <Menu.Item
            className='btnMenu'
            active={activeItem === 'contact'}
            onClick={() => handleItemClick('contact')}
            icon='mail outline'
            >
          </Menu.Item>
        </NavLink>
      </Menu>
    </div>
  )
}