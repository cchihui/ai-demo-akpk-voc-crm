
import React from 'react';
import Header from './components/Header';
import FeedbackForm from './components/FeedbackForm';

const App: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col">
      {/* Decorative background shapes matching reference */}
      <div className="fixed -left-20 top-40 w-64 h-96 bg-[#c7e9f4] rounded-full blur-3xl opacity-30 -z-10 animate-pulse"></div>
      <div className="fixed -right-20 bottom-0 w-80 h-80 bg-[#c7e9f4] rounded-full blur-3xl opacity-30 -z-10"></div>
      
      {/* Visual wavy shapes (SVG-based implementation) */}
      <div className="absolute left-0 top-[20%] w-32 h-[40%] bg-sky-200 rounded-r-full opacity-20 hidden lg:block"></div>
      <div className="absolute right-0 bottom-0 w-48 h-48 bg-sky-200 rounded-tl-full opacity-20 hidden lg:block"></div>

      <Header />
      
      <main className="flex-grow pb-24">
        <FeedbackForm />
      </main>

      <footer className="w-full py-8 text-center text-slate-400 text-xs border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} AKPK - Agensi Kaunseling dan Pengurusan Kredit. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
