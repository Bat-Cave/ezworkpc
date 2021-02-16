import '../Styles/Home.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import compcase from '../case-transparent.png';



const Home = () => {
    let [prices, setPrices] = useState({});
    let [sum, setSum] = useState('');
    let parts = {
        cpu: 'B079D3DBNM',
        // ram: 'B088T2KNZ4',
        ram: 'B08KGGPTYH',
        psu: 'B07DTP6SLJ',
        // storage250: 'B07YFF8879',
        storage250: 'B08KZS8N8Y',
        // storage500: 'B07YFF3JCN',
        // storage500: 'B08KZQYW2D',
        // storage1000: 'B07YFFX5MD',
        // storage1000: 'B08KZPBGXV',
        // storage2000: 'B08K4NP5DQ',
        mobo: 'B079NYQQJJ',
        case: 'B08GNFCB1M',
        wifi: 'B082NZYDDM'
    }
    let partsKeys = Object.keys(parts)

useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    for(let i = 0; i < partsKeys.length; i++){
        const options = {
        method: 'GET',
        url: 'https://amazon-price1.p.rapidapi.com/priceReport',
        params: {asin: parts[partsKeys[i]], marketplace: 'US'},
        headers: {
            'x-rapidapi-key': 'd110ceafe9msheddf4de95aef5e2p1276b3jsn80ea3cfb285a',
            'x-rapidapi-host': 'amazon-price1.p.rapidapi.com'
            },
        cancelToken: source.token
        };

        axios.request(options).then(function (response) {
            let data = response.data 
            let priceNew = data.lastPrice.priceNew + "";
            priceNew = priceNew.slice(0, priceNew.length - 2) + "." + priceNew.slice(-2);
            let currency = data.currencySymbol;
            setPrices(prev=>({
                ...prev,
                [`${partsKeys[i]}`]: `${currency}${priceNew}`
            }))
        }).catch(function (error) {
            if (axios.isCancel(error)) {
              console.log("cancelled");
            } else {
              throw error;
            }
        })

    }
    return function cleanup() {
        source.cancel();
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
                            <li>6.0 Gb/s Storage</li>
                            <li>Wi-Fi 6 & Bluetooth 5.0</li>
                        </ul>
                    </div>
                    <img src={compcase}/>
                </div>
                <h3>Prices from Amazon.com</h3>
                <div className='row'>
                    <div>
                        <h4>Rosewill SCM-01B</h4>  
                        <p>Case</p>  
                    </div>
                    <div className='price'>{prices.case ? prices.case : <span className='loader'></span>}</div>
                </div>
                <div className='row'>
                    <div>
                        <h4>Gigabyte GA-A320M-S2H</h4>  
                        <p>Motherboard</p>  
                    </div>
                    <div className='price'>{prices.mobo ? prices.mobo : <span className='loader'></span>}</div>
                </div>
                <div className='row'>
                    <div>
                        <h4>AMD Ryzen 3 2200G</h4>  
                        <p>CPU/GPU</p>  
                    </div>
                    <div className='price'>{prices.cpu ? prices.cpu : <span className='loader'></span>}</div>
                </div>
                <div className='row'>
                    <div>
                        <h4>16GB OLOy DDR4 RAM</h4>  
                        <p>RAM</p>  
                    </div>
                    <div className='price'>{prices.ram ? prices.ram : <span className='loader'></span>}</div>
                </div>
                <div className='row'>
                    <div>
                        <h4>Western Digital M.2 SSD</h4>  
                        <p>Storage (upgradable)</p>  
                    </div>
                    <div className='price'>{prices.storage250 ? prices.storage250 : <span className='loader'></span>}</div>
                </div>
                <div className='row'>
                    <div>
                        <h4>EVGA 450 Watt 80+ Bronze</h4>  
                        <p>PSU</p>  
                    </div>
                    <div className='price'>{prices.psu ? prices.psu : <span className='loader'></span>}</div>
                </div>
                <div className='row'>
                    <div>
                        <h4>Cudy Wi-Fi 6 & Bluetooth 5.0</h4>  
                        <p>Wi-Fi Card (optional)</p>  
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
        </div>
    )
}

export default Home;
