import React from 'react'
import { DataGrid } from "@mui/x-data-grid"
import {VotesMapping, countVotes} from "../scripts/utils"
import { timestamp2Datetime } from "../scripts/timeUtils"
import VotesCount from './VotesCount'
import { Link as LinkRouter} from "react-router-dom"
import { Grid, Link } from "@mui/material"



function parseVotes(votes){
    var newVotes = []
    votes.forEach((vote) => {
        newVotes.push({
            'address': vote.address.id,
            'choice': vote.choice,
            'choiceName': !vote.voted ? 'Pending': VotesMapping[vote.choice],
            'id': vote.voteID,
            'voted': vote.voted,
            'timestamp': vote.timestamp,
            'voteDate': vote.timestamp ? timestamp2Datetime(vote.timestamp/1000) : '-',
        })
    })
    return newVotes
}

export default function RoundBox({data}) {
    if (data === undefined || data === null) return null
    
    const votes_col = [
        { field: 'id', headerName: 'Vote ID', width: 100, type: 'string', flex:1},
        { field: 'address', headerName: 'Juror', width: 400, type: 'string', flex:2, renderCell: (params) => {
            return (<Link component={LinkRouter} to={"/profile/"+params.row.address}>{params.row.address}</Link>)
          }},
        { field: 'choiceName', headerName: 'Vote', width: 150, flex:1},
        { field: 'voteDate', headerName: 'Casting Date', width: 200, flex:1}
    ]
    
    const votes = parseVotes(data.votes)
    const votes_count = countVotes(votes)
    return (
        <Grid container>
            <Grid item xs={1} md={12}>
                <VotesCount votes_count={votes_count} />
            </Grid>
            <Grid item xs={1} md={12} sx={{height: '300px', marginTop: '20px'}}>
                <DataGrid
                    sx={{height: '100%', width: '100%'}}
                    rows={votes}
                    columns={votes_col}
                    pageSize={50}
                    rowsPerPageOptions={[5, 50]}
                    />
            </Grid>
        </Grid>
    )
}
