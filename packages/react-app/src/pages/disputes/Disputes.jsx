import "./disputes.css"
import { useQuery } from "@apollo/client";
import { ALLDISPUTES } from "../../queries/disputes"
import { useState } from "react";
import Table from "../../components/table/Table"
import { Link } from "react-router-dom";
import { timestamp2Datetime } from "../../scripts/timeUtils";
import { getCourtName } from "../../scripts/utils";


export default function Disputes() {
  const [disputesData, setDisputesData] = useState(() => []);

  const handleDisputesData = (data) => {
    parseDisputeData(data.disputes);
  }


  async function parseDisputeData(disputesData) {
    if (disputesData === undefined) return []
    let newDisputesData = [];
    let promises = [];
    disputesData.forEach((dispute) => {
        promises.push(dispute.subcourtID.policy? getCourtName(dispute.subcourtID.policy.policy) :  dispute.subcourtID.id);
    });
    const courtNames = await Promise.all(promises).then((values) => {
      return values;
    })
    disputesData.forEach((dispute, i) => {
      newDisputesData.push(
        {
        'id': dispute.id,
        'subcourtID': dispute.subcourtID.id,
        'currentRulling': dispute.currentRulling,
        'period': dispute.period,
        'lastPeriodChange': timestamp2Datetime(dispute.lastPeriodChange),
        'courtName': courtNames[i]
        }
      );
    });
    setDisputesData(newDisputesData)
  }

  const {error, foo, loading} = useQuery(ALLDISPUTES, {onCompleted: handleDisputesData});
 
 
  
  if (error) return <span>Upsss, an error has raised</span>


  const columns = [
    { field: 'id', headerName: 'ID', width: 70, type: 'number', renderCell: (params) => {
      return (<Link to={"/cases/"+params.row.id}>{params.row.id}</Link>)
    }},
    { field: 'courtName', headerName: 'Court', width: 150, renderCell: (params) => {
      return (<Link to={"/courts/"+params.row.subcourtID}>{params.row.courtName}</Link>)
    }},
    { field: 'currentRulling', headerName: 'Current Rulling', width: 150, type: 'number'},
    { field: 'period', headerName: 'Period', width: 150},
    { field: 'lastPeriodChange', headerName: 'Last Period change', width: 200}
  ];
  return (
  
  <div className="disputes">
      <Table 
        rows = {disputesData}
        columns={columns}
        loading={loading || disputesData === undefined}
        defaultSort={{ field: 'id', sort: 'desc' }}
        />
    </div>
  
  )
    
}
