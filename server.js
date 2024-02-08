
const express = require('express');
const app = express();
import serverless from "serverless-http";
import express, { Router } from "express";


const router = Router();
const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 5000;
app.options('/', (req, res) => {
    res.header('Access-Control-Allow-Methods', 'POST');
    res.send();
});
app.use(express.static('docs'));
app.use(express.json())

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/docs/index.html')
})

app.post('/', (req, res)=>{
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: 'lauthentiquemay@gmail.com',
            pass: 'jqvo omta fbtu nrql',
        },
    })

    const mailOptions= {
        from: req.body.name,
        to: 'lauthentiquemay@gmail.com',
        subject: `Message de ${req.body.name}: test`,
        text: req.body.message

    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.send('error');
        } else{
            console.log('Email sent: ' + info.response);
            res.send('success')
        }
    })
})


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})