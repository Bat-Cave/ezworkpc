import '../Styles/Home.css';
import React, { useState, useEffect } from 'react';
import {Link, withRouter} from 'react-router-dom';
import Banner from './Banner';
import ReactGA from 'react-ga';


const Home = () => {

    let data = require('../data.json');

    //-----Admin Settings-----//

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
            asin: 'B08KZQYW2D'
        },
        storage1000: {
            name: 'Inland Professional 1024GB NVMe M.2 SSD',
            asin: 'B08KZPBGXV'
        },
        storage2000: {
            name: 'WD Blue 2000GB NVMe M.2 SSD',
            asin: 'B08K4NP5DQ'
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

    let [prices, setPrices] = useState({});
    let [sum, setSum] = useState('');
    
    let partsKeys = Object.keys(parts)
    

useEffect(() => {
    
    document.title = "ezworkpc - Home";

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
        let img = e.imgsrc;
        let link = e.link;

        let nameArr = name.split(" ");

        name = `${nameArr[0]} ${nameArr[1]} ${nameArr[2]} ${nameArr[3]}`

        if(use){
            parts[comp].name = name;
            parts[comp].price = pri;
            parts[comp].imgsrc = img;
            parts[comp].link = link;
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
    for(let p = 0; p < Object.keys(prices).length; p++){
        if(Object.keys(prices)[p] !== "storage500" && Object.keys(prices)[p] !== "storage1000" && Object.keys(prices)[p] !== "storage2000"){
            sum += (+prices[Object.keys(prices)[p]].slice(1));
        }
    }
    setSum(`$${sum.toFixed(2)}`)
}, [prices])

    return(
            <div className='home'>
                <Banner phrase="It's Easy Cheesy." />
                <section>
                    <div className='currentBuild'>
                        <div>
                            <div>
                                <h2>The Workstation</h2>
                                <p>Snappy desktop computer that doesn't break the budget.</p>
                                <br></br>
                                <br></br>
                                <Link to='/order' onClick={() => {
                                    ReactGA.event({
                                        category: 'Links',
                                        action: 'Clicked First Order Link',
                                        label: 'Order Now',
                                        value: 1
                                      });
                                }}>Order Now</Link>
                            </div>
                            <img src={parts.case.imgsrc} alt="Black Micro ATX Computer Case"/>

                        </div>
                    </div>
                </section>
                <section>
                    <h2>How it works</h2>
                    <div className='how-it-works'>
                        <div className='hiw-row'>
                            <h2>Step 1</h2>
                            <p>Specify how many computers and how much storage you need, and if you need Wi-Fi or not. (all computers come with an Ethernet port)</p>
                        </div>
                        <div className='hiw-row'>
                            <h2>Step 2</h2>
                            <p>I buy the parts and build the computers.</p>
                        </div>
                        <div className='hiw-row'>
                            <h2>Step 3</h2>
                            <p>I send the computers to you ready to plug in and play.</p>
                        </div>
                    </div>
                </section>
                <section>
                    <h2>Specifications</h2>
                    <div className='bragger'>
                        <div className='spec'>
                            <h4>Clock Speed</h4>
                            <div className='spec-left'>
                                <h2>3.7</h2>
                                <p>GHz</p>
                            </div>
                            <div className='spec-right'>
                                <i className="fas fa-tachometer-alt"></i>
                            </div>
                        </div>
                        <div className='spec'>
                            <h4>Windows Version</h4>
                            <div className='spec-left'>
                                <h2>10</h2>
                                <p>Pro</p>
                            </div>
                            <div className='spec-right'>
                                <i className="fab fa-windows"></i>
                            </div>
                        </div>
                        <div className='spec'>
                            <h4>Memory</h4>
                            <div className='spec-left'>
                                <h2>16</h2>
                                <p>GB @ 2666 Mhz</p>
                            </div>
                            <div className='spec-right'>
                                <i className="fas fa-memory"></i>
                            </div>
                        </div>
                        <div className='spec'>
                            <h4>Bluetooth Version</h4>
                            <div className='spec-left'>
                                <h2>5.1</h2>
                                <p></p>
                            </div>
                            <div className='spec-right'>
                                <i className="fab fa-bluetooth"></i>
                            </div>
                        </div>
                        <div className='spec'>
                            <h4>Network Speed</h4>
                            <div className='spec-left'>
                                <h2>2,400</h2>
                                <p>Mbps</p>
                            </div>
                            <div className='spec-right'>
                                <i className="fas fa-wifi"></i>
                            </div>
                            <div className='compare'>
                                <h6>Compare</h6>
                                <div className='compare-row'>
                                    <p>WiFi 6</p>
                                    <h5>2,400 <span className='comp-little'>Mbps</span></h5>
                                </div>
                                <div className='compare-row'>
                                    <p>WiFi 5</p>
                                    <h5>1,200<span className='comp-little'>Mbps</span></h5>
                                </div>
                                <div className='compare-row'>
                                    <p>WiFi 4</p>
                                    <h5>300<span className='comp-little'>Mbps</span></h5>
                                </div>
                            </div>
                        </div>
                        <div className='spec'>
                            <h4>Storage Read Speed</h4>
                            <div className='spec-left'>
                                <h2>2,100</h2>
                                <p>MB/s</p>
                            </div>
                            <div className='spec-right'>
                                <i className="fas fa-glasses"></i>
                            </div>
                            <div className='compare'>
                                <h6>Compare</h6>
                                <div className='compare-row'>
                                    <p>NVMe</p>
                                    <h5>2,100 <span className='comp-little'>MB/s</span></h5>
                                </div>
                                <div className='compare-row'>
                                    <p>SSD</p>
                                    <h5>550 <span className='comp-little'>MB/s</span></h5>
                                </div>
                                <div className='compare-row'>
                                    <p>HDD</p>
                                    <h5>115 <span className='comp-little'>MB/s</span></h5>
                                </div>
                            </div>
                        </div>
                        <div className='spec'>
                            <h4>Storage Write Speed</h4>
                            <div className='spec-left'>
                                <h2>1,500</h2>
                                <p>MB/s</p>
                            </div>
                            <div className='spec-right'>
                                <i className="fas fa-pen"></i>
                            </div>
                            <div className='compare'>
                                <h6>Compare</h6>
                                <div className='compare-row'>
                                    <p>NVMe</p>
                                    <h5>1,500<span className='comp-little'>MB/s</span></h5>
                                </div>
                                <div className='compare-row'>
                                    <p>SSD</p>
                                    <h5>500 <span className='comp-little'>MB/s</span></h5>
                                </div>
                                <div className='compare-row'>
                                    <p>HDD</p>
                                    <h5>100 <span className='comp-little'>MB/s</span></h5>
                                </div>
                            </div>
                        </div>
                        <div className='spec'>
                            <h4>Operations per Second</h4>
                            <div className='spec-left'>
                                <h2><span className='comp-little'>Up To</span>500k</h2>
                                <p>IOPS</p>
                            </div>
                            <div className='spec-right'>
                                <i className="fas fa-tasks"></i>
                            </div>
                            <div className='compare'>
                                <h6>Compare</h6>
                                <div className='compare-row'>
                                    <p>NVMe</p>
                                    <h5><span className='comp-little'>UP TO</span>500,000<span className='comp-little'>IOPS</span></h5>
                                </div>
                                <div className='compare-row'>
                                    <p>SSD</p>
                                    <h5><span className='comp-little'>UP TO</span>100,000<span className='comp-little'>IOPS</span></h5>
                                </div>
                                <div className='compare-row'>
                                    <p>HDD</p>
                                    <h5><span className='comp-little'>UP TO</span>100<span className='comp-little'>IOPS</span></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <Link to='/order' onClick={() => {
                        ReactGA.event({
                            category: 'Links',
                            action: 'Clicked Second Order Link',
                            label: 'Order Now',
                            value: 1
                            });
                    }}>Order Now</Link>
                </section>
                <section>
                <h3>Estimated Component Prices</h3>
                <div className='row'>
                    <div>
                        <h4><a href={parts.case.link} target="_blank">{parts.case.name}</a></h4>  
                        <p>Case</p>  
                    </div>
                    <div className='price'>{prices.case ? prices.case : <span className='loader'></span>}</div>
                </div>
                <div className='row'>
                    <div>
                        <h4><a href={parts.mobo.link} target="_blank">{parts.mobo.name}</a></h4>  
                        <p>Motherboard</p>  
                    </div>
                    <div className='price'>{prices.mobo ? prices.mobo : <span className='loader'></span>}</div>
                </div>
                <div className='row'>
                    <div>
                        <h4><a href={parts.cpu.link} target="_blank">{parts.cpu.name}</a></h4>  
                        <p>CPU/GPU</p>  
                    </div>
                    <div className='price'>{prices.cpu ? prices.cpu : <span className='loader'></span>}</div>
                </div>
                <div className='row'>
                    <div>
                        <h4><a href={parts.ram.link} target="_blank">{parts.ram.name}</a></h4>  
                        <p>RAM</p>  
                    </div>
                    <div className='price'>{prices.ram ? prices.ram : <span className='loader'></span>}</div>
                </div>
                <div className='row'>
                    <div>
                        <h4><a href={parts.storage250.link} target="_blank">{parts.storage250.name}</a></h4>  
                        <p>Storage (upgradable)</p>  
                    </div>
                    <div className='price'>{prices.storage250 ? prices.storage250 : <span className='loader'></span>}</div>
                </div>
                <div className='row'>
                    <div>
                        <h4><a href={parts.psu.link} target="_blank">{parts.psu.name}</a></h4>  
                        <p>Power Supply</p>  
                    </div>
                    <div className='price'>{prices.psu ? prices.psu : <span className='loader'></span>}</div>
                </div>
                <div className='row'>
                    <div>
                        <h4><a href={parts.wifi.link} target="_blank">{parts.wifi.name}</a></h4>  
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
        </div>
    )
}

export default withRouter(Home);
