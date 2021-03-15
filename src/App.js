import "./Styles/App.css";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import routes from "./routes";
import ReactGA from "react-ga";
import React, { useEffect } from "react";
import { useLocation } from "react-router";

ReactGA.initialize('UA-145045342-3');

const App = () => {
let location = useLocation();
  useEffect(() => {
    ReactGA.pageview(location.pathname, document.title);
  }, [location])
    
  return (
    <div className="App">
      <Nav />
      <div className="container">{routes}</div>
      <Footer />
    </div>
  );
};

export default App;
