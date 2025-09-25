import nodemailer from 'nodemailer';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Allowed file types and max size (5MB)
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req) {
  const form = formidable({ multiples: false });

  try {
    const data = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const { name, email, message, honeypot } = data.fields;
    const file = data.files?.file;

    // Honeypot spam check
    if (honeypot) {
      return new Response(JSON.stringify({ error: 'Spam detected!' }), { status: 400 });
    }

    // Required fields check
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), { status: 400 });
    }

    // File validation
    if (file) {
      if (!ALLOWED_TYPES.includes(file.mimetype)) {
        return new Response(JSON.stringify({ error: 'Invalid file type' }), { status: 400 });
      }
      if (file.size > MAX_SIZE) {
        return new Response(JSON.stringify({ error: 'File size exceeds 5MB' }), { status: 400 });
      }
    }

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Number(process.env.EMAIL_PORT) === 465, // Use SSL for port 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Mail options
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_TO,
      subject: `New Contact Message from ${name}`,
      html: `
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <p><strong>From:</strong> ${name} (${email})</p>
      `,
      attachments: file
        ? [
            {
              filename: file.originalFilename,
              content: fs.readFileSync(file.filepath),
            },
          ]
        : [],
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Delete uploaded file after sending
    if (file) fs.unlinkSync(file.filepath);

    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: `Failed to send email! ${error.message}` }), { status: 500 });
  }
}
