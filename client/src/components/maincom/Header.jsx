import React from 'react'
import { Button } from "@/components/ui/Button"
import { MenuIcon } from 'lucide-react'
import logo from "@/assets/logop.png"


const Header = () => {
  return (
    <div className="w-full flex items-center justify-between py-3 px-0 sm:py-4 lg:py-6 bg-white shadow-sm">
      {/* Logo Section */}
      <div className="flex items-center gap-2 sm:gap-3 pl-3 sm:pl-4 lg:pl-6">
        <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded">
          <MenuIcon className="w-full h-full text-gray-700 hover:text-violet-500 transition-colors cursor-pointer" />
        </div>
        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-violet-500">
          <img className='w-26' src={logo} alt="" />
        </span>
      </div>

      {/* Desktop Navigation - Only visible on lg+ screens */}
      <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
        <a 
          href="/propertys" 
          className="text-gray-700 hover:text-violet-500 font-medium transition-colors duration-200 cursor-pointer"
        >
          Propertys
        </a>
        <a 
          href="/services" 
          className="text-gray-700 hover:text-violet-500 font-medium transition-colors duration-200 cursor-pointer"
        >
          Services
        </a>
        <a 
          href="/bill-payment" 
          className="text-gray-700 hover:text-violet-500 font-medium transition-colors duration-200 cursor-pointer"
        >
          Bill Payment
        </a>
        <a 
          href="/pricing" 
          className="text-gray-700 hover:text-violet-500 font-medium transition-colors duration-200 cursor-pointer"
        >
          Pricing
        </a>
      </nav>

      {/* CTA Button */}
      <div className="pr-3 sm:pr-4 lg:pr-6">
        <Button
          variant="outline"
          size="sm"
          className="text-xs sm:text-sm lg:text-base font-semibold 
          border-2 border-violet-500 text-violet-500 
          hover:bg-violet-500 hover:text-white transition-all duration-300 
          px-3 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-2.5 
          rounded-full shadow-sm hover:shadow-md 
          active:scale-95 transform
          whitespace-nowrap"
        >
          <span className="hidden sm:inline">Post Free Property Ad</span>
          <span className="sm:hidden">Post Ad</span>
        </Button>
      </div>
    </div>
  )
}

export default Header
