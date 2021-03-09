import '../Styles/Home.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import compcase from '../case-transparent.png';
import {Link, withRouter} from 'react-router-dom';



const Home = () => {

    //-----Admin Settings-----//

    let parts = {
        cpu: {
            name: 'AMD Ryzen 3 2200G',
            price: '181.98'
        },
        // ram: {
        //     name: 'OLOy DDR4 RAM 16GB',
        //     asin: 'B088T2KNZ4'
        // },
        ram: {
            name: 'Gigastone DDR4 16GB',
            price: '68.99'
        },
        psu: {
            name: 'EVGA 80+ BRONZE 450W',
            price: '44.43'
        },
        // storage250: {
        //     name: 'WD Blue 250GB NVMe M.2 SSD',
        //     asin: 'B07YFF8879'
        // },
        // storage500: {
        //     name: 'WD Blue 500GB NVMe M.2 SSD',
        //     asin: 'B07YFF3JCN'
        // },
        // storage1000: {
        //     name: 'WD Blue 1000GB NVMe M.2 SSD',
        //     asin: 'B07YFFX5MD'
        // },
        // storage2000: {
        //     name: 'WD Blue 2000GB NVMe M.2 SSD',
        //     asin: 'B08K4NP5DQ'
        // },
        storage250: {
            name: 'Inland Professional 256GB NVMe M.2 SSD',
            price: '37.99'
        },
        // storage500: {
        //     name: 'Inland Professional 512GB NVMe M.2 SSD',
        //     asin: 'B08KZQYW2D'
        // },
        // storage1000: {
        //     name: 'Inland Professional 1024GB NVMe M.2 SSD',
        //     asin: 'B08KZPBGXV'
        // },
        mobo: {
            name: 'GIGABYTE GA-A320M-S2H',
            price: '90.54'
        },
        // case: {
        //     name: 'Rosewill SCM-01B',
        //     asin: 'B08GNFCB1M'
        // },
        case: {
            name: 'Rosewill FBM-X2',
            price: '54.87'
        },
        wifi: {
            name: 'Cudy WE3000 AX',
            price: '27.90'
        }
    }

    //----^Admin Settings^----//

    let [prices, setPrices] = useState({});
    let [sum, setSum] = useState('');
    
    let partsKeys = Object.keys(parts)

useEffect(() => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });

    for(let i = 0; i < partsKeys.length; i++){

        let priceNew = parts[partsKeys[i]].price;
        let currency = "$";
        setPrices(prev=>({
            ...prev,
            [`${partsKeys[i]}`]: `${currency}${priceNew}`
        }))

    }
}, [])

useEffect(() => {
    let sum = 0;
    for(let p = 0; p < Object.keys(prices).length; p++){
        sum += (+prices[Object.keys(prices)[p]].slice(1));
    }
    setSum(`$${sum.toFixed(2)}`)
}, [prices])

    return(
        <div className='home'>
            <br></br>
            <section>
                <h1>It's Easy Cheesy.</h1>
            </section>
            <section>
                <div className='currentBuild'>
                    <div>
                        <h2>The Workstation</h2>
                        <p>Snappy desktop computer that doesn't break the budget.</p>
                        <br></br>
                        <h4>Features:</h4>
                        <ul>
                            <li>USB 3.1</li>
                            <li>HDMI, DVI, and Display Port</li>
                            <li>1 Gbe Ethernet</li>
                            <li>16 GB DDR4 3000MHz Memory</li>
                            <li>2,600 MB/s Read</li>
                            <li>1,800 MB/s Write</li>
                            <li>WiFi 6 & Bluetooth 5.0</li>
                        </ul>
                    </div>
                    <img src={compcase}/>
                </div>
                <h3>Estimated Component Prices</h3>
                <div className='row'>
                    <div>
                        <h4>{parts.case.name}</h4>  
                        <p>Case</p>  
                    </div>
                    <div className='price'>{prices.case ? prices.case : <span className='loader'></span>}</div>
                </div>
                <div className='row'>
                    <div>
                        <h4>AM4 MATX Motherboard</h4>  
                        <p>Motherboard</p>  
                    </div>
                    <div className='price'>{prices.mobo ? prices.mobo : <span className='loader'></span>}</div>
                </div>
                <div className='row'>
                    <div>
                        <h4>{parts.cpu.name}</h4>  
                        <p>CPU/GPU</p>  
                    </div>
                    <div className='price'>{prices.cpu ? prices.cpu : <span className='loader'></span>}</div>
                </div>
                <div className='row'>
                    <div>
                        <h4>16GB of DDR4 @ 300MHz </h4>  
                        <p>RAM</p>  
                    </div>
                    <div className='price'>{prices.ram ? prices.ram : <span className='loader'></span>}</div>
                </div>
                <div className='row'>
                    <div>
                        <h4>250GB NVMe M.2 SSD</h4>  
                        <p>Storage (upgradable)</p>  
                    </div>
                    <div className='price'>{prices.storage250 ? prices.storage250 : <span className='loader'></span>}</div>
                </div>
                <div className='row'>
                    <div>
                        <h4>80+ Bronze Power Supply</h4>  
                        <p>Power Supply</p>  
                    </div>
                    <div className='price'>{prices.psu ? prices.psu : <span className='loader'></span>}</div>
                </div>
                <div className='row'>
                    <div>
                        <h4>{parts.wifi.name}</h4>  
                        <p>Wi-Fi & Bluetooth Card (optional)</p>  
                    </div>
                    <div className='price'>{prices.wifi ? prices.wifi : <span className='loader'></span>}</div>
                </div>
                <div className='row'>
                    <div>
                        <h4>Total</h4>  
                        <p></p>  
                    </div>
                    <div className='price'>*{sum}</div>
                </div>
                <p className='disclaimer'>*Not the final price. This is only an estimation based on the prices for the products found on Amazon.com.</p>
            </section>
            <section>
                <Link to='/order'>Order Now</Link>
            </section>
        </div>
    )
}

export default withRouter(Home);
