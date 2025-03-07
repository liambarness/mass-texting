const express = require('express')
const fs = require('fs');
const app = express()
const port = 3000

app.get('/', (req, res) => {
    fs.readFile('phonenumbers.json', (err, json) => {
        if(err) {
            console.log(err);
            return res.status(500).send('Error reading phone numbers');

        }
    

    try {
        const data = JSON.parse(json);
        console.log(data);
        res.send(data);
    }
    catch (err){ 
        console.log(err);
        res.status(500).send('Error parsing phone numbers data');
    }

})
});

app.listen(port, () => {
  console.log(`mass-texting listening on port ${port}`)
})