import "./court.css"
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo"
import { useParams } from 'react-router-dom'
// import { gql, useQuery } from "@apollo/client"
// import { useEffect, useState } from "react"


// const COURT = gql`
//     query court(courtId: String!{
//         courts(where: {id: $courtId}) {
//             id
//             subcourtID
//             parent {
//             id
//             }
//             activeJurors
//             disputesNum
//             disputesClosed
//             disputesOngoing
//             feeForJuror
//             minStake
//             alpha
//             tokenStaked
//             policy {
//             policy
//             }
//         }
//     }

// `

export default function Court() {
    const { courtId } = useParams();
    return (
        <div className="court">
            <div className="courtTitleContainer">
                <h1 className="courtTitle">Court {courtId}</h1>
            </div>

            <FeaturedInfo />

        </div>
    )
}
