

import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(DoctorContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/') // Redirect to Home page after logout
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken') // Remove doctor token from local storage when admin logs out
  }

  return (
    <div className='flex justify-between items-center border-b px-5 py-3'>
      {/* Left Section */}
      <div className='flex gap-3 items-center'>
        {/* Logo - Large in both mobile and laptop views */}
        <img className='cursor-pointer' src={assets.admin_logo} alt="Logo" />
        {/* Admin/Doctor Text - Hidden only in mobile view */}
        <p className='hidden sm:block text-sm text-gray-600 border rounded-full border-gray-800 px-5 py-1'>
          {aToken ? 'Admin' : 'Doctor'}
        </p>
      </div>

      {/* Logout Button - Large in both mobile and laptop views */}
      <button
        onClick={logout}
        className='bg-primary text-white px-12 py-2 rounded-full'
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar