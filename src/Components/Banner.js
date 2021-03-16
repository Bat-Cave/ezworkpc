import '../Styles/Banner.css';
import React, { useEffect } from 'react';
import cheese from '../CheeseBase.png';




const Banner = (props) => {

    useEffect(()=>{
        let b = document.getElementsByClassName('banner')[0];
        b.addEventListener("mousemove", e => {
            let elms = e.target.getElementsByTagName('img');
            for(let c = 0; c < elms.length; c++){
                let mov = elms[c].width / 1200;
                let x = (Math.abs(e.clientX*mov)) + "px";
                let y = (Math.abs(e.clientY*mov))*3 + "px";
                elms[c].style.transform = `translateX(${x}) translateY(${y}) rotate(${mov*(c*25)*45}deg)`;
            }
        })
    }, [])

    return(
        <div className='banner'>
            <img src={cheese} alt='Cheese Logo' className='cheese-1'/>
            <img src={cheese} alt='Cheese Logo' className='cheese-2'/>
            <img src={cheese} alt='Cheese Logo' className='cheese-3'/>
            <img src={cheese} alt='Cheese Logo' className='cheese-4'/>
            <img src={cheese} alt='Cheese Logo' className='cheese-5'/>
            <h1>{props.phrase}</h1>
            <div className='shadow'></div>
        </div>
    )
}

export default Banner;
