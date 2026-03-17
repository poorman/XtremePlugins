import type { Metadata } from 'next';
import Script from 'next/script';
import { exo2, orbitron } from '@/lib/fonts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WarpBackground from '@/components/WarpBackground';
import Providers from '@/components/Providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'XtremePlugins — Premium Freemium Plugins for WooCommerce, Shopify & WordPress',
  description: 'Supercharge your store with premium freemium plugins for WooCommerce, Shopify and WordPress. Used by 5,000+ store owners.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${exo2.variable} ${orbitron.variable}`}>
      <body className="font-body min-h-screen">
        <Providers>
          <WarpBackground />
          <div className="relative z-[1]">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
        {/* Statcounter */}
        <Script
          id="statcounter"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var sc_project=13211083;
              var sc_invisible=1;
              var sc_security="6cca2c09";
            `,
          }}
        />
        <Script
          src="https://www.statcounter.com/counter/counter.js"
          strategy="afterInteractive"
          async
        />
        <noscript>
          <div className="statcounter">
            <a title="Web Analytics" href="https://statcounter.com/" target="_blank">
              <img
                className="statcounter"
                src="https://c.statcounter.com/13211083/0/6cca2c09/1/"
                alt="Web Analytics"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </a>
          </div>
        </noscript>
      </body>
    </html>
  );
}
