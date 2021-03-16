import '../Styles/Contact.css';
import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import Banner from './Banner';
import ReactGA from 'react-ga';


const Contact = () => {
    let [inputs, setInputs] = useState({ 
                                            subject: '',
                                            respondEmail: '',
                                            message: ''
                                    });
    let [messageSent, setMessageSent] = useState(false);

    useEffect(() => {
    
        document.title = "ezworkpc - Contact";
    
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
    }, [])

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

    const sendEmail = () => {
        let err = checkInputs();
        if(!err){
            let message = `
                <div>
                    <p>Respond Email: ${inputs.respondEmail}</p>
                    <p>Subject: ${inputs.subject}</p>
                    <p>Message: ${inputs.message}</p>
                </div>`
            
            var params = {
                html: message,
                to: "ezworkpc@gmail.com",
        
            };
                     
            
            emailjs.send('default_service', 'template_wx84hwg', params)
                .then(function(response) {
                    setMessageSent(true)
                }, function(error) {
                    console.log('FAILED...', error);
            });
        }
    }

    return(
        <div className='contact'>
            <Banner phrase="Have a question?" />
            <section>
                <input className='check' type='text' name='respondEmail' value={inputs.firstName} placeholder='Enter Your Email...' onChange={(e) => handleInput(e.target.name, e.target.value)}/>
                <input className='check' type='text' name='subject' value={inputs.firstName} placeholder='Subject...' onChange={(e) => handleInput(e.target.name, e.target.value)}/>
                <textarea className='check' type='text' name='message' value={inputs.firstName} placeholder='Message...' onChange={(e) => handleInput(e.target.name, e.target.value)} rows='5'/>
            </section>
            <section>
                {!messageSent ? (
                    <button onClick={()=> sendEmail()}>
                        <div className="front">Send Message</div>
                        <div className="back">Send Message</div>
                    </button>
                ) : (
                    <h3>Thanks! I got your message. You'll receive a response within 24 hours.</h3>
                )}
            </section>
        </div>
    )
}

export default Contact;
