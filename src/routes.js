import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Order from './Components/Order';
import Contact from './Components/Contact';
import Thanks from './Components/Thanks';

export default (
    <Switch>
        <Redirect exact from="/" to="/home" />
        <Route exact path='/home' component={Home}/>
        <Route path='/order' component={Order}/>
        <Route path='/about' component={About}/>
        <Route path='/contact' component={Contact}/>
        <Route path='/thanks' component={Thanks}/>
    </Switch>
)