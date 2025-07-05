const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', 'https://ayushsa23.netlify.app');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).end();
    return;
  }

  if (req.method === 'POST') {
    res.setHeader('Access-Control-Allow-Origin', 'https://ayushsa23.netlify.app');
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ success: false, error: 'All fields are required.' });
      return;
    }

    // Set up transporter using environment variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: process.env.EMAIL_USER,
        subject: `Portfolio Contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      });
      res.status(200).json({ success: true, message: 'Message sent!' });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
    return;
  }

  res.setHeader('Access-Control-Allow-Origin', 'https://ayushsa23.netlify.app');
  res.status(405).json({ error: 'Method Not Allowed' });
}; 