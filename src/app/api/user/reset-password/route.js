
import { connectToDatabase } from '@/config/mongodb';
import User from '@/models/user';
import { NextRequest, NextResponse } from "next/server";
import { transporter, __dirname } from "@/config/nodemailer";
import bcrypt from 'bcryptjs'

export async function PUT(req) {
    try {
        await connectToDatabase();

        const { newPassword,id } = await req.json();
 
        let salt = bcrypt.genSaltSync(10);
        if (!id || !newPassword) {
            throw new Error('Email and newPassword is required');
        }
        const user = await User.findOne({ _id: id });
        if (!user) {
            throw new Error('User does not exist, register now!');
        }

        const encryptedPassword = await bcrypt.hash(newPassword, salt);

        await User.findByIdAndUpdate(
            { _id: id },
            { $set: { password: encryptedPassword } }
        );

        return NextResponse.json({ message: "Password update Successful", success: true }, { status: 200 })
    } catch (error) {

        console.error(error);
        return NextResponse.json({ error: error.message, success: false }, { status: 500 })
    }
}
