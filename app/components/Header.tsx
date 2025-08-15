'use client';

import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-black/20 backdrop-blur-2xl shadow-2xl rounded-2xl border border-orange-400/20 px-12 relative overflow-hidden">
      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-amber-500/5 rounded-2xl" />
      
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center relative z-10">
        <Link href="/" className="text-2xl font-extrabold bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent tracking-tight drop-shadow-2xl hover:from-orange-300 hover:via-amber-300 hover:to-orange-400 transition-all duration-300">
          CoreApp <span className="ml-1 text-orange-400">⚡️</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            href="/create-link"
            className="bg-gradient-to-r from-orange-500/80 to-amber-500/80 backdrop-blur-xl border border-orange-400/30 hover:from-orange-500/90 hover:to-amber-500/90 hover:border-orange-300/40 text-white font-bold py-2 px-5 rounded-lg shadow-2xl shadow-orange-500/25 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:ring-offset-2 focus:ring-offset-black/50 transform hover:scale-105 active:scale-95"
          >
            Create Link
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;