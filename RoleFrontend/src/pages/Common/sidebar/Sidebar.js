import "./sidebar.css";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";
import List from "../../../components/list/List";
import useLogout from "../../../hooks/useLogout";
import useDark from "../../../hooks/useDark";

const Sidebar = ({isOpen,ToggleSidebar,data}) => {

  const logout = useLogout();
  const darkMode = useDark();

  return (
    <div>
      <div className={`sidebar ${isOpen == true ? 'small-sidebar' : ''}`}>
        <div className="center">
          {isOpen && <div className="top">
            <Link to="/" style={{ textDecoration: "none" }}>
              <span className="logo">RBA</span>
            </Link>
            <CloseIcon onClick={ToggleSidebar} className="close" />
          </div>}
          <ul>
            <List data={data} />
          </ul>
        </div>
        <div className="bottom">
          <ul>
            {darkMode}
            <li onClick={logout} title='Logout'>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </div>
      <div className={`sidebar-overlay ${isOpen == true ? 'active' : ''}`} onClick={ToggleSidebar}></div>
    </div>
  );
};

export default Sidebar;