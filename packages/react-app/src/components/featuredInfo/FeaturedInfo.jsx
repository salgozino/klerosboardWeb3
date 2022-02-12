import "./featuredInfo.css"
import {ArrowDownward, ArrowUpward} from "@mui/icons-material"

export default function FeaturedInfo() {
  return (
  <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
            <span className="featuredMoney">$2,415</span>
            <span className="featuredMoneyRate">-11.4 <ArrowDownward className="featuredIcon negative"/></span>
        </div>
        <span className="featuredSub">Compared to last moth</span>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
            <span className="featuredMoney">$3415</span>
            <span className="featuredMoneyRate">+1.4 <ArrowUpward className="featuredIcon"/></span>
        </div>
        <span className="featuredSub">Compared to last moth</span>
      </div>
  </div>
  )
}
