import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all")
    .then(res => setCountries(res.data))
    .catch(err => console.log(err));
  }, [])

  const searchHandler = ({target}) => {
    setSearch(target.value);
  }

  const searchedCountries = countries.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  let displayed = search
    ? searchedCountries.length >= 10 
      ? "too many matches found, specify another filter"
      : searchedCountries.map(c => <p key={c.name}>{c.name}</p>)
    : ""

  if(Array.isArray(displayed) && displayed.length === 1) {
    const {name, capital, area, population, languages, flag} = searchedCountries[0];
    
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
      </div>
    )
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
