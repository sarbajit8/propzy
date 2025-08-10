import { Home, X, BarChart3, Building2, Users, TrendingUp, Settings, User, LogOut } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { logoutAdmin } from '../../store/admin/admin-login';



const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle actual logout
 const handleLogout = () => {
  dispatch(logoutAdmin());
  setShowLogoutConfirm(false);
  toast.success('Logged out successfully!');
  navigate('/admin-login');
};

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
        flex flex-col justify-between
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Top */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Home className="w-8 h-8 text-purple-300" />
              <h1 className="text-xl font-bold">Propzy Admin</h1>
            </div>
            <button className="lg:hidden text-purple-300 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3, to: 'dashboard' },
              { id: 'properties', label: 'Properties', icon: Building2, to: 'properties' },
              { id: 'users', label: 'Users', icon: Users, to: 'users' },
              { id: 'manage-admin', label: 'Manage Admin', icon: User, to: 'manage-admin' },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp, to: 'analytics' },
              { id: 'settings', label: 'Settings', icon: Settings, to: 'settings' },
            ].map((item) => (
              <Link to={`${item.to}`} key={item.id} className="block">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 bg-purple-900"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </Link>
            ))}
          </nav>
        </div>

        {/* Sticky Logout Button */}
        <div className='w-full p-6 flex-shrink-0'>
          <button
            className="w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 bg-purple-900 
            hover:bg-purple-700 justify-center font-semibold text-purple-300 hover:text-white sticky bottom-4"
            onClick={() => setShowLogoutConfirm(true)}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-purple-900 text-white rounded-md"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Home className="w-6 h-6" />
      </button>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed z-40 inset-0 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-xl p-7 max-w-xs w-full shadow-lg flex flex-col text-center">
            <div className="mx-auto mb-2 rounded-full bg-purple-100 text-purple-700 w-12 h-12 flex items-center justify-center">
              <LogOut className="w-6 h-6" />
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-bold mb-2">Log out?</h4>
              <p className="text-sm text-gray-600">Are you sure you want to log out?</p>
            </div>
            <div className="flex space-x-2">
              <button
                className="flex-1 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-800 font-semibold"
                onClick={handleLogout}
              >
                Log out
              </button>
              <button
                className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
