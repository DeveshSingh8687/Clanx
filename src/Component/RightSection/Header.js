import React, { useState } from 'react'
import './style/Header.css'
import { useDispatch } from 'react-redux'
import { ChangeTemp } from '../../Redux/action'

function Header() {
    const [focusCel,setfocusCel] = useState(true)
    const dispatch = useDispatch()
    // dispatch(ChangeTemp('hello'))
    const celClick = ()=>{
      setfocusCel(true)
      dispatch(ChangeTemp('metric'))
    }
    const farClick = ()=>{
      setfocusCel(false)
      dispatch(ChangeTemp('imperial'))
    }
  return (
    <div className='header-right'>
        <div className='week'>
            <span>Week</span>
            <div className='line-right'></div>
        </div>
        <div className='temp-type'>
            <p className={focusCel?'focus':'unfocus'} onClick={()=>celClick()}>&deg;C</p>
            <p className={focusCel?'unfocus':'focus'} onClick={()=>farClick()}>&deg; F</p>
        </div>
    </div>
  )
}

export default Header