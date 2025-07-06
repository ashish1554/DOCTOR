
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppContext } from '../Context/AppContext'

const Myappoitment = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])

  const months = [" ", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const navigate = useNavigate()

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, { headers: { token } })
          if (data.success) {
            getUserAppointments()
            navigate('/my-appointments')
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorPay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
      if (data.success) {
        initPay(data.order)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div>
      <p className='text-gray-500 font-semibold mt-12 text-2xl pb-3 border-b'>My appointments</p>
      <div>
        {appointments.map((item, index) => (
          <div className='flex flex-col md:flex-row gap-4 border-b pb-4 mt-4' key={index}>

           <div className="w-full sm:w-[160px] flex-shrink-0">
  <img
    className="w-full h-[350px] md:h-[220px] md:object-cover rounded-md bg-blue-50"
    src={item.docData.image}
    alt=""
  />
</div>

            {/* Info Section */}
            <div className='flex flex-col gap-2 text-gray-600 text-sm w-full'>
              <div>
                <p className='font-bold text-gray-700 text-lg'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
              </div>
              <p className='font-semibold'>Address:</p>
              <div className='flex flex-col'>
                <p>{item.docData.address.line1}</p>
                <p>{item.docData.address.line2}</p>
              </div>
              <p><span>Date & Time: </span>{slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>

            {/* Button Section */}
            <div className='flex flex-col gap-3 md:items-end ml-auto pt-4 md:pt-20 w-full md:w-[240px]'>

              {!item.cancelled && item.payment && !item.isCompleted &&
                <button className='w-full whitespace-nowrap py-2 rounded text-stone-500 bg-indigo-50'>Paid</button>}

              {!item.cancelled && !item.payment && !item.isCompleted && (
                <>
                  <button
                    onClick={() => appointmentRazorPay(item._id)}
                    className='w-full whitespace-nowrap border-2 border-gray-500 px-5 py-2 hover:bg-primary hover:text-white cursor-pointer rounded-md'>
                    Pay Online
                  </button>
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className='w-full whitespace-nowrap border-2 border-gray-500 px-5 py-2 hover:bg-red-600 hover:text-white cursor-pointer rounded-md'>
                    Cancel Appointment
                  </button>
                </>
              )}

              {!item.cancelled && item.payment && !item.isCompleted &&
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className='w-full whitespace-nowrap border-2 border-gray-500 px-5 py-2 hover:bg-red-600 hover:text-white cursor-pointer rounded-md'>
                  Cancel Appointment
                </button>}

              {item.cancelled && !item.isCompleted &&
                <button className='w-full whitespace-nowrap py-2 border border-red-500 rounded text-red-500'>
                  Appointment Cancelled
                </button>}

              {item.isCompleted &&
                <button className='w-full whitespace-nowrap py-2 border border-green-500 rounded text-green-500'>
                  Completed
                </button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Myappoitment

