import '../Styles/Nav.css';
import React, { useState } from 'react';
import {Link, withRouter} from 'react-router-dom';



const Nav = () => {

    return(
        <nav className='nav'>
            <Link to='/'>Home</Link>
            <Link to='/order'>Order</Link>
            <Link to='/about'>About</Link>
        </nav>
    )
}

export default withRouter(Nav);
