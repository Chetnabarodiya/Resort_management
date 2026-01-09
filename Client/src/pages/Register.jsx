import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, ArrowRight, Hotel } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'user'
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      alert("Registration Successful! Please Login.");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.msg || "Registration Failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-10">
      {/* Background with subtle zoom animation */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg px-4">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-8 shadow-2xl text-white">
          
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/50">
              <Hotel size={30} />
            </div>
            <h2 className="text-4xl font-bold tracking-tight">Join the Club</h2>
            <p className="text-gray-300 mt-2">Create an account for exclusive resort access</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Input */}
              <div className="relative group">
                <User className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input 
                  type="text" placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-400 transition-all"
                  onChange={(e) => setFormData({...formData, name: e.target.value})} required
                />
              </div>

              {/* Phone Input */}
              <div className="relative group">
                <Phone className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input 
                  type="text" placeholder="Phone Number"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-400 transition-all"
                  onChange={(e) => setFormData({...formData, phone: e.target.value})} required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="relative group">
              <Mail className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-400 transition-colors" size={18} />
              <input 
                type="email" placeholder="Email Address"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-400 transition-all"
                onChange={(e) => setFormData({...formData, email: e.target.value})} required
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <Lock className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-400 transition-colors" size={18} />
              <input 
                type="password" placeholder="Password"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-400 transition-all"
                onChange={(e) => setFormData({...formData, password: e.target.value})} required
              />
            </div>

            <button className="w-full group bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 active:scale-[0.98]">
              Create Account
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </form>

          <p className="mt-8 text-center text-gray-400 text-sm">
            Already have an account? 
            <span onClick={() => navigate('/login')} className="text-blue-400 ml-1 cursor-pointer hover:underline font-semibold">Sign In</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;