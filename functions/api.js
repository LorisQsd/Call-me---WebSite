const express = require("express");
const serverless = require("serverless-http");
const dotenv = require("dotenv");
const sgMail = require("@sendgrid/mail")
const cors = require("cors");

const app = express();
const router = express.Router();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// === CORS === //
app.use(
  cors({
    origin: [
      'https://call-me-bs.netlify.app',
    ],
    credentials: true,
    methods: 'GET,POST',
  })
);

app.use(router);

router.get("/test", (req, res) => {
    res.status(200).json("API Fonctionnelle")
})

router.post('/send', async (req, res) => {
  const { name, email, object, message } = req.body;

  // Send grid configuration
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "callme13790@gmail.com",
    from: 'immoprosoclock@gmail.com',
    subject: object,
    text: `Auteur - ${name}
Mail - ${email}
Message - ${message}` ,
  };

  try { 
    await sgMail.send(msg)

    res.status(200).json('Votre email a bien été envoyé');
  } catch (error) {
    res.status(400).json(error)
  }
});

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);
