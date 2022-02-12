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

export const DISPUTE = gql`
query dispute($disputeID: String!) {
  disputes(where:{id:$disputeID}) {
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
      timePeriods
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
        voteID
        timestamp
      }
    }
    currentRulling
    period
    lastPeriodChange
    startTime
    ruled
  }
}
`

export const LASTDISPUTES = gql`
query lastDisputes {
  disputes(orderBy:disputeID, orderDirection:desc, first:10) {
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
      timePeriods
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
        voteID
        timestamp
      }
    }
    currentRulling
    period
    lastPeriodChange
    startTime
    ruled
    jurorsInvolved {id}
  }
}
`