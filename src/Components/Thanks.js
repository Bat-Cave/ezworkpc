import '../Styles/Thanks.css';
import React, { useEffect, useState } from 'react';
import Banner from './Banner';



const Thanks = () => {
    

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
    }, [])

    return(
        <div className='thanks'>
            <Banner phrase="Thank you." />
            <section>
                <p>Thank you for your order! I sent you a confirmation email with the order details. Here is what will happen next:</p>
                <br></br>
                <ol>
                    <li><span>I will order the parts with the options you selected.</span></li>
                    <li><span>When the parts have arrived, I'll build the computer(s).</span></li>
                    <li><span>Once I finish building the computers, I'll request payment.</span></li>
                    <li><span>Once payment is received, I will send the computers to you.</span></li>
                </ol>
                <br></br>
                <p>You'll receive email updates throughout the process to let you know the status of your order.</p>
            </section>
        </div>
    )
}

export default Thanks;
