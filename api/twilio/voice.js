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
  const url = `https://${req.headers.host}${req.url}`;
  const params = req.body || {};

  const isValid = twilio.validateRequest(AUTH_TOKEN, signature, url, params);
  if (!isValid) {
    res.status(403).send('Invalid Twilio signature');
    return;
  }

  const speechResult = params.SpeechResult;

  const responseXml = speechResult
    ? twiml(
        '<Say language="tr-TR">Talebiniz alınmıştır. Ekibimiz en kısa sürede sizinle iletişime geçecektir. İyi günler dileriz.</Say><Hangup/>'
      )
    : twiml(
        '<Say language="tr-TR">Merhaba, aradığınız için teşekkür ederiz. Lütfen talebinizi kısaca belirtin.</Say>' +
          `<Gather input="speech" language="tr-TR" action="${url}" method="POST" timeout="5"></Gather>` +
          '<Say language="tr-TR">Bir konuşma algılanamadı. Lütfen daha sonra tekrar arayın.</Say>'
      );

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(responseXml);
};
