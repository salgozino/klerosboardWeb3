import "./infocard.css"
import {ArrowDownward, ArrowUpward} from "@mui/icons-material"

export default function InfoCard({info}) {
  return (
    <div className="featuredItem">
      <span className="featuredTitle">{info.title}</span>
      <div className="featuredMoneyContainer">
          <span className="featuredMoney">{info.value}</span>
          {info.rate != null?
            <span className="featuredMoneyRate">{info.rate } {info.rate > 0?<ArrowUpward className="featuredIcon"/>:<ArrowDownward className="featuredIcon negative"/>} </span> 
            : null }
      </div>
      {info.rate != null? <span className="featuredSub">Compared to last moth</span> : null}
    </div>
  )
}
