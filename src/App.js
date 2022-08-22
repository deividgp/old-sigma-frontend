import './App.css';
import { Outlet, Link } from "react-router-dom";
//import {userContext} from './context/UserContext';

function App() {
  return (
    <div className="App">
      <header className='App-header'>
        <h1>Sigma</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/serverchat">ServerChat</Link></li>
            <li><Link to="/channels/@me">PrivateChat</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>
      </header>
      <body className='App-body'>
        <div style={{backgroundColor: "red", width: "72px", left: "0px", height: "100%", position: "fixed", overflowY: "auto"}}>
          hola
          <br></br>
          hola
          <br></br>
          hola
          <br></br>
          hola
          <br></br>
          hola
          <br></br>
          hola
        </div>
        <main className='App-main'>
          <Outlet/>
        </main>
      </body>
    </div>
  );
}

export default App;
