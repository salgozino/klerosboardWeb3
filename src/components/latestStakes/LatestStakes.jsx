import "./lateststakes.css"
import { useQuery } from "@apollo/client";
import { wei2eth } from "../../scripts/utils";
import {Person} from '@mui/icons-material/';
import { useState } from "react";
import { Link } from "react-router-dom";
import { LASTSTAKES } from "../../queries/stakes";
import { Skeleton } from "@mui/material";

export default function LatestStakes() {
   
  
  function createStakeItem(stake, i) {
    return (
      <li className="widgetSmListItem" key={i}>
        <Person className="widgetSmImg" />
        <div className="widgetSmUser">
          <Link to={"/profile/" + stake.juror} className="widgetSmUsername"> {stake.juror} </Link>
          <span className="widgetSmJobTitle">{"Court: " + stake.subcourtId}</span>
        </div>
        <span className="widgetSmButton">
          {stake.stake.toFixed(0) + ' PNK'}
        </span>
      </li>
    )
  }

  const [stakesItems, setStakeItems] = useState(() => <Skeleton />);


  const handleStakeData = (data) => {
    parseStakeData(data.stakeSets);
  }


  async function parseStakeData(stakesData) {
    if (stakesData === undefined) return []
    let newStakesData = [];
    stakesData.forEach((stake) => {
      newStakesData.push(
        {
          'juror': stake.address.id,
          'subcourtId': stake.subcourtID,
          'stake': wei2eth(stake.stake),
        }
      );
    });

    const items = []
    newStakesData.forEach((stake, i) => { 
      const item = createStakeItem(stake, i)
      items.push(item);
    })
    setStakeItems(items)
  }

  const { error, foo, loading } = useQuery(LASTSTAKES, { onCompleted: handleStakeData });

  if (error) {console.log(error)}
  return (
  <div className="widgetSm">
    <span className="widgetSmTitle">Latest Stakes</span>
    <ul className="widgetSmList">
      {stakesItems}
    </ul>
  </div>
  )

}

