import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes,
  Route } from "react-router-dom";

const Home = () => <h1>hola</h1>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="home" element={<Home />}/>
        <Route path="admin" element={<Home />}/>
        <Route path="channels" element={<Home />}>
          <Route path="@me" element={<Home />}>
            <Route path=":userId" element={<Home />}/>
          </Route>
          <Route path=":serverId" element={<Home />}>
            <Route path=":channelId" element={<Home />}></Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
