import "./dispute.css"
import { Link, useParams } from "react-router-dom";
import { DISPUTE } from "../../queries/disputes"
import Skeleton from '@mui/material/Skeleton';
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import InfoCard from "../../components/infoCard/infoCard"
import { getCourtName, capitalizeFirstLetter, period2index, VotesMapping, countUniqueVotes } from "../../scripts/utils";
import { timestamp2Datetime, sec2DayHour } from "../../scripts/timeUtils";
import RoundBox from "../../components/roundBox/RoundBox";
import VotesCount from "../../components/votesCount/VotesCount";


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
      <h3 style={{ "margin": "20px 0px" }}>Round {i}</h3>
      <div className="row">
        <RoundBox data={round} />
      </div>
    </div>)
  }) : <Skeleton variant="rectangular" height={200} />

  const allUniqueVotes = dispute ? <VotesCount votes_count={countUniqueVotes(dispute.rounds)} /> : <Skeleton variant="rectangular" height={200} />


  return (
    <div className="disputes">
      <div className="row">
        <InfoCard
          loading={loading}
          baseURL='/courts'
          info={
            {
              'title': 'Court',
              'value': courtName ? courtName : "-",
              'id': dispute ? dispute.subcourtID.id : "#"

            }
          }
        />
        <InfoCard
          loading={loading}
          info={
            {
              'title': 'Start Date',
              'value': data ? timestamp2Datetime(dispute.startTime) : null,
            }
          } />
        <InfoCard
          loading={loading}
          info={
            {
              'title': 'Status',
              'value': not_loading_and_data ? dispute.ruled ? "Already Executed" : 'Ongoing' : null,
            }
          } />
        <InfoCard
          loading={loading}
          info={
            {
              'title': 'Current Period',
              'value': not_loading_and_data ? capitalizeFirstLetter(dispute.period) : null,
            }
          } />
        <InfoCard
          loading={loading}
          info={
            {
              'title': not_loading_and_data ? dispute.ruled ? 'End Date' : 'Remaining Time' : <Skeleton />,
              'value': not_loading_and_data ? dispute.ruled ? timestamp2Datetime(dispute.lastPeriodChange) : sec2DayHour(remainingTime(dispute.lastPeriodChange, dispute.period, dispute.subcourtID.timePeriods)) : null,
            }
          } />
        <InfoCard
          loading={loading}
          info={
            {
              'title': 'Winning Choice',
              'value': not_loading_and_data ? dispute.ruled ? VotesMapping[dispute.currentRulling] : "-" : null
            }
          } />
      </div>

      <div className="row">
        <InfoCard
          loading={loading}
          info={
            {
              'title': 'Arbitrable',
              'value': not_loading_and_data ? <Link to={"/arbitrable/" + dispute.arbitrable.id} >{dispute.arbitrable.id}</Link> : "-",
            }
          }
        />
        <InfoCard
          loading={loading}
          info={
            {
              'title': 'Creator',
              'value': not_loading_and_data ? <Link to={"/profile/" + dispute.creator.id} >{dispute.creator.id}</Link> : "-",
            }
          } />
      </div>


      <h3>Unique Votes in all the Rounds</h3>
      <div className="row">
        {allUniqueVotes}
      </div>

      <h2>Rounds info</h2>
      {rounds_boxs}

    </div>

  )

}
