// app/api/contact/route.js

import { connectToDatabase } from '../../../config/mongodb';
import Contact from '../../../models/contact';

export async function POST(req) {
  try {
    await connectToDatabase();

    const { name, email, subject, message } = await req.json();

  
    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

   
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    return new Response(JSON.stringify({ message: 'Contact form submitted successfully' }), {
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
