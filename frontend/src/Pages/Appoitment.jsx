


import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import RelatedDoctors from '../Components/RelatedDoctors'
import { AppContext } from '../Context/AppContext'

const Appoitment = () => {
  const { docId } = useParams()
  const { doctors, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const navigate = useNavigate()
  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
    setDocSlots([])
    let today = new Date()

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleDateString([], { hour: '2-digit', minute: '2-digit' })

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = day + "_" + month + "_" + year
        const slotTime = formattedTime
        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true
        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }
      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book Appointment')
      return navigate('/login')
    }
    try {
      const date = docSlots[slotIndex][0].datetime
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year
      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  return docInfo && (
    <div className="p-4 sm:p-6 md:p-10">
      <div className='flex flex-col md:flex-row gap-6 md:gap-10'>
        <div className='w-full md:w-[60%] bg-primary rounded-lg'>
          <img className='h-full w-full' src={docInfo.image} alt="" />
        </div>
        <div className='flex flex-col gap-4 py-6 px-6 md:py-10 md:px-8 border-2 border-gray-300 rounded-xl'>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-row gap-2 items-center'>
              <p className='text-xl md:text-3xl'>{docInfo.name}</p>
              <img src={assets.verified_icon} alt="" />
            </div>
            <div className='flex flex-wrap gap-2 items-center'>
              <p>{docInfo.degree} -</p>
              <p>{docInfo.speciality}</p>
              <p className='border-2 border-gray-600 rounded-full px-3'>{docInfo.experience}</p>
            </div>
          </div>
          <div>
            <p className='font-bold text-lg flex items-center gap-1'>About <img src={assets.info_icon} alt="" /></p>
            <p className='text-gray-600 text-md'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500'>Appointment fees: <span className='text-gray-600 font-bold'>${docInfo.fees}</span></p>
        </div>
      </div>
      <div className='mt-6 md:ml-10 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-auto mt-4'>
          {docSlots.length && docSlots.map((item, index) => (
            <div onClick={() => setSlotIndex(index)} className={`text-center py-3 md:py-6 min-w-12 md:min-w-16 rounded-full cursor-pointer ${slotIndex === index ? `bg-primary text-white` : `border border-gray-200`}`} key={index}>
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-auto mt-4'>
          {docSlots.length && docSlots[slotIndex].map((item, index) => (
            <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-4 md:px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? `bg-primary text-white` : `text-gray-400 border border-gray-300`}`} key={index}>
              {item.time.split(', ')[1]}
            </p>
          ))}
        </div>
        <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-10 md:px-14 py-3 rounded-full my-6'>Book an appointment</button>
      </div>
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appoitment
