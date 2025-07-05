import axios from 'axios'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { AppContext } from '../Context/AppContext'
import { assets } from '../assets/assets'
const Myprofile = () => {
  // const [userData, setUserData] = useState({
  //   name:'Edward Vincent',
  //   image:assets.profile_pic,
  //   email:'richardjameswap@gmail.com',
  //   phone:'+1  123 456 7890',
  //   address:{
  //     line1:'57th Cross, Richmond ',
  //     line2:'Circle, Church Road, London'
  //   },
  //   gender:'male',
  //   dob:'2000-6-20'
  // })

  const {userData,setUserData,token,backendUrl,loadUserProfileData}=useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateUserProfileData=async()=>{
    try{
      const formData=new FormData()
      formData.append('name',userData.name)
      formData.append('phone',userData.phone)
      formData.append('address',JSON.stringify(userData.address))
      formData.append('dob',userData.dob)
      formData.append('gender',userData.gender)
      image && formData.append('image',image)
      const {data}=await axios.post(backendUrl+'/api/user/update-profile',formData,{headers:{token}})

      if(data.success)
      {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)

      }
      else
      {
        toast.error(data.message)
      }
    }
    catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  return userData &&  (
    <div className='flex flex-col gap-2' >
      {
        isEdit
       ?<label htmlFor="image">
        <div className='inline-block relative cursor-pointer '>
          <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
          <img className='w-10 absolute bottom-12 right-12' src={image ? '': assets.upload_icon} alt="" />
        </div>
        <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden />
       </label>
       :
      <img className='w-36 rounded' src={userData.image} alt="" />
      }
      {
        isEdit
        ?
        <input className='mt-4' type="text" value={userData.name} onChange={(e)=>setUserData(prev=>({...prev,name:e.target.value}))} />
        :<p className='text-gray-700 text-3xl font-semibold'>{userData.name}</p>
      }
      <hr />
      <div className='flex flex-col gap-4'>
        <p className='text-gray-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='text-slate-600 flex flex-col gap-3'>
          <div className='flex flex-row gap-7'>
          <p className='font-semibold'>Email id:</p>
          <p className='text-blue-500'>{userData.email}</p>
          </div>
          <div className='flex flex-row gap-8'>
          <p className='font-semibold'>Phone:</p>
          {
        isEdit
        ?
        <input className='text-blue-500' type="text" value={userData.phone} onChange={(e)=>setUserData(prev=>({...prev,phone:e.target.value}))} />
        :<p className='text-blue-500'>{userData.phone}</p>
        }
        </div>
        <div className='flex flex-row gap-6'>
        <p className='font-semibold'>Address:</p>
        {
          isEdit 
          ?
          <p>
            <input  type="text" value={userData.address.line1} onChange={(e)=>setUserData(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))} />
            <br />
            <input  type="text" value={userData.address.line2} onChange={(e)=>setUserData(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))} />
          </p>
          :
          <p>
            {userData.address.line1}
            <br />
            {userData.address.line2}
          </p>
        }
        </div>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-gray-500 underline mt-4'>BASIC INFORMATION</p>
        <div className='text-slate-600 flex flex-col'>
          <div className='flex flex-row gap-7'>
          <p className='font-semibold'>Gender:</p>
          {
            isEdit
             ?
             <select onChange={(e)=>setUserData(prev=>({...prev,gender:e.target.value}))} value={userData.gender}>
              <option value="male">male</option>
              <option value="female">female</option>
             </select>
             :<p>{userData.gender}</p>
          }
          </div>
          <div className='flex flex-row gap-5'>
          <p className='font-semibold'>Birthday:</p>
          {
            isEdit
             ?
             <input type="date" value={userData.dob} onChange={(e)=>setUserData(prev=>({...prev,dob:e.target.value}))} />
             :
             <p>{userData.dob}</p>
          }
          </div>
        </div>
      </div>
      <div >
        {
          isEdit
           ?
            <button className='border-2 border-blue-400 rounded-full w-[207px] p-3 text-center mt-5  hover:bg-primary hover:text-white cursor-pointer' onClick={updateUserProfileData}>Save Information</button>
            :
            <button className='border-2 border-blue-400 rounded-full w-[127px] p-3 text-center mt-5  hover:bg-primary hover:text-white cursor-pointer' onClick={()=>setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  )
}

export default Myprofile
