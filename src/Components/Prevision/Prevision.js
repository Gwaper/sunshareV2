import React, { useEffect, useState} from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';
import axios from 'axios';
import { Grid, Card } from 'semantic-ui-react';
import MeteoDay from '../MeteoDay/MeteoDay';
import './Prevision.css';

export default function Prevision() {

  const [previsionData, setPrevisionData] = useState([]);
  const [previsionMaxData, setPrevisionMaxData] = useState(0);
  const [previsionMoyData, setPrevisionMoyData] = useState(0);



  useEffect(() => {
    axios.get('http://localhost:8000/prevision')
    .then((result) => {
      console.log(result.data)
      let max = 0;
      let moy = 0;
      let tempsPred = [];
      for(let i = 0; i < result.data.length; i++) {
        if(result.data[i] > max) {
          max = result.data[i];
        }
        moy = moy + result.data[i];
        tempsPred.push({x: i, y:result.data[i] })
      }
      setPrevisionData(tempsPred);
      setPrevisionMaxData(Math.round(max*100)/100);
      setPrevisionMoyData(Math.round((moy/tempsPred.length)*100)/100)
    })
  }, [])

  return (
    <div className='gridStat'>
      <Grid>
        <div className="gridStatProd">
          <h2 classn="titleProduction production">Prévision</h2>
          <Card>
            <XYPlot
              animate={true}
              width={300}
              height={300}>
              <HorizontalGridLines />
              <LineSeries
                color="red"
                data={previsionData}/>
              <XAxis title="Wh" />
              <YAxis title="Wh"/>
            </XYPlot>
            <Card.Content>
              <Grid columns='two' divided>
                <Grid.Row>
                  <Grid.Column>
                    Max : {previsionMaxData} Wh
                  </Grid.Column>
                  <Grid.Column>
                    Moy : {previsionMoyData} Wh
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Content>
          </Card>
          <div className="meteoDay">
            <MeteoDay/>
          </div>
        </div>
      </Grid>
    </div>
  )
}