import '../Styles/Footer.css';
import React, { useState } from 'react';
import {Link, withRouter} from 'react-router-dom';
import logo from '../Cheese.png';



const Footer = () => {
    return(
        <div className='footer'>
            <div>
                <h3>Contact</h3>
                <p>Rico Hancock</p>
                <p>ezworkpc@gmail.com</p>
                <p>(415) 952-3972</p>
            </div>
            <div>
                <img src={logo} />
            </div>
        </div>
    )
}

export default withRouter(Footer);
