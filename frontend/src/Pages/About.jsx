// import React from "react";
// import { assets } from "../assets/assets";

// const About = () => {
//   return (
//     <div className="flex flex-col gap-3 p-4">
//       <div className="text-center">
//         <p className="text-gray-600 text-2xl">
//           ABOUT <span className="font-bold">US</span>
//         </p>
//       </div>
//       <div className="flex flex-row gap-5 mt-6">
//         <div className="w-2/3 py-7">
//           <img  src={assets.about_image} alt="" />
//         </div>
//         <div className="flex  flex-col gap-7 text-sm text-gray-600 px-10 py-5 justify-center">
//           <p>
//             Welcome to Prescripto, your trusted partner in managing your
//             healthcare needs conveniently and efficiently. At Prescripto, we
//             understand the challenges individuals face when it comes to
//             scheduling doctor appointments and managing their health records.
//           </p>
//           <p>
//             Prescripto is committed to excellence in healthcare technology. We
//             continuously strive to enhance our platform, integrating the latest
//             advancements to improve user experience and deliver superior
//             service. Whether you're booking your first appointment or managing
//             ongoing care, Prescripto is here to support you every step of the
//             way.
//           </p>
//           <p className="font-bold">Our Vision</p>
//           <p>
//             Our vision at Prescripto is to create a seamless healthcare
//             experience for every user. We aim to bridge the gap between patients
//             and healthcare providers, making it easier for you to access the
//             care you need, when you need it.
//           </p>
//         </div>
//       </div>
//       <div className="text-xl my-4">
//         <p className="text-gray-500">Why <span className=" text-gray-700 font-bold">Choose Us</span></p>
//       </div>
//         <div className="flex flex-col-auto gap-3 ">
//           <div className="grid gap-5 py-12 px-12  border-2 rounded-md hover:translate-y-[-10px] transition-all duration-300 hover:bg-primary hover:text-white cursor-pointer text-gray-500">
//             <p className="font-bold text-md">Efficiency:</p>
//             <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
//           </div>
//           <div className="flex flex-col gap-5 py-12 px-12 border-2 rounded-md hover:translate-y-[-10px] transition-all duration-300 hover:bg-primary hover:text-white cursor-pointer text-gray-500">
//           <p className="font-bold text-md">Convenience:</p>
//           <p>Access to a network of trusted healthcare professionals in your area.</p>
//           </div>
//           <div className="flex flex-col gap-5 py-12 px-12 border-2  rounded-md hover:translate-y-[-10px] transition-all duration-300 hover:bg-primary hover:text-white cursor-pointer text-gray-500">
//           <p className="font-bold text-md">Personalization:</p>
//           <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
//           </div>
//         </div>
    
//     </div>
//   );
// };

// export default About;

//RESPONSIVE

import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="flex flex-col gap-3 p-4">
      {/* Title Section */}
      <div className="text-center">
        <p className="text-gray-600 text-2xl">
          ABOUT <span className="font-bold">US</span>
        </p>
      </div>

      {/* About Content Section */}
      <div className="flex flex-col md:flex-row gap-5 mt-6">
        <div className="w-full md:w-2/3 py-7">
          <img src={assets.about_image} alt="" className="w-full h-auto" />
        </div>
        <div className="flex flex-col gap-7 text-sm text-gray-600 px-4 md:px-10 py-5 justify-center">
          <p>
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.
          </p>
          <p className="font-bold">Our Vision</p>
          <p>
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-xl my-4">
        <p className="text-gray-500">
          Why <span className="text-gray-700 font-bold">Choose Us</span>
        </p>
      </div>

      {/* Features Section */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="grid gap-5 py-12 px-12 border-2 rounded-md hover:translate-y-[-10px] transition-all duration-300 hover:bg-primary hover:text-white cursor-pointer text-gray-500">
          <p className='font-bold text-md'>Efficiency:</p>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className="flex flex-col gap-5 py-12 px-12 border-2 rounded-md hover:translate-y-[-10px] transition-all duration-300 hover:bg-primary hover:text-white cursor-pointer text-gray-500">
          <p className='font-bold text-md'>Convenience:</p>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className="flex flex-col gap-5 py-12 px-12 border-2 rounded-md hover:translate-y-[-10px] transition-all duration-300 hover:bg-primary hover:text-white cursor-pointer text-gray-500">
          <p className='font-bold text-md'>Personalization:</p>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
