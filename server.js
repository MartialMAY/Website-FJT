
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const router = express.Router();

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/docs/index.html')
})

router.post('/send-email', async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: req.body.name,
      to: 'lauthentiquemay@gmail.com',
      subject: `Message de ${req.body.name}: test`,
      text: req.body.message,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'An error occurred while sending email' });
  }
});
app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // Netlify functions route

module.exports = app;
module.exports.handler = serverless(app);