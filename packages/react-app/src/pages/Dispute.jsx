import { Link as LinkRouter, useParams } from "react-router-dom";
import { DISPUTE } from "../queries/disputes"
import Skeleton from '@mui/material/Skeleton';
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import InfoCard from "../components/infoCard";
import { getCourtName, capitalizeFirstLetter, period2index, VotesMapping, countUniqueVotes } from "../scripts/utils";
import { timestamp2Datetime, sec2DayHour } from "../scripts/timeUtils";
import RoundBox from "../components/RoundBox";
import VotesCount from "../components/VotesCount";
import { Container, Grid, Typography, Link } from "@mui/material";


function remainingTime(lastPeriodChange, period, court_periods) {
  const now = Date.now() / 1000
  const delta = now - lastPeriodChange
  const period_length = court_periods[period2index(period)]
  return period_length - delta
}

export default function Dispute() {

  const { disputeId } = useParams();
  const [courtName, setCourtName] = useState(<Skeleton variant="text" animation="wave" className="courtTitle" />);
  const { error, data, loading } = useQuery(DISPUTE, { variables: { disputeID: disputeId } });
  if (error) { console.log(error) }
  const not_loading_and_data = !loading && data

  var dispute = null
  if (not_loading_and_data) {
    dispute = data.disputes[0]
  }

  if (not_loading_and_data) {
    // console.log(dispute)
    // console.log(dispute.subcourtID.timePeriods)
  }

  useEffect(() => {
    async function getName(policy) {
      const cn = await getCourtName(policy.policy);
      if (cn) {
        setCourtName(cn);
      }
    };
    if (!loading && dispute) {
      getName(dispute.subcourtID.policy)
    };
  }, [dispute, loading]
  )

  const rounds_boxs = dispute ? dispute.rounds.map((round, i) => {
    return (<div>
      <Typography variant="h5" sx={{ "margin": "20px 0px" }}>Round {i}</Typography>
      <RoundBox data={round} />
    </div>)
  }) : <Skeleton variant="rectangular" height={200} />

  const allUniqueVotes = dispute ? <VotesCount votes_count={countUniqueVotes(dispute.rounds)} /> : <Skeleton variant="rectangular" height={200} />
  const columnSpacing = 2;
  const rowSpacing = 1;

  return (
    <Container>
      <Typography variant='h4' sx={{ marginBottom: '15px', marginTop: '20px' }}>General Info</Typography>
      <Grid container columnSpacing={columnSpacing} rowSpacing={rowSpacing}>
        <Grid item xs={1} md={2}>
          <InfoCard
            loading={!not_loading_and_data}
            baseURL='/courts'
            info={
              {
                'title': 'Court',
                'value': courtName ? courtName : "-",
                'id': dispute ? dispute.subcourtID.id : "#"

              }
            }
          />
        </Grid>
        <Grid item xs={1} md={2}>
          <InfoCard
            loading={loading}
            info={
              {
                'title': 'Start Date',
                'value': data ? timestamp2Datetime(dispute.startTime) : null,
              }
            } />
        </Grid>
        <Grid item xs={1} md={2}>
          <InfoCard
            loading={loading}
            info={
              {
                'title': 'Status',
                'value': not_loading_and_data ? dispute.ruled ? "Already Executed" : 'Ongoing' : null,
              }
            } />
        </Grid>
        <Grid item xs={1} md={2}>
          <InfoCard
            loading={loading}
            info={
              {
                'title': 'Current Period',
                'value': not_loading_and_data ? capitalizeFirstLetter(dispute.period) : null,
              }
            } />
        </Grid>
        <Grid item xs={1} md={2}>
          <InfoCard
            loading={loading}
            info={
              {
                'title': not_loading_and_data ? dispute.ruled ? 'End Date' : 'Remaining Time' : <Skeleton />,
                'value': not_loading_and_data ? dispute.ruled ? timestamp2Datetime(dispute.lastPeriodChange) : sec2DayHour(remainingTime(dispute.lastPeriodChange, dispute.period, dispute.subcourtID.timePeriods)) : null,
              }
            } />
        </Grid>
        <Grid item xs={1} md={2}>
          <InfoCard
            loading={loading}
            info={
              {
                'title': 'Winning Choice',
                'value': not_loading_and_data ? dispute.ruled ? VotesMapping[dispute.currentRulling] : "-" : null
              }
            } />
        </Grid>

        {/* Second Line */}
        <Grid item xs={2} md={6}>
          <InfoCard
            loading={loading}
            baseURL= "/arbitrable"
            info={
              {
                'title': 'Arbitrable',
                'value': not_loading_and_data ? dispute.arbitrable.id  : "-",
                'id': not_loading_and_data ? dispute.arbitrable.id : null
              }
            }
          />
        </Grid>
        <Grid item xs={2} md={6}>
          <InfoCard
            loading={loading}
            baseURL= "/profile"
            info={
              {
                'title': 'Creator',
                'value': not_loading_and_data ? dispute.creator.id : "-",
                'id': not_loading_and_data ? dispute.creator.id : null,
              }
            } />
        </Grid>
      </Grid>

      <Typography variant="h5">Unique Votes in all the Rounds</Typography>
      <div className="row">
        {allUniqueVotes}
      </div>

      <Typography variant="h5">Rounds info</Typography>
      {rounds_boxs}

    </Container>

  )

}
