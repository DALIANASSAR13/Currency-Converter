import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Converter = () => {
  const [amount, setAmount] = useState('1000.00');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [result, setResult] = useState('0.00');
  const [currencyCodes, setCurrencyCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. جلب قائمة العملات
  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then((res) => res.json())
      .then((data) => {
        setCurrencyCodes(Object.keys(data.rates));
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching currency list:", err));
  }, []);

  // 2. جلب سعر الصرف والتحويل اللحظي
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        setExchangeRate(rate);
        setResult((parseFloat(amount) * rate).toFixed(2));
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (amount > 0) fetchExchangeRate();
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
          <Link to="/" className="text-slate-600 hover:text-blue-600 font-semibold text-sm">Home</Link>
          <Link to="/rates" className="text-slate-600 hover:text-blue-600 font-semibold text-sm">Rates Table</Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-4xl mx-auto pt-16 pb-10 text-center px-4">
        <h1 className="text-4xl md:text-[56px] font-black text-slate-900 mb-4 tracking-tight leading-tight">Currency Converter</h1>
        <p className="text-slate-500 text-lg font-medium">Fast, secure, and reliable exchange rates.</p>
      </div>

      <main className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-[32px] shadow-[0_20px_50px_rgba(37,99,235,0.1)] p-6 md:p-12 border border-white/50">
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-extrabold text-slate-700 mb-3 uppercase tracking-wider">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border-2 border-slate-100 rounded-2xl py-5 px-6 text-2xl font-bold focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-full">
                <label className="block text-sm font-extrabold text-slate-700 mb-3 uppercase tracking-wider">From</label>
                <select 
                  className="w-full border-2 border-slate-100 rounded-2xl py-5 px-6 bg-white font-bold appearance-none cursor-pointer focus:border-blue-500 outline-none"
                  value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}
                >
                  {currencyCodes.map(code => <option key={code} value={code}>{code}</option>)}
                </select>
              </div>

              <button onClick={handleSwap} className="md:mt-8 p-4 bg-white border-2 border-slate-100 rounded-full hover:border-blue-500 transition-all">
                <span className="text-2xl font-bold">⇄</span>
              </button>

              <div className="w-full">
                <label className="block text-sm font-extrabold text-slate-700 mb-3 uppercase tracking-wider">To</label>
                <select 
                  className="w-full border-2 border-slate-100 rounded-2xl py-5 px-6 bg-white font-bold appearance-none cursor-pointer focus:border-blue-500 outline-none"
                  value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}
                >
                  {currencyCodes.map(code => <option key={code} value={code}>{code}</option>)}
                </select>
              </div>
            </div>

            <button className="w-full bg-[#2563EB] text-white py-6 rounded-2xl text-xl font-black hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-[0.98]">
              Convert Currency
            </button>
          </div>
        </div>

        {/* Results Display */}
        <div className="mt-16 text-center md:text-left">
          <p className="text-slate-400 font-bold mb-2 uppercase text-xs">{amount} {fromCurrency} =</p>
          <h2 className="text-6xl md:text-[84px] font-black text-[#2563EB] leading-none mb-6 tracking-tighter">
            {result} <span className="text-3xl text-slate-900 font-bold tracking-normal">{toCurrency}</span>
          </h2>
          <div className="flex items-center justify-center md:justify-start gap-2 text-slate-400 text-sm font-bold">
             ⓘ Mid-market exchange rate at global banking institutions.
          </div>
        </div>
      </main>
    </div>
  );
};

export default Converter;
