import React, { useState, useEffect } from 'react';
import { Card, Image } from 'semantic-ui-react';
import moment from 'moment';
import 'moment/locale/fr'
import Axios from 'axios';

const position = {
  lat: 47.21725, 
  lng: -1.55336
} 

const apiKey = "PGdqq8p32HZKZ3wM5JghtkZ1TwWvyt5E";

export default function MeteoDay() {

  const [meteo, setMeteo] = useState(null);

  useEffect(() => {
    Axios.get(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${position.lat}%2C%20${position.lng}`)
    .then(result => {
      console.log(apiKey)
      Axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${result.data.Key}?apikey=${apiKey}&language=fr-FR&metric=true&details=true`)
      .then(result => {
        setMeteo(result.data);
      })
    })
  }, [])

  return (
    <div>
      {meteo ? 
      <Card className='Meteo'>
        <Card.Content>
          <Image floated='right' size='tiny' src={`https://vortex.accuweather.com/adc2010/images/slate/icons/${meteo.DailyForecasts[0].Day.Icon}.svg`} alt={meteo.DailyForecasts[0].Day.IconPhrase} />
          <Card.Header>{meteo.DailyForecasts[0].Day.IconPhrase}</Card.Header>
          <Card.Meta>{moment(new Date()).format('dddd')}</Card.Meta>
          <Card.Description>
            {Math.round(meteo.DailyForecasts[0].Temperature.Minimum.Value)}° | {Math.round(meteo.DailyForecasts[0].Temperature.Maximum.Value)}°
          </Card.Description>
        </Card.Content>
      </Card> : null }
    </div>
  )
}
