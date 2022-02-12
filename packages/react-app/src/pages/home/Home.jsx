import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css"
import {data} from "../..//dummyData.js"
import LatestStakes from "../../components/latestStakes/LatestStakes";
import LatestDisputes from "../../components/latestDisputes/latestDisputes";



export default function Home() {
  return (
  <div className='home'>
      <FeaturedInfo />
      <Chart data={data} title="Home Title" grid dataKey="name"/>
      <div className="homeWidgets">
        <LatestStakes />
        <LatestDisputes />
      </div>
  </div>
  )
}
