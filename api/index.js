require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
// app.use(cors());
app.use(
  cors({
    origin: "*", // Puedes especificar la URL permitida
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.json());

const port = process.env.PORT || 3001;

app.post("/send-email", async (req, res) => {
  const { nombre, telefono, apellido, mensaje, type } = req.body;
  let to = "rubzat@gmail.com";
  let fromName = "TrazoMailer";
  if (type == "auriquim") {
    to = "rubzat@gmail.com";
  }
  if (type == "aem") {
    to = "rubzat@gmail.com";
  }
  if (type == "itdraft") {
    to = "contacto@itdraft.mx";
    fromName = "ITDraft";
  }
  const email = {
    fromName,
    to,
    subject: 'Nuevo Cliente',
    from: process.env.EMAIL_FROM,
    bodyText: `Nombre: ${nombre} ${apellido}, Telefono: ${telefono}, Mensaje: ${mensaje}, `,
    apiKey: process.env.ELASTIC_EMAIL_API_KEY,
  };
  try {
    const response = await axios.post(
      "https://api.elasticemail.com/v2/email/send",
      null,
      {
        params: email,
      }
    );
    res
      .status(200)
      .send({ message: "Email sent successfully", data: response.data });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error sending email", error: error.message });
  }
});

app.get("/send-terraexpert", async (req, res) => {
  const { Name, Email, Phone, Message } = req.query;

  // Validar datos
  if (!Name || !Email || !Phone || !Message) {
    return res.status(400).json({ error: "Faltan datos requeridos" });
  }

  const email = {
    to: "rubzat@gmail.com",
    subject: Email,
    from: process.env.EMAIL_FROM,
    bodyText: `Name: ${Name}, Phone: ${Phone}, Mensaje: ${Message}, `,
    fromName: "TrazoMailer",
    apiKey: process.env.ELASTIC_EMAIL_API_KEY,
  };

  try {
    const response = await axios.post(
      "https://api.elasticemail.com/v2/email/send",
      null,
      {
        params: email,
      }
    );
    res
      .status(200)
      .send({ message: "Email sent successfully", data: response.data });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error sending email", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
