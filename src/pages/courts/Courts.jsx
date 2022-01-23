import "./courts.css"
import { DataGrid, GridOverlay } from "@mui/x-data-grid"
import { gql, useQuery } from "@apollo/client";
import { getCourtName, getCourtsNames } from "../../scripts/utils";
import { LinearProgress } from "@mui/material";
import { useState } from "react";


const COURTS = gql`
    query 
    {
        courts(orderBy:id, orderDirection:asc) {
            id
            parent {
            id
            }
            activeJurors
            disputesNum
            disputesClosed
            disputesOngoing
            feeForJuror
            minStake
            alpha
            tokenStaked
            policy {
            policy
            }
        }
    }
`
function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}

export default function Courts() {
  const [courtsData, setCourtsData] = useState(() => []);
  
  const {error, data, loading} = useQuery(COURTS, {onCompleted: setCourtsData});
  if (error) return <span>Upsss, an error has raised</span>
  
  

  const columns = [
    { field: 'id', headerName: 'ID', width: 70, type: 'number' },
    { field: 'policy', headerName: 'Court Name', width: 200, renderCell: (params) => {
      return (<a href={"courts/"+params.row.id}>{params.row.policy.policy}</a>)
    }},
    { field: 'tokenStaked', headerName: 'Total Staked', width: 150, type: 'number', valueFormatter: (params) => {
      const valueFormatted = Number(params.value / 1e18).toLocaleString(undefined, { maximumFractionDigits: 0 });
      return `${valueFormatted} PNK`;
    }},
    { field: 'activeJurors', headerName: 'Active Jurors', width: 150, type: 'number'},
    { field: 'feeForJuror', headerName: 'Fee for Jurors', width: 150, type: 'number', valueFormatter: (params) => {
      const valueFormatted = Number(params.value / 1e18).toLocaleString();
      return `${valueFormatted} ETH`;
    }},
    { field: 'minStake', headerName: 'Min Stake', width: 150, type: 'number', valueFormatter: (params) => {
      const valueFormatted = Number(params.value / 1e18).toLocaleString();
      return `${valueFormatted} PNK`;
    }},
    { field: 'voteStake', headerName: 'Vote Stake', width: 150, type: 'number', renderCell: (params) => {
      return (Number(params.row.minStake / 1e18 * params.row.alpha / 10000).toLocaleString() + ' PNK');
    }},
    { field: 'disputesNum', headerName: 'Total Disputes', width: 150, type: 'number'},
    { field: 'disputesNum', headerName: 'Total Disputes', type: 'number', width: 150},
    { field: 'disputesOngoing', headerName: 'Open Disputes', type: 'number', width: 150},
  ];
  return (
  <div className="courts">
      <DataGrid
        rows={courtsData.courts}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[5, 50]}
        loading={loading}
        components={{
          LoadingOverlay: CustomLoadingOverlay,
        }}
      />

      
      

    </div>
  
  )
    
}
