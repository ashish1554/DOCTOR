import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { AdminContext } from './context/AdminContext';
import { DoctorContext } from './context/DoctorContext';
import AddDoctor from './pages/Admin/AddDoctor';
import AllApointments from './pages/Admin/AllApointments';
import Dashboard from './pages/Admin/Dashboard';
import DoctorsList from './pages/Admin/DoctorsList';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import Login from './pages/Login';

const App = () => {
  const {aToken}=useContext(AdminContext)

  const {dToken}=useContext(DoctorContext)

  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
    <ToastContainer />
    <Navbar />
    <div className='flex items-start'>
      <Sidebar />
      <Routes>
        {/* //admin routes */}
        <Route path='/' element={<> </>} />
        <Route path='/admin-dashboard' element={<Dashboard />} />
        <Route path='/all-appointments' element={<AllApointments />} />
        <Route path='/add-doctor' element={<AddDoctor />} />
        <Route path='/doctor-list' element={<DoctorsList />} />
        
        {/* doctor routes */}
        <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
        <Route path='/doctor-appointments' element={<DoctorAppointments />} />
        <Route path='/doctor-profile' element={<DoctorProfile />} />
      </Routes>
    </div>
    </div>
  ):(
    <>
    <Login />
    <ToastContainer />
    </>
  )
}

export default App