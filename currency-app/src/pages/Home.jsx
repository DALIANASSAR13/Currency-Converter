// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Globe, ArrowRight, Check, Eye } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">CurrencyApp</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium">
              Features
            </a>
            <a href="#rates" className="text-gray-600 hover:text-blue-600 font-medium">
              Live Rates
            </a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 font-medium">
              Contact
            </a>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Global Currency Conversion Made Simple
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Real-time rates, zero hidden fees, and instant transfers worldwide. 
            Experience the future of finance today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            

<Link 
  to="/convert" 
  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105"
>
  Start Converting Now
  <ArrowRight size={20} />
</Link>
            
            <button className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2">
              <Eye className="h-5 w-5" />
              View Live Rates
            </button>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-12"></div>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-20">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Verified Security</h3>
              </div>
              <p className="text-gray-600">
                Bank-level security with end-to-end encryption for all your transactions
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Instant Transfer</h3>
              </div>
              <p className="text-gray-600">
                Send money anywhere in the world in seconds, not days
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">GLOBAL REACH</h2>
            <p className="text-xl mb-8 opacity-90">
              Supporting over 150+ currencies across 201 countries
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {[
                { country: 'United States', flag: '🇺🇸', currency: 'USD' },
                { country: 'Euro Zone', flag: '🇪🇺', currency: 'EUR' },
                { country: 'United Kingdom', flag: '🇬🇧', currency: 'GBP' },
                { country: 'Japan', flag: '🇯🇵', currency: 'JPY' },
                { country: 'Canada', flag: '🇨🇦', currency: 'CAD' },
                { country: 'Australia', flag: '🇦🇺', currency: 'AUD' },
                { country: 'Switzerland', flag: '🇨🇭', currency: 'CHF' },
                { country: 'Singapore', flag: '🇸🇬', currency: 'SGD' },
              ].map((item, index) => (
                <div key={index} className="bg-blue-700/30 p-4 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl mb-2">{item.flag}</div>
                  <div className="font-medium">{item.country}</div>
                  <div className="text-blue-200">{item.currency}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">CurrencyApp</span>
              </div>
              <p className="text-gray-400">Your trusted currency conversion partner</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-4 text-lg">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-lg">Support</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition">
                      Contact Info
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition">
                      Help Center
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-lg">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition">
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 CurrencyApp. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Made with ❤️ for seamless currency conversion worldwide
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;