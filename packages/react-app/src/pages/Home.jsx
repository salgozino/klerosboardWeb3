import LatestStakes from "../components/LatestStakes";
import LatestDisputes from "../components/latestDisputes";
import InfoCard from "../components/infoCard";
import { Container, Grid, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { getChainId, wei2eth } from "../scripts/utils";
import { KLEROSCOUNTERS } from "../graphql/klerosCounters";
import { useSearchParams } from "react-router-dom";


function getAPY(totalStaked, chainId) {
  const rewards = { '1': 900000, '100': 100000 }
  const reward = rewards[chainId]
  return ((reward / wei2eth(totalStaked)) * 12 * 100).toFixed(2) + ' %'
}

export default function Home() {
  const { error, data, loading } = useQuery(KLEROSCOUNTERS);
  let [searchParams] = useSearchParams();
  let chainId = getChainId(searchParams)

  if (error) console.log(error);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant='h4' sx={{ marginBottom: '15px', width: '80%' }}>
        Dashboard: {chainId}
      </Typography>

      <Grid container columnSpacing={2} rowSpacing={1} sx={{ marginTop: '30px' }}>
        <Grid item xs={12} md={4} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'Total Disputes',
                'value': data ? data.klerosCounters[0].disputesCount : '-'
              }}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} md={4} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'Disputes already closed',
                'value': data ? data.klerosCounters[0].closedDisputes : '-'
              }}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} md={4} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'Ongoing Disputes',
                'value': data ? data.klerosCounters[0].openDisputes : '-'
              }}
            loading={loading}
          />
        </Grid>


        <Grid item xs={12} md={4} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'Most Active Court',
                'value': 'Soon'
              }}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} md={4} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'Arbitrables',
                'value': data ? data.klerosCounters[0].numberOfArbitrables : '-'
              }}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} md={4} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'Total Fees in ETH',
                'value': data ? wei2eth(data.klerosCounters[0].totalETHFees).toFixed(3) : '-'
              }}
            loading={loading}
          />
        </Grid>


        <Grid item xs={12} md={3} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'Active Jurors',
                'value': data ? data.klerosCounters[0].activeJurors : '-'
              }}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} md={3} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'Drawn Jurors',
                'value': data ? data.klerosCounters[0].drawnJurors : '-'
              }}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} md={3} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'Jurors Retention',
                'value': 'Soon'
              }}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} md={3} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'Jurors Adoption',
                'value': 'Soon'
              }}
            loading={loading}
          />
        </Grid>


        <Grid item xs={12} md={3} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'PNK Total Supply',
                'value': 'Soon'
              }}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} md={3} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'PNK Circulating Supply',
                'value': 'soon'
              }}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} md={3} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'PNK Staked in Courts',
                'value': data ? wei2eth(data.klerosCounters[0].tokenStaked).toFixed(0) : '-'
              }}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} md={3} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'Staking Reward (APY)',
                'value': data ? getAPY(data.klerosCounters[0].tokenStaked, '1') : '-'
              }}
            loading={loading}
          />
        </Grid>


        <Grid item xs={12} md={3} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': '% Staked of Total Supply',
                'value': 'Soon'
              }}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} md={3} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': '% Staked of Circulating Supply',
                'value': 'soon'
              }}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} md={3} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'Fees Paid',
                'value': data ? wei2eth(data.klerosCounters[0].totalETHFees).toFixed(3) : '-'
              }}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} md={3} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'PNK Redistributed',
                'value': data ? wei2eth(data.klerosCounters[0].totalTokenRedistributed).toFixed(0) : '-'
              }}
            loading={loading}
          />
        </Grid>



        <Grid item xs={12} md={3} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'ETH Price',
                'value': 'Soon'
              }}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} md={3} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'PNK price',
                'value': 'Soon'
              }}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} md={3} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'PNK Vol in last 24 hs',
                'value': 'Soon'
              }}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} md={3} zeroMinWidth>
          <InfoCard
            info={
              {
                'title': 'PNK Price change in last 24 hs',
                'value': 'Soon'
              }}
            loading={loading}
          />
        </Grid>

      </Grid>

      <Grid container spacing={2} sx={{ marginTop: '20px' }}>
        <LatestStakes />
        <LatestDisputes />
      </Grid>
    </Container >
  )
}
