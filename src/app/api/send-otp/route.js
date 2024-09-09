import { transporter, __dirname } from "@/config/nodemailer";
import fs from "fs";
import path from "path";
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { email, fName, activity } = await req.json();
        const salt = await bcrypt.genSalt(10);
        const OTP = Math.floor(100000 + Math.random() * 900000).toString();
        const encryptedOTP = await bcrypt.hash(OTP, salt);

        const data = {
            OTP: OTP,
            fName: fName || "User"
        };
        // initialized the email template 
        const relativeDirPath = path.join(__dirname, '../', 'templates');
        const emailTemplatePath = path.join(relativeDirPath, 'verification-OTP.html');
        const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8');
        const replacedHTML = emailTemplate.replace(/{{(.*?)}}/g, (match, key) => {
            return data[key.trim()] || '';
        });

        const mailOptions = {
            from: process.env.EMAIL_USER || 'educationpoint701@gmail.com',
            to: email,
            subject: `Your WishgeeksTechserve ${activity && activity} OTP: ${OTP}`,
            html: replacedHTML,
        };
        const res=await transporter.sendMail(mailOptions);
        console.log(res);
        
        return NextResponse.json({ message: 'Email sent successfully.', OTP: encryptedOTP }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error.message);
        return new Response(JSON.stringify({ success: false, message: 'Failed to send email.', error: error.message }), { status: 500 });
    }
}