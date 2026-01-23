"use client";
import { Inter } from 'next/font/google';
import Link from 'next/link';
import React, { useState } from 'react';
import SignInModal from './components/login/signin';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Navbar */}
        <nav className="bg-blue-600 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                <span className="text-2xl">✨</span>
                <span>Soukconect</span>
              </Link>
              
              <div className="hidden md:flex items-center gap-6">
                <Link href="/" className="hover:text-yellow-300 transition">Home</Link>
                <Link href="/about" className="hover:text-yellow-300 transition">About</Link>
                <Link href="/contact" className="hover:text-yellow-300 transition">Contact</Link>
              </div>

              <button onClick={() => setIsSignInOpen(true)} className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition">
                Join Now
              </button>
            </div>
          </div>
        </nav>

        {children}

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 px-4 mt-12">
          <div className="max-w-6xl mx-auto">
            {/* Main Footer Content */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-6">
              <div>
                <h3 className="font-bold text-base mb-3 text-yellow-400">Soukconect</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Connecting creators with consumers
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm mb-2 text-gray-200">Brands</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-yellow-400 transition">Food Connect</a></li>
                  <li><a href="#" className="hover:text-yellow-400 transition">Reno Connect</a></li>
                  <li><a href="#" className="hover:text-yellow-400 transition">Party Connect</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2 text-gray-200">Company</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="/about" className="hover:text-yellow-400 transition">About</a></li>
                  <li><a href="/careers" className="hover:text-yellow-400 transition">Careers</a></li>
                  <li><a href="/contact" className="hover:text-yellow-400 transition">Contact</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2 text-gray-200">Legal</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="/terms" className="hover:text-yellow-400 transition">Terms</a></li>
                  <li><a href="/privacy" className="hover:text-yellow-400 transition">Privacy</a></li>
                  <li><a href="/cookies" className="hover:text-yellow-400 transition">Cookies</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2 text-gray-200">Follow</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-yellow-400 transition">Twitter</a></li>
                  <li><a href="#" className="hover:text-yellow-400 transition">LinkedIn</a></li>
                  <li><a href="#" className="hover:text-yellow-400 transition">Instagram</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-800 pt-4 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
              <p>© 2025 Soukconect. All rights reserved.</p>
              <p className="text-gray-500 mt-2 md:mt-0">Made with ❤️ for creators</p>
            </div>
          </div>
        </footer>

        <SignInModal
          isOpen={isSignInOpen}
          onClose={() => setIsSignInOpen(false)}
        />
      </body>
    </html>
  );
}