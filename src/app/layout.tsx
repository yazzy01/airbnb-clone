import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb Clone",
  description: "An Airbnb clone built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Remove browser extension attributes that cause hydration errors
                function removeAttributes() {
                  document.querySelectorAll('*').forEach(function(el) {
                    if (el.hasAttribute('bis_skin_checked')) el.removeAttribute('bis_skin_checked');
                    if (el.hasAttribute('bis_register')) el.removeAttribute('bis_register');
                    if (el.hasAttribute('data-arp')) el.removeAttribute('data-arp');
                    
                    // Remove any attribute that starts with __processed_
                    Array.from(el.attributes).forEach(function(attr) {
                      if (attr.name.startsWith('__processed_')) {
                        el.removeAttribute(attr.name);
                      }
                    });
                  });
                }

                // Run immediately
                removeAttributes();
                
                // Run again after a small delay to catch any late additions
                setTimeout(removeAttributes, 0);
                document.addEventListener('DOMContentLoaded', removeAttributes);
              })();
            `,
          }}
        />
        <RegisterModal />
        <LoginModal />
        <Navbar />
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  );
}
