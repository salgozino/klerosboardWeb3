
import { ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';

import { Link } from "react-router-dom";
import { Feed, Casino, Dashboard, People, Gavel, Balance, Paid } from '@mui/icons-material';
import { Fragment } from 'react';

export const mainListItems = (
  <Fragment>

    <Link to='/'>
      <ListItemButton>

        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />

      </ListItemButton>
    </Link>

    <Link to='/odds'>
      <ListItemButton>

        <ListItemIcon>
          <Casino />
        </ListItemIcon>
        <ListItemText primary="Odds" />

      </ListItemButton>
    </Link>

    <Link to='/community'>
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

    <Link to='/courts'>
      <ListItemButton>
        <ListItemIcon>
          <Balance />
        </ListItemIcon>
        <ListItemText primary="Courts" />
      </ListItemButton>
    </Link>

    <Link to='/cases'>
      <ListItemButton>
        <ListItemIcon>
          <Gavel />
        </ListItemIcon>

        <ListItemText primary="Disputes" />

      </ListItemButton>
    </Link>

    <Link to='/arbitrables'>
      <ListItemButton>
        <ListItemIcon>
          <Feed />
        </ListItemIcon>

        <ListItemText primary="Arbitrables" />

      </ListItemButton>
    </Link>

    <Link to='/stakes'>
      <ListItemButton>

        <ListItemIcon>
          <Paid />
        </ListItemIcon>
        <ListItemText primary="Stakes" />

      </ListItemButton>
    </Link>
  </Fragment>
);
