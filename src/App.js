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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={
          <NotLoggedIn>
            <Me />
          </NotLoggedIn>
        }/>
        <Route path="about" element={<About />}/>
        <Route path="login" element={
          <LoggedIn>
            <Login />
          </LoggedIn>
        }/>
        <Route path="channels">
          <Route path="@me" element={
            <NotLoggedIn>
              <Private />
            </NotLoggedIn>
          }>
            <Route index element={<Me />}/>
            <Route path=":userId" element={<PrivateChat />}/>
          </Route>
          <Route path=":serverId" element={
            <NotLoggedIn>
              <Server />
            </NotLoggedIn>
          }>
            <Route index element={<AboutServer />}/>
            <Route path=":channelId" element={<ServerChat />}/>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
