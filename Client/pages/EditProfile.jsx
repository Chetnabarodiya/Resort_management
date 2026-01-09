import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Phone, Save, ArrowLeft, Loader2 } from 'lucide-react';

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '' // Email usually stays read-only for security
  });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCurrentData = async () => {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        const res = await axios.get(`http://localhost:5000/api/auth/user/${decoded.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFormData({
          name: res.data.name,
          phone: res.data.phone,
          email: res.data.email
        });
      } catch (err) {
        console.error("Error fetching profile for edit");
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentData();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      // Send updated data to your backend
      await axios.put(`http://localhost:5000/api/auth/update/${decoded.id}`, {
        name: formData.name,
        phone: formData.phone
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Profile Updated Successfully! Please log in again to refresh your session.");
      localStorage.removeItem('token'); // Clear old token with old info
      navigate('/login');
    } catch (err) {
      alert("Update failed. Please try again.");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Loader2 className="animate-spin text-blue-900" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex justify-center items-center">
      <div className="bg-white w-full max-w-md p-10 rounded-[3rem] shadow-2xl border border-blue-50">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-blue-900 mb-8 font-bold transition">
          <ArrowLeft size={20} /> Back to Profile
        </button>

        <h2 className="text-3xl font-black text-blue-900 mb-8">Edit Your Info</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase ml-2 mb-2 tracking-widest">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-4 text-slate-300" size={20} />
              <input 
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-4 pl-12 bg-slate-50 border-2 border-transparent focus:border-blue-900 rounded-2xl outline-none font-bold text-slate-700"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase ml-2 mb-2 tracking-widest">Contact Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-4 text-slate-300" size={20} />
              <input 
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full p-4 pl-12 bg-slate-50 border-2 border-transparent focus:border-blue-900 rounded-2xl outline-none font-bold text-slate-700"
                required
              />
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full bg-blue-900 text-white py-5 rounded-[2rem] font-black text-xl hover:bg-yellow-400 hover:text-blue-900 transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3"
            >
              <Save size={24} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;