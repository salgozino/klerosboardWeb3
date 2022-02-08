import "./dispute.css"
import { useParams } from "react-router-dom";



export default function Dispute() {
   
  const { disputeId } = useParams();

  return (
  <div className="disputes">
      <span>Dispute {disputeId}</span>
    </div>
  )
    
}
