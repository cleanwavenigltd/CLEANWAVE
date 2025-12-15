const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendVerificationEmail = async (email, link) => {
  // const html = `
  //   <div style="font-family:sans-serif;padding:20px;">
  //     <h2>Email Verification</h2>
  //     <p>Please click the button below to verify your email:</p>

  //     <a href="${link}"
  //       style="padding:12px 20px;background:#2563eb;color:white;
  //       border-radius:6px;text-decoration:none;display:inline-block;margin:20px 0;">
  //       Verify Email
  //     </a>

  //     <p>If you didn’t create this account, you can ignore this email.</p>
  //   </div>
  // `;
  const html = `
  <div style="margin:0;padding:0;background:#f3f4f6;font-family:Arial, Helvetica, sans-serif;">
    <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <div style="background:#2563eb;padding:20px;text-align:center;color:#fff;">
        <h1 style="margin:0;font-size:24px;font-weight:600;">Verify Your Email</h1>
      </div>

      <!-- Body -->
      <div style="padding:30px;">
        <p style="font-size:16px;color:#374151;line-height:1.6;">
          Hello,
          <br /><br />
          Thank you for signing up! Please confirm your email address by clicking the button below.
        </p>

        <div style="text-align:center;margin:30px 0;">
          <a href="${link}" 
            style="background:#2563eb;color:#ffffff;padding:14px 26px;
            text-decoration:none;font-size:16px;font-weight:600;border-radius:8px;
            display:inline-block;">
            Verify Email
          </a>
        </div>

        <p style="font-size:14px;color:#6b7280;line-height:1.5;">
          If the button doesn’t work, copy and paste the following link into your browser:
        </p>

        <p style="font-size:14px;color:#2563eb;word-break:break-all;">
          ${link}
        </p>

        <p style="font-size:14px;color:#6b7280;margin-top:30px;">
          If you didn’t create this account, you can safely ignore this email.
        </p>
      </div>

      <!-- Footer -->
      <div style="background:#f9fafb;padding:15px;text-align:center;font-size:12px;color:#9ca3af;">
        © ${new Date().getFullYear()} Cleanwave Recycling. All rights reserved.
      </div>

    </div>
  </div>
`;

  return transporter.sendMail({
    from: `"Cleanwave" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify Your Email",
    html,
  });
};
