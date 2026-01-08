import React, { useState, useEffect } from 'react';

const RatesPage = () => {
  const [allRates, setAllRates] = useState({});
  const [selectedCurrencies, setSelectedCurrencies] = useState(['USD', 'EUR', 'GBP', 'JPY', 'EGP', 'SAR']);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchLiveRates = async () => {
    try {
      const response = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await response.json();
      
      if (data.result === "success") {
        setAllRates(data.rates);
        setLastUpdated(data.time_last_update_utc);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveRates();
    const interval = setInterval(fetchLiveRates, 60000);
    return () => clearInterval(interval);
  }, []);

  const addCurrency = (code) => {
    if (!selectedCurrencies.includes(code)) {
      setSelectedCurrencies([code, ...selectedCurrencies]);
    }
    setShowAddModal(false);
  };

  const removeCurrency = (code) => {
    setSelectedCurrencies(selectedCurrencies.filter(c => c !== code));
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="font-bold text-slate-600">Fetching Real-Time Market Rates...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 mb-2">Live Global Rates</h1>
            <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Last Update: {new Date(lastUpdated).toLocaleTimeString()}
            </div>
          </div>
          <button 
            onClick={() => setShowAddModal(!showAddModal)}
            className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 shadow-lg transition-all active:scale-95"
          >
            + Add Currency
          </button>
        </div>

        {/* Add Modal */}
        {showAddModal && (
          <div className="mb-8 p-8 bg-white rounded-3xl shadow-xl border border-slate-100 grid grid-cols-3 md:grid-cols-6 gap-3">
            {Object.keys(allRates).slice(0, 24).map(code => (
              <button 
                key={code}
                onClick={() => addCurrency(code)}
                className="bg-slate-50 border border-slate-100 py-3 rounded-xl hover:border-blue-500 font-bold text-slate-700 hover:text-blue-600 transition"
              >
                {code}
              </button>
            ))}
          </div>
        )}

        {/* Rates List */}
        <div className="grid gap-4">
          {selectedCurrencies.map((code) => (
            <div key={code} className="bg-white rounded-[24px] p-6 flex items-center justify-between shadow-sm border border-slate-50 hover:border-blue-200 transition-all group">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-xl font-black text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition">
                  {code.substring(0, 2)}
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 leading-none">{code}</h3>
                  <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">International Market</p>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-2xl font-mono font-black text-slate-900 tracking-tighter">
                  {allRates[code] ? allRates[code].toFixed(4) : "---"}
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-green-500 text-sm font-bold flex items-center">▲ Live</span>
                  <button 
                    onClick={() => removeCurrency(code)}
                    className="text-slate-300 hover:text-red-500 text-sm font-bold ml-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-slate-400 font-medium text-sm">
          Prices are sourced directly from global banking institutions.
        </p>
      </div>
    </div>
  );
};

export default RatesPage;
