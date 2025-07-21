// age-calculator-app/pages/_app.js
import Head from 'next/head';
import Script from 'next/script'; // Import Script for external scripts
import '../styles/globals.css'; // Import your global CSS
import { NextSeo } from 'next-seo'; // For global SEO

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Tailwind CSS is now handled locally via postcss, so no CDN link needed here */}
      </Head>

      {/* Global SEO for the entire application */}
      <NextSeo
        title="Age Calculator - Calculate Your Exact Age in Years, Months & Days"
        description="Free online age calculator tool. Find out exactly how old you are in years, months, and days. Perfect for birthday calculations, age verification, and more. Fast, accurate, and mobile-friendly."
        canonical="https://yourwebsite.com/age-calculator" // Replace with your actual canonical URL
        openGraph={{
          url: 'https://yourwebsite.com/age-calculator',
          title: 'Free Online Age Calculator | Calculate Your Exact Age',
          description: 'Find out exactly how old you are in years, months, and days with our free age calculator tool.',
          images: [
            {
              url: 'https://yourwebsite.com/images/age-calculator-preview.jpg', // Replace with your actual image
              width: 1200,
              height: 630,
              alt: 'Age Calculator Preview',
            },
          ],
          type: 'website',
        }}
        twitter={{
          handle: '@yourhandle', // Replace with your Twitter handle
          site: '@yourhandle',
          cardType: 'summary_large_image',
          title: 'Free Online Age Calculator | Calculate Your Exact Age',
          description: 'Find out exactly how old you are in years, months, and days with our free age calculator tool.',
          image: 'https://yourwebsite.com/images/age-calculator-preview.jpg', // Replace with your actual image
        }}
      />

      {/* Structured Data for WebApplication */}
      <Script id="web-application-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Age Calculator",
            "url": "https://ageflow.netlify.app/",
            "description": "Free online tool to calculate your exact age in years, months, and days.",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Web browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          }
        `}
      </Script>

      {/* Google AdSense Script - Using Next.js Script component for optimal loading */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4062060956100997"
        crossOrigin="anonymous"
        strategy="lazyOnload" // Loads after the page is interactive
      />

      <Component {...pageProps} />

      {/* Structured Data for Calculator - Placed here as it's specific to the calculator functionality */}
      <Script id="calculator-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Calculator",
            "name": "Age Calculator",
            "description": "Calculate your exact age in years, months, and days",
            "url": "https://ageflow.netlify.app/",
            "operatingSystem": "All",
            "applicationCategory": "WebApplication"
          }
        `}
      </Script>
    </>
  );
}

export default MyApp;