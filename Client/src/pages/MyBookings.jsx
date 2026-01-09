import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, CheckCircle, Clock } from 'lucide-react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        // 1. Fetch all bookings from the API
        const res = await axios.get('http://localhost:5000/api/bookings/all');
        
        // 2. Safely extract current User ID from Token
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        const currentUserId = tokenData.id || tokenData._id;

        // 3. IMPROVED FILTER: Handle populated objects and string comparisons
        const myData = res.data.filter(b => {
          // Extracts the ID whether it's an object (populated) or just a string
          const bookingUserId = b.userId?._id || b.userId;
          return String(bookingUserId) === String(currentUserId);
        });

        setBookings(myData);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };

    if (token) fetchMyBookings();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-blue-900 mb-2">My Bookings</h1>
        <p className="text-gray-500 mb-10">Manage your upcoming luxury stays</p>

        <div className="space-y-6">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-center transition-all hover:shadow-md">
                {/* Visual Icon Container */}
                <div className="bg-blue-900 text-white p-6 rounded-2xl shadow-lg shadow-blue-900/20">
                  <Calendar size={32} />
                </div>

                {/* Booking Details */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-blue-900">
                    {booking.roomId?.roomType || 'Luxury'} Suite - Room {booking.roomId?.roomNumber || 'N/A'}
                  </h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-gray-500 font-medium">
                    <span className="flex items-center gap-1 text-sm bg-slate-100 px-3 py-1 rounded-lg">
                      <Clock size={16} className="text-blue-500"/> In: {new Date(booking.checkInDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1 text-sm bg-slate-100 px-3 py-1 rounded-lg">
                      <Clock size={16} className="text-blue-500"/> Out: {new Date(booking.checkOutDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Status and Price */}
                <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                  <p className="text-3xl font-black text-blue-900">₹{booking.totalAmount}</p>
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-600 px-4 py-1.5 rounded-full text-xs font-black mt-2 uppercase tracking-wider">
                    <CheckCircle size={14} /> Confirmed
                  </span>
                </div>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="text-center py-20 bg-white rounded-[2.5rem] shadow-sm border border-dashed border-gray-200">
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={40} className="text-gray-300" />
              </div>
              <p className="text-gray-400 font-bold text-xl">No paradise found yet!</p>
              <p className="text-gray-300 text-sm mt-1">Visit our rooms to book your first stay.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;