import { Grid } from '@mui/material'
import React from 'react'
import { VotesMapping } from '../scripts/utils'
import InfoCard from './infoCard'

export default function VotesCount({votes_count}) {
    const votes_counters_cards = votes_count.map((value, i) => {
        return <Grid item xs={1} md={3} key={i}><InfoCard loading={false} info={{ 'title': VotesMapping[i], 'value': value }} /></Grid>
    })
    return (
        <Grid container spacing={3}>
            {votes_counters_cards}
        </Grid>
    )
}
