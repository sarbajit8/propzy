import React from 'react'
import { Search, MapPin, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const SearchSection = () => {
  return (
    <div className="relative overflow-hidden w-full px-1 sm:px-2 lg:px-4 py-4 sm:py-5 lg:py-4">
      
      {/* Background Animation: Light purple animated elements */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {/* Large floating blobs */}
        <div className="absolute top-[-10%] left-[-20%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-purple-200 via-violet-200 to-purple-300 opacity-40 animate-blob animation-delay-2000 filter blur-3xl"></div>
        <div className="absolute top-[30%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-purple-150 via-violet-200 to-purple-250 opacity-35 animate-blob animation-delay-4000 filter blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-l from-purple-200 via-violet-150 to-purple-300 opacity-30 animate-blob filter blur-3xl"></div>
        
        {/* Floating circles */}
        <div className="absolute top-[20%] left-[10%] w-24 h-24 rounded-full bg-purple-100 opacity-50 animate-float animation-delay-1000"></div>
        <div className="absolute top-[60%] right-[20%] w-20 h-20 rounded-full bg-violet-100 opacity-40 animate-float animation-delay-3000"></div>
        <div className="absolute bottom-[30%] right-[10%] w-16 h-16 rounded-full bg-purple-150 opacity-35 animate-float animation-delay-5000"></div>
        
        {/* Pulsing dots */}
        <div className="absolute top-[40%] left-[80%] w-3 h-3 rounded-full bg-purple-200 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-[70%] left-[5%] w-4 h-4 rounded-full bg-violet-200 animate-pulse animation-delay-4000"></div>
        <div className="absolute top-[10%] right-[40%] w-5 h-5 rounded-full bg-purple-150 animate-pulse animation-delay-1000"></div>
        
        {/* Rotating rings */}
        <div className="absolute top-[25%] right-[60%] w-12 h-12 border border-purple-200 rounded-full animate-spin-slow opacity-25"></div>
        <div className="absolute bottom-[40%] left-[70%] w-10 h-10 border border-violet-200 rounded-full animate-spin-reverse opacity-30"></div>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/20 via-transparent to-violet-50/15"></div>
      </div>

      {/* Hero Section */}
      <div className="text-center space-y-1 sm:space-y-2 lg:space-y-3 mb-4 sm:mb-5 lg:mb-6">
        {/* Enhanced Logo/Title */}
        <div className="flex items-center justify-center mb-2">
          <div className="relative">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-violet-600 via-violet-500 to-purple-500 bg-clip-text text-transparent leading-tight">
              Property Made Easy
            </h1>
            {/* Decorative underline */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 lg:w-24 h-0.5 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full"></div>
          </div>
        </div>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-md sm:max-w-lg lg:max-w-xl mx-auto">
          Book your nearby service expert
        </p>
      </div>

      {/* Category Buttons */}
      <div className="flex justify-center gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-5 lg:mb-6">
        <Button className="px-3 sm:px-4 lg:px-6 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white rounded-full py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm lg:text-base font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95">
          Buy
        </Button>
        <Button 
          variant="outline" 
          className="px-3 sm:px-4 lg:px-6 rounded-full border-2 border-violet-300 bg-transparent text-violet-600 hover:bg-violet-50 hover:border-violet-400 active:bg-violet-100 py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm lg:text-base font-semibold transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
        >
          Rent
        </Button>
        <Button 
          variant="outline" 
          className="px-3 sm:px-4 lg:px-6 rounded-full border-2 border-violet-300 bg-transparent text-violet-600 hover:bg-violet-50 hover:border-violet-400 active:bg-violet-100 py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm lg:text-base font-semibold transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
        >
          Commercial
        </Button>
      </div>

      {/* Enhanced Search Bar */}
      <div className="relative max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
        <div className="relative group">
          {/* Location Icon */}
          <div className="absolute left-3 sm:left-4 lg:left-5 top-1/2 transform -translate-y-1/2 z-10">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400 group-focus-within:text-violet-600 transition-colors duration-200" />
          </div>
          
          {/* Enhanced Input */}
          <Input 
            placeholder="Search by location, property type..." 
            className="w-full pl-10 sm:pl-12 lg:pl-14 pr-20 sm:pr-24 lg:pr-28 py-3 sm:py-3.5 lg:py-4 rounded-full border-2 border-violet-200/60 bg-white/90 backdrop-blur-sm text-sm sm:text-base lg:text-lg placeholder:text-gray-500 focus:border-violet-400 focus:ring-4 focus:ring-violet-100/50 focus:outline-none focus:bg-white transition-all duration-300 shadow-lg hover:shadow-xl group-hover:border-violet-300" 
          />
          
          {/* Filter Button */}
          <div className="absolute right-12 sm:right-16 lg:right-20 top-1/2 transform -translate-y-1/2">
            <button className="p-1.5 sm:p-2 text-gray-400 hover:text-violet-500 hover:bg-violet-50 rounded-full transition-all duration-200">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
          
          {/* Enhanced Search Button */}
          <div className="absolute right-1.5 sm:right-2 lg:right-2.5 top-1/2 transform -translate-y-1/2">
            <button className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 rounded-full p-2 sm:p-2.5 lg:p-3 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 group">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white group-hover:rotate-12 transition-transform duration-200" />
            </button>
          </div>
          
          {/* Subtle glow effect on focus */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-400/0 via-violet-400/5 to-purple-400/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
        
        {/* Search suggestions hint */}
        <div className="mt-2 text-center">
          <p className="text-xs text-gray-400">
            {/* Try: "2 BHK in Mumbai" or "Villa near me" */}
          </p>
        </div>
      </div>

      {/* Optional: Popular Searches */}
      {/* <div className="mt-4 sm:mt-5 lg:mt-6 text-center">
        <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">Popular searches:</p>
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
          {['2 BHK', '3 BHK', 'Villa', 'Apartment', 'Plot'].map((term) => (
            <span 
              key={term}
              className="px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 bg-violet-100 text-violet-700 rounded-full text-xs sm:text-sm lg:text-base font-medium hover:bg-violet-200 cursor-pointer transition-colors duration-200"
            >
              {term}
            </span>
          ))}
        </div>
      </div> */}

      {/* Animation Keyframes */}
      <style jsx global>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -20px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-8px) translateX(4px);
          }
          50% {
            transform: translateY(-4px) translateX(-6px);
          }
          75% {
            transform: translateY(-12px) translateX(2px);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        
        .animate-blob {
          animation: blob 8s infinite ease-in-out;
        }
        
        .animate-float {
          animation: float 6s infinite ease-in-out;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 25s linear infinite;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-5000 {
          animation-delay: 5s;
        }
        
        /* Custom light purple color classes */
        .bg-purple-150 {
          background-color: rgb(237, 233, 254);
        }
        .bg-violet-150 {
          background-color: rgb(237, 233, 254);
        }
        .bg-purple-250 {
          background-color: rgb(221, 214, 254);
        }
        .border-purple-150 {
          border-color: rgb(237, 233, 254);
        }
        .border-violet-150 {
          border-color: rgb(237, 233, 254);
        }
      `}</style>
    </div>
  )
}

export default SearchSection