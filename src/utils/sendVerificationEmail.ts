import nodemailer from "nodemailer";

export async function sendVerificationEmail(toEmail: string, code: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false, // or true if using 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const htmlContent = `
  <html>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
      <div style="background: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 30px; border-radius: 5px;">
          <h2 style="text-align: center; color: #333;">Cavite Venture Museum Email Verification</h2>
          <p>Hello!</p>
          <p>Thank you for signing up. To verify your email, please use the following 6-digit code:</p>
          <p style="font-size: 24px; font-weight: bold; text-align: center; margin: 20px 0;">${code}</p>
          <p>Enter this code on our website to complete your registration.</p>
          <p>If you did not request this, you can safely ignore this email.</p>
          <hr style="margin: 20px 0;" />
          <p style="font-size: 12px; color: #555;">This is an automated message from Cavite Venture Museum.</p>
        </div>
      </div>
    </body>
  </html>
  `;

  const mailOptions = {
    from: `"Cavite Venture Museum" <no-reply@caviteventuremuseum.com>`,
    to: toEmail,
    subject: "Verify your email address",
    html: htmlContent, // <--- Our HTML template
  };

  await transporter.sendMail(mailOptions);
}
