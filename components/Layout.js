// age-calculator-app/components/Layout.js
import React from 'react';
import Link from 'next/link';

export default function Layout({ children }) {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {children}
      <footer className="mt-6 text-gray-600 text-sm text-center no-print">
        &copy; {currentYear} Age Calculator Tool. All rights reserved. |
        <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link> |
        <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
      </footer>
    </>
  );
}