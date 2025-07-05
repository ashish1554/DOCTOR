




import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

const Doctor = () => {
  const { speciality } = useParams()
  const { doctors } = useContext(AppContext)
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  
  const navigate = useNavigate()

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className='flex flex-col sm:flex-row'>
      {/* Left Section */}
      <div className='flex flex-col gap-3 w-full sm:w-[350px] p-4 sm:p-0'>
        <div className='mb-5'>
          <p className='text-gray-600'>Browse through the doctors specialist</p>
          <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={() => setShowFilter(prev => !prev)}>
            Filters
          </button>
        </div>
        <div className={`flex-col gap-5 w-full sm:w-[200px] ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className='text-gray-600 border-2 border-gray-400 rounded-lg px-2 py-2 hover:bg-blue-100 cursor-pointer text-sm'>
            General physician
          </p>
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className='text-gray-600 border-2 border-gray-400 rounded-lg px-2 py-2 hover:bg-blue-100 cursor-pointer text-sm'>
            Gynecologist
          </p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className='text-gray-600 border-2 border-gray-400 rounded-lg px-2 py-2 hover:bg-blue-100 cursor-pointer text-sm'>
            Dermatologist
          </p>
          <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className='text-gray-600 border-2 border-gray-400 rounded-lg px-2 py-2 hover:bg-blue-100 cursor-pointer text-sm'>
            Pediatricians
          </p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className='text-gray-600 border-2 border-gray-400 rounded-lg px-2 py-2 hover:bg-blue-100 cursor-pointer text-sm'>
            Neurologist
          </p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className='text-gray-600 border-2 border-gray-400 rounded-lg px-2 py-2 hover:bg-blue-100 cursor-pointer text-sm'>
            Gastroenterologist
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 sm:p-0 sm:pt-14'>
        {filterDoc.map((item, index) => (
          <div onClick={() => navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
            {/* Responsive Image */}
            <div className='w-full h-48 overflow-hidden'>
              <img className='w-full h-full sm:object-fill md:object-cover' src={item.image} alt={item.name} />
            </div>
            <div className='p-4'>
              <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p>
                <p>{item.available ? 'Available' : 'Not Available'}</p>
              </div>
              <p>{item.name}</p>
              <p>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Doctor