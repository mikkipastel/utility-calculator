
import React, { useState, useMemo } from 'react';
import { CalculatorIcon } from './icons/CalculatorIcon';

interface CalculationResult {
  average: number;
  count: number;
  sum: number;
}

const AverageCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    if (!inputValue.trim()) {
      setError('Please enter at least one valid number.');
      return;
    }

    const numbers = inputValue
      .split(/[\s,]+/)
      .filter(n => n !== '')
      .map(Number)
      .filter(n => !isNaN(n));

    if (numbers.length === 0) {
      setError('ไม่พบตัวเลขที่ถูกต้องในข้อมูลที่ป้อน');
      return;
    }

    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    const average = sum / numbers.length;
    
    setResult({
      average: parseFloat(average.toFixed(4)), // Round for cleaner display
      count: numbers.length,
      sum: parseFloat(sum.toFixed(4)),
    });
  };

  const handleClear = () => {
    setInputValue('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="flex flex-col space-y-6 animate-fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-cyan-400">Average Value Calculator</h2>
        <p className="mt-2 text-slate-400 max-w-md mx-auto">
          คำนวณหาค่าเฉลี่ย โดยการป้อนตัวเลขลงไป
        </p>
      </div>
      
      <div>
        <label htmlFor="numbers-input" className="block mb-2 text-sm font-medium text-slate-400">
          ป้อนตัวเลขโดยคั่นด้วยช่องว่าง (space) หรือจุลภาค (comma)
        </label>
        <textarea
          id="numbers-input"
          rows={4}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="เช่น 10 25 15.5 8, 42"
          className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleCalculate}
          className="w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-700 transition-colors flex items-center justify-center gap-2"
        >
          <CalculatorIcon />
          <span>Calculate Average</span>
        </button>
        <button
          onClick={handleClear}
          className="w-full bg-slate-600 text-slate-200 font-bold py-3 px-4 rounded-lg hover:bg-slate-500 transition-colors"
        >
          Reset
        </button>
      </div>

      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-lg text-center">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-slate-700/50 p-6 rounded-lg space-y-4 animate-fade-in-up">
          <h3 className="text-xl font-semibold text-center text-white">Result</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-4 rounded-lg">
              <p className="text-sm font-medium text-white/90">Average</p>
              <p className="text-2xl font-bold text-white">{result.average.toLocaleString()}</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg">
              <p className="text-sm text-slate-400">Sum</p>
              <p className="text-2xl font-bold text-white">{result.sum.toLocaleString()}</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg">
              <p className="text-sm text-slate-400">Count</p>
              <p className="text-2xl font-bold text-white">{result.count}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AverageCalculator;