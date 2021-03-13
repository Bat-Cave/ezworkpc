import './Styles/App.css';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
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
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
