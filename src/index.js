//import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes,
  Route } from "react-router-dom";
import About from './pages/About';
import PrivateChat from './pages/PrivateChat';
import ServerChat from './pages/ServerChat';
import Me from './pages/Me';
import Private from './pages/Private';
import Server from './pages/Server';
import AboutServer from './pages/AboutServer';
//import { UserContext } from "./context/UserContext.js";

//const [ user, setUser ] = useState(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<UserContext.Provider value={providerValue}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Me />}/>
          <Route path="about" element={<About />}/>
          <Route path="channels">
            <Route path="@me" element={<Private />}>
              <Route index element={<Me />}/>
              <Route path=":userId" element={<PrivateChat />}/>
            </Route>
            <Route path=":serverId" element={<Server />}>
              <Route index element={<AboutServer />}/>
              <Route path=":channelId" element={<ServerChat />}/>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  //</UserContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
