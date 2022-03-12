import { Container, Grid, Link, Typography } from '@mui/material';
import { Link as LinkRouter } from 'react-router-dom';
import React from 'react'
import { useQuery } from "@apollo/client";
import { useParams } from 'react-router-dom';
import InfoCard from '../components/infoCard';
import { ARBITRABLE, ARBITRABLEDISPUTES } from '../graphql/arbitrables';
import { wei2eth } from '../scripts/utils';
import { DataGrid } from '@mui/x-data-grid';
import { timestamp2Datetime } from '../scripts/timeUtils';

export default function Arbitrable() {
  const { id } = useParams();
  const { error, data, loading } = useQuery(ARBITRABLE, { variables: { arbitrableId: id } });
  const { error: error_disputes, data: data_disputes, loading: loading_disputes } = useQuery(ARBITRABLEDISPUTES, { variables: { arbitrableId: id } });

  const dispute_cols = [
    {
      field: 'id', headerName: 'Dispute N°', type: 'number', flex: 1, renderCell: (params) => {
        return (<Link component={LinkRouter} to={"/cases/" + params.value}>{params.value}</Link>)
      }
    },
    {
      field: 'startTime', headerName: 'Creation Date', flex: 2, valueFormatter: (params) => {
        return timestamp2Datetime(params.value);
      }
    },
    {
      field: 'subcourtID', headerName: 'Court', flex: 1, renderCell: (params) => {
        return (<Link component={LinkRouter} to={"/courts/" + params.value.id}>{params.value.id}</Link>)
      }
    },
    { field: 'currentRulling', headerName: 'Current Rulling', flex: 1 },
    { field: 'period', headerName: 'Status', flex: 1 },
    { field: 'txid', headerName: 'txID', flex: 2, renderCell: (params) => {
      return (<Link href={"https://etherscan.io/tx/" + params.value} target='_blank'>{params.value}</Link>)
    } },

  ]

  return (
    <Container style={{ height: '90%', width: '100%', marginTop: '20px' }}>

      <Typography variant='h4'>Arbitrable: {id}</Typography>
      <Link href={"https://www.etherscan.com/address/" + id} target={'_blank'}>View on block explorer</Link>

      <Grid container columnSpacing={2} rowSpacing={1} sx={{ marginTop: '30px' }} alignItems="center">
        <Grid item xs={12} md={4} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'Disputes Created',
                'value': data ? data.arbitrables[0].disputesCount : '-'
              }
            } />
        </Grid>
        <Grid item xs={12} md={4} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'Fees Generated',
                'value': data ? wei2eth(data.arbitrables[0].ethRewards).toFixed(3) : '-'
              }
            } />
        </Grid>
        <Grid item xs={12} md={4} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'Fees Generated in USD',
                'value': 'Soon'
              }
            } />
        </Grid>
      </Grid>
      <Grid container columnSpacing={2} rowSpacing={1} sx={{ marginTop: '30px' }}>
        <Grid item xs={12} md={2} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'Evidence Phase Disputes',
                'value': data ? data.arbitrables[0].evidencePhaseDisputes : '-'
              }
            } />
        </Grid>
        <Grid item xs={12} md={2} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'Commit Phase Disputes',
                'value': data ? data.arbitrables[0].commitPhaseDisputes : '-'
              }
            } />
        </Grid>
        <Grid item xs={12} md={2} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'Voting Phase Disputes',
                'value': data ? data.arbitrables[0].votingPhaseDisputes : '-'
              }
            } />
        </Grid>
        <Grid item xs={12} md={2} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'Appeal Phase Disputes',
                'value': data ? data.arbitrables[0].appealPhaseDisputes : '-'
              }
            } />
        </Grid>
        <Grid item xs={12} md={2} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'Disputes Closed',
                'value': data ? data.arbitrables[0].closedDisputes : '-'
              }
            } />
        </Grid>
      </Grid>

      <Typography variant='h4' sx={{ marginTop: '20px' }}>Disputes Created</Typography>
      <DataGrid autoPageSize pagination style={{ height: '90%' }}
        rows={data_disputes ? data_disputes.arbitrables[0].disputes : []}
        columns={dispute_cols}
        loading={loading_disputes}
        initialState={{
          sorting: {
            sortModel: [{ field: 'id', sort: 'desc' }],
          },
        }}
      />

    </Container>
  )
}
