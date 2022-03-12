import { useQuery } from "@apollo/client";
import { wei2eth } from "../scripts/utils";
import { Person } from '@mui/icons-material/';
import { useState } from "react";
import { Link as LinkRouter } from "react-router-dom";
import { LASTSTAKES } from "../graphql/stakes";
import { Grid, List, ListItem, ListItemAvatar, ListItemText, Skeleton, Avatar, Chip, Typography, Paper, Link } from "@mui/material";

export default function LatestStakes() {


  function createStakeItem(stake, i) {
    return (
      <ListItem key={i} secondaryAction={
        <Chip label={stake.stake.toFixed(0) + ' PNK'} />
      }>
        <ListItemAvatar>
          <Avatar>
            <Person />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={<Link component={LinkRouter} to={"/profile/" + stake.juror}>{stake.juror}</Link>}
          secondary={"Court: " + stake.subcourtId}>
        </ListItemText>
      </ListItem>
    )
  }

  const [stakesItems, setStakeItems] = useState(() => <Skeleton />);


  const handleStakeData = (data) => {
    parseStakeData(data.stakeSets);
  }


  async function parseStakeData(stakesData) {
    if (stakesData === undefined) return []
    let newStakesData = [];
    stakesData.forEach((stake) => {
      newStakesData.push(
        {
          'juror': stake.address.id,
          'subcourtId': stake.subcourtID,
          'stake': wei2eth(stake.stake),
        }
      );
    });

    const items = []
    newStakesData.forEach((stake, i) => {
      const item = createStakeItem(stake, i)
      items.push(item);
    })
    setStakeItems(items)
  }

  const { error, foo, loading } = useQuery(LASTSTAKES, { onCompleted: handleStakeData });

  if (error) { console.log(error) }
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
          Latest Stakes
        </Typography>
        <List dense={true}>
          {stakesItems}
        </List>
      </Paper>
    </Grid >
  )
}