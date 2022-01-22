import "./sidebar.css"
import { AltRoute, LineStyle, Balance } from '@mui/icons-material';
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
  <div className='sidebar'>
    <div className="sidebarWrapper">
        <div className="sidebarMenu">
            <h3 className="sidebarTitle">Dashboard</h3>
            <ul className="sidebarList">
              <Link to="/" className="sidebarListItem">
                <li>
                <LineStyle className='sidebarIcon'/>
                Home
                </li>
              </Link>
              <Link to="/courts" className="sidebarListItem">
                <li>
                <Balance className='sidebarIcon'/>
                Courts
                </li>
              </Link>  
              <Link to="/cases" className="sidebarListItem">
                <li>
                <AltRoute className='sidebarIcon'/>
                Other
                </li>
              </Link>
            </ul>
        </div>
    </div>
  </div>);
}
