import '../Styles/Nav.css';
import React, { useState } from 'react';
import {Link, withRouter} from 'react-router-dom';
import logo from '../Cheese.png';



const Nav = () => {

    return(
        <nav className='nav'>
            <Link to='/'>Home</Link>
            <Link to='/order'>Order</Link>
            <img src={logo} alt='logo'/>
            <Link to='/about'>About</Link>
            <Link to='/contact'>Contact</Link>
        </nav>
    )
}

export default withRouter(Nav);
