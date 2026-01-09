
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Star } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1920&q=80" 
          className="absolute inset-0 w-full h-full object-cover"
          alt="Luxury Resort"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            Discover Your <span className="text-yellow-400">Paradise</span>
          </h1>
          <p className="text-lg text-gray-200 mb-8 max-w-xl mx-auto">
            Experience the ultimate luxury stay with our world-class amenities and breathtaking views.
          </p>
          <button 
            onClick={() => navigate('/rooms')}
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-2xl"
          >
            Book Your Stay Now
          </button>
        </div>
      </div>

      {/* Luxury Stats Bar */}
      <div className="max-w-5xl mx-auto -mt-12 relative z-20 px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-2xl text-blue-900"><MapPin /></div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold">Location</p>
              <p className="font-semibold text-blue-900">Goa, India</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-2xl text-yellow-600"><Star /></div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold">Rating</p>
              <p className="font-semibold text-blue-900">4.9/5 Guest Choice</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/rooms')}
            className="bg-blue-900 text-white py-4 rounded-2xl font-bold hover:bg-blue-800 transition"
          >
            Explore All Rooms
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;