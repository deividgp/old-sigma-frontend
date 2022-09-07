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
import axios from "../axios";
import { ServersContext } from '../contexts/ServersContext';
import { useContext } from "react";
import { PendingFriendsContext } from '../contexts/PendingFriendsContext';
import { FriendsContext } from '../contexts/FriendsContext';
import { ActiveContext } from '../contexts/ActiveContext';
import { OnlineUsersContext } from '../contexts/OnlineUsersContext';
import socket from "../socket";
import { UserContext } from '../contexts/UserContext';

function Home() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [serverName, setServerName] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const { servers, setServers } = useContext(ServersContext);
  const { setPendingFriends } = useContext(PendingFriendsContext);
  const { setFriends } = useContext(FriendsContext);
  const { setOnlineUsers } = useContext(OnlineUsersContext);
  const { active } = useContext(ActiveContext);
  const { user } = useContext(UserContext);

  const toBase64 = (arr) => {
    //arr = new Uint8Array(arr) if it's an ArrayBuffer
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
  }

  React.useEffect(() => {
    const rooms = [];
    
    socket.emit("get_online_users");
    
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
    const listener = (data) => {
      if (data.room === active) return;
  
      alert("You received a message!");
    };

    const listener2 = (data) => {
      axios.get("/loggeduser/servers")
        .then(servers => {
          if (data.rooms.includes(active))
            navigate("/", { replace: true });
          setServers(servers.data);
          socket.emit("leave_room", data.rooms);
        });
    }

    socket.on("receive_server_message", listener);
    socket.on("receive_private_message", listener);
    socket.on("channel_deleted", (data) => {
      axios.get("/loggeduser/servers")
        .then(servers => {
          if (data.channelId === active)
            navigate("/", { replace: true });
          setServers(servers.data);
          socket.emit("leave_room", data.channelId);
        });
    });
    socket.on("friend_deleted", (data) => {
      if (active === data.friendId)
        navigate("/", { replace: true });
      setFriends(current => current.filter(friend => friend.id !== data.friendId));
    });

    socket.on("server_deleted", listener2);
    socket.on("user_kicked", listener2);

    return () => {
      socket.off("receive_server_message", listener);
      socket.off("receive_private_message", listener);
      socket.removeAllListeners("channel_deleted");
      socket.removeAllListeners("friend_deleted");
      socket.removeAllListeners("server_deleted");
      socket.removeAllListeners("user_kicked");
    };
  }, [socket, active]);

  React.useEffect(() => {
    socket.on("online_users", (data) => {
      setOnlineUsers(data);
    });

    socket.on("channel_created", (data) => {
      axios.get("/loggeduser/servers")
        .then(servers => {
          setServers(servers.data);
          socket.emit("join_room", data.channelId);
        });
    });

    socket.on("friend_accepted", (data) => {
      setFriends(current => [...current, data.user]);
    });

    socket.on("friend_added", (data) => {
      setPendingFriends(current => [...current, data.user]);
    });

    return () => {
      socket.removeAllListeners("online_users");
      socket.removeAllListeners("channel_created");
      socket.removeAllListeners("friend_accepted");
      socket.removeAllListeners("friend_added");
    };
  }, [socket]);

  const handleClickNavigate = (route) => {
    navigate(route, { replace: true });
  };

  const handleServerNameSubmit = () => {
    if(serverName === "") return;
    setOpen(false);
    axios.put("/loggeduser/joinserver", { name: serverName })
      .then((res) => {
        socket.emit("join_room", res.data);
        axios.get("/loggeduser/servers")
          .then(servers => {
            setServers(servers.data);
          });
      })

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
                <img src={logo} alt="Logo" />
                <h2 style={{ display: "inherit", alignItems: "center" }}>{user.username}</h2>
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
                        <IconButton aria-label="delete" size="large" color="warning" onClick={() => setOpen(true)}>
                          <AddIcon fontSize='60' />
                        </IconButton>
                      </Tooltip>
                    </li>
                    {servers.map((server) => {
                      return (
                        <li key={server.id}>
                          <Tooltip title={server.name} placement='right'>
                            <IconButton aria-label="delete" size="large" color="warning" onClick={() => handleClickNavigate("/channels/" + server.id)}>
                              <HomeIcon fontSize='60' />
                            </IconButton>
                          </Tooltip>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                <div className='App-main' style={{ paddingLeft: "72px" }}>
                  <Outlet />
                </div>
              </div>

              <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Create or join a server</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    value={serverName}
                    onChange={(event) => setServerName(event.target.value)}
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpen(false)}>Cancel</Button>
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
