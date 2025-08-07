import { CreditCard, Home, Tag, Wrench, Sparkles } from 'lucide-react'
import React, { useState } from 'react'

const Footer = () => {
  const [activeTab, setActiveTab] = useState('Properties')

  const navItems = [
    { icon: Home, label: 'Properties', id: 'properties' },
    { icon: Wrench, label: 'Services', id: 'services' },
    { icon: CreditCard, label: 'Bill Payment', id: 'payment' },
    { icon: Tag, label: 'Pricing', id: 'pricing' }
  ]

  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 lg:hidden">
      {/* Glassmorphism Background with Gradient */}
      <div className="relative bg-violet-50 backdrop-blur-xl border-t-2 border-violet-200/60">
        
        {/* Animated Gradient Line */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 animate-pulse"></div>
        
        {/* Floating Sparkles */}
        <div className="absolute top-2 left-4 animate-pulse">
          <Sparkles className="w-3 h-3 text-violet-400/60" />
        </div>
        <div className="absolute top-3 right-6 animate-pulse animation-delay-1000">
          <Sparkles className="w-2 h-2 text-purple-400/50" />
        </div>
        
        <nav className="flex items-center justify-between px-2 py-3 sm:px-4 sm:py-4 max-w-sm sm:max-w-md md:max-w-2xl mx-auto">
          {navItems.map((item, index) => {
            const IconComponent = item.icon
            const isActive = activeTab === item.label
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.label)}
                className={`relative flex flex-col items-center gap-1 font-medium focus:outline-none transition-all duration-300 min-w-0 flex-1 group ${
                  isActive 
                    ? 'text-violet-600 transform scale-110' 
                    : 'text-gray-600 hover:text-violet-500 hover:scale-105'
                }`}
              >
                {/* Active Background Glow */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-100/80 to-transparent rounded-2xl blur-sm scale-125 opacity-60"></div>
                )}
                
                {/* Icon Container with Gradient Background */}
                <div className={`relative p-2 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-br from-violet-500 to-purple-500 shadow-lg shadow-violet-200' 
                    : 'bg-white/60 group-hover:bg-gradient-to-br group-hover:from-violet-100 group-hover:to-purple-100 shadow-sm'
                }`}>
                  <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-gray-700 group-hover:text-violet-600'
                  }`} />
                  
                  {/* Active Indicator Dot */}
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
                  )}
                </div>
                
                {/* Label with Enhanced Typography */}
                <span className={`text-xs sm:text-sm truncate transition-all duration-300 ${
                  isActive 
                    ? 'font-bold text-violet-700' 
                    : 'font-medium group-hover:font-semibold'
                }`}>
                  {item.label}
                </span>
                
                {/* Active Underline */}
                {isActive && (
                  <div className="absolute bottom-0 w-8 h-0.5 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"></div>
                )}
              </button>
            )
          })}
        </nav>
        
        {/* Bottom Gradient Accent */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500/20 via-purple-500/30 to-indigo-500/20"></div>
      </div>
      
      {/* Animated Blob Background */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-2px) scale(1.05); }
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </footer>
  )
}

export default Footer
