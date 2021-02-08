require('dotenv').config();
let express = require('express');
let app = express();
let cors = require('cors');
let nodemailer = require('nodemailer');
let {EMAIL, PASS} = process.env
const path = require('path');

app.use( express.static( `${__dirname}/../build` ) );
app.use(cors());
app.use(express.json());

app.post('/sendEmail', async (req, res) => {
    console.log(req.body)
    const {emailTo, subject, html} = req.body;

    let mailTransporter = nodemailer.createTransport({ 
        service: 'gmail', 
        auth: { 
            user: EMAIL, 
            pass: PASS
        } 
    }); 
      
    let mailDetails = { 
        from: EMAIL, 
        to: emailTo, 
        subject: subject, 
        html
    }; 
      
    mailTransporter.sendMail(mailDetails, function(err, data) { 
        if(err) { 
            console.log('Error Occurs'); 
        } else { 
            console.log('Email sent successfully'); 
            res.status(200).send('Email sent successfully.');
        } 
    }); 
})
  


const PORT = 8080;
app.listen(PORT, () => console.info(`Server listening on ${PORT}`))