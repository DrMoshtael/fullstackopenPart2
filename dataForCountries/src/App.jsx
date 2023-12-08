import { useEffect, useState } from 'react'
import axios from 'axios'

const WeatherProfile = ({ weather, weatherCodes }) => {
  if (weather === null) { return (null) }

  const weatherDescription = (weather.current.is_day) 
  ? weatherCodes[weather.current.weather_code].day.description
  : weatherCodes[weather.current.weather_code].night.description

  const weatherIcon = (weather.current.is_day) 
  ? weatherCodes[weather.current.weather_code].day.image
  : weatherCodes[weather.current.weather_code].night.image

  return (
    <div>
      <img src={weatherIcon} alt={weatherDescription} />
      <p>Temperature: {weather.current.temperature_2m} °C</p>
      <p>Wind: {weather.current.wind_speed_10m} m/s</p>
      <p>Precipitation: {weather.current.precipitation} mm</p>

    </div>
  )
}


const CountryComponent = ({ country }) => {
  if (country === null) { return null }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Weather in {country.capital[0]}</h2>
    </div>
  )
}

function App() {
  const [search, setSearch] = useState('')
  const [countryProfile, setCountryProfile] = useState(null
    // {
    //   name: {
    //     common: "Iraq"
    //   },
    //   capital: "a capital",
    //   area: 234,
    //   languages: { ara: "Arabic", bra: "brah", fla: "falh" },
    //   flags: {
    //     png: "https://flagcdn.com/w320/iq.png",
    //     svg: "https://flagcdn.com/iq.svg",
    //     alt: "The flag of Iraq is composed of three equal horizontal bands of red, white and black. In the central white band are Arabic inscriptions in green."
    //   }
    // }
  )
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const [weather, setWeather] = useState(null)
  const [weatherCodes, setWeatherCodes] = useState(null)

  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

  useEffect(() => {
    axios
      .get(`${baseUrl}/all`)
      .then(response => {
        setCountries(response.data.map(country => country.name.common))
      })
      .then(console.log(countries[0]))

    axios
      .get('http://localhost:3002/weatherCodes')
      .then(response=>{setWeatherCodes(response.data) 
        console.log(response.data[2].day.description)})
  }, [])

  const handleSearch = (event) => {
    const query = event.target.value
    setSearch(query)

    const countriesFound = countries.filter(country => country.toLowerCase().includes(query.toLowerCase()))
    if (countriesFound.length > 10 && countriesFound.length !== countries.length) setCountriesToShow(['Too many matches, specify another filter'])
    else if (countriesFound.length > 1 && countriesFound.length < 11) setCountriesToShow(countriesFound)
    else setCountriesToShow([])
    // setCountriesToShow((countriesFound.length > 1 && countriesFound.length < 11) ? countriesFound : [])

    console.log('handleSearch countries', countriesFound.length)

    if (countriesFound.length === 1) {
      handleShow(countriesFound[0])
    }
    else {
      setCountryProfile(null)
      setWeather(null)
    }
  }

  const handleShow = (country) => {
    axios
      .get(`${baseUrl}/name/${country}`)
      .then(response => {
        setCountryProfile(response.data)
        const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${response.data.capitalInfo.latlng[0]}&longitude=${response.data.capitalInfo.latlng[1]}&current=temperature_2m,is_day,precipitation,weather_code,wind_speed_10m&wind_speed_unit=ms&forecast_days=1`
        axios
          .get(weatherURL)
          .then(response => {
            setWeather(response.data)
            console.log('temp now', response.data.current.temperature_2m)
          })
      })
    setCountriesToShow([])
  }

  return (
    <>
      find countries: <input value={search} onChange={handleSearch} />
      <div>
        {countriesToShow.map(country => {
          return (
            <div key={country}>
              <p>{country}
                <button onClick={() => handleShow(country)}>show</button>
              </p>
            </div>)
        }
        )}
      </div>
      <CountryComponent country={countryProfile} />
      <WeatherProfile weather={weather} weatherCodes={weatherCodes}/>
    </>
  )
}

export default App
