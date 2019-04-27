import React from 'react';
import './Home.css';
import MeteoDay from '../MeteoDay/MeteoDay';
// import { ResponsiveSunburst } from '@nivo/sunburst'

export default function Home () {
  return (      
    <div className='gridHome'>
      <div className="graphHome"></div>
      <div className="meteoHome">
        <MeteoDay className=""/>
      </div>
      <div className="infoHome"></div>
    </div>
  )
}

