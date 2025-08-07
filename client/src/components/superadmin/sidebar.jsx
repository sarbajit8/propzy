import { Home, X, BarChart3, Building2, Users, TrendingUp, Settings, User } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-gradient-to-b from-purple-900 to-purple-800 text-white
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Home className="w-8 h-8 text-purple-300" />
              <h1 className="text-xl font-bold">Propzy Admin</h1>
            </div>
            {/* Close button for mobile */}
            <button
              className="lg:hidden text-purple-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 ,to: 'dashboard' },
              { id: 'properties', label: 'Properties', icon: Building2, to: 'properties' },
              { id: 'users', label: 'Users', icon: Users , to: 'users' },
              { id: 'manage-admin', label: 'Manage Admin', icon: User, to: 'manage-admin' },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp, to: 'analytics' },
              { id: 'settings', label: 'Settings', icon: Settings, to: 'settings' },
            ].map((item) => (
              <Link to={`${item.to}`} key={item.id} className="block">
              <button
                key={item.id}
                onClick={() => {
                  setIsMobileMenuOpen(false); // Close mobile menu when item is selected
                }}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 bg-purple-900`}
                
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu Toggle Button - Add this to your main component */}
      <button
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-purple-900 text-white rounded-md"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Home className="w-6 h-6" />
      </button>
    </>
  );
};

export default Sidebar;