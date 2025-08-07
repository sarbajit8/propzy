import { Calendar, Download, Edit, Eye, Filter, Plus, Trash2 } from 'lucide-react';
import React from 'react'

 const UsersList = () =>{ 


      const users = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul@email.com', type: 'Buyer', joined: '2024-01-15', properties: 3 },
    { id: 2, name: 'Priya Patel', email: 'priya@email.com', type: 'Seller', joined: '2024-02-20', properties: 8 },
    { id: 3, name: 'Amit Kumar', email: 'amit@email.com', type: 'Agent', joined: '2024-03-10', properties: 15 },
    { id: 4, name: 'Sneha Gupta', email: 'sneha@email.com', type: 'Buyer', joined: '2024-04-05', properties: 1 },
  ];
    return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:shadow-lg transition-all">
            <Plus className="w-4 h-4" />
            <span>Add User</span>
          </button>
          <button className="border border-purple-300 text-purple-600 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Users</span>
          </button>
        </div>
        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-50 to-purple-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Joined</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Properties</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-purple-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.type === 'Agent' ? 'bg-purple-100 text-purple-800' :
                      user.type === 'Seller' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {user.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {user.joined}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.properties}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
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
  )};
export default UsersList