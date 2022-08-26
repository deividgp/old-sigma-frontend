import './App.css';
import * as React from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import logo from "../logoSigmaWhite.png";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Loading from "../components/Loading";
import axios from "axios";
import { ServersContext } from '../contexts/ServersContext';
import { useContext } from "react";
import { PendingFriendsContext } from '../contexts/PendingFriendsContext';
import { FriendsContext } from '../contexts/FriendsContext';

function Home() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [serverName, setServerName] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const { servers, setServers } = useContext(ServersContext);
  const { pendingFriends, setPendingFriends } = useContext(PendingFriendsContext);
  const { friends, setFriends } = useContext(FriendsContext);

  React.useEffect(() => {
    axios.get("/loggeduser/servers")
    .then(res => {
      setServers(res.data);

      axios.get("/loggeduser/pendingfriends")
      .then(res => {
        setPendingFriends(res.data);

        axios.get("/loggeduser/friends")
        .then(res => {
          setFriends(res.data);
          setLoading(false);
        })
      })
    })
  }, []);

  /*React.useEffect(() => {
    axios.get("/loggeduser/servers")
    .then(res => {
      setServers(res.data);
      setLoading(false);
    })
  }, []);*/

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickNavigate = (route) => {
    navigate(route, { replace: true });
  };

  const handleServerNameChange = (event) => {
    setServerName(event.target.value);
  };

  const handleServerNameSubmit = () => {
    setOpen(false);
    setServerName("");
  };

  return (
    <div>
      {
        loading ?
        (
          <Loading />
        )
        :
        (
          <div>
            <div className='App-header'>
              <img src={logo} alt="Logo"/>
              <nav>
                <ul>
                  <li><Link to="/about">About</Link></li>
                  <li><Link to="/logout">Logout</Link></li>
                </ul>
              </nav>
            </div>
            <div className='App-body'>
              <div className='ServersList'>
                <ul>
                    <li>
                        <Tooltip title="Home" placement='right'>
                          <IconButton aria-label="delete" size="large" color="warning" onClick={() => handleClickNavigate("/channels/@me")}>
                              <HomeIcon fontSize='60' />
                          </IconButton>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip title="Add" placement='right'>
                          <IconButton aria-label="delete" size="large" color="warning" onClick={handleClickOpen}>
                              <AddIcon fontSize='60' />
                          </IconButton>
                        </Tooltip>
                    </li>
                    {servers.map((item) => {
                      return (
                        <li key={item.id}>
                          <Tooltip title={item.name} placement='right'>
                            <IconButton aria-label="delete" size="large" color="warning" onClick={()=>handleClickNavigate("/channels/"+item.id)}>
                                <HomeIcon fontSize='60' />
                            </IconButton>
                          </Tooltip>
                        </li> 
                      )
                    })}
                </ul>
              </div>
              
              <div className='App-main' style={{ paddingLeft: "72px" }}>
                <Outlet/>
              </div>
            </div>

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Create or join a server</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name or invite"
                  type="text"
                  value={serverName}
                  onChange={handleServerNameChange}
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleServerNameSubmit}>Create or join</Button>
              </DialogActions>
            </Dialog>
          </div>
        )
      }
    </div>
  );
}

export default Home;
