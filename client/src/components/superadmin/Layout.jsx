// const UsersTab = () => (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div className="flex flex-wrap items-center gap-2">
//           <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:shadow-lg transition-all text-sm">
//             <Plus className="w-4 h-4" />
//             <span>Add User</span>
//           </button>
//           <button className="border border-purple-300 text-purple-600 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-50 transition-colors text-sm">
//             <Download className="w-4 h-4" />
//             <span className="hidden sm:inline">Export Users</span>
//           </button>
//         </div>
//         <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors self-start sm:self-auto">
//           <Filter className="w-4 h-4" />
//           <span>Filter</span>
//         </button>
//       </div>
      
//       <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[768px]">
//             <thead className="bg-gradient-to-r from-purple-50 to-purple-100">
//               <tr>
//                 <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-gray-700">User</th>
//                 <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
//                 <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
//                 <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-gray-700">Joined</th>
//                 <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-gray-700">Properties</th>
//                 <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {users.map((user) => (
//                 <tr key={user.id} className="hover:bg-purple-50 transition-colors">
//                   <td className="px-4 lg:px-6 py-4">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
//                         {user.name.charAt(0)}
//                       </div>
//                       <div className="font-medium text-gray-900 text-sm lg:text-base min-w-0">
//                         <div className="truncate">{user.name}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-4 lg:px-6 py-4 text-gray-600 text-sm">
//                     <div className="truncate">{user.email}</div>
//                   </td>
//                   <td className="px-4 lg:px-6 py-4">
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                       user.type === 'Agent' ? 'bg-purple-100 text-purple-800' :
//                       user.type === 'Seller' ? 'bg-green-100 text-green-800' :
//                       'bg-blue-100 text-blue-800'
//                     }`}>
//                       {user.type}
//                     </span>
//                   </td>
//                   <td className="px-4 lg:px-6 py-4 text-gray-600 text-sm">
//                     <div className="flex items-center">
//                       <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
//                       <span className="truncate">{user.joined}</span>
//                     </div>
//                   </td>
//                   <td className="px-4 lg:px-6 py-4 text-gray-600 text-sm">{user.properties}</td>
//                   <td className="px-4 lg:px-6 py-4">
//                     <div className="flex items-center space-x-1">
//                       <button className="p-1 text-gray-400 hover:text-purple-600 transition-colors">
//                         <Eye className="w-4 h-4" />
//                       </button>
//                       <button className="p-1 text-gray-400 hover:text-purple-600 transition-colors">
//                         <Edit className="w-4 h-4" />
//                       </button>
//                       <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
  import React, { useState } from 'react';
  import Sidebar from './sidebar';
import { Outlet } from 'react-router-dom';
import Header from './Header';
// import { 
//   Home, 
//   Users, 
//   Building2, 
//   BarChart3, 
//   Settings, 
//   Search, 
//   Bell, 
//   Plus, 
//   Eye, 
//   Edit, 
//   Trash2, 
//   Filter,
//   Download,
//   Upload,
//   DollarSign,
//   TrendingUp,
//   MapPin,
//   Calendar,
//   Menu,
//   X
// } from 'lucide-react';

