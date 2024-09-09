import { connectToDatabase } from '@/config/mongodb';
import Ticket from '@/models/ticket';
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const SECRET_KEY = process.env.JWT_SECRETE;

export const decodeToken = (token) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded._id;
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};

export async function GET(req) {
    try {
        await connectToDatabase();

        const cookieStore = cookies();
        const token = cookieStore.get('token');

        if (!token) {
            return NextResponse.json({ error: 'Authorization token is required' }, { status: 401 });
        }

        const userId = decodeToken(token.value);

        if (!userId) {
            return NextResponse.json({ error: 'Invalid or missing JWT token' }, { status: 401 });
        }

        // Fetch tickets and populate pricingEnquiryDetailsId with its corresponding document
        const tickets = await Ticket.find({ userId }).populate('pricingEnquiryDetailsId');

        if (!tickets.length) {
            return NextResponse.json({ message: 'No tickets found for this user', success: true });
        }

        return NextResponse.json({ tickets, success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
