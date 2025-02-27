// import React, { useContext, useEffect } from 'react'
// import { assets } from '../../assets/assets'
// import { AppContext } from '../../context/AppContext'
// import { DoctorContext } from '../../context/DoctorContext'
// const DoctorDashboard = () => {

//   const { dashData,setDashData,getDashData,dToken,cancelAppointment,completeAppointment}=useContext(DoctorContext)
//   const {currency,slotDateFormat}=useContext(AppContext)

//   useEffect(() => {
    
//     if(dToken)
//     {
//       getDashData()
      
//     }

//   }, [dToken])
  

//   return dashData && (
// <div className='m-5'>
//     <div className="flex gap-5 items-center">
//         <div className="flex border-2 border-gray-100 hover:scale-105 transition-all cursor-pointer bg-white h-[115px] w-[200px] rounded-md gap-3 px-3">
//           <img className="w-[60px]" src={assets.earning_icon} alt="" />
//           <div className="flex flex-col justify-center">
//             <p className="text-gray-700 text-xl font-semibold">{currency}{dashData.earnings}</p>
//             <p className="text-gray-500">Earnings</p>
//           </div>
//         </div>
//         <div className="flex -2 border-gray-100 hover:scale-105 transition-all cursor-pointer bg-white h-[115px] w-[200px] rounded-md gap-3 px-3">
//           <img className="w-[60px]" src={assets.appointments_icon} alt="" />
//           <div className="flex flex-col justify-center">
//             <p className="text-gray-700 text-xl font-semibold">{dashData.appointments}</p>
//             <p className="text-gray-500">Appointments</p>
//           </div>
//         </div>
//         <div className="flex border-2 border-gray-100 hover:scale-105 transition-all cursor-pointer bg-white h-[115px] w-[200px] rounded-md gap-3 px-3">
//           <img className="w-[60px]" src={assets.patients_icon} alt="" />
//           <div className="flex flex-col justify-center">
//             <p className="text-gray-700 text-xl font-semibold">{dashData.patients}</p>
//             <p className="text-gray-500">Patients</p>
//           </div>
//         </div>
//       </div>


//             <div className="bg-white">
//                 <div className="flex items-center gap-2.5 px-4 mt-10 rounded-t border">
//                   <img src={assets.list_icon} alt="" />
//                   <p className="font-semibold">Latest Appointment</p>
//                 </div>
//                 <div className="pt-4 border border-t-0">
//                     {
//                       dashData.latestAppointments.map((item,index)=>(
//                         <div className="flex item-center px-6  py-3 gap-3 hover:bg-gray-100" key={index}>
//                             <img className="rounded-full w-10" src={item.userData.image} alt="" />
//                             <div className="flex-1 text-sm">
//                               <p className="text-gray-800 font-medium">{item.userData.name}</p>
//                               <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
//                             </div>
//                             {
//                                 item.cancelled
//                                 ?<p className='text-red-500 text-xs font-medium'>Cancelled</p>
//                                 :item.isCompleted
//                                   ?<p className='text-green-500 text-xs font-medium'>Completed</p>
//                                   :<div className='flex'>
//                                   <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
//                                   <img onClick={()=>completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
//                                 </div>
//                              }
//                         </div>
//                       ))
//                     }
//                 </div>
//             </div>
//     </div>
//   )
// }

// export default DoctorDashboard









import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { DoctorContext } from '../../context/DoctorContext'

const DoctorDashboard = () => {
  const { dashData, setDashData, getDashData, dToken, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { currency, slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  return (
    dashData && (
      <div className='m-5'>
        {/* Cards Section */}
        <div className="flex flex-col sm:flex-row gap-5 items-center">
          {/* Earnings Card */}
          <div className="flex border-2 border-gray-100 hover:scale-105 transition-all cursor-pointer bg-white h-[115px] w-full sm:w-[200px] rounded-md gap-3 px-3">
            <img className="w-[60px]" src={assets.earning_icon} alt="" />
            <div className="flex flex-col justify-center">
              <p className="text-gray-700 text-xl font-semibold">{currency}{dashData.earnings}</p>
              <p className="text-gray-500">Earnings</p>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="flex border-2 border-gray-100 hover:scale-105 transition-all cursor-pointer bg-white h-[115px] w-full sm:w-[200px] rounded-md gap-3 px-3">
            <img className="w-[60px]" src={assets.appointments_icon} alt="" />
            <div className="flex flex-col justify-center">
              <p className="text-gray-700 text-xl font-semibold">{dashData.appointments}</p>
              <p className="text-gray-500">Appointments</p>
            </div>
          </div>

          {/* Patients Card */}
          <div className="flex border-2 border-gray-100 hover:scale-105 transition-all cursor-pointer bg-white h-[115px] w-full sm:w-[200px] rounded-md gap-3 px-3">
            <img className="w-[60px]" src={assets.patients_icon} alt="" />
            <div className="flex flex-col justify-center">
              <p className="text-gray-700 text-xl font-semibold">{dashData.patients}</p>
              <p className="text-gray-500">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Appointments Section */}
        <div className="bg-white mt-10">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-t border">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Appointment</p>
          </div>
          <div className="pt-4 border border-t-0">
            {dashData.latestAppointments.map((item, index) => (
              <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100" key={index}>
                <img className="rounded-full w-10" src={item.userData.image} alt="" />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">{item.userData.name}</p>
                  <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
                </div>
                {item.cancelled ? (
                  <p className='text-red-500 text-xs font-medium'>Cancelled</p>
                ) : item.isCompleted ? (
                  <p className='text-green-500 text-xs font-medium'>Completed</p>
                ) : (
                  <div className='flex'>
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className='w-10 cursor-pointer'
                      src={assets.cancel_icon}
                      alt=""
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className='w-10 cursor-pointer'
                      src={assets.tick_icon}
                      alt=""
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  )
}

export default DoctorDashboard