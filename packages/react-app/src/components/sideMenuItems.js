
import { ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';

import { Link as LinkRouter} from "react-router-dom";
import { Link } from '@mui/material';
import { Feed, Casino, Dashboard, People, Gavel, Balance, Paid } from '@mui/icons-material';
import { Fragment } from 'react';

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
