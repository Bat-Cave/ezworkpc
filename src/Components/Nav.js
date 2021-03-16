import '../Styles/Nav.css';
import React, { useEffect, useState } from 'react';
import {Link, withRouter} from 'react-router-dom';



const Nav = () => {
    let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;


    useEffect(() => {
        let nav = document.getElementById('nav');
        document.addEventListener('scroll', (e) => {
            if(e.target.documentElement.scrollTop >= 200){
                nav.style.background = "#663399";
                nav.style.width = "100%";
            } else {
                nav.style.background = "transparent";
                nav.style.width = "initial";
            }
        })
    }, [])

    return(
        <nav className='nav' id='nav'>
            <Link to='/home' replace className={window.location.href.includes('home') ? 'linkActive' : ''}>Home</Link>
            <Link to='/order' replace className={window.location.href.includes('order') ? 'linkActive' : ''}>Order</Link>
            <Link to='/contact' replace className={window.location.href.includes('contact') ? 'linkActive' : ''}>Contact</Link>
            <Link to='/about' replace className={window.location.href.includes('about') ? 'linkActive' : ''}>About</Link>
        </nav>
    )
}

export default withRouter(Nav);
