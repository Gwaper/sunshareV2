import React from 'react';
import './Home.css';
import MeteoDay from '../MeteoDay/MeteoDay';
// import { ResponsiveSunburst } from '@nivo/sunburst'

export default function Home ({data}) {
  return (      
    <div className='homeGrid'>
      <h2>HOME 10%</h2>
      <h1>35%</h1>
      <MeteoDay id="meteo"/>
      <h1>35%</h1>
    </div>
  )
}

