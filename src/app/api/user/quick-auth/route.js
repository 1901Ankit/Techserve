
import { connectToDatabase } from '@/config/mongodb';
import User from '@/models/user';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectToDatabase();

        const { email,firstName,lastName } = await req.json();
        if (!email) {
            throw new Error('Email is required');
        }
        let user = null;
        let message="Login successful";
        user = await User.findOne({ email }).select('+password');
        if (!user) {
            const newUser = new User({ firstName, lastName, email, password:"Wishgeekstechserve" });
            user = await newUser.save();
            message="New user created Successfully"
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        const { password, ...savedUser } = user._doc

        const response = NextResponse.json({
            user: savedUser,
            token: accessToken,
            message: message,
            success: true,
        })
        response.cookies.set("token", accessToken, {
            httpOnly: true,

        })
        return response;
    } catch (error) {

        console.error(error);
        return NextResponse.json({ error: error.message, success: false }, { status: 500 })
    }
}
