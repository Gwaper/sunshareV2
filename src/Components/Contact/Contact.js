import React from 'react';
import './Contact.css';
import { Button, Icon } from 'semantic-ui-react'

export default function Contact() {
  return (
    <div className='contactGrid'>
      <div>
        <img src='http://sunshare.fr/assets/images/logo_snsr.png' alt='logo' />
        <div className='btnContact'><a href='https://www.sunshare.fr/contact'>
        <Button  icon labelPosition='left'>
          <Icon name='mail outline' />
          Nous Contacter
        </Button></a></div>
      </div>
      <p>Creative Common: OKET Team</p>
    </div>
  )
}