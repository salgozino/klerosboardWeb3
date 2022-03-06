import "./topbar.css"
import {NotificationsNone} from '@mui/icons-material';
import { LinkIcon } from '@material-ui/icons/Link'
import useWeb3Modal from "../../hooks/useWeb3Modal";
import { Button } from "../index";
import { useState, useEffect } from "react";

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

        // Resolve the ENS name for the first account.
        const name = await provider.lookupAddress(accounts[0]);

        // Render either the ENS name or the shortened account address.
        if (name) {
          setRendered(name);
        } else {
          setRendered(account.substring(0, 6) + "..." + account.substring(36));
        }
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


export default function Topbar() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  
  return (
    <div className='topbar'>
        <div className="topbarWrapper">
            <div className="topLeft">
                <span className='logo'>Klerosboard 3.0</span>
            </div>
            <div className="topRight">
                <div className="topbarIconContainer">
                     <NotificationsNone />
                     <span className="topIconBadge">2</span>
                </div>
                <div className="topbarIconContainer"><LinkIcon /></div>

                <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
                
            </div>
        </div>
    </div>
  )
}
