
import { Avatar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link as LinkRouter} from "react-router-dom";
import { Link } from '@mui/material';
import { Feed, Casino, Dashboard, People, Gavel, Balance, Paid } from '@mui/icons-material';
import { Fragment } from 'react';
import graphImg from '../images/graphprotocol.png';
import githubImg from '../images/github.png';

export const mainListItems = (
  <Fragment>
    <Link component={LinkRouter} to='/'>
      <ListItemButton>

        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />

      </ListItemButton>
    </Link>

    <Link component={LinkRouter} to='/odds'>
      <ListItemButton>

        <ListItemIcon>
          <Casino />
        </ListItemIcon>
        <ListItemText primary="Odds" />

      </ListItemButton>
    </Link>

    <Link component={LinkRouter} to='/community'>
      <ListItemButton>

        <ListItemIcon>
          <People />
        </ListItemIcon>
        <ListItemText primary="Kleros Family" />

      </ListItemButton>
    </Link>

  </Fragment>
);

export const secondaryListItems = (
  <Fragment>
    <ListSubheader component="div" inset>
      Kleros Explorer
    </ListSubheader>

    <Link component={LinkRouter} to='/courts'>
      <ListItemButton>
        <ListItemIcon>
          <Balance />
        </ListItemIcon>
        <ListItemText primary="Courts" />
      </ListItemButton>
    </Link>

    <Link component={LinkRouter} to='/cases'>
      <ListItemButton>
        <ListItemIcon>
          <Gavel />
        </ListItemIcon>

        <ListItemText primary="Disputes" />

      </ListItemButton>
    </Link>

    <Link component={LinkRouter} to='/arbitrables'>
      <ListItemButton>
        <ListItemIcon>
          <Feed />
        </ListItemIcon>

        <ListItemText primary="Arbitrables" />

      </ListItemButton>
    </Link>

    <Link component={LinkRouter} to='/stakes'>
      <ListItemButton>

        <ListItemIcon>
          <Paid />
        </ListItemIcon>
        <ListItemText primary="Stakes" />

      </ListItemButton>
    </Link>
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
