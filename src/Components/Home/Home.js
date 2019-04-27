import React from 'react';
import './Home.css';
import MeteoDay from '../MeteoDay/MeteoDay';
// import { ResponsiveSunburst } from '@nivo/sunburst'

export default function Home ({data}) {
  return (
    <div className="sunChart">
      {/* <ResponsiveSunburst
        data={data}
        identity="name"
        value="percent"
        colors={["#86EBA0", "#FF885C"]}
        cornerRadius={0}
        childColor={"#57A5FF"}
        borderWidth={3}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        isInteractive={true}
      /> */}
      <MeteoDay/>
    </div>
  )
}

