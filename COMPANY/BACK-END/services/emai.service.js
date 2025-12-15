const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (email, link) => {
  const html = `
    <div style="font-family:sans-serif;padding:20px">
      <h2>Verify Your Email</h2>
      <p>Click the button below to verify your email address:</p>
      <a href="${link}" 
         style="padding:10px 20px;background:#4CAF50;color:#fff;text-decoration:none;border-radius:5px;">
         Verify Email
      </a>
      <p>If you didn’t create an account, you can ignore this email.</p>
    </div>
  `;

  return transporter.sendMail({
    from: `"Cleanwave" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify Your Cleanwave Account",
    html,
  });
};
const verifyEmailToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.EMAIL_TOKEN_SECRET);

    const user = await findByEmail(decoded.email);
    if (!user) return { error: "Invalid token" };

    await verifyUser(decoded.email);

    return { message: "Email verified successfully" };
  } catch (err) {
    return { error: "Invalid or expired link" };
  }
};

module.exports = { sendVerificationEmail, verifyEmailToken };
