

import { connectToDatabase } from '../../../config/mongodb';
import Price from '../../../models/priceCalculator';

export async function POST(req) {
  try {
    await connectToDatabase();

    const { types, number, pages, requirements, appPlatform, domainDetails, hosting, officialMail, logoDetails, brand, technology, completed, budget, additionalDetails } = await req.json();


    const newPrice = new Price({
      types,
      number,
      pages,
      requirements,
      appPlatform: appPlatform,
      domainDetails: domainDetails,
      hosting: hosting,
      officialMail: officialMail,
      logoDetails: logoDetails,
      brand,
      technology,
      completed,
      budget: budget,
      additionalDetails: additionalDetails,
    });
    await newPrice.save();

    return new Response(JSON.stringify({ message: 'Price details added successfully' }), {
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




export async function GET(req) {
  try {
    await connectToDatabase();

    const prices = await Price.findOne();
    return new Response(JSON.stringify({ data: prices }), {
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



export async function PATCH(req) {
  try {
    await connectToDatabase();
    console.log(req.json())
    // const updatedData = await Price.findOneAndUpdate(
    //   {"_id": "66b538e14df6a0c0760dfadf"},
    //   { $set: { domainDetails: req.json().domainDetails } },
    //   { new: true }
    // );


    return new Response(JSON.stringify({  message: 'Price details updated successfully' }), {
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
