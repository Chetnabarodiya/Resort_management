import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // 1. Decode token to get user ID
        const decoded = JSON.parse(atob(token.split('.')[1]));
        
        // 2. Fetch fresh data from backend database to ensure no "Not Provided" errors
        const res = await axios.get(`http://localhost:5000/api/auth/user/${decoded.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setUserData(res.data);
      } catch (e) {
        console.error("Error loading profile details:", e);
        // Fallback to token data if API fails
        try {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            setUserData(decoded);
        } catch(err) {
            navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-blue-900" size={48} />
      </div>
    );
  }

  if (!token || !userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center bg-white p-10 rounded-3xl shadow-xl">
          <p className="text-xl font-bold text-slate-400 mb-4">Session expired or not logged in.</p>
          <button 
            onClick={() => navigate('/login')}
            className="bg-blue-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800 transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex justify-center items-center">
      <div className="bg-white w-full max-w-md p-10 rounded-[3rem] shadow-2xl border border-blue-50 relative overflow-hidden">
        {/* Decorative Background Circle */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-50 rounded-full opacity-50"></div>
        
        <div className="relative z-10 text-center">
          <div className="w-24 h-24 bg-blue-900 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-900/20">
            <User size={48} className="text-yellow-400" />
          </div>
          
          <h1 className="text-3xl font-black text-blue-900 mb-2">{userData.name || "Guest User"}</h1>
          <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
            {userData.role || "USER"}
          </span>

          <div className="mt-10 space-y-4 text-left">
            <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-4 border border-slate-100">
              <div className="bg-white p-2 rounded-lg text-blue-500 shadow-sm"><Mail size={20}/></div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase">Email Address</p>
                <p className="font-bold text-slate-700">{userData.email || "No Email Bound"}</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-4 border border-slate-100">
              <div className="bg-white p-2 rounded-lg text-blue-500 shadow-sm"><Phone size={20}/></div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase">Contact Number</p>
                <p className="font-bold text-slate-700">{userData.phone || "No Phone Bound"}</p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4">
            <button 
              onClick={() => navigate('/bookings')}
              className="flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-blue-800 transition-all shadow-lg shadow-slate-900/20"
            >
              <Calendar size={18} /> Bookings
            </button>
            
            {/* UPDATED: Navigates to the edit profile page */}
            <button 
              className="flex items-center justify-center gap-2 border-2 border-slate-100 py-4 rounded-2xl font-bold text-slate-400 hover:bg-slate-50 transition-all"
              onClick={() => navigate('/edit-profile')}
            >
              Edit Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;