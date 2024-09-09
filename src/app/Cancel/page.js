import React from 'react';
import Link from 'next/link';

const Cancel = () => (
  <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
    <h1 className="text-2xl font-semibold mb-4">Payment Canceled</h1>
    <p className="text-gray-700 mb-6">It looks like the payment was canceled. You can try again or contact support if you need help.</p>
    <Link href="/view-plans" className="text-blue-500 hover:underline">
      Return to Plans
    </Link>
  </div>
);

export default Cancel;
