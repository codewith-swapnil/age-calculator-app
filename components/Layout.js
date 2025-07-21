// components/Layout.js
import Head from 'next/head';
import Link from 'next/link'; // Assuming you might have navigation later

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900 font-sans antialiased">
      <Head>
        <title>Age Calculator</title>
        <meta name="description" content="Calculate your exact age in years, months, and days with our free online age calculator." />
      </Head>

      <header className="bg-white shadow-md p-4 sticky top-0 z-20">
        <nav className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-2">
          <Link href="/" className="text-2xl font-extrabold text-blue-700 hover:text-blue-800 transition-colors duration-200">
            AgeFlow
          </Link>
          {/* You can add more navigation links here */}
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="bg-blue-800 text-white p-6 mt-8">
        <div className="container mx-auto text-center text-sm">
          <p>&copy; {new Date().getFullYear()} AgeFlow. All rights reserved.</p>
          <p className="mt-2">
            <Link href="/privacy-policy" className="text-blue-200 hover:text-white mx-2">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-blue-200 hover:text-white mx-2">
              Terms of Service
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;