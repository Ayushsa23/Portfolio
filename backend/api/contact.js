module.exports = (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).end();
    return;
  }
  if (req.method === 'POST') {
    // TODO: Add your email logic here if needed
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ success: true, message: 'POST received!' });
    return;
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(405).json({ error: 'Method Not Allowed' });
}; 