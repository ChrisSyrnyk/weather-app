//import React, {Component} from 'react';
import styles from './styles.css'
import React, {useState} from 'react';
//components
import CurrentWeatherComponent from './components/CurrentWeatherComponent';
import HourlyWeatherComponent from './components/HourlyWeatherComponent';
import DailyWeatherComponent from './components/DailyWeatherComponent';

function App(){
  
  const[currentLocation, setCurrentLocation] = useState('Calgary');
  const[currentWeather, setCurrentWeather] = useState(()=>{retrieveWeather('Calgary')});
  const[hourlyWeather, setHourlyWeather] = useState(()=> {retrieveHourlyWeather('Calgary')});
  const[isCelcius, setCelcius] = useState(true);
  
  function retrieveWeather(location){
    console.log(location);
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+location+'&APPID=772609d2ffbd31b8056ecebf73455838', {mode: 'cors'})
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      console.log(response);
      if(response.message != 'city not found'){
        setCurrentWeather(response);
        setCurrentLocation(response.name)
      } else {
        document.getElementById('city').value = 'city not found';
      }
        
    });
  }

  function updateLocation(){
    let inputValue = document.getElementById("city").value
    retrieveWeather(inputValue);
    retrieveHourlyWeather(inputValue);
  }

  function retrieveHourlyWeather(location){
    console.log(location);
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+location+'&APPID=772609d2ffbd31b8056ecebf73455838', {mode: 'cors'})
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      console.log(response);
      if(response.message != 'city not found'){
        setHourlyWeather(response);
      }
        
      
    });
  }

  function toggleisCelcius(){
    if (isCelcius){
      setCelcius(false);
    } else {
      setCelcius(true);
    }
  }

  function toggleSymbol(){
    if (isCelcius){
      return '°c'
    } else {
      return '°f'
    }
  }

  const handleKeyDown = (e) =>{
    if (e.key === 'Enter'){
      updateLocation()
    }
  }

  
    return (
      <>
      <div className="search-bar">
        <div className="location-form">
          <input type = "text" id = "city" name = "city" className="input-box" onKeyDown={handleKeyDown}/>
          <button className="submit-button" onClick={updateLocation}>Search</button>
        </div>
        <div className="degree-toggle search-font" onClick = {()=> toggleisCelcius()}>{toggleSymbol()}</div>
      </div>
      <div className='location-container'>
        <div className='location-card'>
          {currentLocation}
        </div>
      </div>
      <div className="todays-weather">
        <CurrentWeatherComponent weather = {currentWeather} isCelcius = {isCelcius}/>
        <HourlyWeatherComponent weather = {hourlyWeather} isCelcius = {isCelcius}/>
      </div>
      <div className="forteen-day">
        <DailyWeatherComponent weather = {hourlyWeather} isCelcius = {isCelcius}/>
      </div>
      </>
    );
  
}

export default App;
