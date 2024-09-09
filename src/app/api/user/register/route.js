
import { connectToDatabase } from '../../../../config/mongodb';
import User from '../../../../models/user';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectToDatabase();

        const { firstName, lastName, email, phone, password: enteredPassword } = await req.json();

        if (!firstName || !lastName || !email || !enteredPassword) {
            return new Response(JSON.stringify({ error: 'firstName, lastName, email, and password are required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "Email is already registered", success: false }, { status: 400 })
        }
        if (phone) {
            const existingPhone = await User.findOne({ phone });
            if (existingPhone) {
                return NextResponse.json({ error: "Phone number is already registered", success: false }, { status: 400 })
            }
        }

        const newUser = new User({ firstName, lastName, email, password: enteredPassword, phone });
        const user = await newUser.save();
        const { password, ...savedUser } = user._doc
        const accessToken = newUser.generateAccessToken();
        const refreshToken = newUser.generateRefreshToken();

        const response = NextResponse.json({
            user: savedUser,
            token: accessToken,
            message: "Sign up successful",
            success: true,
        })
        response.cookies.set("token", accessToken, {
            httpOnly: true,

        })
        return response;
    } catch (error) {
        // NextResponse.json({
        //     error: error.message || "internal server error",
        //     success: false,
        // })
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
