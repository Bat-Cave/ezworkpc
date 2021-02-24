import '../Styles/About.css';
import React, { useEffect } from 'react';



const About = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
    }, [])

    return(
        <div className='about'>
            <section></section>
            <section>
                <h2>Hi, my name is Rico.</h2>
            </section>
            <section>
                <p>In 2017, I built my first gaming computer and fell in love with figuring out ways to make it more beefy. I watched videos, read articles, and searched for the best computer components that weren't insanely expensive. I'm always searching for the best prices for computer components so that I can upgrade my rig.</p>
            </section>
            <section>
                <p>Since my first build in 2017, I've built dozens of computers for family and friends for work or for gaming. I love using what I have learned to make buying a computer easier for those around me. Instead of wondering if you need 4 or 8 cores, I ask what you need the computer to do. Excel sheets? Easy. Video editing? I gotchu covered.</p>
            </section>
            <section>
                <p>I started ezworkpc.com because I felt that I could build solid work computer without the premium price tag. I take the best bang-for-the-buck computer components I can find to build computers that are efficient and fast. How fast? Well, it could read all 3 Lord of the Rings books 98 times a second.</p>
            </section>
        </div>
    )
}

export default About;
