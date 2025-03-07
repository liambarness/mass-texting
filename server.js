const express = require('express')
const fs = require('fs/promises');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const port = 3000;

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;

const client = twilio(accountSid, authToken);

const msg = 'MSG HERE';

app.get('/', async (req, res) => {
    try {
        const json = await fs.readFile('phonenumbers.json');
        const data = JSON.parse(json);

        const messages = data.map(entry => {
            const phone = entry.phone;
            const name = entry.name;
    

        if (!phone) {
            return Promise.resolve({
                phoneNumber,
                success: false,
                error: 'Invalid phone number'
              });
        }

        return client.messages.create({
            body:msg ,
            from:twilioNumber,
            to: "+1" + phone
        })
        .then(message => {
            return {
                phone,
                success: true,
                sid: message.sid
            }
        })
        .catch(error => {
            return {
                phone,
                succes: false,
                error: error.message
            }
        })
    })

        const msgResults = await Promise.all(messages);

        res.json({
            total: data.length,
            results: msgResults
        })
    
        

    }
    catch (err) {
        console.log(err);
        res.status(500).send('Error processing phone numbers');

    }

})

app.listen(port, () => {
  console.log(`mass-texting listening on port ${port}`)
})