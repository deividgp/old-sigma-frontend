import './App.css';
import { Outlet, Link } from "react-router-dom";
import {userContext} from './context/UserContext';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Sigma</h1>
        <nav>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/admin">Admin panel</Link></li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

export default App;
