import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Edit, Bed, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  // Fetch all rooms from the database
  const fetchRooms = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/rooms/all');
      setRooms(res.data);
    } catch (err) {
      console.error("Error fetching rooms", err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // DELETE: Logic to remove a room and refresh the list
  const deleteRoom = async (id) => {
    if (window.confirm("Are you sure you want to delete this room? This cannot be undone.")) {
      try {
        // Updated to use your specific backend delete route
        await axios.delete(`http://localhost:5000/api/rooms/${id}`);
        alert("Room Deleted Successfully!");
        fetchRooms(); 
      } catch (err) {
        alert("Delete failed. This room might be linked to active bookings.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Manage Rooms</h1>
            <p className="text-slate-500">Update or remove rooms from the resort listing</p>
          </div>
          <button 
            onClick={() => navigate('/admin/add-room')}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
          >
            <Plus size={20} /> Add Room
          </button>
        </div>

        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-5 font-semibold uppercase text-xs tracking-wider">Room Info</th>
                <th className="p-5 font-semibold uppercase text-xs tracking-wider">Type</th>
                <th className="p-5 font-semibold uppercase text-xs tracking-wider">Price</th>
                <th className="p-5 font-semibold uppercase text-xs tracking-wider">Status</th>
                <th className="p-5 font-semibold uppercase text-xs tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rooms.map((room) => (
                <tr key={room._id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                        <Bed size={20} />
                      </div>
                      <span className="font-bold text-slate-800">
                        {room.roomNumber ? `Room ${room.roomNumber}` : 'Room Info'}
                      </span>
                    </div>
                  </td>
                  <td className="p-5 text-slate-600 font-medium">{room.roomType}</td>
                  <td className="p-5 font-bold text-slate-900">₹{room.price}</td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      room.status === 'Available' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {room.status}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex justify-center gap-3">
                      {/* FIXED: Edit button now navigates to the edit page with the ID */}
                      <button 
                        onClick={() => navigate(`/admin/edit-room/${room._id}`)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => deleteRoom(room._id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rooms.length === 0 && (
            <div className="p-20 text-center text-slate-400 font-medium">
              No rooms found. Start by adding one!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageRooms;