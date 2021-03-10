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
    
    //-----Admin Settings-----//
    
    let quantityLimit = 5;
    let laborRate = 100;
    let taxRate = 0.0727;
    let shippingRate = 12.80;

    let [partsTotal, setPartsTotal] = useState(0);
    let [taxTotal, setTaxTotal] = useState(0);
    let [laborTotal, setLaborTotal] = useState(0);
    let [shippingTotal, setShippingTotal] = useState(0);
    let [grandTotal, setGrandTotal] = useState(0);
    
    
    let data = require('../data.json');

    
    let [parts, setParts] = useState({
        cpu: {
            name: 'AMD Ryzen 3 2200G',
            price: '181.98'
        },
        ram: {
            name: 'Gigastone DDR4 16GB',
            price: '68.99'
        },
        psu: {
            name: 'EVGA 80+ BRONZE 450W',
            price: '44.43'
        },
        storage250: {
            name: 'Inland Professional 256GB NVMe M.2 SSD',
            price: '37.99'
        },
        storage500: {
            name: 'Inland Professional 512GB NVMe M.2 SSD',
            price: '57.99'
        },
        storage1000: {
            name: 'Inland Professional 1024GB NVMe M.2 SSD',
            price: '99.99'
        },
        storage2000: {
            name: 'WD Blue 2000GB NVMe M.2 SSD',
            price: '247.99'
        },
        mobo: {
            name: 'GIGABYTE GA-A320M-S2H',
            price: '90.54'
        },
        case: {
            name: 'Rosewill FBM-X2',
            price: '54.87'
        },
        wifi: {
            name: 'Cudy WE3000 AX',
            price: '27.90'
        }
    });
    
    //----^Admin Settings^----//

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
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });

        data.forEach((e, i) => {
            let comp = e.component;
            let name = e.name;
            let pri = e.price.slice(1);
            let use = e.use;

            let nameArr = name.split(" ");

            name = `${nameArr[0]} ${nameArr[1]} ${nameArr[2]} ${nameArr[3]}`

            if(use){
                parts[comp].name = name;
                parts[comp].price = pri;
            }
        })

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

    useEffect(() => {
        setPartsTotal((+sumTotal.slice(1)*inputs.quantity).toFixed(2));
        setTaxTotal((partsTotal*taxRate).toFixed(2));
        setLaborTotal((laborRate*inputs.quantity).toFixed(2));
        setShippingTotal((shippingRate*inputs.quantity).toFixed(2));
        setGrandTotal((+partsTotal + +taxTotal + +laborTotal + +shippingTotal).toFixed(2));
    })

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
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let toForm = {
            "Timestamp": (date + " " +time),
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
            "Tax": taxTotal,
            "Labor": laborTotal,
            "Shipping": shippingTotal,
            "Total Due": "$" + (grandTotal)
        }
        axios.post(scriptURL, toForm)
        .then(response => {
          console.log("SUCCESS!", response.status, "OK");
        }).catch(error => {
            console.log(error)
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
        `
        <div>
        <h2>Order: ${orderCode}</h2>
        <h3>Hi ${firstName} ${lastName},</h3>

        <p>Order Details:</p>
        <table style='width: 500px; border: 1px solid black;' cellpadding='0' cellspacing='0'>
            <tbody>
                <tr>
                    <th style='text-align: left; width: 50%; border-bottom: 2px solid #000;'>Item</th>
                    <th style='text-align: left; width: 15%; border-bottom: 2px solid #000;'>Rate</th>
                    <th style='text-align: left; width: 10%; border-bottom: 2px solid #000;'>Qty</th>
                    <th style='text-align: left; width: 25%; border-bottom: 2px solid #000;'>Total</th>
                </tr>
                <tr>
                    <td>Computer Prices</td>
                    <td>${sumTotal}</td>
                    <td>${inputs.quantity}</td>
                    <td>$${partsTotal}</td>
                </tr>
                <tr>
                    <td style='background: #c89bf5;'>Tax</td>
                    <td style='background: #c89bf5;'></td>
                    <td style='background: #c89bf5;'></td>
                    <td style='background: #c89bf5;'>$${taxTotal}</td>
                </tr>
                <tr>
                    <td>Labor</td>
                    <td></td>
                    <td></td>
                    <td>$${laborTotal}</td>
                </tr>
                <tr>
                    <td style='background: #c89bf5;'>Shipping</td>
                    <td style='background: #c89bf5;'></td>
                    <td style='background: #c89bf5;'></td>
                    <td style='background: #c89bf5;'>$${shippingTotal}</td>
                </tr>
                <tr>
                    <td style='border-top: 2px solid #000;'>Approximate Total Due:</td>
                    <td style='border-top: 2px solid #000;'></td>
                    <td style='border-top: 2px solid #000;'></td>
                    <td style='border-top: 2px solid #000;'><strong>$${grandTotal}</strong></td>
                </tr>
            </tbody>
        </table>

        <p>Thank you for your order! Here is what will happen next:</p>
        <ol>
            <li>I will order the parts to build the computer(s).</li>
            <li>When the parts arrive, I will build the computer(s).</li>
            <li>I will send you an invoice with the final amount due.</li>
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
            if(inputs.quantity < quantityLimit){
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
                    <p>Limit {quantityLimit} per order.</p>
                </div>
            </section>
            <section>
                <h2 className='package'>Each computer includes:</h2>
                
                <div className='row'>
                    <div>
                        <h4>{parts.case.name}</h4>  
                        <p>Case</p>  
                    </div>
                    <div className='price'>{prices.case ? prices.case : <span className='loader'></span>}</div>
                </div>
                <div className='row'>
                    <div>
                        <h4>{parts.mobo.name}</h4>  
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
                        <h4>{parts.ram.name}</h4>  
                        <p>RAM</p>  
                    </div>
                    <div className='price'>{prices.ram ? prices.ram : <span className='loader'></span>}</div>
                </div>
                <div className='row'>
                    <div>
                        <h4>{parts.psu.name}</h4>  
                        <p>PSU</p>  
                    </div>
                    <div className='price'>{prices.psu ? prices.psu : <span className='loader'></span>}</div>
                </div>
            </section>
            <section>
                <span id='storageOption'></span>
                <h3>Storage options</h3>
                <p className='bottomBorder'>Select how much storage you need each computer to have.</p>
                <div className='option'>
                    <input type='radio' name='storage' value='storage250' onChange={(e) => {
                        setOptionsPrices(prev=>({
                            ...prev,
                            storage: prices[e.target.value]
                        }))
                        updateOptions(e.target.name, e.target.value)
                    }}/>
                    <div>{parts.storage250.name} {prices.storage250 ? <span className='price'>{prices.storage250}</span> : <span className='loader'></span>}</div>
                </div>
                <div className='option'>
                    <input type='radio' name='storage' value='storage500' onChange={(e) => {
                        setOptionsPrices(prev=>({
                            ...prev,
                            storage: prices[e.target.value]
                        }))
                        updateOptions(e.target.name, e.target.value)
                    }}/>
                    <div>{parts.storage500.name} {prices.storage500 ? <span className='price'>{prices.storage500}</span> : <span className='loader'></span>}</div>
                </div>
                <div className='option'>
                    <input type='radio' name='storage' value='storage1000' onChange={(e) => {
                        setOptionsPrices(prev=>({
                            ...prev,
                            storage: prices[e.target.value]
                        }))
                        updateOptions(e.target.name, e.target.value)
                    }}/>
                    <div>{parts.storage1000.name} {prices.storage1000 ? <span className='price'>{prices.storage1000}</span> : <span className='loader'></span>}</div>
                </div>
                <div className='option'>
                    <input type='radio' name='storage' value='storage2000' onChange={(e) => {
                        setOptionsPrices(prev=>({
                            ...prev,
                            storage: prices[e.target.value]
                        }))
                        updateOptions(e.target.name, e.target.value)
                    }}/>
                    <div>{parts.storage2000.name} {prices.storage2000 ? <span className='price'>{prices.storage2000}</span> : <span className='loader'></span>}</div>
                </div>
            </section>
            <section>
                <span id='wifiOption'></span>
                <h3>Wi-Fi options</h3>
                <p className='bottomBorder'>Do you want each computer to have a Wi-Fi card?</p>
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
                </div>
                <div className='option'>
                    <div>Computer Prices ({`${sumTotal} x ${inputs.quantity}`}): <span className='price'>{`$${partsTotal}`}</span>
                    </div>
                </div>
                <div className='option'>
                    <div>Tax: <span className='price'>{`$${taxTotal}`}</span>
                    </div>
                </div>
                <div className='option'>
                    <div>Labor: <span className='price'>{`$${laborTotal}`}</span></div>
                </div>
                <div className='option'>
                    <div>Shipping: <span className='price'>{`$${shippingTotal}`}</span>
                    </div>
                </div>
                <div className='option total'>
                    <div>Total: <span className='price'>{`*$${grandTotal}`}</span>
                    </div>
                </div>
                <p className='disclaimer'>*Approximate price. Price may change due to computer part prices and availablity. A final invoice will be sent to you once the parts are ordered and the computers are built.</p>
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