const AdminLayout = () => {
  // const [activeTab, setActiveTab] = useState('dashboard');
  // const [searchTerm, setSearchTerm] = useState('');
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sample data
  // const properties = [
  //   { id: 1, title: '3BHK Luxury Apartment', location: 'Bandra West, Mumbai', price: '₹2.5 Cr', status: 'Active', views: 1245, type: 'Sale' },
  //   { id: 2, title: '2BHK Modern Flat', location: 'Koramangala, Bangalore', price: '₹35,000/month', status: 'Active', views: 892, type: 'Rent' },
  //   { id: 3, title: 'Villa with Garden', location: 'Gurgaon, Delhi NCR', price: '₹4.2 Cr', status: 'Pending', views: 634, type: 'Sale' },
  //   { id: 4, title: 'Studio Apartment', location: 'Pune, Maharashtra', price: '₹18,000/month', status: 'Inactive', views: 234, type: 'Rent' },
  // ];

  // const users = [
  //   { id: 1, name: 'Rahul Sharma', email: 'rahul@email.com', type: 'Buyer', joined: '2024-01-15', properties: 3 },
  //   { id: 2, name: 'Priya Patel', email: 'priya@email.com', type: 'Seller', joined: '2024-02-20', properties: 8 },
  //   { id: 3, name: 'Amit Kumar', email: 'amit@email.com', type: 'Agent', joined: '2024-03-10', properties: 15 },
  //   { id: 4, name: 'Sneha Gupta', email: 'sneha@email.com', type: 'Buyer', joined: '2024-04-05', properties: 1 },
  // ];

  // const stats = [
  //   { title: 'Total Properties', value: '2,847', change: '+12%', icon: Building2, color: 'text-purple-600' },
  //   { title: 'Active Users', value: '15,629', change: '+8%', icon: Users, color: 'text-purple-600' },
  //   { title: 'Monthly Revenue', value: '₹4.2L', change: '+25%', icon: DollarSign, color: 'text-green-600' },
  //   { title: 'Page Views', value: '89,432', change: '+15%', icon: TrendingUp, color: 'text-blue-600' },
  // ];

  // const Sidebar = () => (
  //   <>
  //     {/* Mobile Overlay */}
  //     {isMobileMenuOpen && (
  //       <div 
  //         className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
  //         onClick={() => setIsMobileMenuOpen(false)}
  //       />
  //     )}
      
  //     {/* Sidebar */}
  //     <div className={`
  //       fixed lg:static inset-y-0 left-0 z-30
  //       w-64 bg-gradient-to-b from-purple-900 to-purple-800 text-white
  //       transform transition-transform duration-300 ease-in-out lg:transform-none
  //       ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
  //     `}>
  //       <div className="p-6">
  //         <div className="flex items-center justify-between mb-8">
  //           <div className="flex items-center space-x-3">
  //             <Home className="w-8 h-8 text-purple-300" />
  //             <h1 className="text-xl font-bold">Propzy Admin</h1>
  //           </div>
  //           {/* Close button for mobile */}
  //           <button 
  //             className="lg:hidden text-purple-300 hover:text-white"
  //             onClick={() => setIsMobileMenuOpen(false)}
  //           >
  //             <X className="w-6 h-6" />
  //           </button>
  //         </div>
          
  //         <nav className="space-y-2">
  //           {[
  //             { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  //             { id: 'properties', label: 'Properties', icon: Building2 },
  //             { id: 'users', label: 'Users', icon: Users },
  //             { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  //             { id: 'settings', label: 'Settings', icon: Settings },
  //           ].map((item) => (
  //             <button
  //               key={item.id}
  //               onClick={() => {
  //                 setActiveTab(item.id);
  //                 setIsMobileMenuOpen(false); // Close mobile menu when item is selected
  //               }}
  //               className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
  //                 activeTab === item.id 
  //                   ? 'bg-purple-700 shadow-lg transform scale-105' 
  //                   : 'hover:bg-purple-700/50'
  //               }`}
  //             >
  //               <item.icon className="w-5 h-5" />
  //               <span>{item.label}</span>
  //             </button>
  //           ))}
  //         </nav>
  //       </div>
  //     </div>
  //   </>
  // );

  // const Header = () => (
  //   <div className="bg-white shadow-sm border-b border-purple-100">
  //     <div className="px-4 lg:px-6 py-4 flex items-center justify-between">
  //       <div className="flex items-center space-x-4">
  //         {/* Mobile menu button */}
  //         <button 
  //           className="lg:hidden text-gray-600 hover:text-gray-800 transition-colors"
  //           onClick={() => setIsMobileMenuOpen(true)}
  //         >
  //           <Menu className="w-6 h-6" />
  //         </button>
  //         <h2 className="text-xl lg:text-2xl font-bold text-gray-800 capitalize">{activeTab}</h2>
  //       </div>
        
  //       <div className="flex items-center space-x-2 lg:space-x-4">
  //         <div className="relative hidden sm:block">
  //           <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
  //           <input
  //             type="text"
  //             placeholder="Search..."
  //             className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-48 lg:w-64"
  //             value={searchTerm}
  //             onChange={(e) => setSearchTerm(e.target.value)}
  //           />
  //         </div>
          
  //         {/* Mobile search button */}
  //         <button className="sm:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors">
  //           <Search className="w-5 h-5" />
  //         </button>
          
  //         <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
  //           <Bell className="w-5 h-5" />
  //           <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
  //         </button>
          
  //         <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
  //           A
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  // const StatCard = ({ stat }) => (
  //   <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6 hover:shadow-md transition-shadow">
  //     <div className="flex items-center justify-between">
  //       <div>
  //         <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
  //         <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
  //         <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
  //           {stat.change} from last month
  //         </p>
  //       </div>
  //       <div className={`p-3 rounded-full bg-purple-100`}>
  //         <stat.icon className={`w-6 h-6 ${stat.color}`} />
  //       </div>
  //     </div>
  //   </div>
  // );

  // const Dashboard = () => (
  //   <div className="space-y-6">
  //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
  //       {stats.map((stat, index) => (
  //         <StatCard key={index} stat={stat} />
  //       ))}
  //     </div>
      
  //     <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
  //       <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-4 lg:p-6">
  //         <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
  //         <div className="space-y-4">
  //           {[
  //             { action: 'New property listed', user: 'Priya Patel', time: '2 hours ago' },
  //             { action: 'User registration', user: 'Amit Kumar', time: '4 hours ago' },
  //             { action: 'Property sold', user: 'Rahul Sharma', time: '6 hours ago' },
  //             { action: 'Payment received', user: 'Sneha Gupta', time: '8 hours ago' },
  //           ].map((activity, index) => (
  //             <div key={index} className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
  //               <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
  //               <div className="flex-1 min-w-0">
  //                 <p className="text-sm font-medium text-gray-800 truncate">{activity.action}</p>
  //                 <p className="text-xs text-gray-500 truncate">{activity.user} • {activity.time}</p>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
        
  //       <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-4 lg:p-6">
  //         <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Properties</h3>
  //         <div className="space-y-4">
  //           {properties.slice(0, 4).map((property) => (
  //             <div key={property.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
  //               <div className="flex-1 min-w-0 mr-4">
  //                 <p className="font-medium text-gray-800 truncate">{property.title}</p>
  //                 <p className="text-sm text-gray-500 flex items-center truncate">
  //                   <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
  //                   {property.location}
  //                 </p>
  //               </div>
  //               <div className="text-right flex-shrink-0">
  //                 <p className="font-semibold text-purple-600 text-sm">{property.views} views</p>
  //                 <p className="text-xs text-gray-500">{property.price}</p>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  // const PropertiesTab = () => (
  //   <div className="space-y-6">
  //     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
  //       <div className="flex flex-wrap items-center gap-2">
  //         <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:shadow-lg transition-all text-sm">
  //           <Plus className="w-4 h-4" />
  //           <span>Add Property</span>
  //         </button>
  //         <button className="border border-purple-300 text-purple-600 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-50 transition-colors text-sm">
  //           <Upload className="w-4 h-4" />
  //           <span className="hidden sm:inline">Import</span>
  //         </button>
  //         <button className="border border-purple-300 text-purple-600 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-50 transition-colors text-sm">
  //           <Download className="w-4 h-4" />
  //           <span className="hidden sm:inline">Export</span>
  //         </button>
  //       </div>
  //       <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors self-start sm:self-auto">
  //         <Filter className="w-4 h-4" />
  //         <span>Filter</span>
  //       </button>
  //     </div>
      
  //     <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden">
  //       <div className="overflow-x-auto">
  //         <table className="w-full min-w-[768px]">
  //           <thead className="bg-gradient-to-r from-purple-50 to-purple-100">
  //             <tr>
  //               <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-gray-700">Property</th>
  //               <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-gray-700">Location</th>
  //               <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
  //               <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
  //               <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
  //               <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-gray-700">Views</th>
  //               <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
  //             </tr>
  //           </thead>
  //           <tbody className="divide-y divide-gray-200">
  //             {properties.map((property) => (
  //               <tr key={property.id} className="hover:bg-purple-50 transition-colors">
  //                 <td className="px-4 lg:px-6 py-4">
  //                   <div className="font-medium text-gray-900 text-sm lg:text-base">{property.title}</div>
  //                 </td>
  //                 <td className="px-4 lg:px-6 py-4 text-gray-600 text-sm">{property.location}</td>
  //                 <td className="px-4 lg:px-6 py-4 font-semibold text-purple-600 text-sm">{property.price}</td>
  //                 <td className="px-4 lg:px-6 py-4">
  //                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
  //                     property.type === 'Sale' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
  //                   }`}>
  //                     {property.type}
  //                   </span>
  //                 </td>
  //                 <td className="px-4 lg:px-6 py-4">
  //                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
  //                     property.status === 'Active' ? 'bg-green-100 text-green-800' :
  //                     property.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
  //                     'bg-red-100 text-red-800'
  //                   }`}>
  //                     {property.status}
  //                   </span>
  //                 </td>
  //                 <td className="px-4 lg:px-6 py-4 text-gray-600 text-sm">{property.views}</td>
  //                 <td className="px-4 lg:px-6 py-4">
  //                   <div className="flex items-center space-x-1">
  //                     <button className="p-1 text-gray-400 hover:text-purple-600 transition-colors">
  //                       <Eye className="w-4 h-4" />
  //                     </button>
  //                     <button className="p-1 text-gray-400 hover:text-purple-600 transition-colors">
  //                       <Edit className="w-4 h-4" />
  //                     </button>
  //                     <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
  //                       <Trash2 className="w-4 h-4" />
  //                     </button>
  //                   </div>
  //                 </td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   </div>
  // );

  // const UsersTab = () => (
  //   <div className="space-y-6">
  //     <div className="flex items-center justify-between">
  //       <div className="flex items-center space-x-4">
  //         <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:shadow-lg transition-all">
  //           <Plus className="w-4 h-4" />
  //           <span>Add User</span>
  //         </button>
  //         <button className="border border-purple-300 text-purple-600 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-50 transition-colors">
  //           <Download className="w-4 h-4" />
  //           <span>Export Users</span>
  //         </button>
  //       </div>
  //       <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
  //         <Filter className="w-4 h-4" />
  //         <span>Filter</span>
  //       </button>
  //     </div>
      
  //     <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden">
  //       <div className="overflow-x-auto">
  //         <table className="w-full">
  //           <thead className="bg-gradient-to-r from-purple-50 to-purple-100">
  //             <tr>
  //               <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">User</th>
  //               <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
  //               <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
  //               <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Joined</th>
  //               <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Properties</th>
  //               <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
  //             </tr>
  //           </thead>
  //           <tbody className="divide-y divide-gray-200">
  //             {users.map((user) => (
  //               <tr key={user.id} className="hover:bg-purple-50 transition-colors">
  //                 <td className="px-6 py-4">
  //                   <div className="flex items-center space-x-3">
  //                     <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
  //                       {user.name.charAt(0)}
  //                     </div>
  //                     <div className="font-medium text-gray-900">{user.name}</div>
  //                   </div>
  //                 </td>
  //                 <td className="px-6 py-4 text-gray-600">{user.email}</td>
  //                 <td className="px-6 py-4">
  //                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
  //                     user.type === 'Agent' ? 'bg-purple-100 text-purple-800' :
  //                     user.type === 'Seller' ? 'bg-green-100 text-green-800' :
  //                     'bg-blue-100 text-blue-800'
  //                   }`}>
  //                     {user.type}
  //                   </span>
  //                 </td>
  //                 <td className="px-6 py-4 text-gray-600 flex items-center">
  //                   <Calendar className="w-3 h-3 mr-1" />
  //                   {user.joined}
  //                 </td>
  //                 <td className="px-6 py-4 text-gray-600">{user.properties}</td>
  //                 <td className="px-6 py-4">
  //                   <div className="flex items-center space-x-2">
  //                     <button className="p-1 text-gray-400 hover:text-purple-600 transition-colors">
  //                       <Eye className="w-4 h-4" />
  //                     </button>
  //                     <button className="p-1 text-gray-400 hover:text-purple-600 transition-colors">
  //                       <Edit className="w-4 h-4" />
  //                     </button>
  //                     <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
  //                       <Trash2 className="w-4 h-4" />
  //                     </button>
  //                   </div>
  //                 </td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   </div>
  // );

  // const renderContent = () => {
  //   switch (activeTab) {
  //     case 'dashboard':
  //       return <Dashboard />;
  //     case 'properties':
  //       return <PropertiesTab />;
  //     case 'users':
  //       return <UsersTab />;
  //     case 'analytics':
  //       return (
  //         <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-8 text-center">
  //           <BarChart3 className="w-16 h-16 text-purple-400 mx-auto mb-4" />
  //           <h3 className="text-xl font-semibold text-gray-800 mb-2">Analytics Dashboard</h3>
  //           <p className="text-gray-600">Detailed analytics and reporting features would be implemented here.</p>
  //         </div>
  //       );
  //     case 'settings':
  //       return (
  //         <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-8 text-center">
  //           <Settings className="w-16 h-16 text-purple-400 mx-auto mb-4" />
  //           <h3 className="text-xl font-semibold text-gray-800 mb-2">System Settings</h3>
  //           <p className="text-gray-600">Configuration and settings options would be available here.</p>
  //         </div>
  //       );
  //     default:
  //       return <Dashboard />;
  //   }
  // };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-0">
        <Header />
        <main className="flex-1 p-4 lg:p-6">
          {/* {renderContent()} */}
          {<Outlet/>}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;