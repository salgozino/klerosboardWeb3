import "./infocard.css"
import {ArrowDownward, ArrowUpward} from "@mui/icons-material"
import Skeleton from '@mui/material/Skeleton';

export default function InfoCard({info, loading, baseURL}) {
  if (loading){
    return (
      <div className="featuredItem">
        <span className="featuredTitle">{info.title}</span>
        <div className="featuredMoneyContainer">
          
          <Skeleton variant="rectangular" width={210} height={118} />            
        </div>
      </div>
    )
  }

  return (
    <div className="featuredItem">
      <span  className="featuredTitle">{info.title}</span>
      <div className="featuredMoneyContainer">
          {baseURL?
            <a href={baseURL + '/' + info.id} className="featuredMoney">{info.value}</a>
            : <span className="featuredMoney">{info.value}</span>
        }
          
          {info.rate != null?
            <span className="featuredMoneyRate">{info.rate } {info.rate > 0?<ArrowUpward className="featuredIcon"/>:<ArrowDownward className="featuredIcon negative"/>} </span> 
            : null }
      </div>
      {info.rate != null? <span className="featuredSub">Compared to last moth</span> : null}
    </div>
  )
}
