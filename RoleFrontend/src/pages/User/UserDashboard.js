import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import useLogout from '../../hooks/useLogout'
import Navbar from '../Common/navbar/Navbar';
import Sidebar from '../Common/sidebar/Sidebar';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

function UserDashboard() {

const [isOpen, setIsopen] = useState(false);

  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  }

  const data = [{
    id: 1,
    name: 'Profile',
    icon: <AccountCircleOutlinedIcon className="icon" />,
    link: 'profile'
  },
  {
    id: 2,
    name: 'Notification',
    icon: <NotificationsNoneOutlinedIcon className="icon" />,
    link: 'notification'
  }];

  return (
    <div>
      <div className="home">
        <Navbar ToggleSidebar={ToggleSidebar} />
        <div className="homeContainer">
          <Sidebar isOpen={isOpen} ToggleSidebar={ToggleSidebar} data={data} />
          <div className='outlet'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard