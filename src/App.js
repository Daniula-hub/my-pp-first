import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import routes from './routes';
import { BrowserRouter as Router, Switch } from 'react-router-dom'

function App(){
  return (
    <>
    <Router>
    <Navbar />
    <Switch>
    {routes}
    </Switch>
    </Router>
    </>
  )
};

export default App;
