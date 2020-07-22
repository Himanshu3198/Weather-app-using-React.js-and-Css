import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
const api = {
  key: 'd07111db55cf44dadf7f46984fb07c22',
  base: 'https://api.openweathermap.org/data/2.5/'
}
function App() {
  const [query, setQuery] = useState('');
  const [weather, setweather] = useState({});
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setweather(result)
          setQuery('')
          console.log(result)
        })
    }
  }
  const dateBuilder = (d) => {

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let today=new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return `${day} ${date} ${month} ${year},  ${time} `
  }
  return (
    <div className="container">
      <div className={(typeof weather.main != "undefined") ?
        ((weather.main.temp > 20) ? 'app warm' : 'app') : 'app'}>
        <main>
          <h1>Mausam App</h1>
          <span>Know your city weather quickly!</span>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={e => setQuery(e.target.value)}
              onKeyPress={search}
            >
      </input>
  
          </div>
          {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>

    </div>
    </div>
  );
}

export default App;
