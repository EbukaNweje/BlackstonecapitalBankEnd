const Transfers = require('../models/transfer')
const users  = require('../models/User')
const transporter = require("../utilities/email");


exports.sendOtp = async (req, res) => {
  try {
    const id = req.params.id;
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Make it a string if needed

    const user = await users.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Clear existing OTPs (keep array size to 1 max)
    user.otpStore = [];

    // Push new OTP with timestamp
    user.otpStore.push({
      otp: otp,
      createdAt: new Date()
    });

    await user.save();

    const mailOptions ={
      from: process.env.USER,
      to: user.email,
      subject: 'Your Verification Code (OTP)',
      // text: message,
      html: `

      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
          body {
              margin: 0;
              padding: 0;
              font-family: Arial, Helvetica, sans-serif;
              background-color: whitesmoke;
          }
          .container {
              width: 100%;
              background-color: whitesmoke;
              padding: 0;
              margin: 0;
          }
          .header, .footer {
              width: 100%;
              background-color: #21007F;
              color: white;
              text-align: center;
          }
          .content {
              width: 100%;
              max-width: 600px;
              background-color: white;
              padding: 20px;
              margin: 20px auto;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .footer-content {
              padding: 20px;
              text-align: center;
          }
          .contact-info, .social-icons {
              display: inline-block;
              vertical-align: top;
              width: 48%;
              margin-bottom: 20px;
          }
          .social-icons img {
              width: 30px;
              margin: 0 5px;
          }
          .footer-logo img {
              width: 50px;
          }
          .footer-logo, .footer-info {
              text-align: center;
              margin-bottom: 20px;
          }
          .footer p {
              margin: 5px 0;
          }
      </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <table width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                          <td style="padding: 10px;">
                              <div class="contact-info">
                                  <p><img src="https://i.ibb.co/K04zq8b/WCall.png" alt="" style="width: 20px;"> +1 (318) 203‑4416</p>
                                  <p><img src="https://i.ibb.co/TL7k4FF/Container.png" alt="" style="width: 20px;"> blackstonecapitalorg@gmail.com</p>
                                  <p><img src="https://i.ibb.co/CbSFkwC/Wloc.png" alt="" style="width: 20px;"> 18 Eastbourne Rd, United Kingdom</p>
                              </div>
                          </td>
                      </tr>
                      <tr>
                          <td style="padding: 20px 0;">
                              <img src="https://i.ibb.co/Gcs5Lbx/jjjjjjjjjj.jpg" alt="">
                              <h1 style="color: #ffffff; font-size: 40px; font-family: Impact, sans-serif; font-weight: 500">Blackstone Capital Union</h1>
                          </td>
                      </tr>
                  </table>
              </div>
      
              <div class="content">                      
                  <p>Hi ${user.firstName} ${user.lastName},</p>
                  <p>Here is your verification code (OTP): ${otp}</p>
                  <p>Use this code to complete your Transfer process.</p>
                  <p>Thank you for choosing our platform. We wish you successful trading.</p>
              </div>
      
              <div class="footer">
                  <div class="footer-content">
                      <div class="https://i.ibb.co/Gcs5Lbx/jjjjjjjjjj.jpg">
                          <img src="footer-logo.png" alt="">
                      </div>
                      <div class="footer-info">
                          <p>We bring the years, global experience, and stamina to guide our clients through new and often disruptive realities.</p>
                          <p>© Copyright 2024 Blackstone Capital Union. All Rights Reserved.</p>
                      </div>
                  </div>
              </div>
          </div>
      </body>
      </html>
       
        `,
  }
  transporter.sendMail(mailOptions,(err, info)=>{
      if(err){
          console.log(err.message);
      }else{
          console.log("Email has been sent to your inbox", info.response);
      }
  })
    

    console.log('OTP:', otp); // For debugging only
    res.status(200).json({ message: 'OTP sent successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
};

exports.verifyOTPandcreateTransfer = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      otpStore,
      amount, accountName, accountNumber, bankName,
      iban, swiftCode, description, accountType
    } = req.body;

    const user = await users.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if OTP exists and matches
    const storedOtpEntry = user.otpStore[0];
    if (!storedOtpEntry) {
      return res.status(400).json({ message: 'No OTP found or it has expired' });
    }

    if (storedOtpEntry.otp !== otpStore) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Remove the OTP after successful verification
    user.otpStore = [];

    // Create the transfer
    const newTransfer = new Transfers({
      amount,
      accountName,
      accountNumber,
      bankName,
      iban,
      swiftCode,
      description,
      accountType,
    });

    await newTransfer.save();

    // Push transfer ID to user's Transactions.transfar array
    user.Transactions.transfar.push(newTransfer._id);
    await user.save();

    // Send email to user
    const mailOptions = {
      from: 'blackstonecapitalorg@gmail.com',
      to: user.email,
      subject: 'Transfer Request',
      html: `
        <html>
        <head>
        <style>
          .container {
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
            border: 1px solid #ccc; 
            border-radius: 5px; 
          }
          .header {
            text-align: center; 
            margin-bottom: 20px; 
          }
          .content {
            margin-bottom: 20px; 
          }
          .footer {
            text-align: center; 
            margin-top: 20px; 
          }
        </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Transfer Request</h1>
            </div>
            <div class="content">
              <p>Hi ${user.firstName} ${user.lastName},</p>
              <p>Thank you for your transfer request.</p>
              <p>Amount: ${amount}</p>
              <p>Beneficiary Account Name: ${accountName}</p>
              <p>Beneficiary Account Number: ${accountNumber}</p>
              <p>Bank Name: ${bankName}</p>
              <p>IBAN: ${iban}</p>
              <p>SWIFT Code: ${swiftCode}</p>
              <p>Description: ${description}</p>
              <p>Account Type: ${accountType}</p>
            </div>
            <div class="footer">
              <p>Best regards,<br>Blackstone Capital Union</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    transporter.sendMail(mailOptions,(err, info)=>{
      if(err){
          console.log(err.message);
      }else{
          console.log("Email has been sent to your inbox", info.response);
      }
  })

    res.status(201).json({ message: 'Transfer request submitted successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
};

