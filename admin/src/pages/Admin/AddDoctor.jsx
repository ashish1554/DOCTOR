// import axios from 'axios'
// import React, { useContext, useState } from 'react'
// import { toast } from 'react-toastify'
// import { assets } from '../../assets/assets'
// import { AdminContext } from '../../context/AdminContext'
// const AddDoctor = () => {

//   const [docImg, setDocImg] = useState(false)
//   const [name,setName] = useState('')
//   const [email,setEmail] = useState('')
//   const [password,setPassword] = useState('')
//   const [experience,setExperience] = useState('1 Year')
//   const [fees,setFees] = useState('')
//   const [about,setAbout] = useState('')
//   const [speciality,setSpeciality] = useState('General physician')
//   const [degree,setDegree] = useState('')
//   const [address1,setAddress1] = useState('')
//   const [address2,setAddress2] = useState('')

//   const {backendUrl,aToken}=useContext(AdminContext)

//   const onSubmitHandler = async (event) => {
//     event.preventDefault()

//     try{
//         if(!docImg)
//         {
//           return toast.error("Image not selected")
//         }

//         const formData=new FormData()
//         formData.append('image',docImg)
//         formData.append('name',name)
//         formData.append('email',email)
//         formData.append('password',password)
//         formData.append('experience',experience)
//         formData.append('fees',Number(fees))
//         formData.append('about',about)
//         formData.append('speciality',speciality)
//         formData.append('degree',degree)
//         formData.append('address',JSON.stringify({
//           line1:address1,
//           line2:address2
//         }))
        
//         //clg form data
//         formData.forEach((value,key)=>{
//           console.log(`${key}: ${value}`)
//         })

//         const {data}=await axios.post(backendUrl+'/api/admin/add-doctor',formData,{headers:{aToken}})

//         if(data.success)
//         {
//           toast.success(data.message)
//           setDocImg(false)
//           setName('')
//           setEmail('')
//           setPassword('')
//           setFees('')
//           setAbout('')
//           setAddress1('')
//           setAddress2('')
//           setDegree('')
//         }
//         else{
//           toast.error(data.message)
//         }
//     }
//     catch(error){
//       toast.error(error.message)
//       console.log(error)
//     }
//   }


//   return (
//     <form onSubmit={onSubmitHandler} className='p-5 w-full' action="">
//         <p>Add Doctor</p>
//         <div className=' p-7 w-[80%]  border-gray-400 border rounded-md mx-5 my-5 flex flex-col gap-3 pr-24 bg-white'>
//             <div className='flex items-center gap-3'>
//                 <label htmlFor="doc-img">
//                     <img  className='w-16 object-fill border rounded-full bg-blue-50 cursor-pointer' src={docImg ? URL.createObjectURL(docImg) :assets.upload_area} alt="" />
//                 </label>
//                 <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id='doc-img' hidden />
//                 <p>Upload doctor <br />picture</p>
//             </div>

//             <div className='flex mt-5 gap-5 '>
//               <div className='flex flex-col gap-3 w-1/2 text-gray-700 text-sm'>
//                 <div className='flex flex-col gap-2'>
//                   <p>Doctor name</p>
//                   <input onChange={(e)=>setName(e.target.value)} value={name} className='border rounded-md border-gray-400 px-2 py-1.5' type="text" placeholder='Name' required />
//                 </div>
//                 <div className='flex flex-col gap-2'>
//                   <p>Doctor Email</p>
//                   <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border rounded-md border-gray-400 px-2 py-1.5' type="email" placeholder='Your email' required />
//                 </div>
//                 <div className='flex flex-col gap-2' >
//                   <p>Doctor Password</p>
//                   <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border rounded-md border-gray-400 px-2 py-1.5' type="password" placeholder='Password' required />
//                 </div>
//                 <div className='flex flex-col gap-2' >
//                   <p>Experience</p>
//                   <select onChange={(e)=>setExperience(e.target.value)} value={experience} className='border rounded-md border-gray-400 px-2 py-1.5 text-gray-400' required>
//                     <option value="1 Year">1 Year</option>
//                     <option value="2 Year">2 Year</option>
//                     <option value="3 Year">3 Year</option>
//                     <option value="4 Year">4 Year</option>
//                     <option value="5 Year">5 Year</option>
//                     <option value="6 Year">6 Year</option>
//                     <option value="7 Year">7 Year</option>
//                     <option value="8 Year">8 Year</option>
//                     <option value="9 Year">9 Year</option>
//                     <option value="10 Year">10 Year</option>
//                   </select>
//                 </div>
//                 <div className='flex flex-col gap-2' >
//                   <p>Fees</p>
//                   <input onChange={(e)=>setFees(e.target.value)} value={fees} className='border rounded-md border-gray-400 px-2 py-1.5' type="number" placeholder='Your fees' required />
//                 </div>


