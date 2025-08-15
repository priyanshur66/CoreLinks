import type { Metadata } from 'next';
import { Inter, Press_Start_2P } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';
import '@rainbow-me/rainbowkit/styles.css'; // Add RainbowKit styles
import { Providers } from './providers'; // Import the new Providers

const inter = Inter({ subsets: ['latin'] });
const pixelFont = Press_Start_2P({ 
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pixel'
});

export const metadata: Metadata = {
  title: 'CoreLink',
  description: 'Create shareable EVM transaction links.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${pixelFont.variable} bg-black text-white`}>
        <Providers> {/* Wrap everything in Providers */}
          <Toaster />
          {/* <Header /> */}
          <main className="container mx-auto px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}