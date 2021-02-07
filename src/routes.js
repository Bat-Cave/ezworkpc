import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Order from './Components/Order';

export default (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/order' component={Order}/>
        <Route path='/about' component={About}/>
    </Switch>
)