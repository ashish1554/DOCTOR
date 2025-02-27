// import React, { useContext, useEffect } from 'react';
// import { assets } from '../../assets/assets';
// import { AdminContext } from '../../context/AdminContext';
// import { AppContext } from '../../context/AppContext';

// const AllApointments = () => {
//   const {aToken,appointments,getAllAppointments,cancelAppointment}=useContext(AdminContext)
//   const {calculateAge,slotDateFormat,currency}=useContext(AppContext)
//   useEffect(() => {
//     if(aToken)
//     {
//       getAllAppointments()  // Call API to  get all appointments
//     }
//   }, [aToken])

//   // useEffect(() => {
//   //   if (aToken) {
//   //     console.log("Calling getAllAppointments");
//   //     getAllAppointments();
//   //   } else {
//   //     console.log("Token not available");
//   //   }
//   // }, [aToken]);
  
//   return (
//     <div className='w-full max-w-6xl m-5'>
//       <p className='mb-3 text-lg font-medium'>All Appointments</p>
//       <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
//         <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b '>
//           <p>#</p>
//           <p>Patient</p>
//           <p>Age</p>
//           <p>Date & Time</p>
//           <p>Doctor</p>
//           <p>Fee</p>
//           <p>Actions</p>
//         </div>
//         {
//           appointments.map((item,index)=>(
//             <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
//               <p className='max-sm:hidden'>{index+1}</p>
//               <div className='flex item-center gap-2'>
//                 <img className='w-8 rounded-full' src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
//               </div>
//               <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
//               <p>{slotDateFormat(item.slotDate)},{item.slotTime}</p>
//               <div className='flex item-center gap-2'>
//                 <img className='w-8 rounded-full bg-gray-200' src={item.docData.image} alt="" /> <p>{item.docData.name}</p>
//               </div>
//               <p>{currency}{item.amount}</p>
//               {
//                 item.cancelled
//                 ?<p className='text-red-500 text-xs font-medium'>Cancelled</p>
//                 :item.isCompleted
//                   ?<p className='text-green-500 text-xs font-medium'>Completed</p>
//                   :<img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
//               }
//             </div>
//           ))
//         }
//       </div>
//     </div>
//   )
// }
// export default AllApointments




import React, { useContext, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments(); // Call API to get all appointments
    }
  }, [aToken]);

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        {/* Table Header - Hidden on mobile */}
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fee</p>
          <p>Actions</p>
        </div>

        {/* Appointments List */}
        {appointments.map((item, index) => (
          <div
            className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'
            key={index}
          >
            {/* Index - Hidden on mobile */}
            <p className='max-sm:hidden'>{index + 1}</p>

            {/* Patient Info */}
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full' src={item.userData.image} alt="" />
              <p>{item.userData.name}</p>
            </div>

            {/* Age - Hidden on mobile */}
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>

            {/* Date & Time */}
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

            {/* Doctor Info */}
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full bg-gray-200' src={item.docData.image} alt="" />
              <p>{item.docData.name}</p>
            </div>

            {/* Fee */}
            <p>{currency}{item.amount}</p>

            {/* Actions */}
            {item.cancelled ? (
              <p className='text-red-500 text-xs font-medium'>Cancelled</p>
            ) : item.isCompleted ? (
              <p className='text-green-500 text-xs font-medium'>Completed</p>
            ) : (
              <img
                onClick={() => cancelAppointment(item._id)}
                className='w-10 cursor-pointer'
                src={assets.cancel_icon}
                alt=""
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;