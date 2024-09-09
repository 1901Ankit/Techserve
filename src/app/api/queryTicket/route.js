//src/app/api/queryTicket/route.js
import mongoose from 'mongoose';
import { connectToDatabase } from '@/config/mongodb';
import QueryTicket from '@/models/queryTicket'; 
import { NextResponse } from 'next/server';

// Create or Update (POST) a QueryTicket
export async function POST(req) {
    try {
        await connectToDatabase();

        const { userId, queryType, queryDetails } = await req.json();

        // Check if userId and queryType are provided
        if (!userId || !queryType) {
            return NextResponse.json({ error: 'userId and queryType are required' }, { status: 400 });
        }

        // Validate userId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return NextResponse.json({ error: 'Invalid userId format' }, { status: 400 });
        }

       

        // Create a new QueryTicket
        const newQueryTicket = new QueryTicket({ userId: userId, queryType, queryDetails });
        const savedQueryTicket = await newQueryTicket.save();

        return NextResponse.json({ queryTicket: savedQueryTicket, message: 'Query ticket created successfully', success: true });
    } catch (error) {
        console.error('Error in POST /api/queryTicket:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
