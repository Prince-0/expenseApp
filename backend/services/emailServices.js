const SibApiV3Sdk = require('sib-api-v3-sdk');

console.log("KEY:", process.env.BREVO_API_KEY);

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

const sendEmail = async (toEmail, subject, htmlContent) => {
  try {
    await tranEmailApi.sendTransacEmail({
      sender: {
        email: "princeofmuz10@gmail.com", // MUST be verified in Brevo
        name: "Expense Tracker"
      },
      to: [{ email: toEmail }],
      subject,
      htmlContent
    });

    console.log("Email sent");

  } catch (err) {
    console.error("FULL ERROR:", err.response?.text || err.message);
  }
};

module.exports = sendEmail;