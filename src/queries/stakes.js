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