import { useParams, useSearchParams } from 'react-router-dom';
import InfoCard from "../components/infoCard";
import InfoCardList from "../components/infoCardList";
import { sec2DayHour, timestamp2Datetime } from "../scripts/timeUtils";
import { getChainId, getCourtName, wei2eth } from "../scripts/utils";
import { useQuery } from "@apollo/client";
import { COURTPOLICY, COURT, COURTDISPUTES, JURORSSTAKE } from "../graphql/courts";
import { useEffect, useState } from "react";
import Skeleton from '@mui/material/Skeleton';
import { Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { LinkWithQuery } from '../components/LinkWithQuery';


function courtStakesParser(courtStakes) {
    return courtStakes.map(courtStake => {
        return { 'id': courtStake.juror.id, 'stake': wei2eth(courtStake.stake) }
    });
}

function disputesParser(disputes) {
    return disputes.map(dispute => {
        return (
            {
                'id': dispute.id,
                'status': dispute.period,
                'currentRulling': dispute.currentRulling,
                'lastPeriodChange': timestamp2Datetime(dispute.lastPeriodChange),
                'periodEnds': timestamp2Datetime(dispute.lastPeriodChange)
            }
        )
    });
}

export default function Court() {
    const { id } = useParams();
    const [courtName, setCourtName] = useState(null);
    const [parentCourtName, setParentCourtName] = useState(null);
    const [childCourtName, setChildCourtName] = useState([]);
    const [loadingChildCourtNames, setLoadingChildCourtNames] = useState(true);
    let [searchParams] = useSearchParams();
    let chainId = getChainId(searchParams);
    const rewardCurrency = chainId === 'xdai' ? 'xDAI' : 'ETH'


    const jurors_cols = [
        {
            field: 'id', headerName: 'Juror', width: 400, type: 'string', flex: 2, renderCell: (params) => {
                return <LinkWithQuery to={'/profile/' + params.value} children={params.value} />;
            }
        },
        {
            field: 'stake', headerName: 'Stake', width: 200, type: 'number', flex: 1, renderCell: (params) => {
                const options = {
                    style: 'currency',
                    currency: 'PNK',
                    maximumFractionDigits: 0
                }
                return params.value.toLocaleString(undefined, options);
            },
        }
    ]

    const dispute_cols = [
        {
            field: 'id', headerName: 'Dispute N??', width: 100, type: 'number', flex: 1, renderCell: (params) => {
                return <LinkWithQuery to={'/cases/' + params.value} children={params.value} />;
            }
        },
        { field: 'status', headerName: 'Status', width: 100, flex: 1 },
        { field: 'currentRulling', headerName: 'Current Rulling', width: 120, flex: 1 },
        { field: 'lastPeriodChange', headerName: 'Last Period Change', width: 180, flex: 2 },
        { field: 'periodEnds', headerName: 'Period Ends', width: 180, flex: 2 }
    ]

    const { error: error_court, data: data_court, loading: loading_court } = useQuery(COURT, { variables: { courtId: id } });
    const { error: error_jurors, data: data_jurors, loading: loading_jurors } = useQuery(JURORSSTAKE, { variables: { courtId: id } });
    const { error: error_disputes, data: data_disputes, loading: loading_disputes } = useQuery(COURTDISPUTES, { variables: { courtId: id } });
    const { loading: loading_policy, data: court_policy, error: error_policy } = useQuery(COURTPOLICY, { variables: { courtId: id } });

    if (error_court) { console.log(error_court) };
    if (error_jurors) { console.log(error_jurors) };
    if (error_disputes) { console.log(error_disputes) };
    if (error_policy) { console.log(error_policy) };


    useEffect(() => {
        async function getName(court_policy) {
            const cn = await getCourtName(court_policy.courts[0].policy.policy);
            if (cn) {
                setCourtName(cn);
            }
        };
        if (!loading_policy && court_policy.courts.length !== 0) {
            getName(court_policy)
        };
    }, [court_policy, loading_policy]
    )

    useEffect(() => {
        async function getParentName(policy) {
            const cn = await getCourtName(policy);
            if (cn) {
                setParentCourtName(cn);
            }
        };
        if (!loading_court && data_court) {
            if (data_court.courts.length !== 0) {
                if (data_court.courts[0].parent !== null) {
                    const parent = data_court.courts[0].parent;
                    if (parent.policy !== null) {
                        getParentName(parent.policy.policy);
                    }
                }
            }
        };
    }, [loading_court, data_court]
    )

    useEffect(() => {
        async function fetchCourtName(policy) {
            const cn = await getCourtName(policy);
            return cn
        };

        async function fetchData(data_court) {
            if (data_court) {
                if (data_court.courts.length !== 0) {
                    if (data_court.courts[0].childs.length > 0) {
                        let child_names_promises = []
                        let current_name = ""
                        data_court.courts[0].childs.forEach((child) => {
                            if (child.policy !== null) {
                                current_name = fetchCourtName(child.policy.policy)
                                child_names_promises.push(current_name)
                            }
                        });
                        await Promise.all(child_names_promises).then(values => {
                            setChildCourtName(values);
                            setLoadingChildCourtNames(false);
                        }
                        )
                    } else {
                        // no child
                        setLoadingChildCourtNames(false);
                    }
                }
            };
        }
        setLoadingChildCourtNames(true);
        fetchData(data_court);
    }, [data_court, loading_court]
    );

    const columnSpacing = 2;
    const rowSpacing = 1;

    if (!loading_court && data_court) {
        if (data_court.courts.length === 0) {
            console.log("The court " + id + " doesn't exist")
            return (
                <Typography variant='h5'>Error. This court doesn't exist</Typography>
            )
        }
    }
    return (
        <>

            <Typography variant='h4' sx={{ marginBottom: '15px', width: '80%' }}>
                Court {id}: {courtName ? courtName : <Skeleton variant='text' animation='wave' width='50%' />}
            </Typography>

            {/* First Line */}
            <Grid container columnSpacing={columnSpacing} rowSpacing={rowSpacing}>
                <Grid item xs={12} md={3} zeroMinWidth>
                    <InfoCard
                        loading={loading_court && parentCourtName === null}
                        baseURL={data_court ? data_court.courts[0].parent ? "/courts" : null : null}
                        info={
                            {
                                'id': data_court ? data_court.courts[0].parent ? data_court.courts[0].parent.id : '#' : null,
                                'title': 'Parent Court',
                                'value': parentCourtName ? parentCourtName : "-"
                            }
                        } />
                </Grid>
                <Grid item xs={12} md={3} zeroMinWidth>
                    <InfoCardList
                        loading={loadingChildCourtNames && data_court !== null}
                        baseURL={childCourtName ? childCourtName.length > 0 ? "/courts" : null : null}
                        indexLink={true}
                        info={
                            {
                                'title': 'Children Courts',
                                'values': childCourtName.length > 0 ? childCourtName : [null],
                                'links': data_court? data_court.courts[0].childs.length > 0 ? data_court.courts[0].childs.map((child) => {return child.id}): [null] : [null]
                            }
                        } />
                </Grid>
                <Grid item xs={12} md={3} zeroMinWidth>
                    <InfoCardList
                        loading={loading_court}
                        info={
                            {
                                'title': 'Times per Period',
                                'values': loading_court ? null : data_court.courts[0].timePeriods.map(sec2DayHour)
                            }
                        } />
                </Grid>
                <Grid item xs={12} md={3} zeroMinWidth>
                    <InfoCard loading={loading_court} info={{ 'title': 'Jurors for Court Jump', 'value': loading_court ? null : data_court.courts[0].jurorsForCourtJump }} />
                </Grid>

                {/* Second Line */}
                <Grid item xs={12} md={4} zeroMinWidth>
                    <InfoCard loading={loading_court} info={{ 'title': 'Total Disputes', 'value': loading_court ? null : data_court.courts[0].disputesNum }} />
                </Grid>
                <Grid item xs={12} md={4} zeroMinWidth>
                    <InfoCard loading={loading_court} info={{ 'title': 'Ongoing Disputes', 'value': loading_court ? null : data_court.courts[0].disputesOngoing }} />
                </Grid>
                <Grid item xs={12} md={4} zeroMinWidth>
                    <InfoCard loading={loading_court} info={{ 'title': 'Ruled Disputes', 'value': loading_court ? null : data_court.courts[0].disputesClosed }} />
                </Grid>

                {/* Third Line */}
                <Grid item xs={12} md={4} zeroMinWidth>
                    <InfoCard loading={loading_court} info={{ 'title': 'Min Stake', 'value': loading_court ? null : wei2eth(data_court.courts[0].minStake).toFixed(0) + ' PNK' }} />
                </Grid>
                <Grid item xs={12} md={4} zeroMinWidth>
                    <InfoCard loading={loading_court} info={{ 'title': 'Vote Stake', 'value': loading_court ? null : (wei2eth(data_court.courts[0].minStake) * Number(data_court.courts[0].alpha) / 10000).toFixed(0) + ' PNK' }} />
                </Grid>
                <Grid item xs={12} md={4} zeroMinWidth>
                    <InfoCard loading={loading_court} info={{ 'title': 'Vote Reward', 'value': loading_court ? null : wei2eth(data_court.courts[0].feeForJuror).toFixed(2) + ' ' + rewardCurrency }} />
                </Grid>

                {/* Fourth Line */}
                <Grid item xs={12} md={3} zeroMinWidth>
                    <InfoCard loading={loading_court} info={{ 'title': 'Jurors staked directly in this court', 'value': 'soon' }} />
                </Grid>
                <Grid item xs={12} md={3} zeroMinWidth>
                    <InfoCard loading={loading_court} info={{ 'title': 'Total jurors elegibles', 'value': loading_court ? null : data_court.courts[0].activeJurors }} />
                </Grid>
                <Grid item xs={12} md={3} zeroMinWidth>
                    <InfoCard loading={loading_court} info={{ 'title': 'Token Staked directly in this court', 'value': 'soon' }} />
                </Grid>
                <Grid item xs={12} md={3} zeroMinWidth>
                    <InfoCard loading={loading_court} info={{ 'title': 'Total tokens in this court', 'value': loading_court ? null : wei2eth(data_court.courts[0].tokenStaked).toFixed(0) }} />
                </Grid>

            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12} md={5} zeroMinWidth>
                    <Typography variant='h5'>Jurors</Typography>
                    <DataGrid pagination
                        columns={jurors_cols}
                        rows={loading_jurors ? [] : courtStakesParser(data_jurors.courtStakes)}
                        loading={loading_jurors}
                        defaultSort={{ field: 'stake', sort: 'desc' }}
                        sx={{
                            justifyContent: 'space-between',
                            marginBottom: '10px',
                            height: '300px'
                        }}
                    />
                </Grid>

                <Grid item xs={12} md={7} zeroMinWidth>
                    <Typography variant='h5'>Disputes</Typography>
                    <DataGrid pagination
                        columns={dispute_cols}
                        rows={loading_disputes ? [] : disputesParser(data_disputes.disputes)}
                        loading={loading_disputes}
                        defaultSort={{ field: 'id', sort: 'desc' }}
                        sx={{
                            justifyContent: 'space-between',
                            marginBottom: '10px',
                            height: '300px'
                        }}
                    />
                </Grid>
            </Grid>
        </>
    )
}
