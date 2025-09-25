import nodemailer from "nodemailer";
import formidable from "formidable";
import fs from "fs";

export const config = { api: { bodyParser: false } };

export async function POST(req) {
  const form = formidable({ multiples: false });

  const data = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const { name, email, message, honeypot } = data.fields;
  const file = data.files?.file;

  if (honeypot) return new Response(JSON.stringify({ error: "Spam detected!" }), { status: 400 });
  if (!name || !email || !message) return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_TO,
      subject: `New Contact Message from ${name}`,
      html: `<p>${message}</p><p>From: ${name} (${email})</p>`,
      attachments: file ? [{ filename: file.originalFilename, content: fs.readFileSync(file.filepath) }] : [],
    };

    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: "Email sent successfully!" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to send email!" }), { status: 500 });
  }
}
