import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BedDouble, LogOut, LayoutDashboard, Calendar, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  // Decoding the token to check role (Safe way for a MERN prototype)
  let userRole = '';
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userRole = payload.role;
    } catch (e) {
      console.error("Token error");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    alert("Logged out successfully");
  };

  return (
    <nav className="bg-blue-900/95 backdrop-blur-md text-white p-4 sticky top-0 z-50 shadow-2xl border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo: Admins are directed to the Dashboard, Guests to Home */}
        <Link 
          to={userRole === 'admin' ? "/admin-dashboard" : "/"} 
          className="flex items-center gap-2 text-2xl font-black tracking-tighter group"
        >
          <BedDouble size={32} className="text-yellow-400 group-hover:scale-110 transition-transform" />
          <span>LUXE<span className="text-yellow-400">RESORT</span></span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          
          {/* GUEST & REGULAR USER VIEW: Hide Home, Rooms, and Profile for Admins */}
          {userRole !== 'admin' && (
            <>
              <Link to="/" className="font-semibold hover:text-yellow-400 transition">Home</Link>
              <Link to="/rooms" className="font-semibold hover:text-yellow-400 transition">Rooms</Link>
              
              {/* Authenticated Guest Options */}
              {token && (
                <>
                  <Link to="/bookings" className="flex items-center gap-1 font-semibold hover:text-yellow-400 transition">
                    <Calendar size={18} /> My Bookings
                  </Link>
                  {/* ADDED: Profile option for guests */}
                  <Link to="/profile" className="flex items-center gap-1 font-semibold hover:text-yellow-400 transition">
                    <User size={18} /> My Profile
                  </Link>
                </>
              )}
            </>
          )}

          {token ? (
            <>
              {/* ADMIN ONLY VIEW: Only Admin Panel and Logout are visible */}
              {userRole === 'admin' && (
                <Link to="/admin-dashboard" className="flex items-center gap-1 text-yellow-400 font-bold hover:text-yellow-300 transition">
                  <LayoutDashboard size={18} /> Admin Panel
                </Link>
              )}

              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/50 px-5 py-2 rounded-xl font-bold transition-all"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            /* Public View: Show Sign In if not logged in */
            <Link to="/login" className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 px-7 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-yellow-500/20">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;