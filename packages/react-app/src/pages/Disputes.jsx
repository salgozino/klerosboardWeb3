import { useQuery } from "@apollo/client";
import { ALLDISPUTES } from "../graphql/disputes"
import { useState } from "react";
import { LinkWithQuery as LinkRouter } from "../components/LinkWithQuery";
import { timestamp2Datetime } from "../scripts/timeUtils";
import { getCourtName } from "../scripts/utils";
import { Typography, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

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
        'currentRulling': dispute.currentRulling ? dispute.currentRulling : 'No Votes',
        'period': dispute.period,
        'lastPeriodChange': timestamp2Datetime(dispute.lastPeriodChange),
        'courtName': courtNames[i]
        }
      );
    });
    setDisputesData(newDisputesData)
  }

  const {error, loading} = useQuery(ALLDISPUTES, {onCompleted: handleDisputesData});
 
 
  
  if (error) return <span>Upsss, an error has raised</span>


  const columns = [
    { field: 'id', headerName: 'ID', width: 70, type: 'number', flex:1, renderCell: (params) => {
      return (<Link component={LinkRouter} to={params.row.id} children={params.row.id} />)
    }},
    { field: 'courtName', headerName: 'Court', width: 150, flex:2, renderCell: (params) => {
      return (<Link component={LinkRouter} to={"/courts/"+params.row.subcourtID} children={params.row.courtName} />)
    }},
    { field: 'currentRulling', headerName: 'Current Rulling', width: 150, flex:1, type: 'number'},
    { field: 'period', headerName: 'Period', width: 150},
    { field: 'lastPeriodChange', headerName: 'Last Period change', width: 200, flex:2}
  ];
  return (
    <>
    <Typography variant="h4" >Disputes Data</Typography>
    <DataGrid autoPageSize pagination sx={{height:'90%', width:'100%'}}
      rows = {disputesData}
      columns={columns}
      loading={loading && disputesData.length === 0}
      initialState={{
        sorting: {
          sortModel: [{ field: 'id', sort: 'desc' }],
        },
      }}
      />
  </>
  )
    
}
