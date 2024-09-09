
import { connectToDatabase } from '../../../../config/mongodb';
import User from '../../../../models/user';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectToDatabase();

        const { email, password: enteredPassword } = await req.json();
        if (!email || !enteredPassword) {
            throw new Error('Email and password are required');
            // return new Response(JSON.stringify({ error: 'Email and password are required',success: false }), {
            //     status: 400,
            //     headers: { 'Content-Type': 'application/json' },
            // });
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            throw new Error('User does not exist');
            // return NextResponse.json({ error: "User does not exist",success: false }, { status: 400 })
        }

        const isPasswordCorrect = await user.isPasswordCorrect(enteredPassword);
        if (!isPasswordCorrect) {
            throw new Error("Invalid password");
            // return NextResponse.json({ error: "Invalid password",success: false }, { status: 400 })
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // return new Response(JSON.stringify({ message: 'Login successful', accessToken, refreshToken }), {
        //     status: 200,
        //     headers: { 'Content-Type': 'application/json' },
        // });
        const { password, ...savedUser } = user._doc

        const response = NextResponse.json({
            user: savedUser,
            token: accessToken,
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", accessToken, {
            httpOnly: true,

        })
        return response;
    } catch (error) {

        console.error(error);
        // return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        //     status: 500,
        //     headers: { 'Content-Type': 'application/json' },
        // });
        return NextResponse.json({ error: error.message,success: false }, { status: 500 })
    }
}
