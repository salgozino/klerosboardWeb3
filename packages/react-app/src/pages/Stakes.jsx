import { useQuery } from "@apollo/client";
import { useState } from "react";
import { wei2eth } from "../scripts/utils";
import {LinkWithQuery as LinkRouter} from "../components/LinkWithQuery";
import { Typography, Link, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ALLSTAKES } from "../graphql/stakes";
import { timestamp2Datetime } from "../scripts/timeUtils";


export default function Stakes() {
  const [stakesData, setStakesData] = useState(() => []);
 
  const handleStakesData = (data) => {
    parseStakeData(data.stakeSets);
  }

  async function parseStakeData(stakesData) {
    if (stakesData === undefined) return []
    let newStakesData = [];
    stakesData.forEach((stake, index) => {
      newStakesData.push({
        'id': index,
        'juror': stake.address.id,
        'stake': wei2eth(stake.stake),
        'totalStake': wei2eth(stake.newTotalStake),
        'subcourtId': stake.subcourtID,
        'timestamp': stake.timestamp,
        'gascost': wei2eth(stake.gasCost)
      })
    })
    setStakesData(newStakesData)
  }

  const {error, foo, loading} = useQuery(ALLSTAKES, {onCompleted: handleStakesData});
  if (error) return <span>Upsss, an error has raised</span>


  const columns = [
    { field: 'id', headerName: 'ID', hide: true},
    { field: 'juror', headerName: 'Juror', type: 'string', flex: 3, renderCell: (params) => {
      return (<Link component={LinkRouter} to={"/profile/"+params.value} children={params.value}/>)
    }},
    { field: 'courtName', headerName: 'Court', flex: 1, renderCell: (params) => {
      return (<Link component={LinkRouter} to={"/courts/"+params.row.subcourtId} children={params.row.subcourtId} />)
    }},
    { field: 'stake', headerName: 'Stake', type: 'number', flex: 1, valueFormatter: (params) => {
      const valueFormatted = Number(params.value).toLocaleString(undefined, { maximumFractionDigits: 0 });
      return `${valueFormatted}`;
    }},
    { field: 'totalStake', headerName: 'Total Staked in all courts', type: 'number', flex: 1, valueFormatter: (params) => {
      const valueFormatted = Number(params.value).toLocaleString(undefined, { maximumFractionDigits: 0 });
      return `${valueFormatted}`;
    }},
    { field: 'timestamp', headerName: 'Date', type: 'string', flex: 2, valueFormatter: (params) => {
      return timestamp2Datetime(params.value);
    }},
    { field: 'gascost', headerName: 'Gas Cost', type: 'string', flex: 1, valueFormatter: (params) => {
      const valueFormatted = Number(params.value).toLocaleString(undefined, { maximumFractionDigits: 3 });
      return `${valueFormatted}`;
    }},
  ];

  return (
    <Container style={{height:'90%',  width: '100%', marginTop:'20px' }}>
        
    <Typography variant="h4" >Stakes Data</Typography>
    <DataGrid autoPageSize pagination style={{height: '90%'}}
      rows = {stakesData}
      columns={columns}
      loading={stakesData.length === 0 || loading}
      initialState={{
        sorting: {
          sortModel: [{ field: 'timestamp', sort: 'desc' }],
        },
      }}
      />
    </Container>

  )
    
}
