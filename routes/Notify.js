// const express = require("express");
// const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

// const router = express.Router();

// // 1. Configure the AWS SES client
// // It will automatically use credentials from your environment variables
// const sesClient = new SESClient({
//   region: process.env.AWS_REGION,
// });

// router.post('/', async (req, res) => {
//   const { name, phone, email, category, now, userEmail } = req.body;

//   if (!name || !phone || !email || !category || !now || !userEmail) {
//     return res.status(400).json({ message: 'Missing required fields' });
//   }

//   // Date formatting logic remains the same
//   const formatDate = (isoDate) => {
//     const date = new Date(isoDate);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const requestDate = formatDate(now);

//   try {
//     // 2. HTML body construction remains the same
//     const subject = `New Service Request from ${name}`;
//     const htmlBody = `
//       <p>Dear Service Provider,</p>
//       <p>We are pleased to inform you of a new service request that matches your expertise on <strong>Aapna Network</strong>. Please find the details below:</p>
//       <h3>Client Information:</h3>
//       <p><strong>Name:</strong> ${name}</p>
//       <p><strong>Service Category:</strong> ${category}</p>
//       <p><strong>Requested Date:</strong> ${requestDate}</p>
//       <p><strong>Phone Number:</strong> ${phone}</p>
//       <p><strong>Email Address:</strong> ${userEmail}</p>
//       <p>We recommend reaching out to the client as soon as possible to confirm availability and discuss further requirements.</p>
//       <p>Thank you for being part of <strong>Aapna Network</strong> – Empowering Rural Talent.</p>
//       <p>
//         <strong>Aapna Network</strong><br />
//         🌐 <a href="https://www.aapnanetwork.in">www.aapnanetwork.in</a><br />
//         📧 support@aapnanetwork.in<br />
//         📞 +91-XXXXXXXXXX
//       </p>
//       <p><em>This is an automated message. Please do not reply to this email directly.</em></p>
//       <p style="font-size: 0.9em;">© Aapna Network. All rights reserved.</p>
//     `;

//     // 3. Create the parameters object for the SendEmailCommand
//     const params = {
//       Source: `"Aapna Network" <${process.env.SES_EMAIL_SOURCE}>`,
//       Destination: {
//         ToAddresses: [email], // The recipient's email address
//       },
//       Message: {
//         Subject: {
//           Data: subject,
//           Charset: 'UTF-8',
//         },
//         Body: {
//           Html: {
//             Data: htmlBody,
//             Charset: 'UTF-8',
//           },
//         },
//       },
//     };

//     // 4. Send the email using the SES client
//     const command = new SendEmailCommand(params);
//     const data = await sesClient.send(command);

//     return res.status(200).json({ success: true, message: 'Email sent successfully', messageId: data.MessageId });

//   } catch (error) {
//     console.error('Email send error:', error);
//     return res.status(500).json({ success: false, message: 'Email sending failed' });
//   }
// });

// module.exports = router;

const express = require("express");
// 1. Import the Brevo SDK
const SibApiV3Sdk = require('@getbrevo/brevo');

const router = express.Router();

// 2. Configure the Brevo client
// It will use the API key from your environment variables
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey = process.env.BREVO_API_KEY;

router.post('/', async (req, res) => {
  const { name, phone, email, category, now, userEmail } = req.body;

  if (!name || !phone || !email || !category || !now || !userEmail) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Date formatting logic remains the same
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const requestDate = formatDate(now);

  try {
    // HTML body construction remains the same
    const subject = `New Service Request from ${name}`;
    const htmlBody = `
      <p>Dear Service Provider,</p>
      <p>We are pleased to inform you of a new service request that matches your expertise on <strong>Aapna Network</strong>. Please find the details below:</p>
      <h3>Client Information:</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Service Category:</strong> ${category}</p>
      <p><strong>Requested Date:</strong> ${requestDate}</p>
      <p><strong>Phone Number:</strong> ${phone}</p>
      <p><strong>Email Address:</strong> ${userEmail}</p>
      <p>We recommend reaching out to the client as soon as possible to confirm availability and discuss further requirements.</p>
      <p>Thank you for being part of <strong>Aapna Network</strong> – Empowering Rural Talent.</p>
      <p>
        <strong>Aapna Network</strong><br />
        🌐 <a href="https://www.aapnanetwork.in">www.aapnanetwork.in</a><br />
        📧 sfhelpdesk25@gmail.com<br />
        📞 +91-8629058403
      </p>
      <p><em>This is an automated message. Please do not reply to this email directly.</em></p>
      <p style="font-size: 0.9em;">© Aapna Network. All rights reserved.</p>
    `;

    // 3. Create the SendSmtpEmail object for Brevo
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlBody;
    sendSmtpEmail.sender = { name: "Aapna Network", email: process.env.BREVO_SENDER_EMAIL };
    sendSmtpEmail.to = [{ email: email }]; // 'email' is the recipient's email from req.body

    // 4. Send the email using the Brevo client
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

    return res.status(200).json({ success: true, message: 'Email sent successfully', messageId: data.body.messageId });

  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ success: false, message: 'Email sending failed' });
  }
});

module.exports = router;