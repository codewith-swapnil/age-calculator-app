// age-calculator-app/pages/index.js
import React, { useState, useEffect, useRef } from 'react';
import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';
import MessageBox from '../components/MessageBox';
import Script from 'next/script'; // Import Script for AdSense pushes

export default function HomePage() {
  const dobInputRef = useRef(null); // Ref for the date input element
  const resultDivRef = useRef(null); // Ref for the result div

  const [dob, setDob] = useState('');
  const [ageDisplay, setAgeDisplay] = useState('');
  const [resultVisible, setResultVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const [showMessage, setShowMessage] = useState(false);

  /**
   * Displays a message box with the given text.
   * @param {string} msg - The message to display.
   * @param {string} type - The type of message ('success', 'error', 'info').
   */
  const showMessageBox = (msg, type = 'info') => {
    setMessage(msg);
    setMessageType(type);
    setShowMessage(true);
    // Hide message after some time
    setTimeout(() => setShowMessage(false), 3500);
  };

  /**
   * Calculates the age based on the provided date of birth.
   */
  const calculateAge = () => {
    if (!dob) {
      showMessageBox('Please select your date of birth to calculate.', 'error');
      setResultVisible(false);
      return;
    }

    const birthDate = new Date(dob);
    const today = new Date(); // Gets the current date and time

    // Set both dates to start of day to avoid time component issues
    const dobDateOnly = new Date(birthDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    if (dobDateOnly > todayDateOnly) {
      showMessageBox('Date of birth cannot be in the future. Please select a valid date.', 'error');
      setResultVisible(false);
      return;
    }

    let years = todayDateOnly.getFullYear() - dobDateOnly.getFullYear();
    let months = todayDateOnly.getMonth() - dobDateOnly.getMonth();
    let days = todayDateOnly.getDate() - dobDateOnly.getDate();

    if (days < 0) {
      months--;
      const prevMonthLastDay = new Date(todayDateOnly.getFullYear(), todayDateOnly.getMonth(), 0);
      days += prevMonthLastDay.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Format the display with proper pluralization
    const yearText = years === 1 ? 'year' : 'years';
    const monthText = months === 1 ? 'month' : 'months';
    const dayText = days === 1 ? 'day' : 'days';

    setAgeDisplay(
      `${years} <span class="text-blue-600">${yearText}</span>, ${months} <span class="text-blue-600">${monthText}</span>, and ${days} <span class="text-blue-600">${dayText}</span>`
    );
    setResultVisible(true);
    showMessageBox('Age calculated successfully!', 'success');

    // Scroll to results for better mobile UX
    if (resultDivRef.current) {
      resultDivRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Track button clicks for analytics (replace with your actual analytics code)
    if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'click', {
            'event_category': 'Calculator',
            'event_label': 'Calculate Button'
        });
    }
  };

  // Effect for initial load and setting max date
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const todayString = `${year}-${month}-${day}`;

    if (dobInputRef.current) {
      dobInputRef.current.setAttribute('max', todayString);
      dobInputRef.current.focus(); // Auto-focus the date input
    }

    // Check for URL parameters to pre-fill date (useful for sharing)
    const urlParams = new URLSearchParams(window.location.search);
    const dobParam = urlParams.get('dob');
    if (dobParam) {
      setDob(dobParam);
      // Calculate automatically if date is provided in URL, with a slight delay
      setTimeout(calculateAge, 100);
    }
  }, []); // Empty dependency array means this runs once on mount

  const handlePrint = () => {
    window.print();
  };

  return (
    <Layout>
      <NextSeo
        title="Age Calculator - Calculate Your Exact Age in Years, Months & Days"
        description="Free online age calculator tool. Find out exactly how old you are in years, months, and days. Perfect for birthday calculations, age verification, and more. Fast, accurate, and mobile-friendly."
        canonical="https://yourwebsite.com/age-calculator" // Replace with your actual URL
      />

      <MessageBox message={message} type={messageType} show={showMessage} />

      <main
        className="
          bg-white p-6 sm:p-8 rounded-3xl shadow-2xl mx-auto
          border border-blue-100 transform transition-transform duration-300 hover:scale-[1.01] relative z-10
          max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl // MODIFIED: Added max-width classes
        "
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-800 mb-4 font-['Montserrat'] tracking-tight drop-shadow-md">
          <span className="text-blue-500">✨</span> Age Calculator <span className="text-blue-500">✨</span>
        </h1>

        <p className="mb-6 text-gray-700 text-base text-center">
          Welcome to our <strong>free online age calculator</strong>! Discover your exact age in years, months,
          and days with just a few clicks. This tool is perfect for calculating age for any purpose, from personal
          curiosity to official documentation. Simply select your date of birth below to get started. Our accurate
          and user-friendly calculator takes the guesswork out of determining age.
        </p>

        <div className="mb-6">
          <label htmlFor="dob" className="block text-gray-700 text-base font-medium mb-2">Select Your Date of
            Birth:</label>
          <input
            type="date"
            id="dob"
            ref={dobInputRef}
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter') calculateAge(); }}
            className="w-full px-4 py-3 sm:px-5 sm:py-3 border border-blue-300 rounded-xl focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 ease-in-out text-gray-800 shadow-sm hover:border-blue-400 cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-1 text-right">We don't store your birth date - calculations happen in
            your browser</p>
        </div>

        <button
          onClick={calculateAge}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/50 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Calculate My Age
        </button>

        <div
          id="result"
          ref={resultDivRef}
          className={`mt-7 p-5 sm:p-7 bg-blue-50 rounded-2xl border border-blue-200 text-center text-gray-800 shadow-inner ${resultVisible ? 'result-show' : 'hidden'}`}
        >
          <p className="text-lg sm:text-xl font-semibold mb-3 text-blue-700">Your Exact Age is:</p>
          {/* Using dangerouslySetInnerHTML because ageDisplay contains HTML spans */}
          <p id="ageDisplay" className="text-2xl sm:text-3xl font-extrabold text-blue-800 leading-tight" dangerouslySetInnerHTML={{ __html: ageDisplay }}></p>
          <button
            onClick={handlePrint}
            className="mt-4 px-4 py-2 bg-white border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 text-sm no-print"
          >
            Print Results
          </button>
        </div>

        {/* AdSense Unit 1 */}
        <div className="no-print mt-6 p-3 bg-gray-100 rounded-lg text-center text-gray-600 text-sm border border-gray-200">
          <p className="font-semibold mb-2 text-xs">Advertisement</p>
          <ins className="adsbygoogle"
            style={{ display: 'block', width: '100%', height: '90px', margin: '0 auto' }}
            data-ad-client="ca-pub-4062060956100997"
            data-ad-slot="5092115319"
          ></ins>
          <Script id="adsense-init-1">
            {`(adsbygoogle = window.adsbygoogle || []).push({});`}
          </Script>
          <p className="mt-1 text-xs text-gray-500">Supports our free tools</p>
        </div>

        <hr className="my-8 border-gray-300" />

        <div className="mt-8 text-gray-700 text-sm">
          <h2 className="font-bold text-lg mb-3 text-blue-800">How Our Age Calculator Works</h2>
          <p className="mb-3">Our <strong>Age Calculator</strong> uses a straightforward yet precise method to
            determine your age. When you input your birth date, the calculator instantly computes the duration
            from that specific date to the <strong>current date</strong> (July 21, 2025). It meticulously
            accounts for:</p>
          <ul className="list-disc pl-5 mb-3 space-y-1">
            <li><strong>Leap Years:</strong> Ensuring that an extra day in February is correctly factored in
              every four years, preventing inaccuracies.</li>
            <li><strong>Varying Month Lengths:</strong> Whether a month has 30 or 31 days (or 28/29 in
              February), the calculation adjusts precisely.</li>
            <li><strong>Exact Day Count:</strong> You get your age broken down into full years, months, and even
              the remaining days, providing a complete picture.</li>
          </ul>
          <p>This process guarantees that you receive an <strong>accurate and reliable age calculation</strong>
            every time, making it dependable for both casual use and more formal requirements.</p>
        </div>

        <hr className="my-8 border-gray-300" />

        <div className="mt-6 text-gray-700 text-sm">
          <h2 className="font-bold text-lg mb-3 text-blue-800">Why Calculate Your Exact Age?</h2>
          <p className="mb-3">Knowing your precise age in years, months, and days can be more useful than you might
            think! Beyond just curiosity, an exact age calculation is vital for numerous situations:</p>
          <ul className="list-disc pl-5 mb-3 space-y-1">
            <li><strong>Official Documentation:</strong> Many legal forms, applications (e.g., for school, jobs,
              or government services), and insurance policies require your exact age on a specific date.</li>
            <li><strong>Retirement Planning:</strong> Calculating your age down to the day can help determine
              eligibility for benefits or specific retirement programs.</li>
            <li><strong>Medical Records:</strong> Accurate age is crucial for dosage calculations, tracking
              developmental milestones in children, or understanding age-related health risks.</li>
            <li><strong>Academic Admissions:</strong> Certain educational institutions or programs might have
              strict age cut-offs, making precise age calculation essential.</li>
            <li><strong>Personal Milestones:</strong> Want to know exactly how many days old you are? Or how
              many days until your next big birthday? Our tool makes it easy to track these personal
              milestones.</li>
            <li><strong>Legal Purposes:</strong> For contracts, wills, or other legal agreements, the exact age
              of individuals involved can be a critical detail.</li>
          </ul>
          <p>Our age calculator simplifies these needs, providing you with <strong>quick and verified age
            details</strong> whenever you need them.</p>
        </div>

        <hr className="my-8 border-gray-300" />

        <div className="mt-6 text-gray-700 text-sm">
          <h2 className="font-bold text-lg mb-3 text-blue-800">Frequently Asked Questions (FAQs)</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-base text-blue-700 mb-1">Q: Is this age calculator free to use?
              </h3>
              <p>A: Yes, absolutely! Our age calculator is completely free to use, and there are no hidden
                charges or subscriptions required. You can use it as many times as you need.</p>
            </div>
            <div>
              <h3 className="font-semibold text-base text-blue-700 mb-1">Q: Do you store my date of birth
                information?</h3>
              <p>A: No, we do not store any personal information, including your date of birth. All age
                calculations are performed client-side, directly in your web browser, ensuring your privacy
                and data security.</p>
            </div>
            <div>
              <h3 className="font-semibold text-base text-blue-700 mb-1">Q: How accurate is this age calculator?
              </h3>
              <p>A: Our calculator is designed for high accuracy. It correctly accounts for leap years and the
                precise number of days in each month to give you your exact age in years, months, and days.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-base text-blue-700 mb-1">Q: Can I calculate the age for someone
                else?</h3>
              <p>A: Yes, you can! Simply input their date of birth into the selector, and the calculator will
                provide their exact age based on today's date.</p>
            </div>
            <div>
              <h3 className="font-semibold text-base text-blue-700 mb-1">Q: What if I select a future date as my
                date of birth?</h3>
              <p>A: The calculator will display an error message if you select a future date, as a date of
                birth cannot be in the future. Please ensure you select a date from the past or today's
                date.</p>
            </div>
          </div>
        </div>

        {/* AdSense Unit 2 */}
        <div className="no-print mt-6 p-3 bg-gray-100 rounded-lg text-center text-gray-600 text-sm border border-gray-200">
          <p className="font-semibold mb-2 text-xs">Advertisement</p>
          <ins className="adsbygoogle"
            style={{ display: 'inline-block', width: '300px', height: '250px', margin: '0 auto' }}
            data-ad-client="ca-pub-4062060956100997"
            data-ad-slot="2103167504"
          ></ins>
          <Script id="adsense-init-2">
            {`(adsbygoogle = window.adsbygoogle || []).push({});`}
          </Script>
          <p className="mt-1 text-xs text-gray-500">Thank you for supporting us</p>
        </div>

        {/* AdSense Unit 3 */}
        <div className="no-print mt-6 p-3 bg-gray-100 rounded-lg text-center text-gray-600 text-sm border border-gray-200">
          <p className="font-semibold mb-2 text-xs">Advertisement</p>
          <ins className="adsbygoogle"
            style={{ display: 'block', textAlign: 'center' }}
            data-ad-client="ca-pub-4062060956100997"
            data-ad-slot="6449429019"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
          <Script id="adsense-init-3">
            {`(adsbygoogle = window.adsbygoogle || []).push({});`}
          </Script>
          <p className="mt-1 text-xs text-gray-500">Your support helps keep this tool free</p>
        </div>
      </main>
    </Layout>
  );
}