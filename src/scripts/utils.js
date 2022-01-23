
export async function getCourtName(policy) {
    if (policy == null) return 'Unknown';
    const url = "https://ipfs.kleros.io" + policy
    const res = fetch(url)
    let name = null
    res.then(async (res) => {
        let data = await res.json()
        if (res.status === 200){
            // console.log(data.name);
            name = data.name;
        } else {
            name = 'Error getting the Name'
        }
    })
    return name;
}

export function getCourtsNames(courts) {
    if (courts == null | courts === undefined) return null;
    console.log(courts)
    var newCourts = []
    courts.forEach((court) => {
        const newCourt = {...court}
        var courtName = getCourtName(court.policy.policy);
        newCourt.courtName = courtName
        newCourts.push(newCourt);
    })
    return newCourts
    
}   
 