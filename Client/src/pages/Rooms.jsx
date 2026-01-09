import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bed, Users, Wifi, Wind } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // STEP 81: Added Import

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate(); // STEP 81: Initialized navigate function

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/rooms/all');
        setRooms(res.data);
      } catch (err) {
        console.error("Error fetching rooms:", err);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-black text-blue-900 mb-2">Our Luxury Suites</h2>
        <p className="text-gray-500 mb-10 font-medium">Choose the perfect room for your stay</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div key={room._id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all group border border-gray-100">
              {/* Room Image Container */}
              <div className="h-72 overflow-hidden relative">
                <img 
                  src={room.images?.[0] || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80'} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="Resort Room"
                />
                <div className="absolute top-5 right-5 bg-blue-900/90 backdrop-blur-md text-white px-5 py-2 rounded-2xl font-black shadow-lg">
                  ₹{room.price} <span className="text-xs font-normal">/ Night</span>
                </div>
              </div>

              {/* Room Content */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-blue-900">{room.roomType} Suite</h3>
                  <span className="bg-green-100 text-green-600 text-[10px] font-black uppercase px-2 py-1 rounded-md">
                    Available
                  </span>
                </div>
                
                <p className="text-gray-400 text-sm mb-6 font-medium tracking-wide">
                  Room No: {room.roomNumber || "N/A"}
                </p>
                
                {/* Amenities Icons */}
                <div className="flex gap-5 mb-8 text-gray-500 border-y border-gray-50 py-4">
                  <div className="flex flex-col items-center gap-1">
                    <Wifi size={18} className="text-blue-500" />
                    <span className="text-[10px] font-bold uppercase">WiFi</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Wind size={18} className="text-blue-500" />
                    <span className="text-[10px] font-bold uppercase">AC</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Users size={18} className="text-blue-500" />
                    <span className="text-[10px] font-bold uppercase">2 Adult</span>
                  </div>
                </div>

                {/* STEP 81: Updated Button with proper navigate call */}
                <button 
                  onClick={() => navigate(`/room/${room._id}`)}
                  className="w-full py-4 bg-blue-900 text-white rounded-2xl font-bold hover:bg-yellow-500 hover:text-black transition-all transform active:scale-95 shadow-xl shadow-blue-900/20"
                >
                  Book This Room
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;