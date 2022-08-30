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
import { ActiveContext } from '../contexts/ActiveContext';
import socket from "../socket";
import { UserContext } from '../contexts/UserContext';

function Home() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [serverName, setServerName] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const { servers, setServers } = useContext(ServersContext);
  const { pendingFriends, setPendingFriends } = useContext(PendingFriendsContext);
  const { friends, setFriends } = useContext(FriendsContext);
  const { active } = useContext(ActiveContext);
  const { user } = useContext(UserContext);
  const socketListener = (data) => {
    if(data.room === active) return;
    
    alert("You received a message!");
  };

  React.useEffect(() => {
    socket.connect();
    const rooms = [];
    rooms.push(user.id);
    
    axios.get("/loggeduser/servers")
    .then(servers => {
      setServers(servers.data);
      
      servers.data.forEach((server) => {
        rooms.push(server.id);

        server.Channels.forEach((channel) => {
          rooms.push(channel.id);
        });
      });

      axios.get("/loggeduser/friends")
      .then(friends => {
        setFriends(friends.data);

        friends.data.forEach((friend) => {
          rooms.push(friend.id);
        });
      })
      axios.get("/loggeduser/pendingfriends")
      .then(pending => {
        setPendingFriends(pending.data);

        socket.emit("join_room", rooms);

        setLoading(false);
      })
    })
  }, []);

  React.useEffect(() => {
    socket.on("receive_server_message", socketListener);

    return () => {
      socket.off("receive_server_message", socketListener);
    };
  }, [socket, active]);

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
              <h2 style={{display: "inherit", alignItems: "center"}}>{user.username}</h2>
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
                    {servers.map((server) => {
                      return (
                        <li key={server.id}>
                          <Tooltip title={server.name} placement='right'>
                            <IconButton aria-label="delete" size="large" color="warning" onClick={()=>handleClickNavigate("/channels/"+server.id)}>
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
                  label="Name"
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
