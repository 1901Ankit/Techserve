
import { connectToDatabase } from '@/config/mongodb';
import User from '@/models/user';
import { NextRequest, NextResponse } from "next/server";
import { transporter, __dirname } from "@/config/nodemailer";
import fs from "fs";
import path from "path";
import bcrypt from 'bcryptjs'

export async function POST(req) {
    try {
        await connectToDatabase();

        const { email } = await req.json();
        if (!email) {
            throw new Error('Email is required');
        }
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User does not exist, register now!');
        }
        const salt = await bcrypt.genSalt(10);
        const OTP = Math.floor(100000 + Math.random() * 900000).toString();
        const encryptedOTP = await bcrypt.hash(OTP, salt);

        const data = {
            OTP: OTP,
            fName: user.firstName || "User"
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
            to: user.email,
            subject: `Your WishgeeksTechserve forgot password OTP: ${OTP}`,
            html: replacedHTML,
        };
        await transporter.sendMail(mailOptions);
        return NextResponse.json({id:user._id, OTP:encryptedOTP, message: "successfully send the otp, use this Id ro store password", success: true }, { status: 200 })
    } catch (error) {

        console.error(error);
        return NextResponse.json({ error: error.message, success: false }, { status: 500 })
    }
}
