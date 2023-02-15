import React from 'react'
import { Link } from 'react-router-dom'
import './submenu.css'

const Submenu = () => {
  return (
    <ul className='nav-dropdown'>
        <li>
          <Link to='/AdminDashboard'>Profile</Link>
        </li>
        <li>
          <Link to='/AdminDashboard'>Profile</Link>
        </li>
        <li>
        <Link to='/AdminDashboard'>Settings</Link>
        </li>
        <li>
        <Link to='/AdminDashboard'>Logout</Link>
        </li>
    </ul>
  )
}

export default Submenu