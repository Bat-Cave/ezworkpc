import '../Styles/Thanks.css';
import React, { useState } from 'react';



const Thanks = () => {

    return(
        <div className='thanks'>
            <section>
                <h1>Thank you.</h1>
            </section>
            <section>
                <p>Thank you for your order! I sent you a confirmation email with the order details. Here is what will happen next:</p>
                <br></br>
                <ol>
                    <li><span>I will order the parts with the options you selected.</span></li>
                    <li><span>When the parts have arrived, I'll build the computer(s).</span></li>
                    <li><span>Once I finish building the computers, I'll request payment.</span></li>
                    <li><span>Once payment is received, I will send the computers to you.</span></li>
                </ol>
            </section>
        </div>
    )
}

export default Thanks;
