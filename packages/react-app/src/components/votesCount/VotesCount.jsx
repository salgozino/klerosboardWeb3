import React from 'react'
import { VotesMapping } from '../../scripts/utils'
import InfoCard from '../infoCard/infoCard'

export default function VotesCount({votes_count}) {
    const votes_counters_cards = votes_count.map((value, i) => {
        return <InfoCard loading={false} info={{ 'title': VotesMapping[i], 'value': value }} />
    })
    return (
        <div className="row">
            {votes_counters_cards}
        </div>
    )
}
