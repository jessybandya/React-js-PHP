import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Reviews from "./pages/Reviews";


function App() {
  return (
    <Router>
    <ToastContainer />
    <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/reviews' component={Reviews} />
    </Switch>
    </Router>
  );
}

export default App;
