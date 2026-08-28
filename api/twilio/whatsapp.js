const twilio = require('twilio');

const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

function twiml(innerXml) {
  return `<?xml version="1.0" encoding="UTF-8"?><Response>${innerXml}</Response>`;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const signature = req.headers['x-twilio-signature'];
  const url = 'https://ai-musteri-randevu-asistani.vercel.app/api/twilio/whatsapp';
  const params = req.body || {};

  const isValid = twilio.validateRequest(AUTH_TOKEN, signature, url, params);
  if (!isValid) {
    res.status(403).send('Invalid Twilio signature');
    return;
  }

  const body = (params.Body || '').trim();
  const from = params.From;

  if (!body || !from) {
    res.status(400).send('Bad Request');
    return;
  }

  const responseXml = twiml(
    '<Message>Mesajınızı aldık. Talebiniz işleniyor.</Message>'
  );

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(responseXml);
};
