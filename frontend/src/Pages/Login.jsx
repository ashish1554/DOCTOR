import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../Context/AppContext";

const Login = () => {
  const navigate=useNavigate()
  const {backendUrl,token,setToken}=useContext(AppContext)
  const [state, setState] = useState('Sign Up')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onsubmitHandler=async(e)=>{
      e.preventDefault()
      try{
        if(state === 'Sign Up')
        {
          const {data}=await axios.post(backendUrl+'/api/user/register',{name,password,email})
          if(data.success)
          {
            localStorage.setItem('token',data.token)
            setToken(data.token)
          }
          else
          {
            toast.error(data.message)
          }
        }
        else{
          const {data}=await axios.post(backendUrl+'/api/user/login',{password,email})
          if(data.success)
          {
            localStorage.setItem('token',data.token)
            setToken(data.token)
          }
          else
          {
            toast.error(data.message)
          }
        }
      }
      catch(error)
      {
          toast.error(error.message)
      }
  }

  useEffect(() => {
    
  if(token)
  {
    navigate('/')
  }

  }, [token])
  
  return (
    <div className="flex justify-center w-full">
      <form onSubmit={onsubmitHandler}  action="">
        <div className="flex flex-col gap-4 border-2 border-gray-400 rounded-md p-10 mt-10 justify-center shadow-lg w-96">
          <div className="text-gray-600">
            <p className="font-bold text-xl">{state==='Sign Up' ? "Create Account":"Login"}</p>
            <p className="text-sm">Please {state==='Sign Up' ? "sign up":"log in"} to book appointment</p>
          </div>
          <div className="text-gray-600 text-sm flex flex-col">
            {state==='Sign Up' ?
            <>
            <p>Full Name</p>
            <input className="border-2 border-gray-400 mb-2 rounded-md p-1" type="text" onChange={(e)=>setName(e.target.value)} value={name}  /> </> :'' }
            
            <p>Email</p>
            <input className="border-2 border-gray-400 mb-2 rounded-md p-1" type="email" onChange={(e)=>setEmail(e.target.value)} value={email}  />
            <p>Password</p>
            <input className="border-2 border-gray-400 mb-2 rounded-md p-1" type="password" onChange={(e)=>setPassword(e.target.value)} value={password}  />
          </div>
          <button type="submit"  className="bg-primary text-white py-1 text-md font-medium rounded-md">{state==='Sign Up'?"Create Account":"Login"}</button>
          {
            state==='Sign Up'
            ?
          <p className="text-sm text-gray-600">Already have an account? <span onClick={()=>setState('Login')} className="text-blue-500 cursor-pointer"> Login here</span></p>
            :
            <p className="text-sm text-gray-600">Create an new account?<span onClick={()=>setState('Sign Up')} className="text-blue-500 cursor-pointer"> Click here</span></p>
          
          }

        </div>
        </form>
    </div>
  );
};

export default Login;

