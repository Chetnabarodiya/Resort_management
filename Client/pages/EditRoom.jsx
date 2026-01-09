import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState({
    roomNumber: '',
    roomType: '',
    price: '',
    status: ''
  });

  useEffect(() => {
    const fetchRoom = async () => {
      const res = await axios.get('http://localhost:5000/api/rooms/all');
      const room = res.data.find(r => r._id === id);
      if (room) setRoomData(room);
    };
    fetchRoom();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/rooms/update/${id}`, roomData);
      alert("Room updated successfully!");
      navigate('/admin/manage-rooms');
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-[2rem] shadow-xl">
        <h2 className="text-3xl font-black text-slate-900 mb-6">Edit Room Details</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <input 
            className="w-full p-4 border rounded-xl" 
            value={roomData.roomNumber} 
            onChange={(e) => setRoomData({...roomData, roomNumber: e.target.value})} 
            placeholder="Room Number" 
          />
          <select 
            className="w-full p-4 border rounded-xl" 
            value={roomData.roomType}
            onChange={(e) => setRoomData({...roomData, roomType: e.target.value})}
          >
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Suite">Suite</option>
          </select>
          <input 
            className="w-full p-4 border rounded-xl" 
            value={roomData.price} 
            onChange={(e) => setRoomData({...roomData, price: e.target.value})} 
            placeholder="Price" 
          />
          <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditRoom;