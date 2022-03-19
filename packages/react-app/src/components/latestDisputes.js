import { useQuery } from "@apollo/client";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Grid, Paper, Chip, Link } from "@mui/material";
import { useState } from "react";
import { LinkWithQuery as LinkRouter } from "./LinkWithQuery";
import { LASTDISPUTES } from "../graphql/disputes";
import { getCourtName } from "../scripts/utils";



export default function LatestDisputes() {
  const buttonColors = {'evidence':'#75a832', 'vote':'#fffc5e', 'appeal':'#fa9420', 'excecution':'#6b75ff'}

  function createTableRow(dispute, id) {
    return (
      <TableRow key={id}>
        <TableCell><Link component={LinkRouter} to={"/cases/" + dispute.id} children={dispute.id} /></TableCell>
        <TableCell><Typography>{dispute.courtName}</Typography></TableCell>
        <TableCell><Typography>{dispute.jurorsInvolved}</Typography></TableCell>
        <TableCell><Chip variant="outlined" label={dispute.period} style={{backgroundColor:buttonColors[dispute.period]}}  /></TableCell>
      </TableRow>
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
    newDisputesData.forEach((dispute, id) => {
      const tableRow = createTableRow(dispute, id)
      tableRows.push(tableRow);
    })
    setdisputesTableRows(tableRows)
  }

  const { error } = useQuery(LASTDISPUTES, { onCompleted: handleDisputesData });

  if (error) {console.log(error)};

  return (
    <Grid item xs={12} md={6}>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div" align="center">
          Latests Disputes
        </Typography>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Dispute ID</TableCell>
              <TableCell>Court</TableCell>
              <TableCell># Jurors</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {disputesTableRows}
          </TableBody>
        </Table>
      </Paper>
    </Grid >

  )
}
