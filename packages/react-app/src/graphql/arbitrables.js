import { gql } from "@apollo/client";

export const ALLARBITRABLES = gql`
    query 
    {arbitrables(orderBy:id, orderDirection:asc, first:1000) {
        id,disputesCount,ethFees
    }}
`

export const ARBITRABLE = gql`
    query arbitrable($arbitrableId: String!){
        arbitrables(where:{id:$arbitrableId}, orderBy:id, orderDirection:asc, first:1000) {
            id,disputesCount,ethFees,
            openDisputes, closedDisputes, evidencePhaseDisputes, commitPhaseDisputes, votingPhaseDisputes,
            appealPhaseDisputes
        }
    }
`

export const ARBITRABLEDISPUTES = gql`
    query arbitrableDisputes($arbitrableId: String!){
        arbitrables(where:{id:$arbitrableId}, orderBy:id, orderDirection:asc, first:1000) {
            disputes{id, subcourtID{id}, ruled, currentRulling, startTime, period, txid}
        }
    }
`