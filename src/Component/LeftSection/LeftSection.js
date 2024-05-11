import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import axios from 'axios';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import './LeftSection.css'
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { weatherDataAction } from '../../Redux/action';
import { DateTime } from 'luxon';

function LeftSection() {
    const weatherAPIkey = "4f281436b0521ec06f6c4ad4dd251d4a"
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [weatherData, setWeatherData] = useState()
    const [icon, setIcon] = useState('')
    const [searchinput, setinput] = useState('')
    const [city, setcity] = useState('')
    const [isCel, setCel] = useState(true)
    const [day, setDay] = useState('')

    const dispatch = useDispatch()
    const tempType = useSelector(data => data.ChangeTempratureType)

    // Initial sets user current location 
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        })
    }, [])

    // As latitude sets initially it call weather APi 
    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${weatherAPIkey}&units=metric`)
            .then(resp => setWeatherData(resp.data))
            .catch(error => console.log('error', error))
    }, [latitude])

    // Whenerve city Change it calls api to fetch city data
    useEffect(() => {
        if (city) {
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherAPIkey}&units=metric`)
                .then(resp => setWeatherData(resp.data))
                .catch(error => console.log('error', error))
        }
        else { }
    }, [city])

    // Change Temp Type Far/Cel
    const currentCity = weatherData ? weatherData.city.name : ''
    const country = weatherData ? weatherData.city.country : ''
    useEffect(() => {
        if (tempType.length) {
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${weatherAPIkey}&units=${tempType[0]}`)
                .then(resp => setWeatherData(resp.data))
                .catch(error => console.log('error', error))
        }
        if (tempType.length && tempType[0] == "imperial") {
            setCel(false)
        }
        else {
            setCel(true)
        }
    }, [tempType])

    const { temp, humidity } = weatherData ? weatherData.list[0].main : ''
    const description = weatherData ? weatherData.list[0].weather[0].description : ''

    // Whenever Weather Data set it share data to redux to set in other component  
    useEffect(() => {
        setIcon(weatherData ? weatherData.list[0].weather[0].icon : '')
        dispatch(weatherDataAction(weatherData))
    }, [weatherData])

    
    // Getting Current Time
    const formatTime = (sec,zone,format="ccc, dd LLL yyy hh:mm a")=>DateTime.fromSeconds(sec).setZone(zone).toFormat(format)
    const timezone  = weatherData ? weatherData.city.timezone : ''
    const dt = weatherData ? weatherData.list[4].dt :''
    const currentTime = weatherData?formatTime(dt,timezone,'hh:mm a'):''
    const currentDay = weatherData?formatTime(dt,timezone,'ccc'):''
    const Current = new Date()
    // const 



    // Style for image card
    const Imagestyles = {
        media: {
            height: 0,
            paddingTop: '56.25%' // 16:9
        },
        card: {
            position: 'relative',
        },
        overlay: {
            position: 'absolute',
            top: '40%',
            left: '30%',
            color: 'black',
            color: 'white'
            //    backgroundColor: 'white'
        }
    }

    // Onclick of Search Input Box
    const cityUpdate = () => {
        setcity(searchinput)
    }
    const handleKeyDown = (event) => {
        if (event.key == "Enter" && searchinput) {
            setcity(searchinput)
        }
    }

    return (
        <div className='sectionLeft'>
            <div className='search-city'>
                <div className='serch-icon'>
                    <SearchIcon />
                </div>
                <div className='search-input'>
                    <input placeholder='Search for places...' style={{ border: 'none', outline: 'none', backgroundColor: 'transparent' }} value={searchinput} onChange={(e) => setinput(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} />
                    <TravelExploreOutlinedIcon onClick={() => cityUpdate()} />
                </div>
            </div>
            <div className='weather-icon-left'>
                {/* <img src="https://openweathermap.org/img/wn/10d@2x.png"  /> */}
                <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt='weathericon' height='100px' width='100px' />
            </div>
            <div className='temp-left'>
                <span>{parseInt(temp)}&deg; {isCel ? <sup>c</sup> : <sup>F</sup>} </span>
            </div>
            <div className='daytime-left'>
                <span>{currentDay}</span>, {currentTime}
            </div>
            <div className='line'></div>
            <div>
                <CloudQueueIcon /> &nbsp;
                <span>{description}</span>
            </div>
            <div>
                <WaterDropIcon /> &nbsp;
                <span>Humidity - {humidity}%</span>
            </div>
            <div className='cityimage-left'>
                <Card sx={{ height: 80, borderRadius: '8%' }} style={Imagestyles.card}>
                    <CardMedia
                        sx={{ height: 100 }}
                        style={Imagestyles.media}
                        image="https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?cs=srgb&dl=pexels-lukas-rodriguez-1845331-3680219.jpg&fm=jpg"
                        title="green iguana"
                    />
                    <div>
                        <Typography style={Imagestyles.overlay}>{currentCity},{country}</Typography>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default LeftSection