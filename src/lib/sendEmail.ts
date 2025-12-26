import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// export async function sendVerificationEmail(
//   to: string,
//   username:string,
//   code: string
// ) {
//   await transporter.sendMail({
//     from: '"Svnit Buy Sell" <mananvelani123@gmail.com>',
//     to,
//     subject: "Verify your Email",
//     html: `
// <!DOCTYPE html>
// <html>
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Email Verification</title>
//   </head>
//   <body style="margin:0; padding:0; background-color:#f1f5f9; font-family:Arial, sans-serif;">
    
//     <table width="100%" cellpadding="0" cellspacing="0">
//       <tr>
//         <td align="center" style="padding: 40px 0;">
          
//           <!-- Card -->
//           <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.08);">
            
//             <!-- Header -->
//             <tr>
//               <td style="background:#0f172a; padding:20px; text-align:center;">
//                 <h1 style="margin:0; color:#ffffff; font-size:20px;">
//                   SVNIT Buy & Sell
//                 </h1>
//               </td>
//             </tr>

//             <!-- Body -->
//             <tr>
//               <td style="padding:24px; color:#0f172a;">
//                 <h2 style="margin-top:0; font-size:18px;">
//                   Email Verification : ${username}
//                 </h2>

//                 <p style="font-size:14px; line-height:1.6;">
//                   Thank you for registering on <strong>SVNIT Buy & Sell</strong>.
//                   Please use the verification code below to confirm your email address.
//                 </p>

//                 <!-- Code Box -->
//                 <div style="
//                   margin:24px 0;
//                   padding:16px;
//                   background:#f8fafc;
//                   border:1px dashed #94a3b8;
//                   text-align:center;
//                   border-radius:6px;
//                 ">
//                   <span style="
//                     font-size:28px;
//                     letter-spacing:4px;
//                     font-weight:bold;
//                     color:#0f172a;
//                   ">
//                     ${code}
//                   </span>
//                 </div>

//                 <p style="font-size:13px; color:#475569;">
//                   This code will expire in <strong>10 minutes</strong>.
//                   If you did not request this, you can safely ignore this email.
//                 </p>
//               </td>
//             </tr>

//             <!-- Footer -->
//             <tr>
//               <td style="padding:16px; background:#f1f5f9; text-align:center;">
//                 <p style="margin:0; font-size:12px; color:#64748b;">
//                   © ${new Date().getFullYear()} SVNIT Buy & Sell  
//                   <br />
//                   This is an automated email. Please do not reply.
//                 </p>
//               </td>
//             </tr>

//           </table>

//         </td>
//       </tr>
//     </table>

//   </body>
// </html>
// `
// ,
//   })
// }

export async function sendVerificationEmail(
  to: string,
  username: string,
  code: string
): Promise<{ success: boolean; message: string }> {
  try {
    await transporter.sendMail({
      from: '"Svnit Buy Sell" <mananvelani123@gmail.com>',
      to,
      subject: "Verify your Email",
       html : `
  <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 8px; color: #333; max-width: 600px; margin: auto;">
    <div style="background-color: #ffffff; padding: 40px; border-radius: 8px; text-align: center; border: 1px solid #e0e0e0;">
      <h2 style="color: #1a1a1a; margin-bottom: 10px;">Hello, ${username}</h2>
      <p style="font-size: 16px; color: #666; margin-bottom: 24px;">Please use the following verification code to complete your request:</p>
      
      <div style="background-color: #f4f4f4; border-radius: 4px; padding: 20px; display: inline-block; margin-bottom: 24px;">
        <h1 style="font-size: 32px; letter-spacing: 5px; margin: 0; color: #007bff; font-family: monospace;">${code}</h1>
      </div>
      
      <p style="font-size: 14px; color: #999;">
        This code expires in <strong>10 minutes</strong>. <br>
        If you didn't request this code, you can safely ignore this email.
      </p>
      
      <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
      <p style="font-size: 12px; color: #aaa;">
        © ${new Date().getFullYear()} Svnit-Buy-Sell. All rights reserved.
      </p>
    </div>
  </div>
`
    })

    return {
      success: true,
      message: "Verification email sent",
    }
  } catch (error) {
    console.error("Email send error:", error)

    return {
      success: false,
      message: "Failed to send verification email",
    }
  }
}
