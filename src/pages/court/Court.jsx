import "./court.css"
import { useParams } from 'react-router-dom';
import InfoCard from "../../components/infoCard/infoCard";
import InfoCardList from "../../components/infoCardList/infoCardList";
import Table from "../../components/table/Table";
import ConvertSectoDayHour from "../../scripts/secondsToDate";
import {wei2eth} from "../../scripts/utils";
import { gql, useQuery } from "@apollo/client";
import LinearProgress from '@mui/material/LinearProgress';



const COURT = gql`
    query court($courtId: String!) {
        courts(where: {id: $courtId}) {
            id
            subcourtID
            parent {
            id
            }
            childs {
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
            jurorsForCourtJump
            timePeriods
            policy {
            policy
            }
        }
    }   
`
const JURORS = gql`
    query courtJurors($courtId: String!) {
        courtStakes(where:{court:$courtId, stake_gt:0}, first:1000) {
            stake
            juror {id}
        }
    }
`

const DISPUTES = gql`
    query disputes($courtId: String!) {
        disputes(orderBy: disputeID, orderDirection: desc, where:{subcourtID:$courtId}) {
        id
        arbitrable {
        id
        }
        currentRulling
        period
        startTime
        lastPeriodChange
        ruled
    }
    }
`

function courtStakesParser(courtStakes) {
    return courtStakes.map(courtStake => {
        return {'id':courtStake.juror.id, 'stake': wei2eth(courtStake.stake)}
    });
}

function disputesParser(disputes) {
    return disputes.map(dispute => {
        return (
            {'id':dispute.id,
             'status': dispute.period,
             'currentRulling': dispute.currentRulling,
             'lastPeriodChange': dispute.lastPeriodChange,
            'periodEnds': dispute.lastPeriodChange
            }
        )
    });
}

export default function Court() {
    const { courtId } = useParams();

    const jurors_cols = [
        { field: 'id', headerName: 'Juror', width: 70, type: 'string'},
        { field: 'stake', headerName: 'Stake', width: 200, renderCell: (stake) => {
          return (wei2eth(stake))
        }}
    ]

    const dispute_cols = [
        { field: 'id', headerName: 'Dispute N°', width: 70, type: 'string'},
        { field: 'status', headerName: 'Status', width: 200},
        { field: 'currentRulling', headerName: 'Current Rulling', width: 200},
        { field: 'lastPeriodChange', headerName: 'Last Period Change', width: 200},
        { field: 'periodEnds', headerName: 'Period Ends', width: 200}
    ]

    const {error: error_court, data: data_court, loading: loading_court} = useQuery(COURT, {variables: {courtId: courtId}});
    const {error: error_jurors, data: data_jurors, loading: loading_jurors} = useQuery(JURORS, {variables: {courtId: courtId}});
    const {error: error_disputes, data: data_disputes, loading: loading_disputes} = useQuery(DISPUTES, {variables: {courtId: courtId}});
    
    if (error_court) {console.log(error_court)};
    if (error_jurors) {console.log(error_jurors)};
    if (error_disputes) {console.log(error_disputes)};

    return (
        <div className="court">
            <div className="courtTitleContainer">
                <h1 className="courtTitle">Court {courtId}</h1>
            </div>
            {loading_court? <LinearProgress />:
            <div>
                <div className="row">
                    <InfoCard info={{'title': 'Parent Court','value': data_court.courts[0].parent? <a href={"/courts/"+data_court.courts[0].parent.id}>{data_court.courts[0].parent.id}</a>: "-"}} />
                    <InfoCardList info={{'title':'Children Courts', 'values':data_court.courts[0].childs.map((child) => {return child.id;})}}/>
                    <InfoCardList info={{'title':'Times per Period', 'values':data_court.courts[0].timePeriods.map(ConvertSectoDayHour)}}/>
                    <InfoCard info={{'title': 'Jurors for Court Jump','value': data_court.courts[0].jurorsForCourtJump}} />
                </div>
                <div className="row">
                
                <InfoCard info={{'title': 'Total Disputes','value': data_court.courts[0].disputesNum}} />
                <InfoCard info={{'title': 'Ongoing Disputes','value': data_court.courts[0].disputesOngoing}} />
                <InfoCard info={{'title': 'Ruled Disputes','value': data_court.courts[0].disputesClosed}} />
                </div>
                <div className="row">
                <InfoCard info={{'title': 'Min Stake','value': wei2eth(data_court.courts[0].minStake).toFixed(0) + ' PNK'}} />
                <InfoCard info={{'title': 'Vote Stake','value': (wei2eth(data_court.courts[0].minStake) * Number(data_court.courts[0].alpha) / 10000).toFixed(0) + ' PNK'}} />
                <InfoCard info={{'title': 'Vote Reward','value': wei2eth(data_court.courts[0].feeForJuror).toFixed(2) + ' ETH'}} />
                </div>
                <div className="row">
                <InfoCard info={{'title': 'Active Jurors of this court','value': data_court.courts[0].activeJurors}} />
                <InfoCard info={{'title': 'Active Jurors with subcourts','value': data_court.courts[0].activeJurors}} />
                <InfoCard info={{'title': 'Token Staked in this court','value': wei2eth(data_court.courts[0].tokenStaked).toFixed(0)}} />
                <InfoCard info={{'title': 'Token Staked with subcourts','value': wei2eth(data_court.courts[0].tokenStaked).toFixed(0)}} />
                </div>
            </div>
            }
        
            <h2>Jurors</h2>
            <div className="row">
            {loading_jurors?
                <LinearProgress />:
                <Table columns={jurors_cols} rows={loading_jurors ? null : courtStakesParser(data_jurors.courtStakes)} loading={loading_jurors} />
            }
            </div>
        
            <h2>Disputes</h2>
            <div className="row">
            {loading_disputes?
                <LinearProgress />:
                <Table columns={dispute_cols} rows={loading_disputes ? null : disputesParser(data_disputes.disputes)} loading={loading_disputes} />
            }
            </div>
        </div>
    )
}
