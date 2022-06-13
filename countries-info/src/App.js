import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("kathmandu");
  const [weatherInfo, setWeather] = useState({});
  const key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all")
    .then(res => setCountries(res.data))
    .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    .then(res => setWeather(res.data))
    .catch(err => console.log(err));
  }, [city])

  const searchHandler = ({target}) => {
    const singleCountry = countries.filter(c => c.name.toLowerCase().includes(target.value.toLowerCase()));
    if(singleCountry.length === 1) setCity(singleCountry[0].capital);

    setSearch(target.value);
  }

  const searchedCountries = countries.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  let displayed = search
    ? searchedCountries.length >= 10 
      ? "too many matches found, specify another filter"
      : searchedCountries.map(c => <p key={c.name}>
        {c.name} <button
          onClick={() => {
            setSearch(c.name);
            setCity(c.capital);
          }}
        >show</button>
      </p>)
    : ""

  if(Array.isArray(displayed) && searchedCountries.length === 1) {
    const {name, capital, area, population, languages, flag} = searchedCountries[0];
    const {main, wind, weather} = weatherInfo;
    const icon = weather[0].icon;
    const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
    displayed = (
      <div>
        <h1>{name}</h1>
        <p>capital {capital}</p>
        <p>area {area}</p>
        <p>population {population}</p>
        <h3>languages:</h3>
        <ul>
          {languages.map(l => <li key={l.name}>{l.name}</li>)}
        </ul>
        <img width="250px" src={flag} alt={name} />
        <h1>Weather in {city}</h1>
        <p>temperature: {(main.temp - 273).toFixed(2)} Celcius</p>
        <p><img src={iconURL} alt={weather[0].main} /></p>
        <p>wind {wind.speed} m/s</p>
      </div>
    );
  }

  return (
    <>
      find countries <input 
        type="search" 
        value={search} 
        onChange={searchHandler}
      />
      <br />
      {displayed}
    </>
  );
}

export default App;
