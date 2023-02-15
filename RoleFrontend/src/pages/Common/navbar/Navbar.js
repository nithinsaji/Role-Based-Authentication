import "./Navbar.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import Profile from "../../../components/profile-nav/Profile";
// import { DarkModeContext } from "../../context/darkModeContext";
// import { useContext } from "react";

const Navbar = (props) => {

 

  return (
    <div className="Navbar">
      <div className="wrapper">
        <div className="left">
          <MenuIcon className="menu-icon" onClick={props.ToggleSidebar} />
          <div className="top">
            <Link to="/" style={{ textDecoration: "none" }}>
              <span className="logo">RBA</span>
            </Link>
          </div>
          <div className="search">
            <input type="text" placeholder="Search..." />
            <SearchOutlinedIcon />
          </div>
        </div>
        <div className="right">
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Navbar;