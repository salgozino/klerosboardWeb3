import "./court.css"
import { useParams } from 'react-router-dom';
import InfoCard from "../../components/infoCard/infoCard";
import InfoCardList from "../../components/infoCardList/infoCardList";
import Table from "../../components/table/Table";
import {sec2DayHour, timestamp2Datetime} from "../../scripts/timeUtils";
import {wei2eth} from "../../scripts/utils";
import { gql, useQuery } from "@apollo/client";




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
             'lastPeriodChange': timestamp2Datetime(dispute.lastPeriodChange),
             'periodEnds': timestamp2Datetime(dispute.lastPeriodChange)
            }
        )
    });
}

export default function Court() {
    const { courtId } = useParams();

    const jurors_cols = [
        { field: 'id', headerName: 'Juror', width: 400, type: 'string'},
        { field: 'stake', headerName: 'Stake', width: 200, renderCell: (params) => {
            const options = {
                style: 'currency',
                currency: 'PNK',
                maximumFractionDigits: 0
            }
            return params.value.toLocaleString(undefined, options);
        },}
    ]

    const dispute_cols = [
        { field: 'id', headerName: 'Dispute N°', width: 100, type: 'string'},
        { field: 'status', headerName: 'Status', width: 100},
        { field: 'currentRulling', headerName: 'Current Rulling', width: 120},
        { field: 'lastPeriodChange', headerName: 'Last Period Change', width: 180},
        { field: 'periodEnds', headerName: 'Period Ends', width: 180}
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
            <div>
                <div className="row">
                    <InfoCard loading={loading_court} info={{'title': 'Parent Court','value': loading_court?null:data_court.courts[0].parent? <a href={"/courts/"+data_court.courts[0].parent.id}>{data_court.courts[0].parent.id}</a>: "-"}} />
                    <InfoCardList loading={loading_court} info={{'title':'Children Courts', 'values':loading_court?null:data_court.courts[0].childs.map((child) => {return child.id;})}}/>
                    <InfoCardList loading={loading_court} info={{'title':'Times per Period', 'values':loading_court?null:data_court.courts[0].timePeriods.map(sec2DayHour)}}/>
                    <InfoCard loading={loading_court} info={{'title': 'Jurors for Court Jump','value': loading_court?null:data_court.courts[0].jurorsForCourtJump}} />
                </div>
                <div className="row">
                
                <InfoCard loading={loading_court} info={{'title': 'Total Disputes','value': loading_court?null:data_court.courts[0].disputesNum}} />
                <InfoCard loading={loading_court} info={{'title': 'Ongoing Disputes','value': loading_court?null:data_court.courts[0].disputesOngoing}} />
                <InfoCard loading={loading_court} info={{'title': 'Ruled Disputes','value': loading_court?null:data_court.courts[0].disputesClosed}} />
                </div>
                <div className="row">
                <InfoCard loading={loading_court} info={{'title': 'Min Stake','value': loading_court?null:wei2eth(data_court.courts[0].minStake).toFixed(0) + ' PNK'}} />
                <InfoCard loading={loading_court} info={{'title': 'Vote Stake','value': loading_court?null:(wei2eth(data_court.courts[0].minStake) * Number(data_court.courts[0].alpha) / 10000).toFixed(0) + ' PNK'}} />
                <InfoCard loading={loading_court} info={{'title': 'Vote Reward','value': loading_court?null:wei2eth(data_court.courts[0].feeForJuror).toFixed(2) + ' ETH'}} />
                </div>
                <div className="row">
                <InfoCard loading={loading_court} info={{'title': 'Active Jurors of this court','value': loading_court?null:data_court.courts[0].activeJurors}} />
                <InfoCard loading={loading_court} info={{'title': 'Active Jurors with subcourts','value': loading_court?null:data_court.courts[0].activeJurors}} />
                <InfoCard loading={loading_court} info={{'title': 'Token Staked in this court','value': loading_court?null:wei2eth(data_court.courts[0].tokenStaked).toFixed(0)}} />
                <InfoCard loading={loading_court} info={{'title': 'Token Staked with subcourts','value': loading_court?null:wei2eth(data_court.courts[0].tokenStaked).toFixed(0)}} />
                </div>
            </div>

            <div className="row">
                <div className="column">
                    <h2>Jurors</h2>
                    <div className="rowTable">
                        <Table columns={jurors_cols} rows={loading_jurors ? [] : courtStakesParser(data_jurors.courtStakes)} loading={loading_jurors} defaultSort={{ field: 'stake', sort: 'desc' }}/>
                    </div>
                </div>
                
                <div className="column">
                    <h2>Disputes</h2>
                    <div className="rowTable">
                        <Table columns={dispute_cols} rows={loading_disputes ? [] : disputesParser(data_disputes.disputes)} loading={loading_disputes} defaultSort={{ field: 'id', sort: 'desc' }}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
