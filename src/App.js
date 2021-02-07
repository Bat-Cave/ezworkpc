import './Styles/App.css';
import Home from './Components/Home';
import Nav from './Components/Nav';
import routes from './routes';
import { HashRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Nav />
      <div className='container'>
        {routes}
      </div>
      </HashRouter>
    </div>
  );
}

export default App;
