import { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Favorite } from "@mui/icons-material";

import { mainListItems, secondaryListItems } from './components/sideMenuItems';

import useWeb3Modal from "./hooks/useWeb3Modal";
import { Button } from "./components/index";

import Home from "./pages/Home"
import Courts from "./pages/Courts"
import Disputes from "./pages/Disputes"
import Dispute from "./pages/Dispute"
import Court from "./pages/Court";
import Odds from "./pages/Odds";
import Support from "./pages/Support";
import Community from "./pages/Community";
import Stakes from "./pages/Stakes";
import Arbitrables from "./pages/Arbitrables";
import {
  BrowserRouter as Router,
  Link as LinkRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Tooltip } from "@material-ui/core";
import { Avatar } from "@mui/material";
import ChainMenu from "./components/chainMenu";



const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal }) {
  const [account, setAccount] = useState("");
  const [rendered, setRendered] = useState("");

  useEffect(() => {
    async function fetchAccount() {
      try {
        if (!provider) {
          return;
        }

        // Load the user's accounts.
        const accounts = await provider.listAccounts();
        setAccount(accounts[0]);

        var render = account.substring(0, 6) + "..." + account.substring(36);

        // Resolve the ENS name for the first account.
        const network = await provider.getNetwork();
        if (network.chainId === 1) {
          const name = await provider.lookupAddress(accounts[0]);
          // Render either the ENS name or the shortened account address.
          if (name) {
            const avatar = await provider.getAvatar(name);
            console.log(avatar)
            if (avatar) {
              render = <Avatar src={avatar} />;
            } else {
              render = name;
            }
          }
        }
        setRendered(render);

      } catch (err) {
        setAccount("");
        setRendered("");
        console.error(err);
      }
    }
    fetchAccount();
  }, [account, provider, setAccount, setRendered]);

  return (
    <Button
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {rendered === "" && "Connect Wallet"}
      {rendered !== "" && rendered}
    </Button>
  );
}

function DashboardContent() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

  return (
    <Router>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{
          display: 'flex',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
        }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              {/* Klerosboard label */}
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                KlerosBoard
              </Typography>

              {/* Support */}
              <Tooltip title="Support">
                <IconButton color="inherit" size='small' component={LinkRouter} to="/support">
                  <Favorite />
                </IconButton>
              </Tooltip>

              {/* Notifications */}
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              {/* Chain changer */}
              <ChainMenu />

              {/* Wallet connect */}
              <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />

            </Toolbar>
          </AppBar>

          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              {mainListItems}
              <Divider sx={{ my: 1 }} />
              {secondaryListItems}
            </List>
          </Drawer>


          <Box
            component="main"
            sx={{
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courts" element={<Courts />} />
              <Route path="/courts/:courtId" element={<Court />} />
              <Route path="/cases" element={<Disputes />} />
              <Route path="/cases/:disputeId" element={<Dispute />} />
              <Route path="/arbitrables" element={<Arbitrables />} />
              <Route path="/stakes" element={<Stakes />} />
              <Route path="/odds" element={<Odds />} />
              <Route path="/community" element={<Community />} />
              <Route path="/support" element={<Support />} />
            </Routes>

          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default function App() {
  return <DashboardContent />;
}
