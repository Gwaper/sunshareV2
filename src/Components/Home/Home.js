import React, { useEffect, useState } from 'react';
import './Home.css';
import MeteoDay from '../MeteoDay/MeteoDay';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, RadialChart} from 'react-vis';

import { Grid, Card } from 'semantic-ui-react';
import axios from 'axios';


export default function Home () {

  const [prod, setProd] = useState(0);
  const [conso, setConso] = useState(0);

  useEffect(() => {
      axios.get('http://localhost:8000/realtime')
      .then((result) => {
        let prod = Math.round((result.data[result.data.length-1].prodidx - result.data[result.data.length-2].prodidx)/1000*100)/100
        let conso = Math.round((((result.data[result.data.length-1].soutiridx - result.data[result.data.length-2].soutiridx) + (result.data[result.data.length-1].autoconsoidx - result.data[result.data.length-2].autoconsoidx))/1000)*100)/100;
        prod = Math.round(prod / conso * 360);
        if(prod > 360) {
          prod = 360
        }

        conso = Math.round(360- prod)
        setConso(conso)
        setProd(prod)
      })
  }, [])

  return (
    <div className='gridHome'>
      <div className="meteoHome">
      <h2 classn="titleProduction production">Consomation temps réel</h2>
      <Card>
        <RadialChart
          data={[{angle: prod}, {angle: conso}]}
          width={300}
          height={300} />
            <Card.Content>
              <Grid columns='two' divided>
                <Grid.Row>
                  <Grid.Column>
                    Prod {Math.round((prod/360*100)*100)/100} %
                  </Grid.Column>
                  <Grid.Column>
                    Conso {Math.round((conso/360*100)*100)/100} %
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Content>
          </Card>
        <MeteoDay className=""/>
      </div>
      <div className="infoHome"></div>
    </div>
  )
}

