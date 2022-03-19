import { gql } from "@apollo/client";

export const KLEROSCOUNTERS = gql`
query klerosCounters {
    klerosCounters{
        disputesCount
        openDisputes
        closedDisputes
        appealPhaseDisputes
        votingPhaseDisputes
        evidencePhaseDisputes
        courtsCount
        numberOfArbitrables
        activeJurors
        inactiveJurors
        drawnJurors
        tokenStaked
        totalTokenRedistributed
        totalETHFees
        totalUSDthroughContract
    }
}
`