import React, { useState } from 'react';

const ConverterPage = () => {
  const [amount, setAmount] = useState('1000.00');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState('920.50');

  const currencies = [
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
    { code: 'EGP', name: 'Egyptian Pound', flag: '🇪🇬' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      {/* Navbar */}
      <nav className="bg-white px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">G</div>
          <span className="text-xl font-bold">Global Currency</span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <a href="/" className="hover:text-blue-600">Home</a>
          <a href="#" className="hover:text-blue-600">Rates Table</a>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Sign In</button>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-4xl mx-auto pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Currency Converter</h1>
        <p className="text-slate-500 text-lg">Fast, secure, and reliable exchange rates.</p>
      </div>

      <main className="max-w-4xl mx-auto px-4 pb-20">
        {/* Main Card */}
        <div className="bg-white rounded-[24px] shadow-2xl shadow-blue-100/50 p-6 md:p-10 border border-slate-100">
          <div className="grid grid-cols-1 gap-8">
            {/* Input Amount */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Amount</label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl py-4 px-6 text-xl font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-blue-500 font-bold text-xl">$</span>
              </div>
            </div>

            {/* Selectors */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-full">
                <label className="block text-sm font-bold text-slate-700 mb-2">From</label>
                <select 
                  className="w-full border border-slate-200 rounded-xl py-4 px-4 bg-white font-medium cursor-pointer"
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                >
                  {currencies.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code} - {c.name}</option>)}
                </select>
              </div>

              <div className="mt-6 flex items-center justify-center w-12 h-12 border border-slate-200 rounded-full text-slate-400">
                ⇄
              </div>

              <div className="w-full">
                <label className="block text-sm font-bold text-slate-700 mb-2">To</label>
                <select 
                  className="w-full border border-slate-200 rounded-xl py-4 px-4 bg-white font-medium cursor-pointer"
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                >
                  {currencies.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code} - {c.name}</option>)}
                </select>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-5 rounded-xl text-xl font-bold hover:bg-blue-700 shadow-lg transition-all active:scale-[0.98]">
              Convert Currency
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="text-left">
            <p className="text-blue-500 font-bold mb-1">{amount} {fromCurrency} =</p>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-none">
              {result} <span className="text-2xl md:text-4xl text-slate-500 font-bold">{toCurrency}</span>
            </h2>
            <p className="text-slate-400 text-sm mt-4 flex items-center gap-1">
              ⓘ Mid-market exchange rate at 10:30 UTC
            </p>
          </div>

          <div className="flex gap-3">
            <button className="bg-white border border-slate-200 px-6 py-3 rounded-xl font-bold text-slate-700 hover:bg-slate-50 shadow-sm">
              🕒 Past 24h
            </button>
            <button className="bg-white border border-slate-200 px-6 py-3 rounded-xl font-bold text-slate-700 hover:bg-slate-50 shadow-sm">
              🔔 Track Rate
            </button>
          </div>
        </div>

        {/* Footer Rates */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex justify-between text-slate-400 text-sm font-medium">
          <span>1 USD = 0.9205 EUR</span>
          <span>1 EUR = 1.0863 USD</span>
        </div>
      </main>
    </div>
  );
};

export default ConverterPage;