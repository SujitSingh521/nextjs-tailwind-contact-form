import nodemailer from "nodemailer";
import logger from "@/utils/logger";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name")?.trim();
    const email = formData.get("email")?.trim();
    const message = formData.get("message")?.trim();
    const honeypot = formData.get("honeypot");
    const file = formData.get("file");

    logger.info(`Submission received from: ${name} <${email}>`);

    // Spam protection
    if (honeypot) {
      logger.warn("Spam detected!");
      return new Response(JSON.stringify({ error: "Spam detected!" }), { status: 400 });
    }

    // Validation
    if (!name || !email || !message) {
      logger.error("Validation failed: Missing required fields");
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      logger.error("Validation failed: Invalid email format");
      return new Response(JSON.stringify({ error: "Invalid email format" }), { status: 400 });
    }

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Number(process.env.EMAIL_PORT) === 465,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      tls: { rejectUnauthorized: false },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_TO,
      subject: `New Contact Message from ${name}`,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br>")}</p>
        <p>📅 Sent on: ${new Date().toLocaleString()}</p>
      `,
      attachments: file
        ? [{ filename: file.name, content: Buffer.from(await file.arrayBuffer()) }]
        : [],
    };

    await transporter.sendMail(mailOptions);
    logger.info("Email sent successfully!");

    return new Response(JSON.stringify({ message: "Email sent successfully!" }), { status: 200 });
  } catch (error) {
    logger.error(`Failed to send email: ${error.message}`);
    return new Response(JSON.stringify({ error: `Failed to send email: ${error.message}` }), { status: 500 });
  }
}
