require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000', // Puedes especificar la URL permitida
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.post('/send-email', async (req, res) => {
  const { subject, body, type } = req.body;
  let to = 'rubzat@gmail.com';
  if (type == 'auriquim') {
    to = 'rubzat@gmail.com';
  }
  if (type == 'aem') {
    to = 'rubzat@gmail.com';
  }
  const email = {
    to: to,
    subject: subject,
    from: process.env.EMAIL_FROM,
    bodyText: body,
    fromName: 'TrazoMailer',
    apiKey: process.env.ELASTIC_EMAIL_API_KEY,
  };

  try {
    const response = await axios.post('https://api.elasticemail.com/v2/email/send', null, {
      params: email,
    });
    res.status(200).send({ message: 'Email sent successfully', data: response.data });
  } catch (error) {
    res.status(500).send({ message: 'Error sending email', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});