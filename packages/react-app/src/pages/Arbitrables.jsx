import { useQuery } from "@apollo/client";
import { useState } from "react";
import { wei2eth } from "../scripts/utils";
import { Link as LinkRouter} from "react-router-dom";
import { Typography, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { ALLARBITRABLES } from "../graphql/arbitrables";


export default function Arbitrables() {
  const [arbitrablesData, setArbitrablesData] = useState(() => []);
 
  const handleArbitrableData = (data) => {
    parseArbitrableData(data.arbitrables);
  }

  async function parseArbitrableData(arbitrableData) {
    if (arbitrableData === undefined) return []
    let newArbitrableData = [];
    // TODO: read arbitrables contract names.
    arbitrableData.forEach((arbitrable) => {
      newArbitrableData.push({
        'id': arbitrable.id,
        'disputesCount': arbitrable.disputesCount,
        'ethFees': wei2eth(arbitrable.ethFees),
        'name': undefined
      })
    })
    setArbitrablesData(newArbitrableData)
  }

  const {error, foo, loading} = useQuery(ALLARBITRABLES, {onCompleted: handleArbitrableData});
  if (error) return <span>Upsss, an error has raised</span>


  const columns = [
    { field: 'id', headerName: 'Arbitrable', flex: 3, renderCell: (params) => {
      return (<Link component={LinkRouter} to={params.value}>{params.value}</Link>)
    }},
    { field: 'name', headerName: 'Name', flex: 1},
    { field: 'disputesCount', headerName: 'Disputes Created', type: 'number', flex: 1},
    { field: 'ethFees', headerName: 'Fees Generated', type: 'number', flex: 1},
  ];

  return (
    <>
    <Typography variant="h4" >Arbitrables Data</Typography>
    <DataGrid autoPageSize pagination style={{height: '90%'}}
      rows = {arbitrablesData}
      columns={columns}
      loading={arbitrablesData.length === 0 || loading}
      initialState={{
        sorting: {
          sortModel: [{ field: 'disputesCount', sort: 'desc' }],
        },
      }}
      />
    </>
  )
}
