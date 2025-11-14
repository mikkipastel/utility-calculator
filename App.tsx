
import React, { useState } from 'react';
import AverageCalculator from './components/AverageCalculator';
import PriceComparisonCalculator from './components/PriceComparisonCalculator';
import { LogoIcon } from './components/icons/LogoIcon';

type CalculatorMode = 'average' | 'compare';

const App: React.FC = () => {
  const [mode, setMode] = useState<CalculatorMode>('average');

  const navItems = [
    { id: 'compare', label: 'Price Comparison' },
    { id: 'average', label: 'Average Calculator' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center p-4 sm:p-6 md:p-8">
      <header className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <LogoIcon />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Utility Calculator
        </h1>
        <p className="text-slate-400 mt-2 text-lg">Quick tools for smart decisions</p>
      </header>

      <main className="w-full max-w-2xl">
        <div className="mb-6 bg-slate-800 rounded-full p-1 flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setMode(item.id as CalculatorMode)}
              className={`w-full py-2.5 rounded-full text-sm sm:text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 ${
                mode === item.id
                  ? 'bg-white text-cyan-600 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="bg-slate-800 rounded-xl shadow-2xl p-6 sm:p-8">
          {mode === 'average' ? <AverageCalculator /> : <PriceComparisonCalculator />}
        </div>
      </main>
      
      <footer className="mt-8 text-center text-slate-500">
        <p>Powered by React, Tailwind CSS, and Gemini 2.5 Pro</p>
      </footer>
    </div>
  );
};

export default App;
