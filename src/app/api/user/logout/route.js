import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req) {
    try {
        const response = NextResponse.json({ message: "Logged out successfully", success: true });
        response.cookies.delete("token");

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message, success: false }, { status: 500 });
    }
}