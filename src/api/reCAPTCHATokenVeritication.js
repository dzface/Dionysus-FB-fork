const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const RECAPTCHA_SECRET_KEY = '6Lde4OgpAAAAAGxXlDLa0dUvqLVtPLR86CwpPwXn';

app.use(bodyParser.json());

app.post('/api/verify-recaptcha', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ success: false, error: 'No token provided' });
  }

  try {
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
      params: {
        secret: RECAPTCHA_SECRET_KEY,
        response: token,
      },
    });

    const { success } = response.data;

    if (!success) {
      return res.status(400).json({ success: false, error: 'Failed reCAPTCHA verification' });
    }

    // reCAPTCHA 검증이 성공한 경우
    res.status(200).json({ success: true, message: 'reCAPTCHA verification successful' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error during reCAPTCHA verification' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;