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