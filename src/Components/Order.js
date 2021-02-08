import '../Styles/Order.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";



const Order = () => {
    let [prices, setPrices] = useState({});
    let [options, setOptions] = useState({});
    let [inputs, setInputs] = useState({ 
                                        firstName: '',
                                        lastName: '',
                                        phone: '',
                                        email: '',
                                        shippingAddressStreet: '',
                                        shippingAddressCity: '',
                                        shippingAddressState: '',
                                        shippingAddressZIP: ''
                                    })

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

    let handleInput = (name, value) => {
        setInputs(prev => ({
            ...prev,
            [name]: value
        }))
    }

    let generateOrderCode = () => {
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);
        }

        let prefix = 'ezworkpc-';
        let code = '';
        let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
        let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
        let randLetter;
        let randNum;
        let num = 0;
        for(let i = 0; i < 6; i++){
            if(num > 0){
                randLetter = getRandomInt(0, letters.length - 1);
                code += letters[randLetter];
            } else {
                randNum = getRandomInt(0, numbers.length - 1);
                code += numbers[randNum];
            }
            randLetter = '';
            randNum = '';
            num = getRandomInt(0, 2);
        }
        console.log(`${prefix}${code}`)
        return `${prefix}${code}`
    }

    const submitRequest = async (e) => {
        if(!options.storage){
            document.getElementById("storageOption").scrollIntoView({behavior: 'smooth'});
            return
        }
        if(!options.wifi){
            document.getElementById("wifiOption").scrollIntoView({behavior: 'smooth', block: 'start'});
            return
        }
        e.preventDefault();
        let orderCode = await generateOrderCode();
        let emailTo = inputs.email;
        let firstName = inputs.firstName;
        let lastName = inputs.lastName;
        let phone = inputs.phone;
        let email = inputs.email;
        let addressStreet = inputs.shippingAddressStreet;
        let addressCity = inputs.shippingAddressCity;
        let addressState = inputs.shippingAddressState;
        let addressZIP = inputs.shippingAddressZIP;
        let subject = 'I got your order!'
        let html = 
        `<div>
        <h2>Order: ${orderCode}</h2>
        <h3>Hi ${firstName} ${lastName},</h3>
        <p>Thank you for your order! Here is what will happen next:</p>
        <ol>
            <li>I will order the parts to build the computer(s).</li>
            <li>When the parts arrive, I will build the computer(s).</li>
            <li>I will send you an invoice.</li>
            <li>Once payment is received, I will send the computer(s) to you.</li>
        </ol>

        <p>Thanks,</p>
        <div style='display: flex; align-items: center;'>
            <img src="https://i.ibb.co/r51Wccm/Cheese.png" alt="Cheese" border="0" width='75px' height='75px'>
            <h3 style='margin-left: 12px;'>Rico Hancock</h3>
        </div>
        </div>`;
        await axios.post("/sendEmail", {emailTo, html, subject})
        .then(res => {
            console.log(res.data)
        })

        let toRicoEmail = `
        <div>
            <p>Order: ${orderCode}</p>
            <p>First Name: ${firstName}</p>
            <p>Last Name: ${lastName}</p>
            <p>Phone: ${phone}</p>
            <p>Email: ${email}</p>
            <p>Street: ${addressStreet}</p>
            <p>City: ${addressCity}</p>
            <p>State: ${addressState}</p>
            <p>ZIP: ${addressZIP}</p>
            <p>options: ${options.storage}, ${options.wifi}</p>
        </div>`

        await axios.post("/sendEmail", {emailTo: 'ezworkpc@gmail.com', html: toRicoEmail, subject: 'New Order!'})
        .then(res => {
            console.log(res.data)
        })
    };


    return(
        <div className='order'>
            <h2>Options</h2>
            <section>
                <span id='storageOption'></span>
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
                <span id='wifiOption'></span>
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
            <section>
                <h3>Contact Info</h3>
                <div className='option textInput'>
                    <div>First Name:</div>
                    <input type='text' name='firstName' value={inputs.name} placeholder='Enter First Name...' onChange={(e) => handleInput(e.target.name, e.target.value)}/>
                </div>
                <div className='option textInput'>
                    <div>Last Name:</div>
                    <input type='text' name='lastName' value={inputs.name} placeholder='Enter Last Name...' onChange={(e) => handleInput(e.target.name, e.target.value)}/>
                </div>
                <div className='option textInput'>
                    <div>Phone Number:</div>
                    <input type='text' name='phone' value={inputs.name} placeholder='Enter Phone Number...' onChange={(e) => handleInput(e.target.name, e.target.value)}/>
                </div>
                <div className='option textInput'>
                    <div>Email Address:</div>
                    <input type='text' name='email' value={inputs.name} placeholder='Enter Email Address...' onChange={(e) => handleInput(e.target.name, e.target.value)}/>
                </div>
                <div className='option textInput'>
                    <div>Shipping Address:</div>
                    <input type='text' name='shippingAddressStreet' value={inputs.name} placeholder='Street...' onChange={(e) => handleInput(e.target.name, e.target.value)}/>
                    <div>
                        <input type='text' name='shippingAddressCity' value={inputs.name} placeholder='City...' onChange={(e) => handleInput(e.target.name, e.target.value)}/>
                        <input type='text' name='shippingAddressState' value={inputs.name} placeholder='State...' onChange={(e) => handleInput(e.target.name, e.target.value)}/>
                        <input type='text' name='shippingAddressZIP' value={inputs.name} placeholder='ZIP...' onChange={(e) => handleInput(e.target.name, e.target.value)}/>
                    </div>
                </div>
            </section>
            <section>
                <h3>Finalize</h3>
                <div className='option'>
                    <button onClick={(e) => {
                        submitRequest(e)
                    }}>Submit</button>
                    {/* <button onClick={() => {
                        generateOrderCode()
                    }}>Order</button> */}
                </div>
            </section>
        </div>
    )
}

export default Order;
