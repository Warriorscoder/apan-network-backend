const express = require("express");
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

const router = express.Router();

// 1. Configure the AWS SES client
// It will automatically use the credentials from your environment variables
const sesClient = new SESClient({
  region: process.env.AWS_REGION,
});

router.post('/', async (req, res) => {
  const { name, email, phone, subject, message, serviceType, companyEmail } = req.body;

  // --- Input Validation (unchanged) ---
  if (!name || !email || !subject || !message || !companyEmail || !serviceType) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: name, email, subject, message, and companyEmail are required.'
    });
  }

  try {
    // --- Email Content (unchanged) ---
    const emailSubject = `New Contact Form Submission: ${subject}`;
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>${serviceType}</h2>
        <p>You have received a new message from your website's contact form.</p>
        <hr>
        <h3>Sender's Details:</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
          ${phone ? `<li><strong>Phone:</strong> ${phone}</li>` : ''}
        </ul>
        <h3>Message:</h3>
        <p style="padding: 10px; border-left: 4px solid #ccc; background-color: #f9f9f9;">
          ${message.replace(/\n/g, '<br>')}
        </p>
        <hr>
        <p style="font-size: 0.9em; color: #555;">
          This email was sent from the contact form on your website. You can reply directly to the sender's email address.
        </p>
      </div>
    `;

    // 2. Create the command parameters for AWS SES
    const params = {
      Source: `Swabhiman Foundation <${process.env.SES_EMAIL_SOURCE}>`,
      Destination: {
        ToAddresses: [companyEmail],
      },
      ReplyToAddresses: [email], // This sets the "Reply-To" header
      Message: {
        Subject: {
          Data: emailSubject,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: htmlBody,
            Charset: 'UTF-8',
          },
        },
      },
    };

    // 3. Send the email using the SES client
    const command = new SendEmailCommand(params);
    await sesClient.send(command);

    // --- Success Response (unchanged) ---
    return res.status(200).json({ success: true, message: 'Your message has been sent successfully!' });

  } catch (error) {
    // --- Error Handling (unchanged) ---
    console.error('Error sending contact form email:', error);
    return res.status(500).json({ success: false, message: 'Failed to send the message. Please try again later.' });
  }
});

module.exports = router;