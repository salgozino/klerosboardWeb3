import "./court.css"
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo"
import { useParams } from 'react-router-dom'

export default function Court() {
  const { courtId } = useParams()
  return (
    <div className="court">
      <div className="courtTitleContainer">
          <h1 className="courtTitle">Court {courtId}</h1>
      </div>
      
      <FeaturedInfo />
      
    </div>
  )
}
