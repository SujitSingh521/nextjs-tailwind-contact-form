import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    // ───── 📥 Parse Form Data ─────
    const formData = await req.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    const honeypot = formData.get('honeypot');
    const file = formData.get('file');

    // ───── 🛡️ Spam Protection (Honeypot) ─────
    if (honeypot) {
      return new Response(JSON.stringify({ error: 'Spam detected!' }), { status: 400 });
    }

    // ───── ✅ Input Validation ─────
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), { status: 400 });
    }

    // ───── ✉️ Create Email Transporter ─────
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Number(process.env.EMAIL_PORT) === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // ───── 📝 Compose Email Content ─────
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_TO,
      subject: `New Contact Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #2c3e50;">New Contact Form Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br>')}</p>
          <p style="margin-top: 20px;">📅 Sent on: ${new Date().toLocaleString()}</p>
        </div>
      `,
      attachments: [],
    };

    // ───── 📎 Handle File Attachment (if any) ─────
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      mailOptions.attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    // ───── 📤 Send the Email ─────
    await transporter.sendMail(mailOptions);

    // ───── ✅ Success Response ─────
    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), { status: 200 });

  } catch (error) {
    // ───── ❌ Error Handling ─────
    return new Response(
      JSON.stringify({ error: `Failed to send email: ${error.message}` }),
      { status: 500 }
    );
  }
}
