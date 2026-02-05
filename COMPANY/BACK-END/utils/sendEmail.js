// // const nodemailer = require("nodemailer");
// // require("dotenv").config();

// // // const transporter = nodemailer.createTransport({
// // //   service: "gmail",
// // //   auth: {
// // //     user: process.env.EMAIL_USER,
// // //     pass: process.env.EMAIL_PASS,
// // //   },
// // // });

// // const transporter = nodemailer.createTransport({
// //   // debug: true,
// //   // logger: true,
// //   // service: "gmail",
// //   host: "smtp.gmail.com",
// //   port: 587,
// //   secure: false, // Use TLS - true for 465, false for other ports
// //   auth: {
// //     user: process.env.EMAIL_USER,
// //     pass: process.env.EMAIL_PASS, // Automatically removes any spaces
// //   },
// // });

// // const sendVerificationEmail = async (email, link) => {
// //   // console.log("utils/sendEmail:: Sending email to:", email);
// //   const Html = `
// //   <div style="margin:0;padding:0;background:#f3f4f6;font-family:Arial, Helvetica, sans-serif;">
// //     <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.08);">

// //       <!-- Header -->
// //       <div style="background:#2563eb;padding:20px;text-align:center;color:#fff;">
// //         <h1 style="margin:0;font-size:24px;font-weight:600;">Verify Your Email</h1>
// //       </div>

// //       <!-- Body -->
// //       <div style="padding:30px;">
// //         <p style="font-size:16px;color:#374151;line-height:1.6;">
// //           Hello,
// //           <br /><br />
// //           Thank you for signing up! Please confirm your email address by clicking the button below.
// //         </p>

// //         <div style="text-align:center;margin:30px 0;">
// //           <a href="${link}"
// //             style="background:#2563eb;color:#ffffff;padding:14px 26px;
// //             text-decoration:none;font-size:16px;font-weight:600;border-radius:8px;
// //             display:inline-block;">
// //             Verify Email
// //           </a>
// //         </div>

// //         <p style="font-size:14px;color:#6b7280;line-height:1.5;">
// //           If the button doesn’t work, copy and paste the following link into your browser:
// //         </p>

// //         <p style="font-size:14px;color:#2563eb;word-break:break-all;">
// //           ${link}
// //         </p>

// //         <p style="font-size:14px;color:#6b7280;margin-top:30px;">
// //           If you didn’t create this account, you can safely ignore this email.
// //         </p>
// //       </div>

// //       <!-- Footer -->
// //       <div style="background:#f9fafb;padding:15px;text-align:center;font-size:12px;color:#9ca3af;">
// //         © ${new Date().getFullYear()} Cleanwave Recycling. All rights reserved.
// //       </div>

// //     </div>
// //   </div>
// // `;
// //   try {
// //     (async () => {
// //       const response = await transporter.sendMail({
// //         from: `"Cleanwave" <${process.env.EMAIL_USER}>`,
// //         to: email,
// //         subject: "Verify Your Email",
// //         text:Html,
// //         html:Html,
// //       });
// //       console.log("utils/sendEmail:: response ", response);
// //       return response;
// //     })();
// //   } catch (err) {
// //     console.log("util/sendEmail Error :: ", err);
// //     return { error: "Unable to send verification" };
// //   }
// // };

// // module.exports = {sendVerificationEmail}

// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true, // Use SSL for port 465
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS, // Ensure this is the 16-character App Password
//   },
// });

// const sendVerificationEmail = async (email, link) => {
//   const htmlContent = `
//   <div style="margin:0;padding:0;background:#f3f4f6;font-family:Arial, sans-serif;">
//     <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.08);">
//       <div style="background:#2563eb;padding:20px;text-align:center;color:#fff;">
//         <h1 style="margin:0;font-size:24px;font-weight:600;">Verify Your Email</h1>
//       </div>
//       <div style="padding:30px;">
//         <p style="font-size:16px;color:#374151;line-height:1.6;">Hello,<br /><br />Thank you for signing up! Please confirm your email address by clicking the button below.</p>
//         <div style="text-align:center;margin:30px 0;">
//           <a href="${link}" style="background:#2563eb;color:#ffffff;padding:14px 26px;text-decoration:none;font-size:16px;font-weight:600;border-radius:8px;display:inline-block;">Verify Email</a>
//         </div>
//         <p style="font-size:14px;color:#6b7280;line-height:1.5;">If the button doesn’t work, copy and paste the following link into your browser:</p>
//         <p style="font-size:14px;color:#2563eb;word-break:break-all;">${link}</p>
//       </div>
//       <div style="background:#f9fafb;padding:15px;text-align:center;font-size:12px;color:#9ca3af;">
//         © ${new Date().getFullYear()} Cleanwave Recycling. All rights reserved.
//       </div>
//     </div>
//   </div>`;

