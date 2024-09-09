import { NextRequest, NextResponse } from 'next/server';

export async function POST(req) {
    try {
        // Extracting necessary data from the request body
        const { templateId, name, email, userId } = await req.json();
        const url = `${process.env.apiHost}/v1/template/send/`;
        const data = {
            roles: [
                {
                    roleIndex: 1,
                    signerName: name,
                    signerEmail: email,
                },
            ],
        };

        // Making the API request to send the document using fetch
        const response = await fetch(`${url}?templateId=${templateId}`, {
            method: 'POST',
            headers: {
                'X-API-KEY': process.env.apiKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Check if the response is successful
        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ error: errorData }, { status: response.status });
        }


        // Extracting the document ID from the response
        const responseData = await response.json();
        console.log(responseData);
        return NextResponse.json({ documentId: responseData.documentId });
    } catch (error) {
        // Handling errors and sending appropriate responses
        return NextResponse.json({ message: 'An error occurred', error }, { status: 400 });
    }
}
