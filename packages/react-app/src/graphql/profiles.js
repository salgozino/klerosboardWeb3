import { gql } from "@apollo/client";

export const PROFILE = gql`
    query juror($profileid: String!) {
        jurors(where:{id: $profileid}) {
            id,
            currentStakes{court{id},stake,timestamp,txid, juror{id}},
            totalStaked,
            numberOfDisputesAsJuror,
            numberOfDisputesCreated,
            disputesAsCreator{id,currentRulling,startTime,ruled,txid,
            numberOfChoices}
            allStakes{subcourtID, stake, newTotalStake, timestamp}
            ethRewards, tokenRewards
            }
    }`

export const PROFILEVOTES = gql`
    query votes($profileid: String!) {
        votes(where:{address:$profileid},first:1000){
                dispute{id,currentRulling,ruled,startTime,numberOfChoices},
                choice,voted,round{id}
    }
    }`