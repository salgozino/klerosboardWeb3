import { useState, useEffect, useMemo } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import {
  useRoutes,
  useSearchParams,
} from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache
} from "@apollo/client";

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
import Profile from "./pages/Profile";
import Arbitrable from "./pages/Arbitrable";
import NestedLayout from './pages/NestedLayout';
import NotFound from './pages/NotFound';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { Box, Toolbar, List, Typography, Divider, IconButton, Badge, Avatar } from "@mui/material";
import { Tooltip } from "@material-ui/core";
import { Favorite, ChevronLeft, Menu, Notifications } from "@mui/icons-material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { mainListItems, secondaryListItems, footerListItems } from './components/sideMenuItems';
import { Button } from "./components/index";
import ChainMenu from "./components/chainMenu";
import { LinkWithQuery as LinkRouter } from "./components/LinkWithQuery";

import useWeb3Modal from "./hooks/useWeb3Modal";
import { getChainId } from "./scripts/utils";


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

const routes = [
  { path: "/", element: <Home /> },
  {
    path: "/courts", element: <NestedLayout />, children: [
      { index: true, element: <Courts /> },
      { path: ":id", element: <Court /> },
    ]
  },
  {
    path: "/cases", element: <NestedLayout />, children: [
      { index: true, element: <Disputes /> },
      { path: ":id", element: <Dispute /> },
    ]
  },
  { path: "/profile/:id", element: <Profile /> },
  {
    path: "/arbitrables", element: <NestedLayout />, children: [
      { index: true, element: <Arbitrables /> },
      { path: ":id", element: <Arbitrable /> },
    ]
  },
  { path: "/stakes", element: <Stakes /> },
  { path: "/odds", element: <Odds /> },
  { path: "/community", element: <Community /> },
  { path: "/support", element: <Support /> },
  { path: "/*", element: <NotFound /> },
];



const clientMainnet = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/salgozino/sarasa-mainnet',
  cache: new InMemoryCache()
});

const clientGnosis = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/salgozino/sarasa',
  cache: new InMemoryCache()
});



export default function App() {
  const [open, setOpen] = useState(false);
  const [client, setClient] = useState(clientMainnet);
  const [mode, setMode] = useState('dark');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );
  let [searchParams] = useSearchParams();
  const toggleDrawer = () => {
    setOpen(!open);
  };

  let element = useRoutes(routes)
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

  useEffect(() => {
    let chainId = getChainId(searchParams)
    if (chainId === 'xdai') {
      setClient(clientGnosis)
    }  else{
      setClient(clientMainnet)
    }
  }, [searchParams])
  

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>

        <Box sx={{
          display: 'flex',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
        }}>
          <CssBaseline enableColorScheme />
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
                <Menu />
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
              
              {/* Theme mode switch */}
                <Tooltip title={theme.palette.mode + " mode"}>
                  <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                  </IconButton>
                </Tooltip>

              {/* Support */}
              <Tooltip title="Support">
                <IconButton color="inherit" size='small' component={LinkRouter} to="/support" children={<Favorite />} />
              </Tooltip>

              {/* Notifications */}
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <Notifications />
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
                <ChevronLeft />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              {mainListItems}
              <Divider sx={{ my: 1 }} />
              {secondaryListItems}
            </List>

            <List component="nav" sx={{
              marginTop: 'auto'
            }}>
              <Divider />
              {footerListItems}
            </List>
          </Drawer>


          <Box component="main"
            sx={{
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            {element}

          </Box>
        </Box>
      </ThemeProvider>
    </ApolloProvider>
  );
};
