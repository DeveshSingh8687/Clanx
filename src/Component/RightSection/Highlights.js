import React, { useEffect, useState } from 'react'
import './style/Highlight.css'
import { useSelector } from 'react-redux'
import AirIcon from '@mui/icons-material/Air';
import NorthIcon from '@mui/icons-material/North';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { DateTime } from 'luxon';

function Highlights() {
    const weatherData = useSelector(data => data.weatherDataReducer)
    const [isrun, setRun] = useState(false)
    const formatTime = (sec, zone, format = "ccc, dd LLL yyy hh:mm a") => DateTime.fromSeconds(sec).setZone(zone).toFormat(format)
    useEffect(() => {
        if (typeof (weatherData) === 'object' && !Array.isArray(weatherData) && weatherData !== null) {
            setRun(true)
        }
    }, [weatherData])
    if (isrun) {
        var windSpeed = weatherData.list[0].wind.speed
        const timezone = weatherData ? weatherData.city.timezone : ''
        const dtSet = weatherData ? weatherData.city.sunrise : ''
        const dtRise = weatherData.city.sunset;
        var sunSet = weatherData ? formatTime(dtSet, timezone, 'hh:mm a') : ''
        var sunRise = weatherData ? formatTime(dtRise, timezone, 'hh:mm a') : ''
        var humidity = weatherData.list[0].main.humidity
        var visibility = weatherData.list[0].visibility
        var { main, description, icon } = weatherData.list[0].weather[0]
        var { temp, temp_max, temp_min } = weatherData.list[0].main;
    }

    return (
        <div>
            <div className='highlight-heading'>
                <p>Today's Highlights</p>
            </div>
            <div className='highlight-card-section'>
                <div className='highlight-single-card'>
                    <p className='dull_text'>WeatherStatus</p>
                    <p className='weatherStatus-main'>{main}</p>
                    <p>{description}</p>

                </div>
                <div className='highlight-single-card'>
                    <p className='dull_text'>Wind Status</p>
                    <p className='windspeed'><span>{windSpeed} </span>km/h</p>
                    <div className='wind-icon-text'>
                        <AirIcon className='windIcon' /> &nbsp;
                        <span>WSW</span>
                    </div>
                </div>
                <div className='highlight-single-card'>
                    <p className='dull_text'>Sunrise & Sunset</p>
                    <div style={{ display: 'flex', margin: '5px' }}>
                        <ArrowUpwardIcon className='arrow' /> &nbsp;
                        <span className='sunrise-span'>{sunRise}</span>
                    </div>
                    <div style={{ display: 'flex', margin: '5px' }}>
                        <ArrowDownwardIcon className='arrow' /> &nbsp;
                        <span className='sunrise-span'>{sunSet}</span>
                    </div>
                </div>
                <div className='highlight-single-card'>
                    <p className='dull_text'>Humidity</p>
                    <p className='humidity-text'>{humidity}<sup>%</sup></p>
                    <p>Normal 🤙</p>
                </div>
                <div className='highlight-single-card'>
                    <p className='dull_text'>Visibility</p>
                    <p className='visiblity-text'><span>{visibility / 10000}</span>Km</p>
                    <p>Average 😊</p>
                </div>
                <div className='highlight-single-card'>
                    <p className='dull_text'>Temperature</p>
                    <p className='temp-text'>Temp: {temp}</p>
                    <p className='temp-text'>Max: {temp_max}</p>
                    <p className='temp-text'>Min: {temp_min}</p>
                </div>
            </div>
        </div>
    )
}

export default Highlights