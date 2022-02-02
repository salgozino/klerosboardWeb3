import { Skeleton } from "@mui/material";
import "./infocardlist.css"

export default function InfoCardList({info, loading}) {

    return (
      <div className="featuredItem">
        <span className="featuredTitle">{info.title}</span>
        <ul className="featuredList">
          {loading 
          ? <Skeleton variant="rectangular" width={210} height={118} />
          : info.values.map((item, i) => {
            return (
              <li key={i} value={item}>
                {item}
              </li>
            );
            })
          }
        </ul>
      </div>
    )
  }