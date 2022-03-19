import { useQuery } from "@apollo/client";
import { ALLCOURTS } from "../graphql/courts"
import { useState } from "react";
import { getCourtsNames, wei2eth } from "../scripts/utils";
import { LinkWithQuery as LinkRouter } from "../components/LinkWithQuery";
import { Typography, Link, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";


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

  const {error, loading} = useQuery(ALLCOURTS, {onCompleted: handleCourtData});
  if (error) return <span>Upsss, an error has raised</span>


  const columns = [
    { field: 'id', headerName: 'Court Id', width: 70, type: 'number', flex: 1 },
    { field: 'name', headerName: 'Court Name', width: 200, flex: 2, renderCell: (params) => {
      return (<Link component={LinkRouter} to={params.id} children={params.row.name} />)
    }},
    { field: 'tokenStaked', headerName: 'Total Staked', width: 150, type: 'number', flex: 1, valueFormatter: (params) => {
      const valueFormatted = Number(params.value).toLocaleString(undefined, { maximumFractionDigits: 0 });
      return `${valueFormatted}`;
    }},
    { field: 'activeJurors', headerName: 'Active Jurors', width: 150, type: 'number', flex: 1},
    { field: 'feeForJuror', headerName: 'Fee for Jurors', width: 150, type: 'number', flex: 1, valueFormatter: (params) => {
      const valueFormatted = Number(params.value).toLocaleString();
      return `${valueFormatted} ETH`;
    }},
    { field: 'minStake', headerName: 'Min Stake', width: 150, type: 'number', flex: 1, valueFormatter: (params) => {
      const valueFormatted = Number(params.value).toLocaleString();
      return `${valueFormatted} PNK`;
    }},
    { field: 'voteStake', headerName: 'Vote Stake', width: 150, type: 'number', flex: 1, renderCell: (params) => {
      return (Number(params.row.minStake * params.row.alpha / 10000).toLocaleString() + ' PNK');
    }},
    { field: 'disputesNum', headerName: 'Total Disputes', width: 150, type: 'number', flex: 1},
    { field: 'disputesNum', headerName: 'Total Disputes', type: 'number', width: 150, flex: 1},
    { field: 'disputesOngoing', headerName: 'Open Disputes', type: 'number', width: 150, flex: 1},
  ];

  return (
    <Container style={{height:'90%',  width: '100%', marginTop:'20px' }}>
        
    <Typography variant="h4" >Courts Data</Typography>
    <DataGrid autoPageSize pagination style={{height: '90%'}}
      rows = {courtsData}
      columns={columns}
      loading={loading || courtsData.length === 0}
      initialState={{
        sorting: {
          sortModel: [{ field: 'id', sort: 'asc' }],
        },
      }}
      />
    </Container>

  )
    
}
