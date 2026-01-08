import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Converter = () => {
  const [amount, setAmount] = useState('1000.00');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [result, setResult] = useState('0.00');
  const [currencyCodes, setCurrencyCodes] = useState([]); // لتخزين قائمة كل العملات من الـ API
  const [loading, setLoading] = useState(true);

  // 1. جلب قائمة جميع العملات المتاحة عند فتح الصفحة لأول مرة
  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then((res) => res.json())
      .then((data) => {
        const codes = Object.keys(data.rates);
        setCurrencyCodes(codes);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching currency list:", err));
  }, []);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        setExchangeRate(rate);
        setResult((parseFloat(amount) * rate).toFixed(2));
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    if (amount > 0) {
      fetchExchangeRate();
    }
  }, [fromCurrency, toCurrency, amount]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F7FA]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F3F7FA] font-sans text-slate-900 pb-20">
      {/* Navbar */}
      <nav className="bg-white px-6 md:px-12 py-4 flex justify-between items-center shadow-sm border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center text-white font-bold">B</div>
          <span className="text-xl font-bold tracking-tight">Global Currency</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-slate-600 hover:text-blue-600 font-semibold text-sm transition">Home</Link>
          <Link to="/rates" className="text-slate-600 hover:text-blue-600 font-semibold text-sm transition">Rates Table</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto pt-16 pb-10 text-center px-4">
        <h1 className="text-4xl md:text-[56px] font-black text-slate-900 mb-4 tracking-tight leading-tight">
          Currency Converter
        </h1>
        <p className="text-slate-500 text-lg font-medium">Fast, secure, and reliable exchange rates.</p>
      </div>

      <main className="max-w-3xl mx-auto px-4">
        {/* Converter Card */}
        <div className="bg-white rounded-[32px] shadow-[0_20px_50px_rgba(37,99,235,0.1)] p-6 md:p-12 border border-white/50 relative z-10">
          <div className="space-y-8">
            {/* Amount Input */}
            <div>
              <label className="block text-sm font-extrabold text-slate-700 mb-3 uppercase tracking-wider">Amount</label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border-2 border-slate-100 rounded-2xl py-5 px-6 text-2xl font-bold focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-2xl"></span>
              </div>
            </div>

            {/* Selectors Grid */}
            <div className="flex flex-col md:flex-row items-center gap-4 relative">
              <div className="w-full">
                <label className="block text-sm font-extrabold text-slate-700 mb-3 uppercase tracking-wider">From</label>
                <div className="relative">
                  <select 
                    className="w-full border-2 border-slate-100 rounded-2xl py-5 px-6 bg-white font-bold text-slate-800 appearance-none cursor-pointer focus:border-blue-500 outline-none transition-all"
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                  >
                    {currencyCodes.map(code => (
                      <option key={code} value={code}>{code}</option>
                    ))}
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                </div>
              </div>

              {/* Swap Button */}
              <button 
                onClick={handleSwap}
                className="md:mt-8 p-4 bg-white border-2 border-slate-100 rounded-full hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm active:scale-90 z-20"
              >
                <span className="text-2xl font-bold">⇄</span>
              </button>

              <div className="w-full">
                <label className="block text-sm font-extrabold text-slate-700 mb-3 uppercase tracking-wider">To</label>
                <div className="relative">
                  <select 
                    className="w-full border-2 border-slate-100 rounded-2xl py-5 px-6 bg-white font-bold text-slate-800 appearance-none cursor-pointer focus:border-blue-500 outline-none transition-all"
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                  >
                    {currencyCodes.map(code => (
                      <option key={code} value={code}>{code}</option>
                    ))}
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                </div>
              </div>
            </div>

            <button className="w-full bg-[#2563EB] text-white py-6 rounded-2xl text-xl font-black hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-[0.98]">
              Convert Currency
            </button>
          </div>
        </div>

        {/* Dynamic Results Display */}
        <div className="mt-16 flex flex-col md:flex-row justify-between items-center md:items-end gap-8 px-4">
          <div className="text-center md:text-left">
            <p className="text-slate-400 font-bold mb-2 tracking-wide uppercase text-xs">
              {amount} {fromCurrency} =
            </p>
            <h2 className="text-6xl md:text-[84px] font-black text-[#2563EB] leading-none mb-6 tracking-tighter">
              {result} <span className="text-3xl text-slate-900 font-bold tracking-normal">{toCurrency}</span>
            </h2>
            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-400 text-sm font-bold">
              <span className="bg-slate-100 p-1 rounded-full text-[10px]">ℹ</span>
              Mid-market exchange rate at 10:30 UTC
            </div>
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

          <div className="flex gap-4">
            <div className="bg-white border border-slate-100 rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-all cursor-pointer">
              <p className="text-slate-400 font-bold text-sm mb-2">Fee</p>
              <span className="text-2xl font-black text-slate-900">0.00</span>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-all cursor-pointer">
              <p className="text-slate-400 font-bold text-sm mb-2">You Get</p>
              <span className="text-2xl font-black text-slate-900">{result} {toCurrency}</span>
            </div>
          </div>
        </div>

        {/* Footer Exchange Information */}
        <div className="mt-16 pt-10 border-t-2 border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 font-bold text-sm tracking-wide">
          <div className="flex items-center gap-6">
            <span>1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}</span>
            <span className="text-slate-200">|</span>
            <span>1 {toCurrency} = {(1/exchangeRate).toFixed(6)} {fromCurrency}</span>
          </div>
          <div className="text-slate-300 italic">Secure Connection Verified</div>
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