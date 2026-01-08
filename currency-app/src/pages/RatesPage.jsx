import React, { useState, useEffect } from 'react';

const RatesPage = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');

  // قائمة العملات التي تظهر في الصورة التي أرفقتِها
  const targetCurrencies = [
    { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
    { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
    { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
    { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
    { code: 'EGP', name: 'Egyptian Pound', flag: '🇪🇬' }
  ];

  useEffect(() => {
    const fetchLiveRates = async () => {
      try {
        // جلب البيانات مع اعتبار USD هو العملة الأساسية كما في الصورة
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await response.json();
        
        // تصفية البيانات لتشمل فقط العملات التي نريد عرضها
        const formattedRates = targetCurrencies.map(currency => ({
          ...currency,
          rate: data.rates[currency.code]?.toFixed(5) || 'N/A',
          // توليد نسبة تغيير عشوائية بسيطة لأن الـ API المجاني لا يوفر Change 24h مباشرة
          change: (Math.random() * (0.5 - 0.1) + 0.1).toFixed(2) 
        }));

        setRates(formattedRates);
        setLastUpdated(new Date().toUTCString());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching API:", error);
        setLoading(false);
      }
    };

    fetchLiveRates();
  }, []);

  if (loading) return <div className="text-center pt-20 font-bold text-blue-600">Loading Live Rates...</div>;

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Header Controls */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <span className="text-slate-500 font-medium">Inverse</span>
            <div className="w-12 h-6 bg-blue-600 rounded-full relative">
              <div className="absolute right-1 top-1 bg-white w-4 h-4 rounded-full"></div>
            </div>
          </div>
          <div className="hidden md:flex gap-24 text-slate-400 font-bold text-sm">
            <span className="ml-10">Amount</span>
            <span>Change (24h)</span>
            <span>Chart (24h)</span>
          </div>
          <button className="text-blue-600 bg-blue-50 px-6 py-2 rounded-lg font-bold">Edit</button>
        </div>

        {/* Base Currency (Static USD as per your image) */}
        <div className="bg-[#00122E] text-white rounded-xl p-6 flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <span className="text-2xl">🇺🇸</span>
            <span className="font-bold text-lg">US Dollar</span>
          </div>
          <div className="font-bold text-2xl">1</div>
        </div>

        {/* Live Rates List */}
        <div className="space-y-3">
          {rates.map((item) => (
            <div key={item.code} className="bg-[#F8FAFC] rounded-xl p-5 flex flex-wrap md:flex-nowrap items-center border border-slate-100 shadow-sm">
              
              <div className="flex items-center gap-4 w-full md:w-1/4">
                <span className="text-2xl">{item.flag}</span>
                <span className="font-bold text-slate-700">{item.name}</span>
              </div>

              <div className="w-1/2 md:w-1/4 text-lg font-bold text-slate-800 md:text-center">
                {item.rate}
              </div>

              <div className="w-1/2 md:w-1/4 text-right md:text-center">
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-lg font-bold">
                  +{item.change}%
                </span>
              </div>

              {/* Sparkline Chart SVG */}
              <div className="hidden md:block w-1/4 px-6">
                <svg viewBox="0 0 100 30" className="w-full h-8 text-green-500 fill-none stroke-2">
                  <path d="M0 20 Q 25 5, 50 20 T 100 10" strokeLinecap="round" stroke="currentColor" />
                </svg>
              </div>

              <div className="w-full md:w-auto mt-4 md:mt-0">
                <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-blue-700">
                  <span>➤</span> Send
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <button className="bg-blue-50 text-blue-600 px-8 py-3 rounded-xl font-bold border border-blue-100 hover:bg-blue-100">
            + Add currency
          </button>
          
          <div className="flex items-center gap-4 text-slate-400 text-sm font-medium">
             <div className="w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin flex items-center justify-center text-blue-600 font-bold">
              30
             </div>
             <div>
               <p>Last updated</p>
               <p className="text-slate-500">{lastUpdated}</p>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RatesPage;