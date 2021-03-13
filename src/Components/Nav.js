import '../Styles/Nav.css';
import React, { useState } from 'react';
import {Link, withRouter} from 'react-router-dom';



const Nav = () => {
    return(
        <nav className='nav'>
            <Link to='/home' replace className={window.location.href.includes('home') ? 'linkActive' : ''}>Home</Link>
            <Link to='/order' replace className={window.location.href.includes('order') ? 'linkActive' : ''}>Order</Link>
            <Link to='/contact' replace className={window.location.href.includes('contact') ? 'linkActive' : ''}>Contact</Link>
            <Link to='/about' replace className={window.location.href.includes('about') ? 'linkActive' : ''}>About</Link>
        </nav>
    )
}

export default withRouter(Nav);
