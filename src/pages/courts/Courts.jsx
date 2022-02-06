import "./courts.css"
import { useQuery } from "@apollo/client";
import { ALLCOURTS } from "../../queries/courts"
import { useState } from "react";
import Table from "../../components/table/Table"
import { getCourtsNames, wei2eth } from "../../scripts/utils";
import { Link } from "react-router-dom";


export default function Courts() {
  const [courtsData, setCourtsData] = useState(() => []);
 
  const handleCourtData = (data) => {
    parseCourtData(data.courts);
  }
  async function parseCourtData(courtsData) {

    if (courtsData === undefined) return []
    let newCourtsData = [];
    const names = await getCourtsNames(courtsData);
    courtsData.forEach((court, index) => {
      const parent = court.parent? court.parent.id : null;    
      newCourtsData.push({
        'id': court.id,
        'parent': parent,
        'activeJurors': court.activeJurors,
        'disputesNum': court.disputesNum,
        'disputesClosed': court.disputesClosed,
        'disputesOngoing': court.disputesOngoing,
        'feeForJuror': wei2eth(court.feeForJuror),
        'minStake': wei2eth(court.minStake),
        'alpha': court.alpha,
        'tokenStaked': wei2eth(court.tokenStaked),
        'policy': court.policy.policy,
        'name': names[index]
      })
    })
  
    setCourtsData(newCourtsData)
  }

  const {error, _, loading} = useQuery(ALLCOURTS, {onCompleted: handleCourtData});
  if (error) return <span>Upsss, an error has raised</span>


  const columns = [
    { field: 'id', headerName: 'ID', width: 70, type: 'number' },
    { field: 'name', headerName: 'Court Name', width: 200, renderCell: (params) => {
      return (<Link to={"/courts/"+params.id}>{params.row.name}</Link>)
    }},
    { field: 'tokenStaked', headerName: 'Total Staked', width: 150, type: 'number', valueFormatter: (params) => {
      const valueFormatted = Number(params.value).toLocaleString(undefined, { maximumFractionDigits: 0 });
      return `${valueFormatted} PNK`;
    }},
    { field: 'activeJurors', headerName: 'Active Jurors', width: 150, type: 'number'},
    { field: 'feeForJuror', headerName: 'Fee for Jurors', width: 150, type: 'number', valueFormatter: (params) => {
      const valueFormatted = Number(params.value).toLocaleString();
      return `${valueFormatted} ETH`;
    }},
    { field: 'minStake', headerName: 'Min Stake', width: 150, type: 'number', valueFormatter: (params) => {
      const valueFormatted = Number(params.value).toLocaleString();
      return `${valueFormatted} PNK`;
    }},
    { field: 'voteStake', headerName: 'Vote Stake', width: 150, type: 'number', renderCell: (params) => {
      return (Number(params.row.minStake * params.row.alpha / 10000).toLocaleString() + ' PNK');
    }},
    { field: 'disputesNum', headerName: 'Total Disputes', width: 150, type: 'number'},
    { field: 'disputesNum', headerName: 'Total Disputes', type: 'number', width: 150},
    { field: 'disputesOngoing', headerName: 'Open Disputes', type: 'number', width: 150},
  ];
  return (
  
  <div className="courts">
      <Table 
        rows = {courtsData}
        columns={columns}
        loading={loading || courtsData === undefined}
        defaultSort={{ field: 'id', sort: 'asc' }}
        />

    </div>
  
  )
    
}
