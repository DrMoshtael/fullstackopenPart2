import { useEffect, useState } from 'react'
import axios from 'axios'

const CountryComponent = ({ country }) => {
  if (country === null)
    return null
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

  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

  useEffect(() => {
    axios
      .get(`${baseUrl}/all`)
      .then(response => {
        setCountries(response.data.map(country => country.name.common))
      })
      .then(console.log(countries[0]))
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
      axios
        .get(`${baseUrl}/name/${countriesFound[0]}`)
        .then(response => setCountryProfile(response.data))
    }
    else setCountryProfile(null)
  }

  const handleShow = (country) => {
    axios
      .get(`${baseUrl}/name/${country}`)
      .then(response => setCountryProfile(response.data))
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
    </>
  )
}

export default App
