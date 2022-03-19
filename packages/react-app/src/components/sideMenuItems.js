
import { Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link } from '@mui/material';
import { Feed, Casino, Dashboard, People, Gavel, Balance, Paid } from '@mui/icons-material';
import { LinkWithQuery as LinkRouter } from '../components/LinkWithQuery';
import { Fragment } from 'react';
import graphImg from '../images/graphprotocol.png';
import githubImg from '../images/github.png';

export const mainListItems = (
  <Fragment>
    <Link component={LinkRouter} to='/' children={
      <ListItemButton>

        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />

      </ListItemButton>
    }
    />

    <Link component={LinkRouter} to='/odds' children={
      <ListItemButton>

        <ListItemIcon>
          <Casino />
        </ListItemIcon>
        <ListItemText primary="Odds" />

      </ListItemButton>
    } />

    <Link component={LinkRouter} to='/community' children={
      <ListItemButton>

        <ListItemIcon>
          <People />
        </ListItemIcon>
        <ListItemText primary="Kleros Family" />

      </ListItemButton>
    } />

  </Fragment>
);

export const secondaryListItems = (
  <Fragment>
    <ListSubheader component="div" inset>
      Kleros Explorer
    </ListSubheader>

    <Link component={LinkRouter} to='/courts' children={
      <ListItemButton>
        <ListItemIcon>
          <Balance />
        </ListItemIcon>
        <ListItemText primary="Courts" />
      </ListItemButton>
    } />

    <Link component={LinkRouter} to='/cases' children={
      <ListItemButton>
        <ListItemIcon>
          <Gavel />
        </ListItemIcon>

        <ListItemText primary="Disputes" />

      </ListItemButton>
    } />

    <Link component={LinkRouter} to='/arbitrables' children={
      <ListItemButton>
        <ListItemIcon>
          <Feed />
        </ListItemIcon>

        <ListItemText primary="Arbitrables" />

      </ListItemButton>
    } />

    <Link component={LinkRouter} to='/stakes' children={
      <ListItemButton>

        <ListItemIcon>
          <Paid />
        </ListItemIcon>
        <ListItemText primary="Stakes" />

      </ListItemButton>
    } />
  </Fragment>
);

export const footerListItems = (
  <Fragment>
    <ListSubheader component="div" inset>
      Repositories
    </ListSubheader>

    <Link href='https://github.com/salgozino/KlerosJurorDashboard' target={'_blank'}>
      <ListItemButton>
        <ListItemIcon>
          <Avatar src={githubImg} alt='Github' sx={{width: '20px', height: '20px'}}/>
        </ListItemIcon>
        <ListItemText primary="Github" />
      </ListItemButton>
    </Link>

      <Link href='https://thegraph.com/explorer/subgraph/salgozino/klerosboard' target={'_blank'}>
        <ListItemButton>
          <ListItemIcon>
            <Avatar src={graphImg} alt='The Graph' sx={{width: '20px', height: '20px'}}/>
          </ListItemIcon>
          <ListItemText primary="Graph" />
        </ListItemButton>
      </Link>
  </Fragment>
);
