import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
// import Home from './components/Home';
import routes from './routes';
import { BrowserRouter as Router, Switch } from 'react-router-dom'

function App(){
  return (
    <>
    <Router>
    <Navbar />
    {/* <Home /> */}
    <Switch>
    {routes}
    </Switch>
    </Router>
    </>
  )
};

export default App;
