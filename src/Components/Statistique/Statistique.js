import React, { useEffect, useState } from 'react';
import './Statistique.css';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';
import { Grid, Card } from 'semantic-ui-react';
import axios from 'axios';

export default  function Statistique() {

  const [dataConsomtion, setDataConsomtion] = useState([]);
  const [dataProduction, setDataProduction] = useState([]);
  const [productionMaxData, setProductionMaxData] = useState(0);
  const [productionMoyData, setProductionMoyData] = useState(0);
  
  const [consomationMaxData, setConsomationMaxData] = useState(0);
  const [consomationMoyData, setConsomationMoyData] = useState(0);
  
  useEffect(() => {
    setInterval(() => {
      axios.get('http://localhost:8000/realtime')
      .then((result) => {
       
        let dataTempConso = [];
        let dataTempProd = [];

        let maxProd = 0;
        let moyProd = 0;

        let maxConso = 0;
        let moyConso = 0;

        for(let i = 0; i < (result.data.length-1) /2; i++) {
          let conso = Math.round((((result.data[i+1].soutiridx - result.data[i].soutiridx) + (result.data[i+1].autoconsoidx - result.data[i].autoconsoidx))/1000)*100)/100;
          if(conso > maxConso) {
            maxConso = conso;
          }
          moyConso = moyConso +conso;
          
          let prod = Math.round((result.data[i+1].prodidx - result.data[i].prodidx)*100)/100;
          if(conso > maxProd) {
            maxProd = prod;
          }
          moyProd = moyProd +conso;

          dataTempProd.push({x: result.data[i].timestamp, y: prod});
          console.log(dataTempProd)

          dataTempConso.push({x: result.data[i].timestamp, y: conso});
        }

        setConsomationMaxData(Math.round(maxConso*100)/100);
        setConsomationMoyData(Math.round((moyConso/dataTempProd.length)*100)/100)

        setProductionMaxData(Math.round(maxProd*100)/100);
        setProductionMoyData(Math.round((moyProd/dataTempProd.length)*100)/100)

        setDataProduction(dataTempProd);
        setDataConsomtion(dataTempConso);
  
        console.log(dataTempConso)
      })
    }, 2000)
  }, [])


  return (
    <div className='gridStat'>
      <Grid>
        <div className="gridStatProd">
          <h2 classn="titleProduction production">Consomation</h2>
          <Card>
          <XYPlot
        width={300}
        height={300}>
        <HorizontalGridLines />
        <LineSeries
          color="red"
          data={dataConsomtion}/>
        <YAxis title="Wh"/>
      </XYPlot>
            <Card.Content>
              <Grid columns='two' divided>
                <Grid.Row>
                  <Grid.Column>
                    Max {consomationMaxData} Wh
                  </Grid.Column>
                  <Grid.Column>
                    Moy {consomationMoyData} Wh
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Content>
          </Card>
        </div>
        <div className="gridStatConso">
          <h2 classn="titleProduction production">Production</h2>
          <Card>
          <XYPlot
            animate={true}
            width={300}
            height={300}>
            <HorizontalGridLines />
            <LineSeries
              color="red"
              data={dataProduction}/>
            <YAxis title="Wh"/>
          </XYPlot>
            <Card.Content>
              <Grid columns='two' divided>
                <Grid.Row>
                  <Grid.Column>
                  Max {productionMaxData} Wh
                  </Grid.Column>
                  <Grid.Column>
                  Moy {productionMoyData} Wh
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Content>
          </Card>
        </div>
      </Grid>
    </div>
  )
}