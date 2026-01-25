import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { AuthProvider } from '@/context/auth-context';
import { UserProfileMenu } from '@/components/user-profile-menu';
import { config } from '@/lib/config';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Food Connect - Artisanal Food Marketplace',
  description: 'Discover artisanal food producers and culinary masters',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <nav className="bg-green-600 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between items-center h-16">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                  <span className="text-2xl">🍕</span>
                  <span>Food Connect</span>
                </Link>
                
                <div className="hidden md:flex items-center gap-6">
                  <Link href={config.shellUrl} className="hover:text-yellow-300 transition">Home</Link>
                  <Link href="/" className="hover:text-yellow-300 transition">Browse</Link>
                  <Link href="/chefs" className="hover:text-yellow-300 transition">Chefs</Link>
                  <Link href="/cart" className="hover:text-yellow-300 transition">Cart</Link>
                </div>

                <div className="flex items-center gap-4">
                  <button className="relative">
                    <span className="text-2xl">🛒</span>
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      0
                    </span>
                  </button>
                  <UserProfileMenu />
                </div>
              </div>
            </div>
          </nav>
        
        {children}

        <footer className="bg-gray-900 text-white py-8 px-4 mt-12">
          <div className="max-w-6xl mx-auto">
            {/* Main Footer Content */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6">
              <div>
                <h3 className="font-bold text-base mb-3 text-orange-400">Food Connect</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Artisanal food producers, traditional recipes, and culinary artistry
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm mb-2 text-gray-200">Browse</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-orange-400 transition">Chefs</a></li>
                  <li><a href="#" className="hover:text-orange-400 transition">Categories</a></li>
                  <li><a href="#" className="hover:text-orange-400 transition">Orders</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2 text-gray-200">Support</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-orange-400 transition">Help</a></li>
                  <li><a href="#" className="hover:text-orange-400 transition">Contact</a></li>
                  <li><a href="#" className="hover:text-orange-400 transition">Feedback</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2 text-gray-200">Connect</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-orange-400 transition">Twitter</a></li>
                  <li><a href="#" className="hover:text-orange-400 transition">Facebook</a></li>
                  <li><a href="#" className="hover:text-orange-400 transition">Instagram</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-800 pt-4 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
              <p>© {new Date().getFullYear()} Food Connect. All rights reserved.</p>
              <p className="text-gray-500 mt-2 md:mt-0">Freshly prepared, delivered with 🍛 love</p>
            </div>
          </div>
        </footer>
        </AuthProvider>
      </body>
    </html>
  );
}