import express, { Router } from 'express';
import serverless from "serverless-http";
import cors from 'cors';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

dotenv.config();

const app = express();
const router = new Router();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// === CORS === //
app.use(
  cors({
    origin: [
      // === LOCAL DEV === //
      'http://localhost:3000',
    ],
    credentials: true,
    methods: 'GET,PATCH,POST,DELETE',
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
    to: "loris.quesado@hotmail.fr",
    from: 'immoprosoclock@gmail.com',
    subject: object,
    text: `Auteur - ${name}
    mail - ${email}
    Message : ${message}` ,
  };

  try { 
    await sgMail.send(msg)

    res.status(200).json('Votre email a bien été envoyé');
  } catch (error) {
    res.status(400).json(error)
  }

});

app.use("/.netlify/functions/api.js", router)

export default serverless(app);

// === SERVER === //
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port http://localhost:${PORT}`);
});