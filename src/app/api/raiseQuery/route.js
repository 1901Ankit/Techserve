import { connectToDatabase } from '@/config/mongodb';
import Ticket from '@/models/ticket';


export async function POST(request) {
    try {
        await connectToDatabase();

        const { userId, pricingEnquiryDetailsId, queryType, status = 'Open', priority = 'Medium' } = await request.json();

        // Ensure that required fields are provided
        if (!userId || !pricingEnquiryDetailsId || !queryType) {
            return new Response(JSON.stringify({ error: 'userId, pricingEnquiryDetailsId, and queryType are required' }), { status: 400 });
        }

        // Create a new ticket for the query
        const newTicket = new Ticket({
            userId,
            pricingEnquiryDetailsId,
            status,
            priority
        });

        // Save the ticket to the database
        const savedTicket = await newTicket.save();

        return new Response(JSON.stringify({ ticket: savedTicket, message: "Ticket created successfully", success: true }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
