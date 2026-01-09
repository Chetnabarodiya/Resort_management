import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Hotel, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      // Store the token for authentication across the app
      localStorage.setItem('token', res.data.token);
      
      // Check the role returned by your backend
      if (res.data.user.role === 'admin') {
        // Navigate Admin to their dedicated Sidebar Dashboard
        navigate('/admin-dashboard'); 
      } else {
        // Navigate Guests directly to the Room selection page
        navigate('/rooms'); 
      }
      
      alert("Welcome back to Luxe Resort!");
    } catch (err) {
      // Logic for handling incorrect email or password
      alert("Invalid Credentials. Please check your email and password.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Blur Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
      </div>

      {/* Login Card Container */}
      <div className="relative z-10 w-full max-w-md p-8 mx-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl text-white">
          
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-yellow-500 rounded-full shadow-lg animate-bounce">
              <Hotel size={32} className="text-white" />
            </div>
          </div>

          <h2 className="text-4xl font-extrabold text-center mb-2 tracking-tight">
            {isAdmin ? 'Admin Portal' : 'Guest Login'}
          </h2>
          <p className="text-gray-300 text-center mb-8 font-medium">Experience Luxury at its Finest</p>

          {/* Fancy Role Toggle Switch */}
          <div className="flex bg-white/10 p-1 rounded-xl mb-8 border border-white/10">
            <button 
              type="button"
              onClick={() => setIsAdmin(false)}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${!isAdmin ? 'bg-white text-blue-900 shadow-xl' : 'text-gray-300 hover:text-white'}`}
            >
              Guest
            </button>
            <button 
              type="button"
              onClick={() => setIsAdmin(true)}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${isAdmin ? 'bg-yellow-500 text-white shadow-xl' : 'text-gray-300 hover:text-white'}`}
            >
              Administrator
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="group relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-yellow-400 transition-colors" size={20} />
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all placeholder:text-gray-400"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="group relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-yellow-400 transition-colors" size={20} />
              <input 
                type="password" 
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all placeholder:text-gray-400"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className={`group w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all transform active:scale-95 shadow-lg ${isAdmin ? 'bg-yellow-500 hover:bg-yellow-400 text-slate-900' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
              Sign In
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account? <span onClick={() => navigate('/register')} className="text-yellow-400 cursor-pointer hover:underline font-semibold">Create one</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;