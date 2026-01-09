import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ClipboardList, User, Mail, Calendar, Clock, Trash2 } from 'lucide-react';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);

  // Fetch all bookings from the database
  const fetchAllBookings = async () => {
    try {
      // Hits the /all route which uses .populate() for user and room details
      const res = await axios.get('http://localhost:5000/api/bookings/all');
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching all bookings", err);
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  // Optional: Function to cancel/delete a booking
  const cancelBooking = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await axios.delete(`http://localhost:5000/api/bookings/${id}`);
        alert("Booking Cancelled");
        fetchAllBookings(); // Refresh the list
      } catch (err) {
        alert("Action failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
              <ClipboardList className="text-blue-600" size={36} /> Guest Reservations
            </h1>
            <p className="text-slate-500 mt-1">Monitor all active and upcoming stays at the resort</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase">Total Bookings</p>
            <p className="text-2xl font-black text-blue-900">{bookings.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-5 font-bold uppercase text-xs tracking-wider">Guest Details</th>
                <th className="p-5 font-bold uppercase text-xs tracking-wider">Room</th>
                <th className="p-5 font-bold uppercase text-xs tracking-wider">Stay Period</th>
                <th className="p-5 font-bold uppercase text-xs tracking-wider">Amount</th>
                <th className="p-5 font-bold uppercase text-xs tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-blue-50/50 transition-colors">
                  {/* Guest Details */}
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 flex items-center gap-2 text-base">
                        <User size={16} className="text-blue-500"/> {booking.userId?.name || 'Guest'}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                        <Mail size={12}/> {booking.userId?.email || 'N/A'}
                      </span>
                    </div>
                  </td>

                  {/* Room Details */}
                  <td className="p-5">
                    <div className="bg-slate-100 px-3 py-2 rounded-xl inline-block border border-slate-200">
                      <p className="text-[10px] font-black text-slate-400 uppercase">No. {booking.roomId?.roomNumber}</p>
                      <p className="font-bold text-slate-700 text-sm">{booking.roomId?.roomType}</p>
                    </div>
                  </td>

                  {/* Stay Dates */}
                  <td className="p-5">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-slate-600 flex items-center gap-2 bg-green-50 p-1 rounded-md w-fit">
                        <Calendar size={14} className="text-green-600"/> In: {new Date(booking.checkInDate).toLocaleDateString()}
                      </span>
                      <span className="text-xs font-bold text-slate-600 flex items-center gap-2 bg-red-50 p-1 rounded-md w-fit">
                        <Calendar size={14} className="text-red-600"/> Out: {new Date(booking.checkOutDate).toLocaleDateString()}
                      </span>
                    </div>
                  </td>

                  <td className="p-5 font-black text-slate-900 text-lg">
                    ₹{booking.totalAmount}
                  </td>

                  <td className="p-5 text-center">
                    <button 
                      onClick={() => cancelBooking(booking._id)}
                      className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {bookings.length === 0 && (
            <div className="p-20 text-center">
              <ClipboardList size={48} className="mx-auto text-slate-200 mb-4" />
              <p className="text-slate-400 font-bold text-xl">No active bookings found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;