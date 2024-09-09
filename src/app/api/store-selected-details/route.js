import { connectToDatabase } from "@/config/mongodb";
import PricingEnquiryDetails from "@/models/pricingEnquiry";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectToDatabase();

        const { userId, serviceType, currentCountry, selectedServiceAndPriceDetails, selectedServiceDetails, contractDocumentId } = await req.json();

        if (!userId) {
            return NextResponse.json({ error: 'userId is required' }, { status: 400 });
        }

        const user = await User.findOne({ _id: userId });

        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        if (!serviceType || !currentCountry || !selectedServiceAndPriceDetails || !selectedServiceDetails || !contractDocumentId) {
            return NextResponse.json({ error: 'serviceType, currentCountry, selectedServiceAndPriceDetails, selectedServiceDetails, and contractDocumentId are required' }, { status: 400 });
        }

        const newPricingEnquiry = new PricingEnquiryDetails({
            userId,
            serviceType,
            currentCountry,
            selectedServiceAndPriceDetails,
            selectedServiceDetails,
            contractDocumentId
        });

        const savedDetails = await newPricingEnquiry.save();

        return NextResponse.json({
            savedDetails,
            message: "New pricing enquiry details saved successfully",
            success: true,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}




export async function GET(req) {
    try {
        await connectToDatabase();

        const userId = req.params.userId;
        const details = await PricingEnquiry.findOne({ userId: userId });
        return new Response(JSON.stringify({ data: details }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}



export async function PUT(req) {
    try {
        await connectToDatabase();
        const userId = req.params.userId;
        const updatableData = req.json();
        const updatedData = await PricingEnquiry.findOneAndUpdate(
            { userId: userId },
            { $set: updatableData },
            { new: true }
        );
        return new Response(JSON.stringify({ data: updatedData, message: 'pricing enquiry details updated successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
