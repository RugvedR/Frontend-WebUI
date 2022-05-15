const express = require("express");
const path = require("path");
const fs = require('fs');
const bodyparser = require("body-parser");
const app = express();
const port = 80;

//mongoose 
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
}

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
});

const Contact = mongoose.model('Contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))//for serving static files
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine', 'pug');//set the templage engine as pug**********
app.set('views', path.join(__dirname, 'views'));//set the views directory

//ENDPOINTS
app.get('/', (req, res)=> {
    const params = {};
    res.status(200).render('home.pug', params)
});
app.get('/contact', (req, res)=> {
    const params = {};
    res.status(200).render('contact.pug', params)
});
app.get('/about', (req, res)=> {
    const params = {};
    res.status(200).render('about.pug', params)
});

//post req
app.post('/contact', (req, res)=> {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database.");
        // alert("Form submitted successfully.");
    }).catch(()=>{
        res.status(400).send("item was not saved to the databasse.");
    });
    // res.status(200).render('contact.pug');
});

//START THE SERVER
app.listen(port, ()=>{
    console.log(`this application started successfully on port ${port}`);
});