//   try {
//     // REMOVED the IIFE wrapper. Await the call directly.
//     const response = await transporter.sendMail({
//       from: `"Cleanwave" <${process.env.EMAIL_USER}>`,
//       to: email.trim(), // Added trim() to prevent "Address not found" errors
//       subject: "Verify Your Email",
//       html: htmlContent,
//     });

//     console.log("Email sent successfully:", response.messageId);
//     return { success: true, data: response }; // Return a clear success object
//   } catch (err) {
//     console.error("util/sendEmail Error :: ", err.message);
//     return { success: false, error: err.message };
//   }
// };

// module.exports = { sendVerificationEmail };

const nodemailer = require("nodemailer");
const validator = require("validator");
require("dotenv").config();

// Optimization: Use a Pool.
// This keeps a fixed number of connections open to Gmail.
// O(1) performance improvement: No need to handshake/login for every single request.
const transporter = nodemailer.createTransport({
  // host: "gmail",
  // port: 587,
  // secure: false,
  service: "gmail",
  pool: true, // Keep connection open
  maxConnections: 3, // Don't overwhelm the local network
  maxMessages: 100, // Recycle connection after 100 emails
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 5000, // 5 seconds is plenty for a pooled connection
  socketTimeout: 10000,
});

const sendVerificationEmail = async (email,link) => {
  // const htmlContent = `<h1>Hello</h1>`;
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);">
          
          <tr>
            <td style="background-color: #9DD549; height: 6px;"></td>
          </tr>

          <tr>
            <td align="center" style="padding: 40px 40px 20px 40px;">
              <div style="background-color: #8CA566; width: 56px; height: 56px; border-radius: 14px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 24px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C10 14.52 12 13 13 12"/></svg>
              </div>
              <h1 style="margin: 0; color: #1a2e05; font-size: 26px; font-weight: 800; letter-spacing: -0.02em;">Confirm your email</h1>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 45px 30px 45px;">
              <p style="margin: 0; color: #4b5563; font-size: 16px; line-height: 1.6; text-align: center;">
                Welcome to the movement! We're thrilled to have you join **Cleanwave Recycling**. To finalize your account and start making an impact, please verify your email address below.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 0 40px 40px 40px;">
              <a href="${link}" style="display: inline-block; background-color: #4C862D; color: #ffffff; padding: 16px 36px; font-size: 16px; font-weight: 700; text-decoration: none; border-radius: 12px; transition: all 0.2s ease;">
                Verify Account
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 45px 40px 45px;">
              <div style="border-top: 1px solid #f3f4f6; margin-bottom: 24px;"></div>
              <p style="margin: 0; color: #6b7280; font-size: 13px; line-height: 1.5; text-align: center;">
                Button not working? Copy and paste this link:
              </p>
              <p style="margin: 10px 0 0 0; color: #4C862D; font-size: 13px; word-break: break-all; text-align: center; font-family: monospace; background: #f9fafb; padding: 10px; border-radius: 6px;">
                ${link}
              </p>
            </td>
          </tr>

          <tr>
            <td style="background-color: #E3FFB9; padding: 32px 40px; text-align: center;">
              <p style="margin: 0; color: #4C862D; font-size: 13px; font-weight: 700;">
                Cleanwave Recycling
              </p>
              <p style="margin: 6px 0 0 0; color: #6e8a4e; font-size: 12px; line-height: 1.4;">
                Together, we're building a cleaner future.<br>
                123 Eco Way, Sustainability City, SC 56789
              </p>
              <div style="margin-top: 18px;">
                <p style="margin: 0; color: #8CA566; font-size: 11px;">
                  &copy; ${new Date().getFullYear()} All rights reserved.
                </p>
              </div>
            </td>
          </tr>
        </table>
        
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" style="padding: 24px 0;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                If you didn't request this email, you can safely ignore it.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  try {
    if (!validator.isEmail(email)) {
      console.log("invalid email ");
      return { success: false };
    }
    // We return the promise directly so the controller can decide
    // whether to 'await' it or let it run in the background.
    const response = await transporter.sendMail({
      from: `"Cleanwave" <${process.env.EMAIL_USER}>`,
      to: email.toLowerCase().trim(),
      subject: "Verify Your Email",
      html: htmlContent,
    });

    console.log("Email sent:", response.messageId);
    return { success: true };
  } catch (err) {
    console.error("util/sendEmail Error :: ", err.message);
    return { success: false, error: err.message };
  }
};
sendVerificationEmail("cleanwavenigltd@gmail.com","link");

// module.exports = { sendVerificationEmail };
