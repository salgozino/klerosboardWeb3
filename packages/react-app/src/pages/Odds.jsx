import { useQuery } from "@apollo/client";
import { Container, Grid, TextField, Link } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getChainId, getCourtsNames, wei2eth } from '../scripts/utils';
import { LinkWithQuery as LinkRouter } from "../components/LinkWithQuery";
import { ALLCOURTS } from "../graphql/courts";
import { DataGrid } from "@mui/x-data-grid";
import { useSearchParams } from "react-router-dom";

function getOdds(pnkStaked, totalStaked, nJurors) {
  if (pnkStaked <= 0) {return 0}
  if (totalStaked > 0){
        const p = pnkStaked/totalStaked
        const noDrawn = (1 - p)**nJurors
        const chanceDrawnOnce = 1 - noDrawn
        return chanceDrawnOnce * 100
  }
  return 0
  
}

export default function Odds() {
  const [courtsData, setCourtsData] = useState(() => []);
  const [oddsData, setOddsData] = useState(() => []);
  const [pnkStaked, setPnkStaked] = useState(() => 100000);
  const [nJurors, setNJurors] = useState(() => 3);
  let [searchParams] = useSearchParams();
  let chainId = getChainId(searchParams);
  const rewardCurrency = chainId === 'xdai' ? 'xDAI' : 'ETH'
  const handleCourtsData = (data) => {
    parseCourtsData(data.courts);
  }

  const handlePNKChange = (event) => {
    const target = event.target;
    setPnkStaked(Number(target.value))
  }

  const handleNJurorChange = (event) => {
    const target = event.target;
    setNJurors(Number(target.value))
  }

  async function parseCourtsData(courtsData) {
    if (courtsData === undefined) return []
    let newCourtsData = [];
    const names = await getCourtsNames(courtsData);
    courtsData.forEach((court, index) => {
      newCourtsData.push({
        'id': court.id,
        'activeJurors': court.activeJurors,
        'disputesNum': court.disputesNum,
        'disputesOngoing': court.disputesOngoing,
        'feeForJuror': wei2eth(court.feeForJuror),
        'alpha': court.alpha,
        'voteStake': wei2eth(court.minStake) * court.alpha * (10**-4),
        'minStake': wei2eth(court.minStake),
        'tokenStaked': wei2eth(court.tokenStaked),
        'name': names[index]
      })
    })
    setCourtsData(newCourtsData);
  }

  useEffect(() => {
    if (courtsData.length > 0) {
      var oddsData = []
      courtsData.forEach((court) => {
        const odds = getOdds(pnkStaked, court.tokenStaked, nJurors);
        oddsData.push({
          'id': court.id,
          'courtName': court.name,
          'jurors': court.activeJurors,
          'totalStaked': court.tokenStaked,
          'stakeShare': court.tokenStaked > 0 ? pnkStaked / court.tokenStaked * 100: 0,
          'odds': odds,
          'chances': odds !==0 ? 1/(odds/100) : 0,
          'rewardETH': court.feeForJuror,
          'rewardUSD': 0,
          'voteStake': court.voteStake,
          'voteStakeUSD': 0,
          'rewardRisk': 1,
        })
      })
      setOddsData(oddsData);
    }
  }, [courtsData, pnkStaked, nJurors])

  const {error, loading} = useQuery(ALLCOURTS, {onCompleted: handleCourtsData});
  if (error) return <span>Upsss, an error has raised</span>

  const columns = [
    { field: 'id', headerName: 'Court', hide: true},
    { field: 'courtName', headerName: 'CourtName', flex: 2, renderCell: (params) => {
      return (<Link component={LinkRouter} to={"/courts/"+params.row.id} children={params.row.courtName} />)
    }},
    { field: 'jurors', headerName: 'Jurors', type: 'number', flex: 1},
    { field: 'totalStaked', headerName: 'Total Staked', type: 'number', flex: 1, valueFormatter: (params) => {
      const valueFormatted = Number(params.value).toLocaleString(undefined, { maximumFractionDigits: 0 });
      return `${valueFormatted}`;
    }},
    { field: 'stakeShare', headerName: 'Stake Share', type: 'number', flex: 1, valueFormatter: (params) => {
      const valueFormatted = Number(params.value).toFixed(2);
      return `${valueFormatted}%`;
    }},
    { field: 'odds', headerName: 'Odds', type: 'string', flex: 1, valueFormatter: (params) => {
      const valueFormatted = Number(params.value).toFixed(2);
      return `${valueFormatted}%`;
    }},
    { field: 'chances', headerName: 'Chances', type: 'string', flex: 1, valueFormatter: (params) => {
      const valueFormatted = Number(params.value).toFixed(2);
      return `1 in ${valueFormatted}`;
    }},
    { field: 'rewardETH', headerName: 'Reward ('+rewardCurrency+')', type: 'number', flex: 1, valueFormatter: (params) => {
      const valueFormatted = Number(params.value).toLocaleString(undefined, { maximumFractionDigits: 2 });
      return `${valueFormatted}`;
    }},
    { field: 'rewardUSD', headerName: 'Reward (USD)', type: 'number', flex: 1, valueFormatter: (params) => {
      const valueFormatted = Number(params.value).toLocaleString(undefined, { maximumFractionDigits: 2 });
      return `${valueFormatted}`;
    }},
    { field: 'voteStake', headerName: 'Vote Stake (PNK)', type: 'number', flex: 1, valueFormatter: (params) => {
      const valueFormatted = Number(params.value).toFixed(0);
      return `${valueFormatted}`;
    }},
    { field: 'voteStakeUSD', headerName: 'Vote Stake (USD)', type: 'number', flex: 1, valueFormatter: (params) => {
      const valueFormatted = Number(params.value).toLocaleString(undefined, { maximumFractionDigits: 2 });
      return `${valueFormatted}`;
    }},
    { field: 'rewardRisk', headerName: 'Reward/Risk', type: 'number', flex: 1, valueFormatter: (params) => {
      const valueFormatted = Number(params.value).toFixed(3);
      return `${valueFormatted}`;
    }},
    
  ];
  
  return (
    <Container style={{height:'90%',  width: '100%', marginTop:'20px' }}>
      <Grid container sx={{ marginTop: '20px' }} columnSpacing={2} rowSpacing={2}>
        <Grid item xs={6} md={6}>
          <TextField id="outlined-basic" label="PNK Staked" variant="outlined" fullWidth={true} defaultValue={pnkStaked} onChange={handlePNKChange}/>
        </Grid>
        <Grid item xs={6} md={6}>
          <TextField id="outlined-basic" label="# of Jurors" variant="outlined" fullWidth={true} defaultValue={nJurors} onChange={handleNJurorChange}/>
        </Grid>
      </Grid>

      <DataGrid style={{height: '90%', marginTop: '20px'}}
      rows = {oddsData}
      columns={columns}
      loading={oddsData.length === 0 || loading}
      initialState={{
        sorting: {
          sortModel: [{ field: 'id', sort: 'asc' }],
        },
      }}
      />


    </Container>
  )
}
