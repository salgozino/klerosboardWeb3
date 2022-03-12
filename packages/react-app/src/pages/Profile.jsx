import { Box, Container, Grid, Link, Skeleton, Typography } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom';
import InfoCard from '../components/infoCard';
import { useQuery } from "@apollo/client";
import { PROFILE, PROFILEVOTES } from "../queries/profiles";
import { DataGrid } from '@mui/x-data-grid';
import { wei2eth } from '../scripts/utils';
import { timestamp2Datetime } from '../scripts/timeUtils';

function coherency(votes) {
  var coherent_votes = 0
  var total_votes = 0
  votes.forEach((vote) => {
    if (vote.dispute.ruled) {
      total_votes++
      if (vote.choice === vote.dispute.currentRulling){
        coherent_votes++
      }

    }
  })
  if (total_votes === 0){
    return 0
  }
  return coherent_votes/total_votes
}


export default function Profile() {
  const { id } = useParams();

  function courtStakesParser(courtStakes) {
    return courtStakes.map((courtStake, i) => {
      return {
        'id': i,
        'stake': wei2eth(courtStake.stake),
        'newTotalStake': wei2eth(courtStake.newTotalStake),
        'timestamp': timestamp2Datetime(courtStake.timestamp),
        'court': courtStake.subcourtID
      }
    });
  }

  function disuptesParser(disputes) {
    return disputes.map(dispute => {
      return {
        'id': dispute.id,
        'timestamp': timestamp2Datetime(dispute.startTime),
        'txid': dispute.txid,
        'currentRulling': dispute.currentRulling
      }
    });
  }

  function votesParser(votes) {
    const votesParsed = votes.map((vote, i) => {
      return {
        'id': i,
        'dispute': vote.dispute.id,
        'round': vote.round.id.split("-")[1],
        'ruled': vote.dispute.ruled ? 'Ruled' : 'Ongoing',
        'choice': vote.choice,
        'currentRulling': vote.dispute.currentRulling
      }
    });
    console.log(votesParsed);
    return votesParsed
  }

  const votes_cols = [
    { field: 'dispute', headerName: 'Dispute', type: 'number', flex: 2 },
    { field: 'round', headerName: 'Round', flex: 1 },
    { field: 'ruled', headerName: 'Status', flex: 1 },
    { field: 'choice', headerName: 'Choice', flex: 1 },
    { field: 'currentRulling', headerName: 'Rulling', flex: 1 }
  ]

  const court_stakes_cols = [
    { field: 'court', headerName: 'Court', type: 'string', flex: 2 },
    { field: 'stake', headerName: 'Staked', flex: 1 },
    { field: 'timestamp', headerName: 'Last Stake Date', flex: 1 },
    { field: 'txid', headerName: 'TxID', flex: 1 }
  ]

  const all_stakes_cols = [
    { field: 'court', headerName: 'Court', type: 'string', flex: 2 },
    { field: 'stake', headerName: 'Stake', flex: 1 },
    { field: 'newTotalStake', headerName: 'Total in all courts', flex: 1 },
    { field: 'timestamp', headerName: 'Date', flex: 1 }
  ]

  const disputes_created_cols = [
    { field: 'id', headerName: 'Dispute', type: 'number', flex: 1 },
    { field: 'timestamp', headerName: 'Date', flex: 2 },
    { field: 'currentRulling', headerName: 'Current Rulling', flex: 1 },
    { field: 'txid', headerName: 'TxID', flex: 2 }
  ]

  const { error: error_profile, data: data_profile, loading: loading_profile } = useQuery(PROFILE, { variables: { profileid: id } });
  const { error: error_profilevotes, data: data_profilevotes, loading: loading_profilevotes } = useQuery(PROFILEVOTES, { variables: { profileid: id } });
  if (error_profile) { console.log(error_profile) };
  if (error_profilevotes) { console.log(error_profilevotes) };
  console.log(data_profilevotes)

  return (
    <Container>
      <Box sx={{ 'marginTop': '30px' }}>
        <Typography variant='h4'>Profile: {id}</Typography>
        <Link href={"https://www.etherscan.com/address/" + id} target={'_blank'}>View on block explorer</Link>
      </Box>

      <Grid container columnSpacing={2} rowSpacing={1} sx={{ marginTop: '30px' }}>
        <Grid item xs={12} md={2} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'Fees Rewards',
                'value': data_profile ? wei2eth(data_profile.jurors[0].ethRewards).toFixed(3) : '-'
              }
            } />
        </Grid>
        <Grid item xs={12} md={2} zeroMinWidth>
          <InfoCard
            loading={!data_profile && loading_profile}
            info={
              {
                'title': 'Token Rewards',
                'value': data_profile ? wei2eth(data_profile.jurors[0].tokenRewards).toFixed(2)  : '-'
              }
            } />
        </Grid>
        <Grid item xs={12} md={2} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'Rewards received in USD',
                'value': "Soon"
              }
            } />
        </Grid>
        <Grid item xs={12} md={2} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'Gas Costs for voting in USD',
                'value': "Soon"
              }
            } />
        </Grid>
        <Grid item xs={12} md={2} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'Net Rewards in USD',
                'value': "Soon"
              }
            } />
        </Grid>
        <Grid item xs={12} md={2} zeroMinWidth>
          <InfoCard
            loading={!data_profile && loading_profile}
            info={
              {
                'title': '# of Disputes involved',
                'value': data_profile ? data_profile.jurors[0].numberOfDisputesAsJuror : '-'
              }
            } />
        </Grid>
      </Grid>

      <Typography variant='h5'>Disputes Createad: {data_profile ? data_profile.jurors[0].numberOfDisputesAsJuror : <Skeleton variant='text' />}</Typography>
      <DataGrid pagination
        columns={disputes_created_cols}
        rows={loading_profile ? [] : disuptesParser(data_profile.jurors[0].disputesAsCreator)}
        loading={loading_profile}
        defaultSort={{ field: 'id', sort: 'desc' }}
        sx={{
          justifyContent: 'space-between',
          marginBottom: '10px',
          height: '300px'
        }}
      />

      <Typography variant='h5'>Stakes Events</Typography>
      <DataGrid pagination
        columns={all_stakes_cols}
        rows={loading_profile ? [] : courtStakesParser(data_profile.jurors[0].allStakes)}
        loading={loading_profile}
        defaultSort={{ field: 'id', sort: 'desc' }}
        sx={{
          justifyContent: 'space-between',
          marginBottom: '10px',
          height: '300px'
        }}
      />

      <Typography variant='h5'>Votes</Typography>
      <Typography>Number of votes drawn: {data_profilevotes ? data_profilevotes.votes.length : "-"} </Typography>
      <Typography>Number of disputes as juror: {data_profile ? data_profile.jurors[0].numberOfDisputesAsJuror : "-"} </Typography>
      <Typography>Coherency: {
        data_profilevotes?
          Intl.NumberFormat("en-ES", { style: "percent", 
              minimumFractionDigits: 1,
              maximumFractionDigits: 2
          }).format(coherency(data_profilevotes.votes))
          : "-" }
      </Typography>
      <DataGrid pagination
        columns={votes_cols}
        rows={loading_profilevotes ? [] : votesParser(data_profilevotes.votes)}
        loading={loading_profilevotes}
        defaultSort={{ field: 'id', sort: 'desc' }}
        sx={{
          justifyContent: 'space-between',
          marginBottom: '10px',
          height: '300px'
        }}
      />

    </Container>
  )
}
