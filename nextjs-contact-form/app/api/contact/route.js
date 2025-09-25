import nodemailer from 'nodemailer';

export const config = {
  api: {
    bodyParser: true, // Enable built-in JSON body parsing
  },
};

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, message, honeypot } = data;

    // Spam honeypot
    if (honeypot) {
      return new Response(JSON.stringify({ error: 'Spam detected!' }), { status: 400 });
    }

    // Validation
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), { status: 400 });
    }

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Number(process.env.EMAIL_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Email message
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_TO, // Your receiving email
      subject: `New Contact Message from ${name}`,
      html: `
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <p><strong>From:</strong> ${name} (${email})</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), { status: 200 });
  } catch (error) {
    console.error('Email error:', error);
    return new Response(
      JSON.stringify({ error: `Failed to send email: ${error.message}` }),
      { status: 500 }
    );
  }
}
