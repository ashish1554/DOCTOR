import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import jwt from 'jsonwebtoken'
import razorpay from 'razorpay'
import validator from 'validator'
import appointmentModel from '../models/appointmentModel.js'
import doctorModel from '../models/doctorModel.js'
import userModel from '../models/userModel.js'
//api to register user
const registerUser=async(req,res)=>{
    try{
        const {name,email,password} = req.body

        if(!name || !email || !password)
        {
            return res.json({success:false,message:"Missing details"})
        }
        //validating email format
        if(!validator.isEmail(email))
        {
            return res.json({success:false,message:"Enter a valid email"})
        }
        //validating strong password
        if(password.length<8)
        {
            return res.json({success:false,message:"Enter a Strong Password"})
        }
        //hashing userpassword
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const userData={
            name,
            email,
            password:hashedPassword
        }

        const newUser=new userModel(userData)
        const user=await newUser.save()
        
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.json({success:true,token})


    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


//api for userlogin

const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await userModel.findOne({email:email})
        if(!user)
        {
            return res.json({success:false,message:"User not found"})
        }
        const isMatch=await bcrypt.compare(password,user.password)

        if(isMatch)
        {
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid Credentials"})
        }
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


//api to get user profile data

const getProfile=async(req,res)=>{
    try{
        const {userId}=req.body
        // console.log(userId)
        const userData=await userModel.findById(userId).select('-password')
        console.log(userData)
        res.json({success:true,userData})
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//api to update user profile data
const updateProfile=async(req,res)=>{
    try{
        const {userId,name,phone,address,dob,gender}=req.body
        const imageFile=req.file
        // const imageFile=req.imageFile


        if(!name || !phone || !dob || !gender)
        {
            return res.json({success:false,message:"data missing"})
        }
        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})
        if(imageFile){
            //upload image to cloudinary
            const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageURL=imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId,{image:imageURL})
        

        }
        res.json({success:true,message:"Profile updated"})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//api to book appointments

const bookAppointment=async(req,res)=>{
    try{
        const {userId,docId,slotDate,slotTime}=req.body
        const docData=await doctorModel.findById(docId).select('-password')

        if(!docData.available) 
        {
         return res.json({success:false,message:"Doctor is not available"})
        }
        
        let slots_booked=docData.slots_booked

        //checking for slots available

        if(slots_booked[slotDate])
        {
            if(slots_booked[slotDate].includes(slotTime))
            {
                return res.json({success:false,message:"Slot not avialable"})
            }
            else
            {
                slots_booked[slotDate].push(slotTime)
            }
        }
        else
        {
            slots_booked[slotDate]=[]
            slots_booked[slotDate].push(slotTime)
        }

        const userData=await userModel.findById(userId).select('-password')

        delete docData.slots_booked

        const appointmentData={
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotDate,
            slotTime,
            date:Date.now()
        }

        const newAppointment=new appointmentModel(appointmentData)
        // console.log(newAppointment.docId)
        await newAppointment.save()

        //save new slots data in doctrors data

        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        res.json({success:true,message:"Appointment booked"})
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//api to get user appointments for my-appointment page in frontend
const listAppointment=async(req,res)=>{
    try{
        const {userId}=req.body
        const appointments = await appointmentModel.find({userId})
        res.json({success:true, appointments})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//api to cancel appointment

const cancelAppointment=async(req,res)=>{
    try{
        const {userId,appointmentId}=req.body

        const appointmentData=await appointmentModel.findById(appointmentId)

        //verify appointment user

        if(appointmentData.userId!=userId){
            return res.json({success:false,message:"Unauthorized Action"})
        }

        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

        //releasing doctor slots
        const {docId,slotDate,slotTime}=appointmentData
        const  doctorData=await doctorModel.findById(docId)
        let slots_booked=doctorData.slots_booked
        slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e!==slotTime)
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        res.json({success:true,message:"Appointment cancelled"})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


const razorpayInstance =new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})
//api to make payment of appointment using razor pay

const paymentRazorPay=async (req,res)=>{

    try{
        const {appointmentId}=req.body
    const appointmentData=await appointmentModel.findById(appointmentId)

    if(!appointmentData || appointmentData.cancelled)
    {
        return res.json({success:false,message:"Appointment Cancelled or not found"})
    }

    //creating option for razorpay payment
    const options={
        amount:appointmentData.amount*100,
        currency:process.env.CURRENCY,
        receipt:appointmentId,
    }

    //creation of oreder
    const order=await razorpayInstance.orders.create(options)
    res.json({success:true,order})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//api to verify payment using razor pay

const verifyRazorPay=async(req,res)=>{
    try{
        const {razorpay_order_id}=req.body
        const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id)
        // console.log(orderInfo)
        if(orderInfo.status==='paid')
        {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            res.json({success:true,message:"Payment Successful"})
        }
        else{
            res.json({success:false,message:"Payment Failed"})
        }
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export { bookAppointment, cancelAppointment, getProfile, listAppointment, loginUser, paymentRazorPay, registerUser, updateProfile, verifyRazorPay }

