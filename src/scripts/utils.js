export const PeriodIndex = {
    evidence : 0,
    cast : 1,
    vote : 2,
    appeal: 3,
    execution: 4
  }

export const VotesMapping = {
    0 : 'Refuse to arbitrate',
    1 : 'No',
    2 : 'Yes',
    3 : 'Pending'
  }

export const VoteChoiceMapping = {
    'Refuse to arbitrate': 0,
    'No': 1,
    'Yes': 2,
    'Pending': 3
  }

export async function getCourtName(policy){
    if (policy == null) return 'Unknown';
    const url = "https://ipfs.kleros.io" + policy
    const response = await fetch(url);
    const courtName = await response.json();
    return courtName.name;
}

export async function getCourtsNames(courts) {
    if (courts == null | courts === undefined) return null;
    var courtNamesPromises = []
    courts.forEach((court) => {
        const courtName = getCourtName(court.policy.policy);
        courtNamesPromises.push(courtName);
    })
    const courtNames = await Promise.all(courtNamesPromises)
    return courtNames

}   
 

export function wei2eth(wei) {
    wei = Number(wei);
    // console.log(wei);
    return wei * 10**(-18);
}

export function capitalizeFirstLetter(string) {
    if (string === null | undefined){
        return ""
    }
    return string[0].toUpperCase() + string.slice(1);
}

export function period2index(period){
    if (period > Object.keys(PeriodIndex).length) {
        return PeriodIndex[PeriodIndex.length()]
    }
    return PeriodIndex[period]
}

export function countUniqueVotes(rounds) {
    const count = new Array(Object.keys(VoteChoiceMapping).length).fill(0);
    var jurors_voted = []
    rounds.forEach((round) => {
        round.votes.forEach((vote) => {
            if (jurors_voted.includes(vote.address.id)){
                // don't count it
            } else {
            const choice = vote.voted ? vote.choice : 3
            count[choice] += 1
            jurors_voted.push(vote.address.id)
            }
        })
    })
    return count
}

export function countVotes(votes) {
    if (votes === undefined || votes === null) return null
    const count = new Array(Object.keys(VoteChoiceMapping).length).fill(0);
    votes.forEach((vote) => {
        const choice = vote.voted ? vote.choice : 3
        count[choice] += 1
    })
    return count
}