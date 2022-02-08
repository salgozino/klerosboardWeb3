import { gql } from "@apollo/client";

export const ALLDISPUTES = gql`
query alldisputes {
  disputes(orderBy: disputeID, orderDirection: desc, first: 100) {
    id
    arbitrable {
      id
    }
    creator {
      id
    }
    subcourtID {
      id,
      policy{policy}
    }
    rounds {
      winningChoice
      startTime
      votes {
        address {
          id
        }
        choice
        voted
      }
    }
    currentRulling
    period
    lastPeriodChange
    TokenAndETHShifts {
      id
      ETHAmount
      tokenAmount
      blockNumber
    }
  }
}
`