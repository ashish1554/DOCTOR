
import React from 'react'
import { Route, Routes } from 'react-router-dom'
// import Navbar from './Components/Navbar'
import { ToastContainer } from 'react-toastify'
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'
import About from './Pages/About'
import Appoitment from './Pages/Appoitment'
import Contact from './Pages/Contact'
import Doctor from './Pages/Doctor'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Myappoitment from './Pages/Myappoitment'
import Myprofile from './Pages/Myprofile'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
    <Navbar />
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctor />} />
          <Route path='/doctors/:speciality' element={<Doctor />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={ <About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/my-profile' element={<Myprofile />} />
          <Route path='/my-appointments' element={<Myappoitment />} />
          <Route path='/appointment/:docId' element={<Appoitment />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App