import { gql } from "@apollo/client";

export const ALLCOURTS = gql`
    query 
    {
        courts(orderBy:id, orderDirection:asc) {
            id
            parent {
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
            policy {
            policy
            }
        }
    }
`

export const COURTPOLICY = gql`
    query courtPolicy($courtId: String!) {
        courts(where:{id: $courtId}) {
            policy {
            policy
            }
        }
    }
`

export const ALLCOURTSPOLICY = gql`
    query allCourtsPolicy {
        courts(orderBy: id, orderDirection: asc) {
            id
            policy {
            policy
            }
        }
    }
`
export const COURT = gql`
    query court($courtId: String!) {
        courts(where: {id: $courtId}) {
            id
            subcourtID
            parent {
            id
            policy{policy}
            }
            childs {
                id
                policy{policy}
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

export const COURTDISPUTES = gql`
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

export const JURORSSTAKE = gql`
query courtJurors($courtId: String!) {
    courtStakes(where:{court:$courtId, stake_gt:0}, first:1000) {
        stake
        juror {id}
    }
}
`