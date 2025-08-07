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
 const Dashboard = () => {



 const properties = [
    { id: 1, title: '3BHK Luxury Apartment', location: 'Bandra West, Mumbai', price: '₹2.5 Cr', status: 'Active', views: 1245, type: 'Sale' },
    { id: 2, title: '2BHK Modern Flat', location: 'Koramangala, Bangalore', price: '₹35,000/month', status: 'Active', views: 892, type: 'Rent' },
    { id: 3, title: 'Villa with Garden', location: 'Gurgaon, Delhi NCR', price: '₹4.2 Cr', status: 'Pending', views: 634, type: 'Sale' },
    { id: 4, title: 'Studio Apartment', location: 'Pune, Maharashtra', price: '₹18,000/month', status: 'Inactive', views: 234, type: 'Rent' },
  ];

  const users = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul@email.com', type: 'Buyer', joined: '2024-01-15', properties: 3 },
    { id: 2, name: 'Priya Patel', email: 'priya@email.com', type: 'Seller', joined: '2024-02-20', properties: 8 },
    { id: 3, name: 'Amit Kumar', email: 'amit@email.com', type: 'Agent', joined: '2024-03-10', properties: 15 },
    { id: 4, name: 'Sneha Gupta', email: 'sneha@email.com', type: 'Buyer', joined: '2024-04-05', properties: 1 },
  ];

  const stats = [
    { title: 'Total Properties', value: '2,847', change: '+12%', icon: Building2, color: 'text-purple-600' },
    { title: 'Active Users', value: '15,629', change: '+8%', icon: Users, color: 'text-purple-600' },
    { title: 'Monthly Revenue', value: '₹4.2L', change: '+25%', icon: DollarSign, color: 'text-green-600' },
    { title: 'Page Views', value: '89,432', change: '+15%', icon: TrendingUp, color: 'text-blue-600' },
  ];

   const StatCard = ({ stat }) => (
    <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
          <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {stat.change} from last month
          </p>
        </div>
        <div className={`p-3 rounded-full bg-purple-100`}>
          <stat.icon className={`w-6 h-6 ${stat.color}`} />
        </div>
      </div>
    </div>
  );

    return(
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-4 lg:p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {[
              { action: 'New property listed', user: 'Priya Patel', time: '2 hours ago' },
              { action: 'User registration', user: 'Amit Kumar', time: '4 hours ago' },
              { action: 'Property sold', user: 'Rahul Sharma', time: '6 hours ago' },
              { action: 'Payment received', user: 'Sneha Gupta', time: '8 hours ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{activity.action}</p>
                  <p className="text-xs text-gray-500 truncate">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-4 lg:p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Properties</h3>
          <div className="space-y-4">
            {properties.slice(0, 4).map((property) => (
              <div key={property.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1 min-w-0 mr-4">
                  <p className="font-medium text-gray-800 truncate">{property.title}</p>
                  <p className="text-sm text-gray-500 flex items-center truncate">
                    <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                    {property.location}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-semibold text-purple-600 text-sm">{property.views} views</p>
                  <p className="text-xs text-gray-500">{property.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )};

export default Dashboard