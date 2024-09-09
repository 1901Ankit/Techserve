import { NextRequest, NextResponse } from 'next/server';

export async function GET(req) {
    try {
        const documentId = req.nextUrl.searchParams.get('documentId'); // Extract documentId from the query parameters

        if (!documentId) {
            return NextResponse.json({ message: 'Missing documentId parameter' }, { status: 400 });
        }

        const url = `${process.env.apiHost}/v1/document/properties/?documentId=${documentId}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-API-KEY': process.env.apiKey,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(errorData, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }
}
