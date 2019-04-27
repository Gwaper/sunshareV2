import React, { useState, useEffect } from 'react'
import Axios from 'axios';

const position = {
  lat: 47.21725, 
  lng: -1.55336
} 

const apiKey = "PGdqq8p32HZKZ3wM5JghtkZ1TwWvyt5E"

export default function MeteoDay() {

  const [meteo, setMeteo] = useState(null);

  useEffect(() => {
    Axios.get(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${position.lat}%2C%20${position.lng}`)
    .then(result => {
      Axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${result.data.Key}?apikey=${apiKey}&language=fr-FR&metric=true&details=true`)
      .then(data => {
        setMeteo(data)
      })
    })
  }, [])

  return (
    <div>
      { meteo ? <div></div> : null}
    </div>
  )
}
