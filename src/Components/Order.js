import '../Styles/Order.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";



const Order = () => {
    let [prices, setPrices] = useState({});
    let [options, setOptions] = useState({});

    let parts = {
        wifi: 'B082NZYDDM',
        storage250: 'B073SBV3XX',
        storage500: 'B073SBX6TY',
        storage1000: 'B073SB2MXT',
        storage2000: 'B073SBW3VD'
    }

    let partsKeys = Object.keys(parts)

    useEffect(() => {

        for(let i = 0; i < partsKeys.length; i++){
            const options = {
            method: 'GET',
            url: 'https://amazon-price1.p.rapidapi.com/priceReport',
            params: {asin: parts[partsKeys[i]], marketplace: 'US'},
            headers: {
                'x-rapidapi-key': 'd110ceafe9msheddf4de95aef5e2p1276b3jsn80ea3cfb285a',
                'x-rapidapi-host': 'amazon-price1.p.rapidapi.com'
            }
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
                console.error(error);
            })

        }

    }, [])

    let updateOptions = (name, value) => {
        console.log(name, value)
        setOptions(prev => ({
            ...prev,
            [name]: value
        }))
    }



    return(
        <div className='order'>
            <h2>Options</h2>
            <section>
                <h3>Storage options</h3>
                <div className='option'>
                    <input type='radio' name='storage' value='storage250' onChange={(e) => updateOptions(e.target.name, e.target.value)}/>
                    <div>250 GB M.2 SSD {prices.storage250 ? <span className='price'>{prices.storage250}</span> : <span className='loader'></span>}</div>
                </div>
                <div className='option'>
                    <input type='radio' name='storage' value='storage500' onChange={(e) => updateOptions(e.target.name, e.target.value)}/>
                    <div>500 GB M.2 SSD {prices.storage500 ? <span className='price'>{prices.storage500}</span> : <span className='loader'></span>}</div>
                </div>
                <div className='option'>
                    <input type='radio' name='storage' value='storage1000' onChange={(e) => updateOptions(e.target.name, e.target.value)}/>
                    <div>1000 GB M.2 SSD {prices.storage1000 ? <span className='price'>{prices.storage1000}</span> : <span className='loader'></span>}</div>
                </div>
                <div className='option'>
                    <input type='radio' name='storage' value='storage2000' onChange={(e) => updateOptions(e.target.name, e.target.value)}/>
                    <div>2000 GB M.2 SSD {prices.storage2000 ? <span className='price'>{prices.storage2000}</span> : <span className='loader'></span>}</div>
                </div>
            </section>
            <section>
                <h3>Wi-Fi options</h3>
                <div className='option'>
                    <input type='radio' name='wifi' value='none'onChange={(e) => updateOptions(e.target.name, e.target.value)}/>
                    <div>Ethernet Port Only <span className='price'>$0.00</span></div>
                </div>
                <div className='option'>
                    <input type='radio' name='wifi' value='wificard' onChange={(e) => updateOptions(e.target.name, e.target.value)}/>
                    <div>Ethernet Port & Wi-Fi {prices.wifi ? <span className='price'>{prices.wifi}</span> : <span className='loader'></span>}</div>
                </div>
            </section>
        </div>
    )
}

export default Order;
