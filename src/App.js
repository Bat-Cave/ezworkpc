import './Styles/App.css';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import routes from './routes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
      <div className='container'>
        {routes}
      </div>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
