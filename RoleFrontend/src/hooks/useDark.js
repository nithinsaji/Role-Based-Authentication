import React, { useEffect, useState } from 'react'
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

const useDark = () => {
    const [theme, setTheme] = useState('');
    const body = document.body
    const darkMode = ()=>{
        if (theme === '') {
            setTheme('dark')
            body.classList.add('dark')
          }else{
            setTheme('')
            body.classList.remove('dark')
          }
    }

  return (
    <li className="nav-item" onClick={darkMode}>{theme === '' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}</li>
  )
}

export default useDark