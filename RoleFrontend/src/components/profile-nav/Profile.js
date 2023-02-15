import React from 'react'
import './profile.css'
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsIcon from '@mui/icons-material/Settings';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import useLogout from '../../hooks/useLogout';
import { Link } from 'react-router-dom';
import useDark from '../../hooks/useDark';

const Profile = () => {

  var user = JSON.parse(localStorage.getItem("user"));

  const Logout = useLogout();

  const darkMode = useDark();

  return (
    <ul className="right-nav">
      {darkMode}
      <li className="nav-item profile"><NotificationsNoneOutlinedIcon />
        <div className="counter">3</div>
        <ul className="sub-menu">
          <div className="dropdown-user nav-notification">
            <img src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" className="avatar" alt='Profile' />
            <div className="user">
              <p><b>Nithin S</b> replied your post. 2m</p>
            </div>
          </div>
          <div className="dropdown-user nav-notification">
            <img src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" className="avatar" alt='Profile' />
            <div className="user">
              <p><b>Nithin S</b> liked your post. 45m</p>
            </div>
          </div>
          <div className="dropdown-user nav-notification">
            <img src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" className="avatar" alt='Profile' />
            <div className="user">
              <p><b>Nithin S</b> start following you. 3h</p>
            </div>
          </div>
          <Link to="/AdminDashboard" style={{ textDecoration: "none" }}>
            <span className="view-btn">View all</span>
          </Link>
        </ul>
      </li>
      <li className="nav-item profile">
        <img src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" className="avatar" alt='Profile' />
        <ul className="sub-menu">
          <div className="dropdown-user">
            <img src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" className="avatar" alt='Profile' />
            <div className="user">
              <h5>Nithin S</h5>
              <p>{user.email}</p>
            </div>
          </div>
          <Link to="profile" style={{ textDecoration: "none"}}>
            <li><PersonOutlineIcon />
              <span>Profile</span>
            </li>
          </Link>
          <li><SettingsIcon /><span>Setting</span></li>
          <li><ExitToAppIcon /><span onClick={Logout}>Logout</span></li>
        </ul>
      </li>
    </ul>
  )
}

export default Profile