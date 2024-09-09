import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 587, // Mailtrap uses port 587 for SMTP
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});
// post method
export async function POST(req) {
  try {
    const { email, pdfBase64 } = await req.json();
    const mailOptions = {
      from: process.env.EMAIL_USER || 'educationpoint701@gmail.com',
      to: email,
      subject: 'Your Quotation',
      text: 'Please find the attached quotation.',
      attachments: [
        {
          filename: 'quotation.pdf',
          content: pdfBase64,
          encoding: 'base64',
        },
      ],
    };
    await transporter.sendMail(mailOptions);
    
    return new Response(JSON.stringify({ success: true, message: 'Email sent successfully.' }), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error.message);
    return new Response(JSON.stringify({ success: false, message: 'Failed to send email.', error: error.message }), { status: 500 });
  }
}