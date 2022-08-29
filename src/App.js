import * as React from 'react';
import About from './pages/About';
import PrivateChat from './pages/PrivateChat';
import ServerChat from './pages/ServerChat';
import Me from './pages/Me';
import Private from './pages/Private';
import Server from './pages/Server';
import AboutServer from './pages/AboutServer';
import Login from './pages/Login';
import Home from "./pages/Home"
import { Routes, Route } from "react-router-dom";
import { LoggedIn, NotLoggedIn } from './utils/PrivateRoutes';
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import Logout from './pages/Logout';
import NewUser from './pages/NewUser';

function App() {
  const { setUser } = useContext(UserContext);

  React.useEffect(() => {
    axios.get(`/user`)
      .then(res => {
        setUser(res.data);
      })
      .catch(() =>{
        setUser(null);
      })
  }, []);

  return (
    <Routes>
      <Route path="login" element={
        <LoggedIn>
          <Login />
        </LoggedIn>
      }/>
      <Route path="newuser" element={
        <LoggedIn>
          <NewUser />
        </LoggedIn>
      }/>
      <Route path="logout" element={
        <NotLoggedIn>
          <Logout />
        </NotLoggedIn>
      }/>
      <Route path="/" element={ 
        <NotLoggedIn>
          <Home />
        </NotLoggedIn>
      }>
        <Route index element={ <Me /> }/>
        <Route path="about" element={<About />}/>
        <Route path="channels">
          <Route path="@me" element={ <Private /> }>
            <Route index element={<Me />}/>
            <Route path=":userId" element={<PrivateChat />}/>
          </Route>
          <Route path=":serverId" element={ <Server /> }>
            <Route index element={<AboutServer />}/>
            <Route path=":channelId" element={<ServerChat />}/>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
