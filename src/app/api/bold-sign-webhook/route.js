import { connectToDatabase } from "@/config/mongodb";
import PricingEnquiryDetails from "@/models/pricingEnquiry";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        // const dataBody = await req.json();
        const { event, data } = body;
        // const { data } = dataBody;

        // Check if the eventType is 'Verification'
        if (event?.eventType === 'Verification') {
            // Send a 200 status code with a success message
            return NextResponse.json({ message: 'Verification successful' }, { status: 200 });
        }
        if (event?.eventType === 'Signed') {
            // Send a 200 status code with a success message
            console.log(event);
            console.log("User have signed the document");
            return NextResponse.json({ message: 'Signed successfully' }, { status: 200 });
        }
        if (event?.eventType === 'Completed') {
            console.log("Contract reviewed and signed successfully");

            // Connect to the database
            await connectToDatabase();

            // Fetch the document using the documentId from the event data
            const documentId = data?.documentId;

            if (!documentId) {
                return NextResponse.json({ error: 'Document ID not provided' }, { status: 400 });
            }

            // Find the document in the PricingEnquiryDetails collection
            const pricingEnquiry = await PricingEnquiryDetails.findOne({ contractDocumentId: documentId }).select("+userId");

            if (!pricingEnquiry) {
                return NextResponse.json({ error: 'No matching document found' }, { status: 404 });
            }

            console.log(pricingEnquiry);

            // Prepare the request payload for ticket creation
            const ticketPayload = {
                userId: pricingEnquiry.userId,
                pricingEnquiryDetailsId: pricingEnquiry._id,
                status: 'Open',  // Default status, can be modified based on requirements
                priority: 'Medium',  // Default priority, can be modified based on requirements
            };

            // Call the ticket creation API
            const ticketResponse = await fetch('https://e335-2401-4900-1c5c-a044-8027-db95-2700-f96.ngrok-free.app/api/ticket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ticketPayload),
            });

            if (!ticketResponse.ok) {
                const errorData = await ticketResponse.json();
                return NextResponse.json({ error: `Ticket creation failed: ${errorData.error}` }, { status: 500 });
            }

            const ticketData = await ticketResponse.json();
            console.log(ticketData);

            // Notify the WebSocket server to broadcast the message
            await fetch('https://websocket-connection-9rn3.onrender.com/broadcast', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'notification',
                    content: 'Ticket raised successfully',
                }),
            });

            // Return the matching document's data and created ticket data
            return NextResponse.json({
                data: {
                    pricingEnquiry: pricingEnquiry,
                    ticket: ticketData.ticket,
                },
                message: "Ticket created successfully"
            }, { status: 200 });
        }

        // If eventType is not 'Verification', return a 400 status
        return NextResponse.json({ message: 'Invalid eventType' }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }
}
