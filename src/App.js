import React, {useState} from "react";
import axios from "axios";

function App() {

  const API_KEY=`${process.env.REACT_APP_API_KEY}`;


  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`

  const searchLocation = (e) => {
    if (e.key === 'Enter') {
      axios.get(url).then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      setLocation('');
    }
  }

  return (
    <div className={(typeof data.main != "undefined") ? ((data.main.temp > 16) ? 'app warm' : 'app'): 'app'}>
      <div className="search">
        <input type="text"
        value={location}
        onChange={e => setLocation(e.target.value)}
        placeholder='Enter Location'
        onKeyPress={searchLocation}
         />
    </div> 

     {(typeof data.main != "undefined") ? (
     <div className="container">
      <div className="top">
        <div className="location">
          <p>{data.name}, {data.sys.country}</p>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="temp">
          {data.main ? <h1 className="bold">{data.main.temp.toFixed()}°C</h1> : null}
        </div>
        <div className="desc">
         {data.weather ? <p>{data.weather[0].main}</p> : null} 
        </div>
      </div>
      
      <div className="bottom">
        <div className="feels">
          {data.main ? <p className="bold">{data.main.feels_like.toFixed()}</p> : null}
          <p>Feels Like</p>
        </div>
        <div className="sweat">
          {data.main ? <p className="bold">{data.main.humidity.toFixed()}%</p> : null}
          <p>Humidity</p>
        </div>
        <div className="wind">
          {data.wind ? <p className="bold">{data.wind.speed.toFixed()}km/h</p> : null}
          <p>Wind Speed</p>
        </div>
      </div>
     </div>
       ) : ('')}
    </div>

  );
}

export default App;
