
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-sm font-sans">
      {/* Top Blue Bar */}
      <div className="bg-[#1e3a5f] text-white px-4 py-2 text-xs flex justify-between items-center">
        <div className="flex gap-4 md:ml-24">
          <button className="bg-white text-[#1e3a5f] px-4 py-1 rounded font-semibold">Individual</button>
          <button className="px-4 py-1 hover:bg-white/10 rounded">Business</button>
        </div>
        <div className="hidden md:flex items-center gap-4 md:mr-24">
          <span>You're Now at <a href="#" className="underline font-bold">AKPK's Portal</a></span>
        </div>
      </div>

      {/* Main Logo Bar */}
      <div className="flex justify-between items-center px-4 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center">
           <div className="flex items-center gap-1">
             {/* Using local logo.png file reference as requested */}
             <img 
               src="/logo.png" 
               alt="AKPK Logo" 
               className="h-16 md:h-20 object-contain"
             />
           </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
