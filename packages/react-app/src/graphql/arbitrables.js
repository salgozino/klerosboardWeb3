import { gql } from "@apollo/client";

export const ALLARBITRABLES = gql`
    query 
    {arbitrables(orderBy:id, orderDirection:asc, first:1000) {
        id,disputesCount,ethFees
    }}
`