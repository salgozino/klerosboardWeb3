import "./roundbox.css"
import React from 'react'
import { DataGrid } from "@mui/x-data-grid"
import {VotesMapping, countVotes} from "../../scripts/utils"
import { timestamp2Datetime } from "../../scripts/timeUtils"
import VotesCount from "../votesCount/VotesCount"
import { Link } from "react-router-dom"



function parseVotes(votes){
    var newVotes = []
    votes.forEach((vote) => {
        newVotes.push({
            'address': vote.address.id,
            'choice': vote.choice,
            'choiceName': !vote.voted ? 'Pending': VotesMapping[vote.choice],
            'voteID': vote.voteID,
            'voted': vote.voted,
            'timestamp': vote.timestamp,
            'voteDate': vote.timestamp ? timestamp2Datetime(vote.timestamp/1000) : '-',
            'id': vote.voteID
        })
    })
    return newVotes
}

export default function RoundBox({data}) {
    if (data === undefined || data === null) return null
    
    const votes_col = [
        { field: 'voteID', headerName: 'Vote ID', width: 100, type: 'string'},
        { field: 'address', headerName: 'Juror', width: 400, type: 'string', renderCell: (params) => {
            return (<Link to={"/profile/"+params.row.address}>{params.row.address}</Link>)
          }},
        { field: 'choiceName', headerName: 'Vote', width: 150},
        { field: 'voteDate', headerName: 'Casting Date', width: 200}
    ]
    
    const votes = parseVotes(data.votes)
    const votes_count = countVotes(votes)
    return (
        <div className="roundBox">
            <div className="row">
                <VotesCount votes_count={votes_count} />
            </div>
            
            <div className="row" style={{height: "200px"}}>
                <div style={{height: '100%', width: '100%'}}>
                <DataGrid
                    rows={votes}
                    columns={votes_col}
                    pageSize={50}
                    rowsPerPageOptions={[5, 50]}
                    />
                </div>
            </div>
        </div>
    )
}
