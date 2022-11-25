import logo from './logo.svg';
import './App.css';

import React, {useState, useEffect} from 'react';
import { Countries } from './Components/Countries';
import { Search } from './Components/Search';

const url = "https://restcountries.com/v3.1/all";


function App() {

const [isLoading, setIsLoading] = useState(true);
const [error, setEroor] = useState(null);
const [countries, setCountries] = useState([]);
const [filterCountries, setFilterCountries] = useState(countries);

const fetchData  = async (url) => {
  setIsLoading(true);
try{
  const response = await fetch(url);
  const data = await response.json();
  setCountries(data);
  setFilterCountries(data);
  setIsLoading(false);
  setEroor(null);
}catch(error){
  setIsLoading(false);
  setEroor(error);

}

}

useEffect(() => {
  fetchData(url);

},[])
const handleRemoveCountry = (name) => {
  
    const filter = filterCountries.filter((country) => country.name.common != name);
    setFilterCountries(filter);

}
const handleSearch = (searchValue) => {
  let value = searchValue.toLowerCase();
  const newCountries = countries.filter((country) => {
    const countryName = country.name.common.toLowerCase();
    return countryName.startsWith(value);
  });
  setFilterCountries(newCountries);
};

  return (
    <div>
      <h1>Country App</h1>
      <Search onSearch = {handleSearch} />
      {isLoading && <h2>Loading.....</h2>}
      {error && <h2>{error.message}</h2>}
      {countries && <Countries countries={filterCountries} onRemoveCountry = {handleRemoveCountry} />}
     
    </div>
  );
}

export default App;
