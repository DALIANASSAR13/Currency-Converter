import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, RefreshCw, ArrowLeft, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Converter = () => {
  // قائمة الـ 20 عملة المختارة
  const currencies = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'EGP', name: 'Egyptian Pound' },
    { code: 'SAR', name: 'Saudi Riyal' },
    { code: 'AED', name: 'UAE Dirham' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'KWD', name: 'Kuwaiti Dinar' },
    { code: 'QAR', name: 'Qatari Rial' },
    { code: 'BHD', name: 'Bahraini Dinar' },
    { code: 'OMR', name: 'Omani Rial' },
    { code: 'JOD', name: 'Jordanian Dinar' },
    { code: 'TRY', name: 'Turkish Lira' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CHF', name: 'Swiss Franc' },
    { code: 'CNY', name: 'Chinese Yuan' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'RUB', name: 'Russian Ruble' },
    { code: 'LYD', name: 'Libyan Dinar' }
  ];

  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EGP');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [result, setResult] = useState(0);
  const [loading, setLoading] = useState(false);

  // استبدل 'YOUR_API_KEY' بمفتاحك من موقع exchangerate-api.com
  const API_KEY = 'YOUR_API_KEY'; 

  // جلب البيانات عند تغيير العملات أو المبلغ
  useEffect(() => {
    const fetchRate = async () => {
      if (!API_KEY || API_KEY === 'YOUR_API_KEY') return;
      setLoading(true);
      try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`);
        const data = await response.json();
        if (data.result === "success") {
          setExchangeRate(data.conversion_rate);
          setResult(amount * data.conversion_rate);
        }
      } catch (error) {
        console.error("Error fetching rates:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchRate();
    }, 500); // تأخير بسيط لتقليل طلبات الـ API أثناء الكتابة

    return () => clearTimeout(timeoutId);
  }, [fromCurrency, toCurrency, amount, API_KEY]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6">
      {/* زر العودة */}
      <Link to="/" className="mb-8 flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-all group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </Link>

      <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] w-full max-w-lg border border-slate-100">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Convert Currency</h2>
          <div className="bg-blue-50 text-blue-600 p-2 rounded-xl">
            <TrendingUp size={24} />
          </div>
        </div>
        
        <div className="space-y-8">
          {/* Amount Input */}
          <div className="relative">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block ml-1">Amount</label>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-5 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all text-2xl font-bold text-slate-700 shadow-inner"
              placeholder="0.00"
            />
          </div>

          {/* Currencies Select */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1">From</label>
              <select 
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer appearance-none"
              >
                {currencies.map(c => <option key={c.code} value={c.code}>{c.code} - {c.name}</option>)}
              </select>
            </div>

            <button 
              onClick={swapCurrencies}
              className="mt-6 p-3 bg-white border border-slate-100 shadow-sm rounded-full text-blue-500 hover:bg-blue-600 hover:text-white transition-all active:scale-90"
            >
              <ArrowLeftRight size={20} />
            </button>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1">To</label>
              <select 
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer appearance-none"
              >
                {currencies.map(c => <option key={c.code} value={c.code}>{c.code} - {c.name}</option>)}
              </select>
            </div>
          </div>

          {/* Result Display */}
          <div className="pt-4">
            {loading ? (
              <div className="h-24 flex items-center justify-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <RefreshCw className="animate-spin text-blue-500" size={32} />
              </div>
            ) : (
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-[2rem] text-center shadow-[0_10px_30px_rgba(37,99,235,0.3)] transform transition-all">
                <p className="text-blue-100 text-sm font-medium mb-2">{amount} {fromCurrency} =</p>
                <h3 className="text-4xl font-black text-white mb-1">
                  {result.toLocaleString(undefined, { maximumFractionDigits: 3 })}
                </h3>
                <p className="text-blue-200 text-xs font-bold uppercase tracking-widest">{toCurrency}</p>
              </div>
            )}
          </div>
          
          <p className="text-center text-[10px] text-slate-400 font-medium">
            Live exchange rates powered by ExchangeRate-API
          </p>
        </div>
      </div>
    </div>
  );
};

export default Converter;