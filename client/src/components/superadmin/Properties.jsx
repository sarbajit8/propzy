import React from 'react'
import { 
  Home, 
  Users, 
  Building2, 
  BarChart3, 
  Settings, 
  Search, 
  Bell, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Filter,
  Download,
  Upload,
  DollarSign,
  TrendingUp,
  MapPin,
  Calendar,
  Menu,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
  const Properties = () => {
  const properties = [
    { id: 1, title: '3BHK Luxury Apartment', location: 'Bandra West, Mumbai', price: '₹2.5 Cr', status: 'Active', views: 1245, type: 'Sale' },
    { id: 2, title: '2BHK Modern Flat', location: 'Koramangala, Bangalore', price: '₹35,000/month', status: 'Active', views: 892, type: 'Rent' },
    { id: 3, title: 'Villa with Garden', location: 'Gurgaon, Delhi NCR', price: '₹4.2 Cr', status: 'Pending', views: 634, type: 'Sale' },
    { id: 4, title: 'Studio Apartment', location: 'Pune, Maharashtra', price: '₹18,000/month', status: 'Inactive', views: 234, type: 'Rent' },
  ];
    return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:shadow-lg transition-all text-sm">
            <Plus className="w-4 h-4" />
            <Link to="/admin/add-products">
            <span>Add Property</span>
            </Link>
          </button>
          <button className="border border-purple-300 text-purple-600 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-50 transition-colors text-sm">
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Import</span>
          </button>
          <button className="border border-purple-300 text-purple-600 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-50 transition-colors text-sm">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors self-start sm:self-auto">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[768px]">
            <thead className="bg-gradient-to-r from-purple-50 to-purple-100">
              <tr>
                <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-gray-700">Property</th>
                <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-gray-700">Location</th>
                <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
                <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
                <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-gray-700">Views</th>
                <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {properties.map((property) => (
                <tr key={property.id} className="hover:bg-purple-50 transition-colors">
                  <td className="px-4 lg:px-6 py-4">
                    <div className="font-medium text-gray-900 text-sm lg:text-base">{property.title}</div>
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-gray-600 text-sm">{property.location}</td>
                  <td className="px-4 lg:px-6 py-4 font-semibold text-purple-600 text-sm">{property.price}</td>
                  <td className="px-4 lg:px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      property.type === 'Sale' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {property.type}
                    </span>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      property.status === 'Active' ? 'bg-green-100 text-green-800' :
                      property.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {property.status}
                    </span>
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-gray-600 text-sm">{property.views}</td>
                  <td className="px-4 lg:px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <button className="p-1 text-gray-400 hover:text-purple-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-purple-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
   ) };

export default Properties