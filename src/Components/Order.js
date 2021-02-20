import '../Styles/Order.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs';
import axios from "axios";
import { init } from 'emailjs-com';
import emailjs from 'emailjs-com';
import termsAndConditions from '../../src/TermsandConditions.pdf';
import logo from '../Cheese.png';
init("user_V9dVOdqrRCfPsTshTaIcD");


const Order = (props) => {
    let parts = {
        cpu: 'B079D3DBNM',
        // ram: 'B088T2KNZ4',
        ram: 'B08KGGPTYH',
        psu: 'B07DTP6SLJ',
        // storage250: 'B07YFF8879',
        storage250: 'B08KZS8N8Y',
        // storage500: 'B07YFF3JCN',
        storage500: 'B08KZQYW2D',
        // storage1000: 'B07YFFX5MD',
        storage1000: 'B08KZPBGXV',
        storage2000: 'B08K4NP5DQ',
        mobo: 'B079NYQQJJ',
        // case: 'B08GNFCB1M',
        case: 'B07MDJ2RW8',
        wifi: 'B082NZYDDM'
    }
    let [prices, setPrices] = useState({
                                        none: '0'
                                    });
    let [toSum, setToSum] = useState({
                                        cpu: 'cpu',
                                        ram: 'ram',
                                        psu: 'psu',
                                        mobo: 'mobo',
                                        case: 'case',
                                    });
    let [sum, setSum] = useState('');
    let [sumTotal, setSumTotal] = useState('');
    let [optionsPrices, setOptionsPrices] = useState({
                                        storage: '0',
                                        wifi: '0'
                                    });
    let [options, setOptions] = useState({});
    let [inputs, setInputs] = useState({ 
                                        firstName: '',
                                        lastName: '',
                                        phone: '',
                                        email: '',
                                        shippingAddressStreet: '',
                                        shippingAddressCity: '',
                                        shippingAddressState: '',
                                        shippingAddressZIP: '',
                                        quantity: 1
                                    })
    let [orderSubmitted, setOrderSubmitted] = useState('');
    let [orderReceived, setOrderReceived] = useState('');
    let [isLoading, setIsLoading] = useState(false);
    let orderCode;
    let r = '';

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
        for(let p = 0; p < Object.keys(toSum).length; p++){
            if(prices[toSum[Object.keys(toSum)[p]]]){
                sum += (+prices[Object.keys(toSum)[p]].slice(1));
            }
        }
        sum += +optionsPrices.storage || 0;
        sum += +optionsPrices.wifi || 0;

        setSum(`$${sum.toFixed(2)}`)
        setSumTotal(`$${sum.toFixed(2)}`)
    }, [prices, toSum])

    useEffect(() => {
        let total = 0;
        total += +sum.slice(1);
        total += +optionsPrices.storage.slice(1);
        total += +optionsPrices.wifi.slice(1);

        setSumTotal(`$${total.toFixed(2)}`)
    }, [optionsPrices])


    const makeTaco = (type, text) => {
        let tacos = document.getElementById('tacos');
        let taco = document.createElement('div');
        let t = document.createElement('p');
        t.innerHTML = type;
        let message = document.createElement('p');
        message.innerHTML = text;
        taco.appendChild(t);
        taco.appendChild(message);
        tacos.appendChild(taco)
        setTimeout(() => {
            taco.remove();
        }, 5000)
    }


    let updateOptions = (name, value) => {
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

    let checkInputs = () => {
        let inp = document.getElementsByClassName('check');
        let errorFound = false;
        for(let i = 0; i < inp.length; i++){
            if(inp[i].value.length){
                inp[i].classList.add('success')
            }else{
                inp[i].classList.add('error');
                errorFound = true;
            }
        }
        return errorFound
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
        return `${prefix}${code}`
    }

    const sendToGoogleSheets = () => {
        const scriptURL = 'https://sheet.best/api/sheets/09661212-42a3-4c3f-be87-0bb097ee7601';

        let firstName = inputs.firstName;
        let lastName = inputs.lastName;
        let phone = inputs.phone;
        let email = inputs.email;
        let addressStreet = inputs.shippingAddressStreet;
        let addressCity = inputs.shippingAddressCity;
        let addressState = inputs.shippingAddressState;
        let addressZIP = inputs.shippingAddressZIP;
        let toForm = {
            "Order Number": orderCode,
            "Status": 'Order Recieved',
            "First Name": firstName,
            "Last Name": lastName,
            "Phone": phone,
            "Email": email,
            "Address Street": addressStreet,
            "Address City": addressCity,
            "Address State": addressState,
            "Address ZIP": addressZIP,
            "Quantity": inputs.quantity,
            "Storage Option": options.storage,
            "WiFi Option": options.wifi,
            "Price per Computer": sumTotal,
            "Total Due": "$" + (+sumTotal.slice(1) * inputs.quantity).toFixed(2)
        }

        axios.post(scriptURL, toForm)
        .then(response => {
          console.log("SUCCESS!", response.status, "OK");
        })

    }


    const submitRequest = async (e) => {
        let err = checkInputs();
        if(err){
            makeTaco('Error', 'Make sure to fill out all contact info fields.')
            document.getElementById("contactInfo").scrollIntoView({behavior: 'smooth', block: 'start'});
            setTimeout(() => {
                setIsLoading(false);
            }, 100)
            return
        }
        e.preventDefault();
        orderCode = await generateOrderCode();
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

        var templateParams = {
            subject,
            html,
            to: emailTo,

        };
         

        emailjs.send('default_service', 'template_wx84hwg', templateParams)
            .then(function(response) {
               console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
               console.log('FAILED...', error);
            });

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
            <p>Storage: ${options.storage}</p>
            <p>Wifi: ${options.wifi}</p>
            <p>Quantity: ${inputs.quantity}</p>
        </div>`

        var params = {
            html: toRicoEmail,
            subject: `New Order - ${orderCode}`,
            to: "ezworkpc@gmail.com",

        };
         

        emailjs.send('default_service', 'template_wx84hwg', params)
            .then(function(response) {
                setOrderReceived(true)
                setIsLoading(false)
                props.history.push('/thanks')
            }, function(error) {
                console.log('FAILED...', error);
        });

        sendToGoogleSheets()
    };

    const updateQuantity = (val) => {
        if(val === '+'){
            if(inputs.quantity < 10){
                setInputs(prev => ({
                    ...prev,
                    quantity: inputs.quantity + 1
                }))
            }
        }
        if(val === '-'){
            if(inputs.quantity > 1){
                setInputs(prev => ({
                    ...prev,
                    quantity: inputs.quantity - 1
                }))
            }
        }
    }

    return(
        <div className='order'>
            <section>
                <h1>Let's get this rolling.</h1>
            </section>
            <h2>Order</h2>
            <section>
                <h3>How many computers do you need?</h3>
                <div className='option textInput' id='quantity'>
                    <h2>I need</h2>
                    <div id='quant-element'>
                        <button className='quant-button' onClick={() => updateQuantity('-')}><BsFillCaretDownFill/></button>
                        <input readOnly className='check' type='number' name='quantity' min='1' max='10' value={inputs.quantity} onChange={(e) => handleInput(e.target.name, e.target.value)}/>
                        <button className='quant-button' onClick={() => updateQuantity('+')}><BsFillCaretUpFill /></button>
                    </div>
                    <h2>{inputs.quantity > 1 ? 'computers.' : 'computer.'}</h2>
                </div>
                <div className='p'>
                    <p>Limit 10 per order.</p>
                </div>
            </section>
            <section>
                <h2 className='package'>Each computer includes:</h2>
                
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
                        <h4>EVGA 450 Watt 80+ Bronze</h4>  
                        <p>PSU</p>  
                    </div>
                    <div className='price'>{prices.psu ? prices.psu : <span className='loader'></span>}</div>
                </div>
            </section>
            <section>
                <span id='storageOption'></span>
                <h3>Storage options</h3>
                <p>Select how much storage you need each computer to have.</p>
                <div className='option'>
                    <input type='radio' name='storage' value='storage250' onChange={(e) => {
                        setOptionsPrices(prev=>({
                            ...prev,
                            storage: prices[e.target.value]
                        }))
                        updateOptions(e.target.name, e.target.value)
                    }}/>
                    <div>250 GB M.2 SSD {prices.storage250 ? <span className='price'>{prices.storage250}</span> : <span className='loader'></span>}</div>
                </div>
                <div className='option'>
                    <input type='radio' name='storage' value='storage500' onChange={(e) => {
                        setOptionsPrices(prev=>({
                            ...prev,
                            storage: prices[e.target.value]
                        }))
                        updateOptions(e.target.name, e.target.value)
                    }}/>
                    <div>500 GB M.2 SSD {prices.storage500 ? <span className='price'>{prices.storage500}</span> : <span className='loader'></span>}</div>
                </div>
                <div className='option'>
                    <input type='radio' name='storage' value='storage1000' onChange={(e) => {
                        setOptionsPrices(prev=>({
                            ...prev,
                            storage: prices[e.target.value]
                        }))
                        updateOptions(e.target.name, e.target.value)
                    }}/>
                    <div>1000 GB M.2 SSD {prices.storage1000 ? <span className='price'>{prices.storage1000}</span> : <span className='loader'></span>}</div>
                </div>
                <div className='option'>
                    <input type='radio' name='storage' value='storage2000' onChange={(e) => {
                        setOptionsPrices(prev=>({
                            ...prev,
                            storage: prices[e.target.value]
                        }))
                        updateOptions(e.target.name, e.target.value)
                    }}/>
                    <div>2000 GB M.2 SSD {prices.storage2000 ? <span className='price'>{prices.storage2000}</span> : <span className='loader'></span>}</div>
                </div>
            </section>
            <section>
                <span id='wifiOption'></span>
                <h3>Wi-Fi options</h3>
                <p>Do you want each computer to have a Wi-Fi card?</p>
                <div className='option'>
                    <input type='radio' name='wifi' value='none' onChange={(e) => {
                        setOptionsPrices(prev=>({
                            ...prev,
                            wifi: prices[e.target.value]
                        }))
                        updateOptions(e.target.name, e.target.value)
                        }}/>
                    <div>Ethernet Port Only <span className='price'>$0.00</span></div>
                </div>
                <div className='option'>
                    <input type='radio' name='wifi' value='wifi' onChange={(e) =>{
                        setOptionsPrices(prev=>({
                            ...prev,
                            wifi: prices[e.target.value]
                        }))
                        updateOptions(e.target.name, e.target.value)
                        }}/>
                    <div>Ethernet Port & Wi-Fi {prices.wifi ? <span className='price'>{prices.wifi}</span> : <span className='loader'></span>}</div>
                </div>
            </section>
            <section>
                <div className='option total'>
                    <div>Cost per Computer: <span className='price'>*{sumTotal}</span>
                    </div>
                </div>
                <p className='disclaimer'>*Price per computer pre-taxes. Does not include $100.00 labor fee, shipping fee, or taxes.</p>
            </section>
            <section>
                <div className='option buttons'>
                    {isLoading ? (
                        <div className='loader'></div>
                        ) : (
                        <button onClick={(e) => {
                            if(!options.storage){
                                makeTaco('Error', 'Select a storage option.')
                                document.getElementById("storageOption").scrollIntoView({behavior: 'smooth'});
                                return
                            }
                            if(!options.wifi){
                                makeTaco('Error', 'Select a Wi-Fi option.')
                                document.getElementById("wifiOption").scrollIntoView({behavior: 'smooth', block: 'start'});
                                return
                            }
                            setOrderSubmitted('submitted');
                            setIsLoading(true)
                            setTimeout(() => {
                                document.getElementById("contactInfo").scrollIntoView({behavior: 'smooth', block: 'start'});
                                setIsLoading(false)
                            }, 500)
                        }}>Continue</button>)
                    }
                </div>
            <span id='contactInfo'></span>
            </section>
            <div className={'confirmation ' + orderSubmitted}>
                <section>
                    <h2>Contact Info</h2>
                    <div className='option textInput'>
                        <div>First Name:</div>
                        <input className='check' type='text' name='firstName' value={inputs.firstName} placeholder='Enter First Name...' onChange={(e) => handleInput(e.target.name, e.target.value)}/>
                    </div>
                    <div className='option textInput'>
                        <div>Last Name:</div>
                        <input className='check' type='text' name='lastName' value={inputs.name} placeholder='Enter Last Name...' onChange={(e) => handleInput(e.target.name, e.target.value)}/>
                    </div>
                    <div className='option textInput'>
                        <div>Phone Number:</div>
                        <input className='check' type='tel' name='phone' pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" value={inputs.name} placeholder='Enter Phone Number...' onChange={(e) => handleInput(e.target.name, e.target.value)}/>
                    </div>
                    <div className='option textInput'>
                        <div>Email Address:</div>
                        <input className='check' type='email' name='email' value={inputs.name} placeholder='Enter Email Address...' onChange={(e) => handleInput(e.target.name, e.target.value)}/>
                    </div>
                    <div className='option textInput'>
                        <div>Shipping Address:</div>
                        <input className='check' type='text' name='shippingAddressStreet' value={inputs.name} placeholder='Street...' onChange={(e) => handleInput(e.target.name, e.target.value)}/>
                        <div>
                            <input className='check' type='text' name='shippingAddressCity' value={inputs.name} placeholder='City...' onChange={(e) => handleInput(e.target.name, e.target.value)}/>
                            <input className='check' type='text' name='shippingAddressState' value={inputs.name} placeholder='State...' onChange={(e) => handleInput(e.target.name, e.target.value)}/>
                            <input className='check' type='text' name='shippingAddressZIP' value={inputs.name} placeholder='ZIP...' onChange={(e) => handleInput(e.target.name, e.target.value)}/>
                        </div>
                    </div>
                </section>
                <section>
                    <div className='option buttons'>
                    {isLoading ? (
                        <div className='loader'></div>
                        ) : (
                        <button onClick={(e) => {
                            submitRequest(e);
                            setIsLoading(true)
                        }}>Submit</button>)
                    }
                    {isLoading ? (
                        <div className='loader'></div>
                        ) : (
                        <Link replace to='/order' onClick={(e) => {
                            setOrderSubmitted('');
                        }}>Cancel</Link>)
                    }
                    </div>
                    <div className='buttons'>
                        <div>
                            <p>By clicking submit, I accept the&nbsp;
                            <a id='terms-and-conditions' href={termsAndConditions} download> Terms and Conditions</a>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            <div id='tacos'></div>
        </div>
    )
}

export default Order;
