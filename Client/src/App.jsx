import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import AddRoom from './pages/AddRoom';
import ManageRooms from './pages/ManageRooms';
import RoomDetails from './pages/RoomDetails';
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/AdminDashboard'; // Added missing import
import UsersList from './pages/UsersList';
import EditRoom from './pages/EditRoom';
import ManageBookings from './pages/ManageBookings';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          {/* Main Home Route - Luxury UI */}
          <Route path="/" element={<Home />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/users" element={<UsersList />} />
          
          {/* Room & Booking Routes */}
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/room/:id" element={<RoomDetails />} />
          <Route path="/bookings" element={<MyBookings />} />
          
          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/add-room" element={<AddRoom />} />
          <Route path="/admin/manage-rooms" element={<ManageRooms />} />
          <Route path="/admin/edit-room/:id" element={<EditRoom />} />
          <Route path="/admin/manage-bookings" element={<ManageBookings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;