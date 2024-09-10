const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 5174;

app.use(bodyParser.json());

app.post('/enviar-correo', (req, res) => {
  const { user_name, user_email, message } = req.body;

  // Configura el transportador de nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tu_email@gmail.com',
      pass: 'tu_contraseña'
    }
  });

  const mailOptions = {
    from: user_email,
    to: 'destinatario@ejemplo.com',
    subject: `Mensaje de ${user_name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Mensaje enviado con éxito');
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});