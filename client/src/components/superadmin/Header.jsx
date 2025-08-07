import { Bell, Menu, Search } from 'lucide-react';
import React, { useState } from 'react'

 const Header = () =>{ 
      const [searchTerm, setSearchTerm] = useState('');
   
    return(
    <div className="bg-white shadow-sm border-b border-purple-100">
      <div className="px-4 lg:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button 
            className="lg:hidden text-gray-600 hover:text-gray-800 transition-colors"
            // onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          {/* <h2 className="text-xl lg:text-2xl font-bold text-gray-800 capitalize">{activeTab}</h2> */}
        </div>
        
        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* <div className="relative hidden sm:block">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-48 lg:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div> */}
          
          {/* Mobile search button */}
          <button className="sm:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            A
          </div>
        </div>
      </div>
    </div>
  )};

export default Header