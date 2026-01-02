// const nodemailer = require("nodemailer");
// require("dotenv").config();

// // const transporter = nodemailer.createTransport({
// //   service: "gmail",
// //   auth: {
// //     user: process.env.EMAIL_USER,
// //     pass: process.env.EMAIL_PASS,
// //   },
// // });

// const transporter = nodemailer.createTransport({
//   // debug: true,
//   // logger: true,
//   // service: "gmail",
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // Use TLS - true for 465, false for other ports
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS, // Automatically removes any spaces
//   },
// });

// const sendVerificationEmail = async (email, link) => {
//   // console.log("utils/sendEmail:: Sending email to:", email);
//   const Html = `
//   <div style="margin:0;padding:0;background:#f3f4f6;font-family:Arial, Helvetica, sans-serif;">
//     <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.08);">
      
//       <!-- Header -->
//       <div style="background:#2563eb;padding:20px;text-align:center;color:#fff;">
//         <h1 style="margin:0;font-size:24px;font-weight:600;">Verify Your Email</h1>
//       </div>

//       <!-- Body -->
//       <div style="padding:30px;">
//         <p style="font-size:16px;color:#374151;line-height:1.6;">
//           Hello,
//           <br /><br />
//           Thank you for signing up! Please confirm your email address by clicking the button below.
//         </p>

//         <div style="text-align:center;margin:30px 0;">
//           <a href="${link}" 
//             style="background:#2563eb;color:#ffffff;padding:14px 26px;
//             text-decoration:none;font-size:16px;font-weight:600;border-radius:8px;
//             display:inline-block;">
//             Verify Email
//           </a>
//         </div>

//         <p style="font-size:14px;color:#6b7280;line-height:1.5;">
//           If the button doesn’t work, copy and paste the following link into your browser:
//         </p>

//         <p style="font-size:14px;color:#2563eb;word-break:break-all;">
//           ${link}
//         </p>

//         <p style="font-size:14px;color:#6b7280;margin-top:30px;">
//           If you didn’t create this account, you can safely ignore this email.
//         </p>
//       </div>

//       <!-- Footer -->
//       <div style="background:#f9fafb;padding:15px;text-align:center;font-size:12px;color:#9ca3af;">
//         © ${new Date().getFullYear()} Cleanwave Recycling. All rights reserved.
//       </div>

//     </div>
//   </div>
// `;
//   try {
//     (async () => {
//       const response = await transporter.sendMail({
//         from: `"Cleanwave" <${process.env.EMAIL_USER}>`,
//         to: email,
//         subject: "Verify Your Email",
//         text:Html,
//         html:Html,
//       });
//       console.log("utils/sendEmail:: response ", response);
//       return response;
//     })();
//   } catch (err) {
//     console.log("util/sendEmail Error :: ", err);
//     return { error: "Unable to send verification" };
//   }
// };

// module.exports = {sendVerificationEmail}

const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use SSL for port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Ensure this is the 16-character App Password
  },
});

const sendVerificationEmail = async (email, link) => {
  const htmlContent = `
  <div style="margin:0;padding:0;background:#f3f4f6;font-family:Arial, sans-serif;">
    <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.08);">
      <div style="background:#2563eb;padding:20px;text-align:center;color:#fff;">
        <h1 style="margin:0;font-size:24px;font-weight:600;">Verify Your Email</h1>
      </div>
      <div style="padding:30px;">
        <p style="font-size:16px;color:#374151;line-height:1.6;">Hello,<br /><br />Thank you for signing up! Please confirm your email address by clicking the button below.</p>
        <div style="text-align:center;margin:30px 0;">
          <a href="${link}" style="background:#2563eb;color:#ffffff;padding:14px 26px;text-decoration:none;font-size:16px;font-weight:600;border-radius:8px;display:inline-block;">Verify Email</a>
        </div>
        <p style="font-size:14px;color:#6b7280;line-height:1.5;">If the button doesn’t work, copy and paste the following link into your browser:</p>
        <p style="font-size:14px;color:#2563eb;word-break:break-all;">${link}</p>
      </div>
      <div style="background:#f9fafb;padding:15px;text-align:center;font-size:12px;color:#9ca3af;">
        © ${new Date().getFullYear()} Cleanwave Recycling. All rights reserved.
      </div>
    </div>
  </div>`;

  try {
    // REMOVED the IIFE wrapper. Await the call directly.
    const response = await transporter.sendMail({
      from: `"Cleanwave" <${process.env.EMAIL_USER}>`,
      to: email.trim(), // Added trim() to prevent "Address not found" errors
      subject: "Verify Your Email",
      html: htmlContent,
    });

    console.log("Email sent successfully:", response.messageId);
    return { success: true, data: response }; // Return a clear success object
  } catch (err) {
    console.error("util/sendEmail Error :: ", err.message);
    return { success: false, error: err.message };
  }
};

module.exports = { sendVerificationEmail };
