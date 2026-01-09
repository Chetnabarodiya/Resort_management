import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, BedDouble, Users, ClipboardList, 
  PlusCircle, LogOut, CheckCircle 
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalBookings: 0,
    availableRooms: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch real data from your existing endpoints
        const roomsRes = await axios.get('http://localhost:5000/api/rooms/all');
        const bookingsRes = await axios.get('http://localhost:5000/api/bookings/all');

        setStats({
          totalBookings: bookingsRes.data.length,
          availableRooms: roomsRes.data.filter(r => r.status === 'Available').length
        });
      } catch (err) {
        console.error("Error fetching dashboard stats", err);
      }
    };
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-6 flex flex-col shadow-2xl">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-yellow-500 p-2 rounded-lg">
            <LayoutDashboard size={24} className="text-slate-900" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">AdminPanel</h2>
        </div>

        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => navigate('/admin-dashboard')} 
            className="w-full flex items-center gap-3 p-3 bg-blue-600 rounded-xl font-semibold shadow-lg shadow-blue-900/50"
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          
          <button 
            onClick={() => navigate('/admin/manage-rooms')} 
            className="w-full flex items-center gap-3 p-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all"
          >
            <BedDouble size={20} /> Manage Rooms
          </button>

          {/* ADDED: Booking Button to show details of who booked */}
          <button 
            onClick={() => navigate('/admin/manage-bookings')} 
            className="w-full flex items-center gap-3 p-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all"
          >
            <ClipboardList size={20} /> Bookings
          </button>

          <button 
            onClick={() => navigate('/admin/users')} 
            className="w-full flex items-center gap-3 p-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all"
          >
            <Users size={20} /> Users List
          </button>
        </nav>

        <button 
          onClick={handleLogout} 
          className="mt-auto flex items-center gap-3 p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-semibold"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900">Dashboard</h1>
            <p className="text-slate-500 mt-1 font-medium">Manage your resort operations and growth</p>
          </div>
          
          <button 
            onClick={() => navigate('/admin/add-room')} 
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-6 py-3 rounded-2xl font-bold transition-all shadow-xl shadow-yellow-500/20"
          >
            <PlusCircle size={20} />
            Add New Room
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Actual Bookings Card */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-xl transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <ClipboardList size={80} />
            </div>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">Actual Bookings</p>
            <h3 className="text-5xl font-black text-slate-900 mt-2">{stats.totalBookings}</h3>
            <div className="mt-4 flex items-center gap-2 text-green-500 font-bold text-sm">
              <CheckCircle size={16} /> Live from database
            </div>
          </div>

          {/* Actual Available Rooms Card */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-xl transition-all">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <BedDouble size={80} />
            </div>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">Available Rooms</p>
            <h3 className="text-5xl font-black text-slate-900 mt-2">{stats.availableRooms}</h3>
            <p className="mt-4 text-slate-500 text-sm font-medium italic">Ready for new guests</p>
          </div>
        </div>

        {/* Quick Overview Section */}
        <div className="mt-10 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
           <h3 className="text-xl font-bold text-slate-900 mb-6">Quick Overview</h3>
           <div className="h-48 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl">
              <p className="text-slate-400 text-center px-4 font-bold">
                Total Resort Capacity: {stats.availableRooms + stats.totalBookings} Units
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;