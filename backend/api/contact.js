const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();
const serverlessExpress = require('@vendia/serverless-express');

const app = express();

// Allow all origins for debugging
app.use(cors({
  origin: '*',
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// Handle preflight OPTIONS requests
app.options('/', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.status(204).send('');
});

// Get email credentials from environment variables
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

const rateLimitMap = {};
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes in ms

app.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }
  // Rate limiting by sender email
  const now = Date.now();
  if (rateLimitMap[email] && now - rateLimitMap[email] < RATE_LIMIT_WINDOW) {
    const wait = Math.ceil((RATE_LIMIT_WINDOW - (now - rateLimitMap[email])) / 60000);
    return res.status(429).json({ success: false, error: `Please wait ${wait} more minute(s) before sending another message.` });
  }
  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: EMAIL_USER,
      subject: `Portfolio Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    rateLimitMap[email] = now;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = serverlessExpress({ app }); 