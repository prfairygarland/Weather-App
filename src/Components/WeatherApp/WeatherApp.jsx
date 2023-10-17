import React, { useState } from "react"
import './WeatherApp.css'
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'


const WeatherApp = () => {

    let apiKey = "dd94f859a0e52d6e4767fddf735f04a7";
    const [degreeTemp, setDegreeTemp] = useState(24);
    const [location, setLocation] = useState("Dummy Location");
    const [humidity, setHumidity] = useState(50);
    const [windSpeed, setWindSpeed] = useState(20);
    const [weatherIcon, setWeatherIcon] = useState(cloud_icon);

    const search = async () => {
        const element = document.getElementsByClassName("city-input");
        if(element[0].value === "") {
            alert("enter city name")
            return 0;
        } else {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Matric&appid=${apiKey}`;
            try {
                let response = await fetch(url);
                const data = await response.json();
                if(data.cod !== 200) {
                    alert(data.message)
                }else {
                    setLocation(data.name);
                    setDegreeTemp(Math.round(data.main.temp - 273.15));
                    setHumidity(data.main.humidity);
                    setWindSpeed(data.wind.speed);
                    if(data.weather[0].icon === "50d") {
                        setWeatherIcon(clear_icon)
                    } else if(data.weather[0].icon === "01n" || data.weather[0].icon === "02n" || data.weather[0].icon === "03n") {
                        setWeatherIcon(cloud_icon)
                    } else if(data.weather[0].icon === "09n") {
                        setWeatherIcon(drizzle_icon)
                    } else if(data.weather[0].icon === "13n") {
                        setWeatherIcon(snow_icon)
                    } else {
                        setWeatherIcon(rain_icon)
                    }
                    console.log(data)
                }
            } catch {
                alert("something went wrong")
            }
        }
    }

    return (
        <div className="container">
            <div className="top-bar">
                <input type="text" className="city-input" placeholder="City Name" />
                <div className="search-icon" onClick={search}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className="weather-image">
                <img src={weatherIcon} alt="" />
            </div>
            <div className="weather-temp">{degreeTemp}°C</div>
            <div className="weather-loc">{location}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon"/>
                    <div className="data">
                        <div className="humidity-percent">{humidity}%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon"/>
                    <div className="data">
                        <div className="wind-rate">{windSpeed} Km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp;