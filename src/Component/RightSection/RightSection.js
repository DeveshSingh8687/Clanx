import React from 'react'
import './style/RightSection.css'
import Header from './Header'
import WeekForcast from './WeekForcast'
import Highlights from './Highlights'

function RightSection() {
  return (
    <div className='rightSection'>
        <Header />
        <WeekForcast/>
        <Highlights />
    </div>
  )
}

export default RightSection