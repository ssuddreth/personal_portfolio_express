const express = require('express');
const path = require('path');
const cors = require("cors");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(cors({ origin: "*" }));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

app.post("/send", async (req, res) => {
  let form = new multiparty.Form();
  let data = {};
  await form.parse(req, function (err, fields) {
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });
    console.log(data);
    const mail = {
      sender: `${data.first}  <${data.email}>`,
      to: process.env.EMAIL, // receiver email,
      subject: data.email,
      text: `${data.first} ${data.last} ${data.phone} <${data.email}> \n${data.message}`,
    };
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200).send("Email successfully sent to recipient!");
      }
    });
  });
});

app.listen(port);
console.log('Server started at port 3000');

module.exports = app;