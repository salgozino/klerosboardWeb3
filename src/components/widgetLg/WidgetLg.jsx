import { useQuery } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LASTDISPUTES } from "../../queries/disputes";
import { timestamp2Datetime } from "../../scripts/timeUtils";
import { getCourtName } from "../../scripts/utils";
import "./widgetlg.css"




export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };


  function createTableRow(dispute) {
    return (
      <tr className="widgetLgTr">
        <td className="widgetLgCourt">
          <Link to={"/cases/" + dispute.id}> {dispute.id} </Link>
        </td>
        <td className="widgetLgOpendisputes">
          <span className="widgetLgCourtName">{dispute.courtName}</span>
        </td>
        <td className="widgetLgTotaldisputes">
          {dispute.jurorsInvolved}
        </td>
        <td className="widgetLgStatus">
          <Button type={dispute.period} />
        </td>
      </tr>
    )
  }

  const [disputesTableRows, setdisputesTableRows] = useState(() => []);


  const handleDisputesData = (data) => {
    parseDisputeData(data.disputes);
  }


  async function parseDisputeData(disputesData) {
    if (disputesData === undefined) return []
    let newDisputesData = [];
    let promises = [];
    disputesData.forEach((dispute) => {
      promises.push(dispute.subcourtID.policy ? getCourtName(dispute.subcourtID.policy.policy) : dispute.subcourtID.id);
    });
    const courtNames = await Promise.all(promises).then((values) => {
      return values;
    })
    disputesData.forEach((dispute, i) => {
      newDisputesData.push(
        {
          'id': dispute.id,
          'subcourtID': dispute.subcourtID.id,
          'courtName': courtNames[i],
          'jurorsInvolved': Object.keys(dispute.jurorsInvolved).length,
          'period': dispute.period
        }
      );
    });

    const tableRows = []
    newDisputesData.forEach((dispute) => { 
      const tableRow = createTableRow(dispute)
      tableRows.push(tableRow);
    })
    setdisputesTableRows(tableRows)
  }

  const { error, foo, loading } = useQuery(LASTDISPUTES, { onCompleted: handleDisputesData });



  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latests Disputes</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Dispute ID</th>
          <th className="widgetLgTh">Court</th>
          <th className="widgetLgTh"># Jurors</th>
          <th className="widgetLgTh">Status</th>
        </tr>



        {disputesTableRows}
      </table>
    </div>
  )
}
