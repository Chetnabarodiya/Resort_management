import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Mail, Trash2, User, ShieldCheck, Users } from 'lucide-react';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users from the backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/all');
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  // STEP 100: Function to delete a user
  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        await axios.delete(`http://localhost:5000/api/auth/delete/${id}`);
        alert("User removed successfully");
        fetchUsers(); // Refresh the list after deletion
      } catch (err) {
        alert("Error deleting user. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-4xl font-black text-slate-900 flex items-center gap-3">
              <Users className="text-blue-600" size={36} /> Registered Users
            </h1>
            <p className="text-slate-500 mt-1 font-medium">Manage guest accounts and administrative permissions</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase">Total Accounts</p>
            <p className="text-xl font-black text-blue-900">{users.length}</p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-6 font-bold uppercase text-xs tracking-widest">Guest Info</th>
                <th className="p-6 font-bold uppercase text-xs tracking-widest">Email Address</th>
                <th className="p-6 font-bold uppercase text-xs tracking-widest">Role</th>
                <th className="p-6 font-bold uppercase text-xs tracking-widest text-center">Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-yellow-100 p-3 rounded-2xl text-yellow-700 shadow-sm">
                        <User size={20} />
                      </div>
                      <span className="font-bold text-slate-800 text-lg">{user.name}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 text-slate-500 font-medium">
                      <Mail size={16} className="text-blue-400" />
                      {user.email}
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                        : 'bg-blue-100 text-blue-700 border border-blue-200'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex justify-center gap-4">
                      {/* STEP 100: Linked Delete Button */}
                      <button 
                        onClick={() => deleteUser(user._id)}
                        className="p-3 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        title="Delete User"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {users.length === 0 && (
            <div className="p-32 text-center">
              <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={40} className="text-slate-200" />
              </div>
              <p className="text-slate-400 font-bold text-xl">No guests registered yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersList;