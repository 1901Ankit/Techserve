import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/config/mongodb';
import User from "@/models/user";

const SECRET_KEY = process.env.JWT_SECRETE;

export async function GET(req) {
	try {
		// Connect to the database
		await connectToDatabase();
		const token = req.cookies.get('token');

		if (!token) {
			return NextResponse.json({ message: 'No token provided' }, { status: 401 });
		}

		// Verify the token
		let decoded;
		try {
			decoded = jwt.verify(token.value, SECRET_KEY);
		} catch (error) {
			return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
		}
		const userId = decoded._id;
		// Fetch user details from the database
		const user = await User.findById(userId).select('-password'); // Exclude password field
		if (!user) {
			return NextResponse.json({ message: 'User not found' }, { status: 404 });
		}
		req.cookies.set("token", token, {
			httpOnly: true,

		})
		// Return user details
		return NextResponse.json({ user, token });
	} catch (error) {
		console.error('Error fetching user details:', error);
		return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
	}
}

export async function PATCH(req) {
	try {
		await connectToDatabase();

		const token = req.cookies.get('token');
		if (!token) {
			return NextResponse.json({ message: 'No token provided' }, { status: 401 });
		}

		let decoded;
		try {
			decoded = jwt.verify(token.value, SECRET_KEY);
		} catch (error) {
			return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
		}

		const userId = decoded._id;
		const user = await User.findById(userId);
		if (!user) {
			return NextResponse.json({ message: 'User not found' }, { status: 404 });
		}

		const updates = await req.json(); // Extracting the updates from the request body

		Object.keys(updates).forEach(key => {
			if (user[key] !== undefined) {
				user[key] = updates[key];
			}
		});

		await user.save();

		return NextResponse.json({ message: 'User updated successfully', user });
	} catch (error) {
		console.error('Error updating user:', error);
		return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
	}
}