//               </div>
//               <div className='flex flex-col gap-3 w-1/2  text-gray-700 text-sm'>
//                 <div className='flex flex-col gap-2 ' >
//                   <p>Speciality</p>
//                   <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className='border rounded-md border-gray-400 px-2 py-1.5 text-gray-400'>
//                     <option value="General physician">General physician</option>
//                     <option value="Gynecologist">Gynecologist</option>
//                     <option value="Dermatologist">Dermatologist</option>
//                     <option value="Pediatricians">Pediatricians</option>
//                     <option value="Neurologist">Neurologist</option>
//                     <option value="Gastroenterologist">Gastroenterologist</option>
//                   </select>
//                 </div>
//                 <div className='flex flex-col gap-2' >
//                   <p>Education</p>
//                   <input onChange={(e)=>setDegree(e.target.value)} value={degree} className='border rounded-md border-gray-400 px-2 py-1.5' type="text" placeholder='Education' required/>
//                 </div>
//                 <div className='flex flex-col gap-2' >
//                   <p>Address</p>
//                   <input onChange={(e)=>setAddress1(e.target.value)} value={address1} className='border rounded-md border-gray-400 px-2 py-1.5' type="text" placeholder='Address1' required/>
//                   <input onChange={(e)=>setAddress2(e.target.value)} value={address2} className='border rounded-md border-gray-400 px-2 py-1.5' type="text" placeholder='Address2' required/>
//                 </div>
//               </div>
//             </div>
//             <div className='flex flex-col gap-3 w-full  text-gray-700 text-sm' >
//               <p>About Doctor</p>
//               <textarea onChange={(e)=>setAbout(e.target.value)} value={about} className='border rounded-md border-gray-400 px-2 py-1.5 w-full'  rows={5} placeholder='write about yourself'></textarea>
//             </div>
//             <div>
//             <button type='submit' className='bg-primary text-white text-sm rounded-full px-10 py-3 mt-2'>Add doctor</button>
//             </div>
//         </div>

//     </form>
//   )
// }
// export default AddDoctor




import axios from 'axios'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { backendUrl, aToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (!docImg) {
        return toast.error("Image not selected")
      }

      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({
        line1: address1,
        line2: address2
      }))

      // Log form data
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`)
      })

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })

      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setFees('')
        setAbout('')
        setAddress1('')
        setAddress2('')
        setDegree('')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='p-5 w-full'>
      <p className='text-lg font-semibold'>Add Doctor</p>
      <div className='p-7 w-full md:w-[80%] border-gray-400 border rounded-md  my-5 flex flex-col gap-3 bg-white'>
        {/* Image Upload Section */}
        <div className='flex items-center gap-3'>
          <label htmlFor="doc-img">
            <img className='w-16 h-16 object-cover border rounded-full bg-blue-50 cursor-pointer' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id='doc-img' hidden />
          <p className='text-sm text-gray-600'>Upload doctor <br />picture</p>
        </div>

        {/* Form Fields */}
        <div className='flex flex-col md:flex-row mt-5 gap-5'>
          {/* Left Column */}
          <div className='flex flex-col gap-3 w-full md:w-1/2 text-gray-700 text-sm'>
            <div className='flex flex-col gap-2'>
              <p>Doctor name</p>
              <input onChange={(e) => setName(e.target.value)} value={name} className='border rounded-md border-gray-400 px-2 py-1.5' type="text" placeholder='Name' required />
            </div>
            <div className='flex flex-col gap-2'>
              <p>Doctor Email</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded-md border-gray-400 px-2 py-1.5' type="email" placeholder='Your email' required />
            </div>
            <div className='flex flex-col gap-2'>
              <p>Doctor Password</p>
              <input onChange={(e) => setPassword(e.target.value)} value={password} className='border rounded-md border-gray-400 px-2 py-1.5' type="password" placeholder='Password' required />
            </div>
            <div className='flex flex-col gap-2'>
              <p>Experience</p>
              <select onChange={(e) => setExperience(e.target.value)} value={experience} className='border rounded-md border-gray-400 px-2 py-1.5 text-gray-400' required>
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
            <div className='flex flex-col gap-2'>
              <p>Fees</p>
              <input onChange={(e) => setFees(e.target.value)} value={fees} className='border rounded-md border-gray-400 px-2 py-1.5' type="number" placeholder='Your fees' required />
            </div>
          </div>

          {/* Right Column */}
          <div className='flex flex-col gap-3 w-full md:w-1/2 text-gray-700 text-sm'>
            <div className='flex flex-col gap-2'>
              <p>Speciality</p>
              <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border rounded-md border-gray-400 px-2 py-1.5 text-gray-400'>
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className='flex flex-col gap-2'>
              <p>Education</p>
              <input onChange={(e) => setDegree(e.target.value)} value={degree} className='border rounded-md border-gray-400 px-2 py-1.5' type="text" placeholder='Education' required />
            </div>
            <div className='flex flex-col gap-2'>
              <p>Address</p>
              <input onChange={(e) => setAddress1(e.target.value)} value={address1} className='border rounded-md border-gray-400 px-2 py-1.5' type="text" placeholder='Address1' required />
              <input onChange={(e) => setAddress2(e.target.value)} value={address2} className='border rounded-md border-gray-400 px-2 py-1.5' type="text" placeholder='Address2' required />
            </div>
          </div>
        </div>

        {/* About Doctor Section */}
        <div className='flex flex-col gap-3 w-full text-gray-700 text-sm'>
          <p>About Doctor</p>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='border rounded-md border-gray-400 px-2 py-1.5 w-full' rows={5} placeholder='Write about yourself'></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button type='submit' className='bg-primary text-white text-sm rounded-full px-10 py-3 mt-2'>Add doctor</button>
        </div>
      </div>
    </form>
  )
}

export default AddDoctor