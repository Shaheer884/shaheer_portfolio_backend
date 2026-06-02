const nodemailer = require('nodemailer');

/**
 * Send an email notification using SMTP
 * @param {Object} options - Options containing email details (name, email, subject, message)
 */
const sendEmail = async (options) => {
  // Check if SMTP is configured. If not, log a warning but don't fail the request.
  if (
    !process.env.SMTP_MAIL ||
    !process.env.SMTP_PASSWORD ||
    process.env.SMTP_MAIL.includes('your-email') ||
    process.env.SMTP_PASSWORD.includes('your-app-password')
  ) {
    console.warn('SMTP credentials are not configured or still have placeholder values. Skipping email notification.');
    return;
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465', 10),
    service: process.env.SMTP_SERVICE || 'gmail',
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Mail options
  const mailOptions = {
    from: `"${options.name}" <${process.env.SMTP_MAIL}>`,
    to: process.env.CONTACT_EMAIL || process.env.SMTP_MAIL,
    replyTo: options.email,
    subject: `Portfolio Contact: ${options.subject || 'Direct Portfolio Inquiry'}`,
    text: `You have received a new message from your portfolio contact form:\n\n` +
          `Name: ${options.name}\n` +
          `Email: ${options.email}\n` +
          `Message:\n${options.message}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
        <h2 style="color: #0d6efd; border-bottom: 2px solid #eeeff2; padding-bottom: 10px;">New Portfolio Contact Inquiry</h2>
        <p><strong>Name:</strong> ${options.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${options.email}">${options.email}</a></p>
        <p><strong>Subject:</strong> ${options.subject || 'Direct Portfolio Inquiry'}</p>
        <div style="background-color: #f8f9fa; border-left: 4px solid #0d6efd; padding: 15px; margin-top: 15px; border-radius: 4px;">
          <p style="margin: 0; font-weight: bold; color: #495057;">Message:</p>
          <p style="margin: 5px 0 0 0; white-space: pre-wrap;">${options.message}</p>
        </div>
        <hr style="border: 0; border-top: 1px solid #eeeff2; margin: 20px 0;" />
        <p style="font-size: 0.85em; color: #6c757d; text-align: center; margin: 0;">This email was sent automatically from your Portfolio contact form.</p>
      </div>
    `,
  };

  // Send mail
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
