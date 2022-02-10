import "./topbar.css"
import {NotificationsNone} from '@mui/icons-material';
import LinkIcon from '@mui/icons-material/Link';

export default function Topbar() {
  return (
    <div className='topbar'>
        <div className="topbarWrapper">
            <div className="topLeft">
                <span className='logo'>Klerosboard 3.0</span>
            </div>
            <div className="topRight">
                <div className="topbarIconContainer">
                     <NotificationsNone />
                     <span className="topIconBadge">2</span>
                </div>
                <div className="topbarIconContainer"><LinkIcon /></div>

                <img src="/milhouse.png" alt="" className="topAvatar" />
                
            </div>
        </div>
    </div>
  )
}
