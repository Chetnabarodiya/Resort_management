import React, { useState } from 'react';
import axios from 'axios';
import { Bed, IndianRupee, Image as ImageIcon, CheckCircle } from 'lucide-react';

const AddRoom = () => {
  const [roomData, setRoomData] = useState({
    roomNumber: '', roomType: 'Single', price: '', facilities: '', images: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Split facilities by comma into an array
      const dataToSend = { ...roomData, facilities: roomData.facilities.split(',') };
      await axios.post('http://localhost:5000/api/rooms/add', dataToSend);
      alert("Room Added Successfully!");
    } catch (err) {
      alert("Error adding room");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
        <h2 className="text-3xl font-bold text-blue-900 mb-8 flex items-center gap-3">
          <Bed className="text-yellow-500" /> Add New Resort Room
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Room Number</label>
              <input type="text" className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:border-blue-500" placeholder="e.g. 101" onChange={(e) => setRoomData({...roomData, roomNumber: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Room Type</label>
              <select className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:border-blue-500" onChange={(e) => setRoomData({...roomData, roomType: e.target.value})}>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Suite">Suite</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Price Per Night (₹)</label>
            <div className="relative">
              <IndianRupee className="absolute left-4 top-4 text-gray-400" size={20} />
              <input type="number" className="w-full pl-12 p-4 bg-gray-50 border rounded-2xl outline-none focus:border-blue-500" placeholder="3000" onChange={(e) => setRoomData({...roomData, price: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Facilities (Comma separated)</label>
            <input type="text" className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:border-blue-500" placeholder="AC, WiFi, Pool, Food" onChange={(e) => setRoomData({...roomData, facilities: e.target.value})} />
          </div>

          <button className="w-full bg-blue-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20">
            <CheckCircle size={24} /> List This Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRoom;