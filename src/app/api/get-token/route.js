import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
export async function GET(req) {
	try {
		const token = req.cookies.get('token');
		if (!token) {
			return NextResponse.json({ message: 'No token provided' }, { status: 401 });
		}
		req.cookies.set("token", token, {
			httpOnly: true,

		})
		return NextResponse.json({  token });
	} catch (error) {
		return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
	}
}