import "./widgetsm.css"
import {Visibility} from '@mui/icons-material';

export default function WidgetSm() {
  return (
  <div className="widgetSm">
    <span className="widgetSmTitle">New Jurors</span>
    <ul className="widgetSmList">
      <li className="widgetSmListItem">
        <img src="https://www.prensalibre.com/wp-content/uploads/2021/06/milhouse-02.png" alt="" className="widgetSmImg" />
        <div className="widgetSmUser">
          <span className="widgetSmUsername">Koki</span>
          <span className="widgetSmJobTitle">boludo 24hs</span>
        </div>
        <button className="widgetSmButton">
          <Visibility className="widgetSmIcon"/>
          Display
        </button>
      </li>
      <li className="widgetSmListItem">
        <img src="https://www.prensalibre.com/wp-content/uploads/2021/06/milhouse-02.png" alt="" className="widgetSmImg" />
        <div className="widgetSmUser">
          <span className="widgetSmUsername">Koki</span>
          <span className="widgetSmJobTitle">boludo 24hs</span>
        </div>
        <button className="widgetSmButton">
          <Visibility className="widgetSmIcon"/>
          Display
        </button>
      </li>
    </ul>
  </div>
  )

}
