import { gql } from "@apollo/client";

export const LASTSTAKES = gql`
query lastStakes {
  stakeSets(orderBy:timestamp, orderDirection:desc, first:10){
  	id
    address{id}
    subcourtID
    stake
	}
}
`
export const ALLSTAKES = gql`
query allStakes {
  stakeSets(orderBy:timestamp, orderDirection:desc){
    address{id}
    subcourtID,
    stake,
    newTotalStake,
    timestamp,
    gasCost
	}
}
`
