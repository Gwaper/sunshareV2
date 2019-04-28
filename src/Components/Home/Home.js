import React from 'react';
import './Home.css';
import MeteoDay from '../MeteoDay/MeteoDay';
import Graphome from './Graphom/Graphome';

export default function Home () {
  return (      
    <div className='gridHome'>
      <div className="graphHome">
        <Graphome className='zizi'/>
      </div>
      <div className="meteoHome">
        <MeteoDay/>
      </div>
      <div className="infoHome"></div>
    </div>
  )
}

