
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const nodemailer = require('nodemailer');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('App is running..');
});

router.post('/', (req, res) => {
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

  const mailOptions = {
    from: req.body.name,
    to: 'lauthentiquemay@gmail.com',
    subject: `Message de ${req.body.name}: test`,
    text: req.body.message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('error');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('success');
    }
  });
});

app.use(express.json());
app.use('/.netlify/functions/server', router); // Base path for Netlify Functions
app.use(express.static('docs')); // Assuming your static files are in the 'docs' directory

module.exports.handler = serverless(app);