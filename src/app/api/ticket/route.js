//src/app/api/ticket/route.js

import { connectToDatabase } from '@/config/mongodb';
import Ticket from '@/models/ticket';
import { NextResponse } from "next/server";

// Create (POST) a Ticket
export async function POST(req) {
    try {
        await connectToDatabase();

        const { userId, pricingEnquiryDetailsId, status, priority } = await req.json();

        if (!userId || !pricingEnquiryDetailsId) {
            return NextResponse.json({ error: 'userId and pricingEnquiryDetailsId are required' }, { status: 400 });
        }

        const newTicket = new Ticket({ userId, pricingEnquiryDetailsId, status, priority });
        const savedTicket = await newTicket.save();

        return NextResponse.json({ ticket: savedTicket, message: "Ticket created successfully", success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Read (GET) a Ticket
export async function GET(req) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(req.url);
        const ticketId = searchParams.get('id');

        if (!ticketId) {
            return NextResponse.json({ error: 'Ticket ID is required' }, { status: 400 });
        }

        const ticket = await Ticket.findById(ticketId).populate('pricingEnquiryDetailsId');

        if (!ticket) {
            return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
        }

        return NextResponse.json({ ticket, success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Update (PUT) a Ticket
export async function PUT(req) {
    try {
        await connectToDatabase();

        const { ticketId, status, priority } = await req.json();

        if (!ticketId) {
            return NextResponse.json({ error: 'Ticket ID is required' }, { status: 400 });
        }

        const updatedTicket = await Ticket.findByIdAndUpdate(
            ticketId,
            { status, priority },
            { new: true }
        );

        if (!updatedTicket) {
            return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
        }

        return NextResponse.json({ ticket: updatedTicket, message: "Ticket updated successfully", success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Delete (DELETE) a Ticket
export async function DELETE(req) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(req.url);
        const ticketId = searchParams.get('id');

        if (!ticketId) {
            return NextResponse.json({ error: 'Ticket ID is required' }, { status: 400 });
        }

        const deletedTicket = await Ticket.findByIdAndDelete(ticketId);

        if (!deletedTicket) {
            return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
        }

        return NextResponse.json({ message: "Ticket deleted successfully", success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

