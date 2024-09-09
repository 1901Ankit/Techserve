import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const userIp = req.headers.get('x-forwarded-for') || req.headers.get('remote-addr');

    if (!userIp) {
      return NextResponse.json({ error: 'Unable to determine IP address' }, { status: 400 });
    }

    //  geolocation data using IPstack API
    const response = await fetch(`http://ip-api.com/json/${userIp}`);
    const data = await response.json();
    const userCountry = data.countryCode;

    let currencySymbol = '$'; // Default symbol
    switch (userCountry) {
      case 'IN':
        currencySymbol = '₹';
        break;
      case 'AU':
        currencySymbol = 'A$';
        break;
      case 'GB':
        currencySymbol = '£';
        break;
      case 'BD':
        currencySymbol = '৳';
        break;
      case 'CA':
        currencySymbol = 'C$';
        break;
      default:
        currencySymbol = '$';
        break;
    }

    return NextResponse.json({ currencySymbol });
  } catch (error) {
    console.error('Error fetching currency symbol:', error);
    return NextResponse.json({ currencySymbol: '$' });
  }
}
