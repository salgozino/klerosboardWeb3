
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