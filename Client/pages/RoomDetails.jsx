import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Calendar, Star, ShieldCheck, MapPin, ArrowLeft } from 'lucide-react';

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/rooms/all`);
        const selectedRoom = res.data.find(r => r._id === id);
        setRoom(selectedRoom);
      } catch (err) {
        console.error("Error fetching room details", err);
      }
    };
    fetchRoom();
  }, [id]);

  const handleBooking = async () => {
    const token = localStorage.getItem('token');

    // 1. SIGN-IN VALIDATION: Only signed-in person can book
    if (!token) {
      alert("Please Sign In to book this resort!");
      return navigate('/login');
    }

    // 2. DATE VALIDATION: Ensure dates are selected
    if (!checkIn || !checkOut) {
      return alert("Please select both Check-In and Check-Out dates before proceeding.");
    }

    try {
      // 3. SECURE ID EXTRACTION: Extracting user ID from JWT safely
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const userId = tokenPayload.id || tokenPayload._id;

      const bookingData = {
        roomId: room._id,
        userId: userId,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        totalAmount: room.price // Default daily rate for prototype
      };

      // 4. POST REQUEST: Send booking to database
      await axios.post('http://localhost:5000/api/bookings/book', bookingData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Booking Confirmed! See you at the paradise.");
      navigate('/bookings'); // Redirect to "My Bookings" page
    } catch (err) {
      console.error("Booking Error:", err);
      alert(err.response?.data?.msg || "Booking failed. Please try again.");
    }
  };

  if (!room) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
        <p className="text-blue-900 font-bold">Preparing your paradise view...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Image Section */}
      <div className="h-[60vh] relative overflow-hidden">
        <img 
          src={room.images?.[0] || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=80'} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" 
          alt="Room"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8 bg-white/20 backdrop-blur-md text-white p-3 rounded-2xl hover:bg-white hover:text-blue-900 transition-all z-20"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Room Details Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-blue-50">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-5xl font-black text-blue-900 tracking-tight">{room.roomType} Suite</h1>
                  <p className="flex items-center gap-2 text-slate-400 mt-3 font-semibold">
                    <MapPin size={20} className="text-blue-500" /> Premium Ocean View • Tower {room.roomNumber}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor"/>)}
                  </div>
                  <p className="text-xs font-black text-slate-300 uppercase tracking-widest">Ultra Luxury Stay</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 border-y border-slate-100 py-8">
                <div className="text-center">
                  <p className="text-slate-400 text-[10px] font-black uppercase mb-2">Capacity</p>
                  <p className="font-bold text-slate-800">2 Adults</p>
                </div>
                <div className="text-center border-x border-slate-100">
                  <p className="text-slate-400 text-[10px] font-black uppercase mb-2">Bedding</p>
                  <p className="font-bold text-slate-800">King Size</p>
                </div>
                <div className="text-center">
                  <p className="text-slate-400 text-[10px] font-black uppercase mb-2">Area</p>
                  <p className="font-bold text-slate-800">850 sqft</p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-2xl font-black text-blue-900 mb-6 italic">World-Class Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {room.facilities?.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 transition-all hover:border-blue-200 group">
                      <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-150 transition-transform"></div>
                      <span className="text-slate-700 font-bold text-sm uppercase tracking-tight">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card Column */}
          <div className="lg:col-span-1">
            <div className="bg-white p-10 rounded-[3rem] shadow-2xl sticky top-28 border-4 border-blue-50">
              <div className="mb-8 text-center">
                <div className="inline-block bg-blue-50 px-4 py-1 rounded-full text-blue-600 text-xs font-black uppercase mb-2">Best Rate Available</div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-black text-blue-900">₹{room.price}</span>
                  <span className="text-slate-400 font-bold uppercase text-xs">/ night</span>
                </div>
              </div>

              <div className="space-y-6 mb-10">
                <div className="relative">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">Check-In Date</label>
                  <input 
                    type="date" 
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full p-5 bg-slate-50 border-2 border-transparent focus:border-blue-900 rounded-[1.5rem] outline-none font-bold text-slate-700 transition-all cursor-pointer" 
                  />
                </div>
                <div className="relative">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">Check-Out Date</label>
                  <input 
                    type="date" 
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full p-5 bg-slate-50 border-2 border-transparent focus:border-blue-900 rounded-[1.5rem] outline-none font-bold text-slate-700 transition-all cursor-pointer" 
                  />
                </div>
              </div>

              <button 
                onClick={handleBooking}
                className={`w-full py-6 rounded-[2rem] font-black text-xl transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 active:scale-95 ${
                  !localStorage.getItem('token')
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  : 'bg-blue-900 text-white hover:bg-yellow-400 hover:text-blue-900'
                }`}
              >
                {!localStorage.getItem('token') ? "Sign In to Book" : "Reserve Stay"}
              </button>
              
              <div className="mt-8 flex items-center justify-center gap-3 text-emerald-600 font-black text-xs uppercase tracking-widest">
                <ShieldCheck size={20} />
                Secure Reservation
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RoomDetails;