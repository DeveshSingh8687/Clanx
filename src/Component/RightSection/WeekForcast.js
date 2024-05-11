import { Card, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './style/WeatherCorecast.css'
import { useSelector } from 'react-redux'
import { DateTime } from 'luxon'

function WeekForcast() {
    const [isRun,setRun] = useState(false)
    const weatherData = useSelector(data=>data.weatherDataReducer)
    const formatTime = (sec, zone, format = "ccc, dd LLL yyy hh:mm a") => DateTime.fromSeconds(sec).setZone(zone).toFormat(format)
    
    useEffect(()=>{
        console.log(weatherData);
        if (typeof (weatherData) === 'object' && !Array.isArray(weatherData) && weatherData !== null) {
            setRun(true)
        }
    },[weatherData])
    if(isRun){
        console.log(weatherData);
        const timezone = weatherData.city.timezone
        // Day1
        var Day1dt = weatherData.list[9].dt
        var Day1Day = formatTime(Day1dt,timezone,'ccc')
        var Day1Temp_max = parseInt(weatherData.list[9].main.temp_max)
        var Day1Temp_min = parseInt(weatherData.list[9].main.temp_min)
        var Day1Icon = weatherData.list[9].weather[0].icon
        // Day2
        var Day2dt = weatherData.list[18].dt
        var Day2Day = formatTime(Day2dt,timezone,'ccc')
        var Day2Temp_max = parseInt(weatherData.list[18].main.temp_max)
        var Day2Temp_min = parseInt(weatherData.list[18].main.temp_min)
        var Day2Icon = weatherData.list[18].weather[0].icon
        // Day3
        var Day3dt = weatherData.list[27].dt
        var Day3Day = formatTime(Day3dt,timezone,'ccc')
        var Day3Temp_max = parseInt(weatherData.list[27].main.temp_max)
        var Day3Temp_min = parseInt(weatherData.list[27].main.temp_min)
        var Day3Icon = weatherData.list[27].weather[0].icon
        // Day 4
        var Day4dt = weatherData.list[32].dt
        var Day4Day = formatTime(Day4dt,timezone,'ccc')
        var Day4Temp_max = parseInt(weatherData.list[32].main.temp_max)
        var Day4Temp_min = parseInt(weatherData.list[32].main.temp_min)
        var Day4Icon = weatherData.list[32].weather[0].icon
        // Day 5
        var Day5dt = weatherData.list[38].dt
        var Day5Day = formatTime(Day5dt,timezone,'ccc')
        var Day5Temp_max = parseInt(weatherData.list[38].main.temp_max)
        var Day5Temp_min = parseInt(weatherData.list[38].main.temp_min)
        var Day5Icon = weatherData.list[38].weather[0].icon
    }
  return (
    <div className='wetherForecast'>
        <div className='forecast-card'>
            <p> {Day1Day}</p>
            <img src={`https://openweathermap.org/img/wn/${Day1Icon}@2x.png`} alt='weathericon' />
            <div>
                <span>{Day1Temp_max}&deg;</span> &nbsp;
                <span className='dull-text'>{Day1Temp_min}&deg;</span>
            </div>
        </div>
        <div className='forecast-card'>
            <p> {Day2Day}</p>
            <img src={`https://openweathermap.org/img/wn/${Day2Icon}@2x.png`} alt='weathericon'  />
            <div>
                <span>{Day2Temp_max}&deg;</span> &nbsp;
                <span className='dull-text'>{Day2Temp_min}&deg;</span>
            </div>
        </div>
        <div className='forecast-card'>
            <p> {Day3Day}</p>
            <img src={`https://openweathermap.org/img/wn/${Day3Icon}@2x.png`} alt='weathericon'  />
            <div>
                <span>{Day3Temp_max}&deg;</span> &nbsp;
                <span className='dull-text'>{Day3Temp_min}&deg;</span>
            </div>
        </div>
        <div className='forecast-card'>
            <p> {Day4Day}</p>
            <img src={`https://openweathermap.org/img/wn/${Day4Icon}@2x.png`} alt='weathericon'  />
            <div>
                <span>{Day4Temp_max}&deg;</span> &nbsp;
                <span className='dull-text'>{Day4Temp_min}&deg;</span>
            </div>
        </div>
        <div className='forecast-card'>
            <p> {Day5Day}</p>
            <img src={`https://openweathermap.org/img/wn/${Day5Icon}@2x.png`} alt='weathericon'  />
            <div>
                <span>{Day5Temp_max}&deg;</span> &nbsp;
                <span className='dull-text'>{Day5Temp_min}&deg;</span>
            </div>
        </div>
    </div>
  )
}

export default WeekForcast